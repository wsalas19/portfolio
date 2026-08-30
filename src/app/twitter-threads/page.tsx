'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';


const extractTweetId = (url: string): string | null => {
  const match = url.match(/(?:twitter\.com|x\.com)\/(?:#!\/)?\w+\/status\/(\d+)/);
  return match ? match[1] : null;
};

export default function TwitterThreadsPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!url) return;

      setIsLoading(true);
      try {
        const tweetId = extractTweetId(url);
        if (!tweetId) throw new Error('Invalid tweet URL format');

        // ✅ Solution B: Just route immediately. The loading state will be handled by Next.js
        router.push(`/twitter-threads/${tweetId}`);

      } catch (error) {
        toast({
          title: 'Error',
          variant:'destructive',
          description: error instanceof Error ? error.message : 'Something went wrong'
        });
        setIsLoading(false);
      }
    }

  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">
          X Thread Article Viewer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="https://x.com/username/status/1234567890"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="bg-transparent border-white/20 text-white placeholder:text-gray-500"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Convert to Article'}
          </Button>
        </form>
      </div>
    </main>
  );
}
