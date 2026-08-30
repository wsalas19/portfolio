import { UnrolledThread } from './types';

// Global cache that persists across hot reloads in development
// ponytail: in-memory cache, upgrade to Vercel KV for production persistence
declare global {
  // eslint-disable-next-line no-var
  var threadCache: Map<string, UnrolledThread> | undefined;
}

if (!globalThis.threadCache) {
  globalThis.threadCache = new Map<string, UnrolledThread>();
}

const cache = globalThis.threadCache;

export function get(id: string): UnrolledThread | undefined {
  return cache.get(id);
}

export function getByTweetId(tweetId: string): UnrolledThread | undefined {
  return Array.from(cache.values()).find(thread => thread.tweetId === tweetId);
}

export function set(thread: UnrolledThread): void {
  cache.set(thread.id, thread);
}
