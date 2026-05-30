import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectDetails" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });

  return {
    title: tProjects("items.pampazon.title"),
    description: t("items.pampazon.headline"),
    openGraph: {
      title: tProjects("items.pampazon.title"),
      description: t("items.pampazon.headline"),
      type: "website",
    },
  };
}

export default async function PampazonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectDetails" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });

  const tags = tProjects.raw("items.pampazon.tags") as string[];
  const phases = t.raw("items.pampazon.phases") as {
    step: string;
    title: string;
    description: string;
  }[];
  const systemPoints = t.raw("items.pampazon.systemPoints") as string[];
  const useCases = t.raw("items.pampazon.useCases") as {
    actor: string;
    title: string;
    description: string;
  }[];
  const metrics = t.raw("items.pampazon.impact.metrics") as {
    value: string;
    label: string;
  }[];

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
            src="/images/projects/pampazon.png"
            alt="Pampazon"
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
              {tProjects("items.pampazon.title")}
            </h1>
            <p className="mt-2 text-muted/90 text-sm sm:text-base max-w-xl">
              {t("items.pampazon.headline")}
            </p>
          </div>
        </div>

        {/* Tech tags */}
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

        <div className="space-y-14">
          {/* Course context */}
          <section>
            <h2 className="font-mono uppercase tracking-wider text-sm text-accent-blue mb-4">
              {t("items.pampazon.courseContext.title")}
            </h2>
            <div className="rounded-2xl border border-white/5 bg-surface/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  "course",
                  "institution",
                  "group",
                  "semester",
                  "teamSize",
                  "professors",
                ] as const
              ).map((field) => (
                <div key={field}>
                  <div className="text-xs text-muted/60 font-mono uppercase mb-1">
                    {t(`items.pampazon.courseContext.${field}Label`)}
                  </div>
                  <div className="text-sm text-foreground">
                    {t(`items.pampazon.courseContext.${field}`)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Development process timeline */}
          <section>
            <h2 className="font-mono uppercase tracking-wider text-sm text-accent-blue mb-6">
              {t("items.pampazon.processTitle")}
            </h2>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-px bg-white/5 hidden sm:block" />
              <div className="space-y-6">
                {phases.map((phase) => (
                  <div key={phase.step} className="flex gap-4 sm:gap-6">
                    {/* step badge */}
                    <div className="shrink-0 w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center z-10">
                      <span className="text-[11px] font-mono font-bold text-accent-blue">
                        {phase.step}
                      </span>
                    </div>
                    {/* content */}
                    <div className="pt-2 pb-4 flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* System design highlights */}
          <section>
            <h2 className="font-mono uppercase tracking-wider text-sm text-accent-blue mb-4">
              {t("items.pampazon.systemTitle")}
            </h2>
            <ul className="space-y-3">
              {systemPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-blue/60 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="font-mono uppercase tracking-wider text-sm text-accent-blue mb-4">
              {t("items.pampazon.useCasesTitle")}
            </h2>
            <div className="space-y-3">
              {useCases.map((uc, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 bg-surface/50 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[11px] font-mono text-accent-purple bg-accent-purple/10 rounded-full border border-accent-purple/20">
                      {uc.actor}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">
                      {uc.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Outcome metrics */}
          <section>
            <h2 className="font-mono uppercase tracking-wider text-sm text-accent-blue mb-4">
              {t("items.pampazon.impact.title")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-surface/50 border border-white/5 text-center"
                >
                  <div className="text-base font-bold text-foreground mb-1">
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
          <a
            href="https://github.com/gangione/Pampazon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-muted hover:text-foreground hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {t("viewCode")}
          </a>
          <a
            href="/pampazon/EntregaFinal_GrupoA.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors text-sm font-medium"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t("downloadReport")}
          </a>
        </div>
      </div>
    </main>
  );
}
