import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchAndUnrollThread } from '@/lib/twitter/parser';
import { ThreadArticle } from '@/components/twitter/ThreadArticle';

type PageProps = {
  params: Promise<{ id: string }>;
};

// Fetch function that can be used by both metadata and page
async function getThreadData(tweetId: string) {
  try {
    console.log('🔍 Fetching thread data:', { tweetId });
    return await fetchAndUnrollThread(tweetId);
  } catch (error) {
    console.error('❌ Failed to fetch thread:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const thread = await getThreadData(id);

  if (!thread) return { title: 'Thread Not Found' };

  return {
    title: `${thread.title} — @${thread.author.screen_name}`,
    description: thread.markdownContent.substring(0, 150),
    openGraph: {
      title: thread.title,
      description: thread.markdownContent.substring(0, 150),
      type: 'article',
    },
  };
}

export default async function ThreadPage({ params }: PageProps) {
  const { id } = await params;

  console.log('🔍 Thread Page Loading:', { id });

  // ✅ Fetch data securely on the server
  const thread = await getThreadData(id);

  if (!thread) {
    console.log('❌ Thread not found or failed to parse');
    notFound();
  }

  console.log('✅ Rendering thread article:', {
    title: thread.title,
    author: thread.author.name,
    markdownLength: thread.markdownContent.length
  });

  return <ThreadArticle thread={thread} />;
}
