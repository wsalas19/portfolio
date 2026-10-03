// Reads TWTAPI_KEY and spends paid quota on every call: must never reach the
// client bundle. `server-only` turns that mistake into a build failure instead
// of a silently broken fetch from the browser.
import 'server-only';

import { unstable_cache } from 'next/cache';
import { UnrolledThread, TweetDetailConversationResponse, TwtAPIRawResponse, TimelineInstruction, TimelineEntry, TweetNode, ThreadItem, TweetMedia } from '@/lib/twitter/types';
import crypto from 'crypto';

/**
 * Fetch with exponential backoff for rate limit handling
 */
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status === 429 && attempt < maxRetries - 1) {
      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }

    return response;
  }
  throw new Error('Rate limit exceeded after retries');
}

// A daily window, not a minute one: a minute window has no relationship to a
// monthly quota, so a loop could sustain any rate forever.
// ponytail: still per-process, so the real ceiling is instances x cap. Only a
// shared store would make it global — not worth a dependency at this traffic.
const TWTAPI_MAX_PER_DAY = Number(process.env.TWTAPI_DAILY_CAP ?? 10);
const TWTAPI_WINDOW_MS = 86_400_000;

// 30 days, not 24 hours. The Data Cache expires on the TTL, and the next request
// after expiry pays again — so a 24h TTL costs one call per thread PER DAY, and
// a single busy thread could eat 30 calls a month on its own.
const CACHE_TTL_SECONDS = 2_592_000;

/**
 * The thread itself is the problem — a bad ID, a deleted tweet, or a payload we
 * can't read. Callers turn this into a 404. Everything else thrown from here
 * (missing key, exhausted quota, TwtAPI 5xx, network) is operational and must
 * NOT be disguised as "this thread doesn't exist".
 */
export class ThreadUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ThreadUnavailableError';
  }
}

declare global {
  // eslint-disable-next-line no-var
  var twtapiBudget: { count: number; windowStart: number } | undefined;
}

function checkTwtApiBudget() {
  const now = Date.now();
  const state = (globalThis.twtapiBudget ??= { count: 0, windowStart: now });
  if (now - state.windowStart > TWTAPI_WINDOW_MS) {
    state.count = 0;
    state.windowStart = now;
  }
  if (++state.count > TWTAPI_MAX_PER_DAY) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
}

/**
 * Fetches and unrolls thread data using TwtAPI (www.twtapi.com).
 * Never call this directly — go through `fetchAndUnrollThread` below, which
 * memoizes it. Reaching the network without the memo is paying for nothing.
 */
