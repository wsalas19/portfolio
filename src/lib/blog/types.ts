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
  /** Date si el YAML lo escribe sin comillas; string si va entre comillas. */
  date: string | Date;
  excerpt: string;
  tags: string[];
  author: string;
}

export interface BlogPostMarkdown {
  frontmatter: BlogPostFrontmatter;
  content: string;
  slug: string;
}
