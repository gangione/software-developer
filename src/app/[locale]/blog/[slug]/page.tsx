import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const locales = ["en", "es"];
  const params: { slug: string }[] = [];

  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    posts.forEach((post) => {
      params.push({ slug: post.slug });
    });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getBlogPost(locale, slug);

  if (!post) notFound();

  return (
    <article className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted">
            <time className="font-mono">
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span className="font-mono">{post.readingTime} min read</span>
          </div>
          <div className="mt-4 flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-mono text-accent-cyan bg-accent-cyan/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
        </header>

        <div className="prose prose-invert prose-blue max-w-none prose-headings:text-foreground prose-p:text-muted prose-a:text-accent-blue prose-code:text-accent-cyan prose-strong:text-foreground">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
