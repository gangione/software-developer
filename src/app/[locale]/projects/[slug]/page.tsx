import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "projectDetails" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const headline = t(`items.${project.key}.headline`);
  const description = t(`items.${project.key}.solution.content`);

  return {
    title: tProjects(`items.${project.key}.title`),
    description: headline,
    openGraph: {
      title: tProjects(`items.${project.key}.title`),
      description,
      type: "website",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projectDetails" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const key = project.key;

  const architecturePoints = t.raw(`items.${key}.architecture.points`) as string[];
  const decisionPoints = t.raw(`items.${key}.decisions.points`) as string[];
  const impactMetrics = t.raw(`items.${key}.impact.metrics`) as {
    value: string;
    label: string;
  }[];
  const tags = tProjects.raw(`items.${key}.tags`) as string[];

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          {t("backToProjects")}
        </Link>

        {/* Hero */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-10">
          <Image
            src={project.image}
            alt={tProjects(`items.${key}.title`)}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900 via-cosmic-900/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="px-2.5 py-0.5 text-xs font-mono text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20 mb-3 inline-block">
              {t("caseStudy")}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {tProjects(`items.${key}.title`)}
            </h1>
            <p className="mt-2 text-muted/90 text-sm sm:text-base max-w-xl">
              {t(`items.${key}.headline`)}
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-12">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono text-accent-cyan bg-accent-cyan/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Case study sections */}
        <div className="space-y-12">
          {/* Problem */}
          <section>
            <h2 className="text-lg font-semibold text-accent-blue mb-3 font-mono uppercase tracking-wider text-sm">
              {t(`items.${key}.problem.title`)}
            </h2>
            <p className="text-muted leading-relaxed">
              {t(`items.${key}.problem.content`)}
            </p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-lg font-semibold text-accent-blue mb-3 font-mono uppercase tracking-wider text-sm">
              {t(`items.${key}.solution.title`)}
            </h2>
            <p className="text-muted leading-relaxed">
              {t(`items.${key}.solution.content`)}
            </p>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-lg font-semibold text-accent-blue mb-4 font-mono uppercase tracking-wider text-sm">
              {t(`items.${key}.architecture.title`)}
            </h2>
            <ul className="space-y-3">
              {architecturePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-blue/60 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* Key Decisions */}
          <section>
            <h2 className="text-lg font-semibold text-accent-blue mb-4 font-mono uppercase tracking-wider text-sm">
              {t(`items.${key}.decisions.title`)}
            </h2>
            <ul className="space-y-3">
              {decisionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-purple/60 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* Impact */}
          <section>
            <h2 className="text-lg font-semibold text-accent-blue mb-4 font-mono uppercase tracking-wider text-sm">
              {t(`items.${key}.impact.title`)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {impactMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-surface/50 border border-white/5 text-center"
                >
                  <div className="text-xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted leading-snug">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Links */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors text-sm font-medium"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {t("viewLive")}
            </a>
          )}
          {"github" in project && project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-muted hover:text-foreground hover:bg-white/10 transition-colors text-sm font-medium"
            >
              {t("viewCode")}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
