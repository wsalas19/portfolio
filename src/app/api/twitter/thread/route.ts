import { fetchAndUnrollThread } from '@/lib/twitter/parser';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tweetId = searchParams.get('tweetId');

  if (!tweetId) {
    return NextResponse.json({ error: 'tweetId is required' }, { status: 400 });
  }

  try {
    // Use the proper fetchAndUnrollThread function with error handling
    const articleData = await fetchAndUnrollThread(tweetId);

    return NextResponse.json(articleData);
  } catch (error) {
    console.error('Thread generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate article from thread' },
      { status: 500 }
    );
  }
}
