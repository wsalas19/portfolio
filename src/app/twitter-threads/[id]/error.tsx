'use client';

import Link from 'next/link';

// Boundary for the thread route. Without it an operational failure (TwtAPI down,
// quota exhausted, key missing) surfaced as a blank crash instead of something a
// visitor can act on.
export default function ThreadError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#121212] px-4 py-20 text-white">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold">We couldn&apos;t unroll that thread</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          The service we read threads from is busy or unreachable. This is usually
          temporary — try again in a moment.
        </p>
        <p className="mt-3 text-xs text-gray-600" role="status">
          {error.message}
          {error.digest ? ` · ${error.digest}` : ''}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-lime-300"
          >
            Try again
          </button>
          <Link
            href="/twitter-threads"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-gray-300 transition-colors hover:border-white/30 hover:text-white"
          >
            Back to the tool
          </Link>
        </div>
      </div>
    </main>
  );
}
