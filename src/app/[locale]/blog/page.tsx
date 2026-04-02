import { getLocale, getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/blog";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const posts = getBlogPosts(locale);

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {posts.length === 0 ? (
          <p className="text-center text-muted text-lg">{t("noPosts")}</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="block group p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-accent-blue/20 transition-all backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent-blue-light transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted font-mono">
                    {post.readingTime} {t("readTime")}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <span className="text-xs text-muted font-mono">
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono text-accent-cyan bg-accent-cyan/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
