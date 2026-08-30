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

// ponytail: per-process budget on paid TwtAPI calls; blunts a single hammering
// instance. Cross-instance capping needs Vercel KV — add when the page stops deduping.
const TWTAPI_MAX_PER_WINDOW = 20;
const TWTAPI_WINDOW_MS = 60_000;

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
  if (++state.count > TWTAPI_MAX_PER_WINDOW) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
}

/**
 * Fetches and unrolls thread data using TwtAPI (www.twtapi.com)
 */
export async function fetchAndUnrollThread(tweetId: string): Promise<UnrolledThread> {
  // Single choke point for every caller (page + any future route).
  if (!/^\d+$/.test(tweetId)) {
    throw new Error('Invalid tweet ID');
  }

  const apiKey = process.env.TWTAPI_KEY;
  const disableCache = process.env.DISABLE_CACHE === 'true';

  if (!apiKey) {
    throw new Error('TWTAPI_KEY environment variable is not configured.');
  }

  // TwtAPI conversation endpoint (optimized for thread fetching)
  const apiUrl = `https://www.twtapi.com/api-proxy/api/v1/twitter/TweetDetailConversationv2?tweet_id=${tweetId}`;

  console.log('🔍 Fetching from TwtAPI:', {
    tweetId,
    apiUrl,
    cacheStatus: disableCache ? 'DISABLED (dev mode)' : 'ENABLED (24h)'
  });

  // Disable caching during development
  checkTwtApiBudget();

  const response = await fetchWithRetry(
    apiUrl,
    {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      next: disableCache ? { revalidate: 0 } : { revalidate: 86400 },
    }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (response.status === 401) {
      throw new Error('Invalid TwtAPI key.');
    }
    if (response.status === 402) {
      throw new Error('Insufficient TwtAPI balance.');
    }
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
      console.error('🚨 FAILED TO FIND ROOT TWEET. RAW DATA DUMP:', JSON.stringify(rawData?.data || rawData, null, 2));
      throw new Error('Root tweet not found in payload (Check console for raw data dump)');
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

    allTweets.forEach((node) => {
      let text = node.legacy?.full_text || '';

      // Clean up standalone t.co links that just point to attached media
      text = text.replace(/https:\/\/t\.co\/[a-zA-Z0-9]+$/, '').trim();

      if (text) {
        markdownContent += `${text}\n\n`;
      }

      // Extract media
      const mediaArr = node.legacy?.extended_entities?.media || node.legacy?.entities?.media || [];
      mediaArr.forEach((media: TweetMedia) => {
        if (media.type === 'photo' && media.media_url_https) {
          images.push({
            url: media.media_url_https,
            alt: 'Tweet image',
          });
        }
      });
    });

    // ---------------------------------------------------------
    // FORMAT RETURN
    // ---------------------------------------------------------
    const firstLine = rootTweetNode.legacy?.full_text?.split('\n')[0] || 'Thread';
    const tweetId = rootTweetNode.rest_id || '';

    // Generate excerpt from markdown content
    const excerpt = markdownContent.trim().substring(0, 160).replace(/\n/g, ' ') + '...';

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