async function fetchAndUnrollUncached(tweetId: string): Promise<UnrolledThread> {
  // Single choke point for every caller (page + any future route).
  if (!/^\d+$/.test(tweetId)) {
    throw new ThreadUnavailableError('Invalid tweet ID');
  }

  const apiKey = process.env.TWTAPI_KEY;
  // Hard-wired off in production: a stray DISABLE_CACHE on Vercel would turn
  // every single page view into a paid call.
  const disableCache =
    process.env.NODE_ENV !== 'production' && process.env.DISABLE_CACHE === 'true';

  if (!apiKey) {
    // Operational, not a missing thread: without the key nothing can be served,
    // so this must surface as a real error rather than a 404.
    console.error('TWTAPI_KEY is not configured — the thread viewer cannot fetch.');
    throw new Error('Thread service is not configured.');
  }

  // TwtAPI conversation endpoint (optimized for thread fetching)
  const apiUrl = `https://www.twtapi.com/api-proxy/api/v1/twitter/TweetDetailConversationv2?tweet_id=${tweetId}`;

  console.log('🔍 Fetching from TwtAPI:', {
    tweetId,
    apiUrl,
    cacheStatus: disableCache ? 'DISABLED (dev mode)' : 'ENABLED (30d)'
  });

  // Reached only on a cache miss now, because the memo above skips this whole
  // function on a hit — a visitor served from cache used to burn a unit anyway.
  checkTwtApiBudget();

  const response = await fetchWithRetry(
    apiUrl,
    {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      next: disableCache ? { revalidate: 0 } : { revalidate: CACHE_TTL_SECONDS },
    }
  );

  if (!response.ok) {
    // Only a genuine "no such tweet" is a 404. The rest are the service failing,
    // and collapsing them into a 404 is what hides an exhausted quota or a bad
    // key behind a "thread not found" page.
    if (response.status === 404) {
      throw new ThreadUnavailableError('Tweet not found upstream.');
    }
    if (response.status === 429) throw new Error('Rate limit exceeded. Please try again later.');
    if (response.status === 401) throw new Error('Invalid TwtAPI key.');
    if (response.status === 402) throw new Error('Insufficient TwtAPI balance.');
    throw new Error(`TwtAPI responded with status: ${response.status}`);
  }

  const rawData = await response.json() as TwtAPIRawResponse;
  console.log('📊 TwtAPI Response received:', {
    status: response.status,
    hasData: !!(rawData && typeof rawData === 'object' && 'data' in rawData),
    dataType: rawData && typeof rawData === 'object' ? rawData.constructor?.name : 'unknown'
  });

  // Parse the raw GraphQL structure into your component's UnrolledThread type
  return parseThreadToArticle(rawData);
}

/**
 * Public entry point. `unstable_cache` skips the body entirely on a hit, so a
 * cached thread costs no network call and no budget unit, and the
 * generateMetadata + page double-call collapses into one real fetch.
 */
export const fetchAndUnrollThread = unstable_cache(
  fetchAndUnrollUncached,
  ['twtapi-thread'],
  { revalidate: CACHE_TTL_SECONDS },
);

