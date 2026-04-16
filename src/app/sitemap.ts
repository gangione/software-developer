import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gangione.dev";
  const locales = ["en", "es"];
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    });
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Blog posts (dynamic)
  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Project detail pages
  for (const locale of locales) {
    for (const project of projects) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
