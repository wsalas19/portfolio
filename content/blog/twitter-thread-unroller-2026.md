---
title: "I Built a Twitter Thread Unroller. Twitter Didn't Make It Easy."
date: "2026-08-30"
excerpt: "What looked like a weekend project turned into a fight against the most locked-down Twitter API in history. Here's what I learned building a thread-to-article converter after Musk's takeover."
tags: ["Twitter", "API", "Next.js", "Reverse Engineering", "Developer Experience"]
author: "William Salas"
---

People still love Twitter threads — long, opinionated essays written one tweet at a time. And people still hate reading them in Twitter's own UI. So the idea was simple: a tool that takes a thread URL and turns it into a clean article. Paste the link, get the unrolled thread as one continuous piece of writing.

I thought it would take a weekend. It didn't — and not because the idea is hard. The platform made sure of that.

---

## The Simple Idea That Wasn't

Here's the whole mental model I started with:

1. User pastes a Twitter thread URL
2. I extract the tweet ID from it
3. I fetch the conversation data
4. I stitch the tweets into a markdown article
5. Done, ship it

Step 3 is where the dream died.

---

## What Twitter Did to Its API

Twitter used to have one of the friendliest developer ecosystems on the internet. Free API access, generous tiers, third-party apps everywhere. Then the acquisition happened, and within about four months the whole landscape flipped:

- **The price shot up.** What cost nothing became three tiers: a free plan capped at 1,500 posts a month (write-only, almost useless for reading data), a $100/month "Basic" tier, and enterprise access reported at **$42,000 a month**. For a solo developer running a portfolio tool, those numbers are a "go away."
- **Every third-party client got killed.** In January 2023, apps like Tweetbot and Twitterrific — beloved, *years-old* apps — were cut off without warning, and the developer terms were quietly updated to ban "a substitute or similar service or product" to Twitter's own apps.
- **Even the researchers got shut out.** The Verge reported the new costs "closed the book" on academic research — one estimate put the damage at over 250 jeopardized projects.

If you're a big company with a marketing budget, fine, pay the toll. If you're an indie dev building a utility, the official API is a non-starter. Effectively, **Twitter had banned the kind of app I was building.**

## The Underground: TwtAPI

When a platform closes its official doors, an unofficial market opens. Twitter's own website still needs to fetch threads — it talks to internal GraphQL endpoints that nobody documents but that work anyway. Enter **TwtAPI** (www.twtapi.com), one of the services that reverse-engineers those endpoints and resells access per-call. Send your key as an `X-API-Key` header, get the raw GraphQL payload the official client gets.

I'll be honest: I don't know exactly who runs it. The docs suggest a Chinese operation, but honestly it doesn't matter. It works, it stays current with Twitter's churn, and for a hobby tool that's exactly what I needed.

## The Parsing Nightmare

The nasty discovery was that "the API" isn't one thing. TwtAPI routes to Twitter's internal GraphQL, and that GraphQL is a shapeshifter — the same endpoint returns **two completely different response shapes** depending on... I genuinely don't know. Route? Data availability? The phase of the moon? My parser handles both:

```typescript
// SCENARIO A: Direct Tweet Format (TweetDetailv2 shape)
if (data?.tweetResult?.result) {
  rootTweetNode = data.tweetResult.result;
}
// SCENARIO B: Timeline Format (TweetDetailConversationv2 shape)
else if (data?.timeline_response?.instructions) {
  const addEntries = instructions.find((i) =>
    i.__typename === 'TimelineAddEntries' || i.type === 'TimelineAddEntries'
  );
  const entries = addEntries?.entries || [];
  const rootEntry = entries.find((e) => e.entryId?.startsWith('tweet-'));
  // Even the nesting is inconsistent
  const content = rootEntry?.content?.content || rootEntry?.content?.itemContent;
  const tweetResult = content?.tweetResult?.result || content?.tweet_results?.result;
  rootTweetNode = tweetResult ?? null;
}
```

