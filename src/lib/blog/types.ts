export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  readingTime: number;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
}

export interface BlogPostMarkdown {
  frontmatter: BlogPostFrontmatter;
  content: string;
  slug: string;
}