export function parseThreadToArticle(rawData: TwtAPIRawResponse): UnrolledThread {
  try {
    let rootTweetNode: TweetNode | null = null;
    let threadNodes: TweetNode[] = [];

    // ---------------------------------------------------------
    // SCENARIO A: Direct Tweet Format (TweetDetailv2 shape)
    // ---------------------------------------------------------
    if (rawData && typeof rawData === 'object' && 'data' in rawData) {
      const data = (rawData as TweetDetailConversationResponse).data;
      if (data?.tweetResult?.result) {
        rootTweetNode = data.tweetResult.result;
      }
      // ---------------------------------------------------------
      // SCENARIO B: Timeline Format (TweetDetailConversationv2 shape)
      // ---------------------------------------------------------
      else if (data?.timeline_response?.instructions) {
        const instructions = data.timeline_response.instructions;

        const addEntries = instructions.find((i: TimelineInstruction) =>
          i.__typename === 'TimelineAddEntries' || i.type === 'TimelineAddEntries'
        );

        const entries = addEntries?.entries || [];

        // Find the root entry (usually the first item starting with 'tweet-')
        const rootEntry = entries.find((e: TimelineEntry) => e.entryId?.startsWith('tweet-'));

        // Handle Twitter's inconsistent nesting (content vs itemContent)
        const content = rootEntry?.content?.content || rootEntry?.content?.itemContent;
        const tweetResult = content?.tweetResult?.result || content?.tweet_results?.result;
        rootTweetNode = tweetResult ?? null;

        // Extract Thread Replies
        const threadModule = entries.find((e: TimelineEntry) => e.content?.__typename === 'TimelineTimelineModule');
        const replyItems = threadModule?.content?.items || [];

        // Map replies, safely navigating the nested structure
        threadNodes = replyItems
          .map((item: ThreadItem) => {
            const itemContent = item.item?.item?.content || item.item?.content;
            const node = itemContent?.tweetResult?.result || itemContent?.tweet_results?.result;

            // Unwrap if nested in visibility results
            if (node?.__typename === 'TweetWithVisibilityResults' && node.tweet) {
              return node.tweet;
            }
            return node;
          })
          .filter((node): node is TweetNode => node !== null && node !== undefined);
      }
    }

    // ---------------------------------------------------------
    // UNWRAP ROOT TWEET (If hidden behind VisibilityResults)
    // ---------------------------------------------------------
    if (rootTweetNode?.__typename === 'TweetWithVisibilityResults') {
      rootTweetNode = rootTweetNode.tweet ?? null;
    }

    // ---------------------------------------------------------
    // FAIL-SAFE
    // ---------------------------------------------------------
    if (!rootTweetNode) {
      // Shape only, never content: tweet bodies are third-party personal data and
      // this lands in Vercel's logs. The old full dump contradicted /privacidad.
      console.error('🚨 FAILED TO FIND ROOT TWEET. Top-level keys:', {
        envelope: Object.keys(rawData ?? {}),
        data: Object.keys(rawData?.data ?? {}),
      });
      throw new ThreadUnavailableError('Root tweet not found in payload');
    }

    // ---------------------------------------------------------
    // EXTRACT DATA
    // ---------------------------------------------------------
    const authorData = rootTweetNode.core?.user_result?.result?.legacy || rootTweetNode.core?.user_results?.result?.legacy;
    const authorId = rootTweetNode.legacy?.user_id_str;

    // Filter replies to only include those from the original author
    const authorReplies = threadNodes.filter((node: TweetNode) => node.legacy?.user_id_str === authorId);

    const allTweets = [rootTweetNode, ...authorReplies];

    let markdownContent = '';
    const images: { url: string; alt: string }[] = [];

    allTweets.forEach((node, tweetIndex) => {
      let text = node.legacy?.full_text || '';

      // Clean up standalone t.co links that just point to attached media
      text = text.replace(/https:\/\/t\.co\/[a-zA-Z0-9]+$/, '').trim();

      if (text) {
        markdownContent += `${text}\n\n`;
      }

      // Each photo is emitted as inline Markdown directly under the text of the
      // tweet that attached it, to keep the thread's context: they used to be
      // flattened to the top of the article, which destroyed the ordering.
      const mediaArr = node.legacy?.extended_entities?.media || node.legacy?.entities?.media || [];
      const photos = mediaArr.filter(
        (media: TweetMedia) => media.type === 'photo' && media.media_url_https
      );

      photos.forEach((media: TweetMedia, photoIndex: number) => {
        const url = media.media_url_https as string;
        const alt =
          photos.length > 1
            ? `Image ${photoIndex + 1} from tweet ${tweetIndex + 1}`
            : `Image from tweet ${tweetIndex + 1}`;

        images.push({ url, alt });
        markdownContent += `![${alt}](${url})\n\n`;
      });
    });

    // ---------------------------------------------------------
    // FORMAT RETURN
    // ---------------------------------------------------------
    const firstLine = rootTweetNode.legacy?.full_text?.split('\n')[0] || 'Thread';
    const tweetId = rootTweetNode.rest_id || '';

    // Strip image markdown before trimming, otherwise a photo-first thread gets a
    // raw pbs.twimg.com URL as its meta description.
    const excerpt =
      markdownContent
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160) + '…';

    return {
      id: crypto.randomUUID(),
      tweetId,
      title: firstLine.substring(0, 60) + (firstLine.length > 60 ? '...' : ''),
      excerpt,
      author: {
        name: authorData?.name || 'Unknown',
        screen_name: authorData?.screen_name || 'unknown',
        avatar_url: authorData?.profile_image_url_https,
      },
      created_at: rootTweetNode.legacy?.created_at || new Date().toISOString(),
      markdownContent: markdownContent.trim(),
      images,
      estimatedReadTime: Math.max(1, Math.ceil(markdownContent.split(' ').length / 200)),
    };
  } catch (error) {
    console.error('Error parsing Twitter payload:', error);
    throw error;
  }
}