Two spellings for the same field (`tweetResult.result` vs `tweet_results.result`), two containers (`content` vs `itemContent`), two ways to identify an instruction (`__typename` vs `type`). Every fallback is a scar from an actual payload that broke a previous version.

And some tweets come back wrapped in something called `TweetWithVisibilityResults` — a container the tweet hides inside and must be peeled off before you get the real data. Peeling a tweet out of a result that wraps a tweet. Because why not.

I also added a failsafe that dumps the full raw payload to the console when the root tweet can't be found. When Twitter silently renames a field, a parser doesn't crash — it just quietly returns garbage. The dump is the only way to see the new shape. That dump is literally how I wrote this file.

The deepest irony: there's no algorithm here. Just **defensive navigation of a data structure that refuses to commit to a shape.** That's not engineering, that's archaeology.

## Three Hundred Calls a Month

The catch with a proxy service is the quota: TwtAPI's free tier gives you **300 API calls a month**. That's the entire budget for the tool — and it's public. An endpoint that hands out API calls is a gift anyone can spend on your behalf.

So the parser got three layers of protection:

1. **Caching.** Next.js's built-in fetch cache with a 24-hour revalidation window. Fetch a thread once, and every visitor for the next day gets it from the cache instead of TwtAPI.
2. **Rate-limit backoff.** A simple exponential backoff on 429s — 1s, 2s, 4s, give up — so a transient rate limit doesn't burn calls on retry spam:

```typescript
if (response.status === 429 && attempt < maxRetries - 1) {
  const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
  await new Promise((resolve) => setTimeout(resolve, delay));
  continue;
}
```

3. **A spending budget.** Anyone who found my endpoint could drain the month's quota without ever paying for a key of their own. So I added a per-process sliding-window budget — a cap on live API calls per minute, rejecting anything beyond it. For a 300-calls-a-month free tier, that guard isn't optional. It's the difference between a working tool and a quota gone in an afternoon.

## Closing Thoughts

Building a thread unroller should have been a two-file utility. Instead it was a crash course in what it means to build on a platform that decided it doesn't want third-party developers anymore.

The churn is the story. Twitter's internal API changes so often that proxies live in a perpetual chase to keep up, and consumers like me sit at the end of that chain — holding a parser whose every field access is a shrug. The code I wrote today might not work next month.

I don't have a tidy ending where I reverse-engineered Twitter once and it worked forever. Nobody does. What I have is a working tool, a parser full of hard-won fallbacks, and a much deeper respect for the proxy services quietly keeping the third-party ecosystem alive. They're doing the work Twitter doesn't want done — and for indie devs, they're the only reason this kind of project still exists.

---

**Sources:**
- [The Verge — Twitter announces new API pricing, posing a challenge for small developers](https://www.theverge.com/2023/3/30/23662832/twitter-api-tiers-free-bot-novelty-accounts-basic-enterprice-monthly-price)
- [The Verge — Twitter just closed the book on academic research](https://www.theverge.com/2023/5/31/23739084/twitter-elon-musk-api-policy-chilling-academic-research)
- [The Verge — Twitter to remove free API access](https://www.theverge.com/2023/2/2/23582615/twitter-removing-free-api-developer-apps-price-announcement)
- [TechCrunch — Twitterrific, Tweetbot hit by twitter API restrictions](https://techcrunch.com/2023/01/19/twitterrific-tweetbot-app-store-removal-twitter-api/)
- [The Iconfactory — Twitterrific: End of an Era](https://blog.iconfactory.com/2023/01/twitterrific-end-of-an-era)
- [Tapbots — Tweetbot memorial](https://tapbots.com/tweetbot/)
- [MacRumors — Twitter Officially Bans All Third-Party Apps](https://www.macrumors.com/2023/01/20/twitter-bans-third-party-apps/)
- [TwtAPI — Twitter Data API](https://www.twtapi.com/en/)
- [TwtAPI — Documentation](https://www.twtapi.com/en/docs/)