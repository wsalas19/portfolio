import "server-only"; // usa fs: el contenido se lee en el servidor, no se bundlea.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogPostFrontmatter } from "./types";

const contentDirectory = path.join(process.cwd(), "content", "blog");

// Ensure content directory exists
if (!fs.existsSync(contentDirectory)) {
  fs.mkdirSync(contentDirectory, { recursive: true });
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.(md|mdx)$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as BlogPostFrontmatter;

    // Calculate reading time (average 200 words per minute)
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return {
      slug,
      title: frontmatter.title,
      // Normalizado a "YYYY-MM-DD" acá y no en cada consumidor: gray-matter
      // devuelve Date para `date: 2026-10-06` y string para `date: "2026-10-06"`,
      // y comparar un Date.toString() contra un ISO dejaba al post nuevo de
      // último. Como fecha de calendario, además, el string ordena igual que
      // cronológicamente.
      date: new Date(frontmatter.date).toISOString().slice(0, 10),
      excerpt: frontmatter.excerpt,
      content,
      tags: frontmatter.tags || [],
      author: frontmatter.author || "William Salas",
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    // Descendente: lo más reciente primero, sobre fechas ya normalizadas.
    .sort((a, b) => b.date.localeCompare(a.date));

  return posts;
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
