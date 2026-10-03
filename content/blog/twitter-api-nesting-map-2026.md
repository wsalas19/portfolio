---
title: "A Field Map for Twitter's Undocumented Thread API"
date: "2026-10-03"
excerpt: "I spent a week mapping every layer of nesting in Twitter's internal GraphQL thread payload so you don't have to. Here's the exact path from a tweet ID to the text and images of a whole thread."
tags: ["Twitter", "API", "GraphQL", "Reverse Engineering", "TwtAPI"]
author: "William Salas"
---

I wrote a [thread unroller](/twitter-threads) and documented the fight to get there in [my last post](/blog/twitter-thread-unroller-2026). That post was the story. This one is the map.

Because the honest truth about building on Twitter's internal API is that you don't write a parser — you write a set of directions. "Go in through `data`, turn at `instructions`, if you see `TimelineAddEntries` keep going, if the tweet is wearing a `TweetWithVisibilityResults` coat, take it off." The directions work until Twitter repaints a wall, and then you're lost again.

So here is the complete path, written down. If you're building anything against a Twitter proxy service, this will save you the console-log archaeology I did.

## The envelope you actually get

Every response from a proxy like TwtAPI wraps the real payload in the same three fields:

```json
{ "code": 200, "msg": "success", "data": { /* Twitter's GraphQL, untouched */ } }
```

That `data` is the part that matters, and it is Twitter's raw internal GraphQL — the same thing the web client's own JavaScript receives. The proxy is a courier, not a translator. Every field name below is Twitter's, not TwtAPI's.

## First fork: which endpoint did you land on?

There are two endpoints and they return **different shapes**. Ask for the same tweet from each and you get two different navigation problems.

### Shape A — `TweetDetailv2`: shallow

```
data.tweetResult.result
```

Short path. The root tweet is right there. Under a proxy this shows up less often, and it's the easier sibling.

### Shape B — `TweetDetailConversationv2`: deep

This is the one that returns the *thread*, and it's the one you want:

```
data.timeline_response.instructions[]
```

An array of instructions — the same "instruction" abstraction Twitter uses for every timeline it renders. You're looking for the one that adds entries:

```typescript
const addEntries = instructions.find(
  (i) => i.__typename === 'TimelineAddEntries' || i.type === 'TimelineAddEntries'
);
```

Note what that line is doing. It checks **two different field names for the same information**, because the payload doesn't commit to either. Sometimes the discriminator is `__typename`, sometimes it's `type`. This is the first of many such fallbacks.

### Picking the root out of the entries

Each entry has an `entryId`. The root tweet is the one starting with `tweet-`:

```typescript
const rootEntry = entries.find((e) => e.entryId?.startsWith('tweet-'));
```

Then — and this is where it gets silly — that entry's inner content can live under either `content` or `itemContent`:

```typescript
const content = rootEntry?.content?.content || rootEntry?.content?.itemContent;
const tweetResult = content?.tweetResult?.result || content?.tweet_results?.result;
```

`tweetResult.result` or `tweet_results.result`. Singular or plural. Same object. Nobody knows why. The parser tries both and moves on.

### Picking out the replies

The rest of the thread isn't in more entries — it's inside a **module** entry:

```typescript
const threadModule = entries.find(
  (e) => e.content?.__typename === 'TimelineTimelineModule'
);
const replyItems = threadModule?.content?.items || [];
```

A `TimelineTimelineModule` is Twitter's "here's a cluster of related tweets" container. Its `items` are the replies, each nested three levels of `item` deep:

```
items[n].item.item.content.tweetResult.result
```

Yes, three nested properties all named `item`. You can't make this up.

## The coat: `TweetWithVisibilityResults`

Some tweets arrive wrapped:

```typescript
if (node.__typename === 'TweetWithVisibilityResults' && node.tweet) {
  return node.tweet; // the real tweet was inside one all along
}
```

Twitter wraps sensitive or restricted tweets in a container whose only job is to hold the tweet you asked for. You get a box with a tweet in it. Unwrap it, and check both the root and every reply — a reply can be wrapped while its parent isn't.

This is exactly what the `if (node?.tweet) return node.tweet` line is for, and every stage of this parser has a fallback like it. **The fallbacks are the real documentation** — each one is a scar from a payload that broke a previous version.

