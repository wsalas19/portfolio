import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { cache } from 'react';
import { fetchAndUnrollThread, ThreadUnavailableError } from '@/lib/twitter/parser';
import { ThreadArticle } from '@/components/twitter/ThreadArticle';

type PageProps = {
  params: Promise<{ id: string }>;
};

// React's cache() memoizes per request. generateMetadata and the page render
// concurrently and each used to miss the data cache independently, so every cold
// thread cost TWO paid TwtAPI calls. This collapses them into one.
const getThreadData = cache(async (tweetId: string) => fetchAndUnrollThread(tweetId));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const thread = await getThreadData(id);
    // thread.excerpt already has the image markdown stripped, so a photo-first
    // thread doesn't get a pbs.twimg.com URL as its description.
    return {
      title: `${thread.title} — @${thread.author.screen_name}`,
      description: thread.excerpt,
      openGraph: {
        title: thread.title,
        description: thread.excerpt,
        type: 'article',
      },
    };
  } catch (error) {
    // Metadata must never be the reason a page fails to render: the error
    // boundary below handles the body, so degrade to a generic title here.
    console.error('Thread metadata failed:', error);
    return { title: 'X Thread Unrolled' };
  }
}

export default async function ThreadPage({ params }: PageProps) {
  const { id } = await params;

  let thread;
  try {
    thread = await getThreadData(id);
  } catch (error) {
    // A missing thread is a 404. Anything else (quota, bad key, TwtAPI down) is
    // rethrown so error.tsx can say so honestly instead of a fake "not found".
    if (error instanceof ThreadUnavailableError) notFound();
    throw error;
  }

  return <ThreadArticle thread={thread} />;
}
