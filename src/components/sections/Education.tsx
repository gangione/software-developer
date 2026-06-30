"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const educationItems = ["uba", "udemy", "bachiller"] as const;
type EducationItem = (typeof educationItems)[number];

const linkedItems = new Set<EducationItem>(["uba", "udemy"]);

const itemStyles: Record<
  EducationItem,
  {
    marker: string;
    shell: string;
    icon: string;
    badge: string;
    size: string;
  }
> = {
  uba: {
    marker: "bg-accent-gold shadow-[0_0_24px_rgba(245,158,11,0.45)]",
    shell:
      "lg:row-span-2 border-accent-gold/30 bg-[linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,15,45,0.78)_42%,rgba(59,130,246,0.11))]",
    icon: "border-accent-gold/30 bg-accent-gold/10 text-accent-gold",
    badge: "border-accent-gold/30 bg-accent-gold/10 text-accent-gold-light",
    size: "p-6 sm:p-8",
  },
  udemy: {
    marker: "bg-accent-purple shadow-[0_0_20px_rgba(139,92,246,0.38)]",
    shell:
      "border-accent-purple/25 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),rgba(15,15,45,0.72))]",
    icon: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
    badge: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
    size: "p-6",
  },
  bachiller: {
    marker: "bg-muted/80",
    shell: "border-white/10 bg-surface/35 opacity-75",
    icon: "border-white/10 bg-white/5 text-muted",
    badge: "border-white/10 bg-white/5 text-muted",
    size: "p-5",
  },
};

function EducationIcon({ item }: { item: EducationItem }) {
  if (item === "uba") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 10v6" />
        <path d="M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
      </svg>
    );
  }

  if (item === "udemy") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export default function Education() {
  const t = useTranslations("education");

  return (
    <SectionWrapper id="education">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="relative mx-auto max-w-6xl">
        <div className="absolute left-5 top-8 bottom-8 hidden w-px bg-gradient-to-b from-accent-gold via-accent-purple to-white/10 md:block" />

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          {educationItems.map((item, index) => {
            const style = itemStyles[item];
            const isPrimary = item === "uba";
            const hasLink = linkedItems.has(item);

            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className={`hidden h-3 w-3 rounded-full md:block ${style.marker}`}
                    />
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${style.icon}`}
                    >
                      <EducationIcon item={item} />
                    </span>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] ${style.badge}`}
                  >
                    {t(`items.${item}.status`)}
                  </span>
                </div>

                <div className={isPrimary ? "mt-8" : "mt-5"}>
                  <p className="font-mono text-xs text-accent-blue-light">
                    {t(`items.${item}.period`)}
                  </p>
                  <h3
                    className={`mt-3 font-semibold leading-tight text-foreground ${
                      isPrimary ? "text-2xl sm:text-3xl" : "text-lg"
                    }`}
                  >
                    {t(`items.${item}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-accent-blue">
                    {t(`items.${item}.institution`)}
                  </p>
                  <p
                    className={`mt-4 leading-relaxed text-muted ${
                      isPrimary ? "text-base" : "text-sm"
                    }`}
                  >
                    {t(`items.${item}.description`)}
                  </p>
                </div>

                {hasLink && (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-gold-light transition-colors group-hover:text-accent-gold">
                    {t(`items.${item}.cta`)}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                )}
              </>
            );

            return (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`group relative rounded-lg border backdrop-blur-sm transition-all hover:-translate-y-1 ${style.shell} ${style.size}`}
              >
                {hasLink ? (
                  <a
                    href={t(`items.${item}.href`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