## Reading a tweet once you have the node

Two pools of information, `legacy` and `core`, plus a possible third:

| What you want | Where it lives |
| --- | --- |
| Text | `node.legacy.full_text` |
| Author ID (for filtering) | `node.legacy.user_id_str` |
| Author name / handle / avatar | `node.core.user_result.result.legacy` |
| Photos | `node.legacy.extended_entities.media` |
| Timestamp | `node.legacy.created_at` |

Watch that author path. `core` also uses the singular/plural flip from the envelope: `core.user_result` **or** `core.user_results`. Both exist in the wild.

Note also what `user_id_str` buys you: the conversation payload returns replies from *everyone*, not just the thread author. You filter the noise with:

```typescript
threadNodes.filter((node) => node.legacy?.user_id_str === authorId)
```

`user_id_str` (the string form) is the reliable field. The numeric id sits elsewhere.

## Photos: two homes, one URL, one lie

Media can be under **either** key:

```typescript
const mediaArr =
  node.legacy?.extended_entities?.media || node.legacy?.entities?.media || [];
```

`extended_entities` is where the full media objects live; `entities` sometimes carries a trimmed version. Take whichever exists, filter for `type === 'photo'`, and read `media_url_https`.

Three things about that URL worth writing down:

**It's format-locked.** `media_url_https` returns the URL with a default size. Append `?name=large` for the full-resolution render, or `?name=orig` for the original. If the string already has a query, chain with `&`.

**The text lies about it.** Photo tweets end with a `t.co` link pointing at the attached media. Render `full_text` as-is and every photo tweet shows a dead link underneath. Strip it:

```typescript
text.replace(/https:\/\/t\.co\/[a-zA-Z0-9]+$/, '').trim()
```

**Media order is the thread order.** The single most common mistake — and a mistake I shipped — is collecting every image into one flat array and rendering them as a gallery at the top of the article. It's less code and it's wrong: it destroys the relationship between a sentence and the screenshot it refers to. Build the article by walking the tweets in order and appending each one's text *and then* its media. Position is information.

## The field that isn't there: `note_tweet`

Long posts (the ones that extend past 280 characters) put their full text under a **different path**:

```
node.note_tweet.result.text
```

Read only `legacy.full_text` and long tweets arrive silently truncated — no error, just a shorter article, which is the worst kind of bug. Fall back to it:

```typescript
const text = node.note_tweet?.result?.text || node.legacy?.full_text || '';
```

Twitter generally keeps the head of a long tweet in `full_text` and the rest in `note_tweet`, so this is a real trap for anyone unrolling threads — the most interesting threads are the long ones.

## The failsafe you must keep

Here's the failure mode nobody warns you about. When Twitter renames a field, a parser like this **doesn't throw** — every access is optional-chained, so it just quietly returns nothing. You get an empty article and zero errors.

The only thing that catches it is a hard failure with a dump:

```typescript
if (!rootTweetNode) {
  console.error('FAILED TO FIND ROOT TWEET. RAW DATA:', JSON.stringify(rawData, null, 2));
  throw new Error('Root tweet not found in payload');
}
```

That console dump is how this entire map was written. When the shape shifts, you don't debug — you read the dump and add the next fallback.

## The thing worth internalizing

Every layer here exists because the payload was designed for Twitter's own client, which knows exactly which shape it asked for. Third parties get the same data without the contract. So the defensive code isn't scar tissue to be ashamed of — **it's the interface**. On an undocumented API, "try the three known shapes and throw loudly when none match" *is* correct engineering.

If you're building on one of these proxies, budget for a parser that reads like archaeology rather than one that reads like code. Then write the map down, because you'll need it again.

---

**Sources:**
- [TwtAPI — Documentation](https://www.twtapi.com/en/docs/)
- [The Verge — Twitter announces new API pricing](https://www.theverge.com/2023/3/30/23662832/twitter-api-tiers-free-bot-novelty-accounts-basic-enterprice-monthly-price)
- [TechCrunch — Twitterrific, Tweetbot hit by Twitter API restrictions](https://techcrunch.com/2023/01/19/twitterrific-tweetbot-app-store-removal-twitter-api/)
