"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

const icons: Record<string, React.ReactNode> = {
  lead: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  code: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  server: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  support: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <SectionWrapper id="experience" className="overflow-hidden">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-purple/30 to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={exp.key}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cosmic-800 border-2 border-accent-blue/50 flex items-center justify-center text-accent-blue z-10">
                  {icons[exp.icon]}
                </div>

                {/* Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="group p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-accent-blue/20 transition-all backdrop-blur-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {t(`roles.${exp.key}.title`)}
                        </h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-blue hover:text-accent-blue-light transition-colors text-sm"
                        >
                          {t(`roles.${exp.key}.company`)}
                        </a>
                      </div>
                      <span className="shrink-0 text-xs text-muted font-mono bg-cosmic-800 px-3 py-1 rounded-full">
                        {t(`roles.${exp.key}.period`)}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-muted leading-relaxed">
                      {t(`roles.${exp.key}.description`)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(t.raw(`roles.${exp.key}.tags`) as string[]).map(
                        (tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-mono text-accent-blue-light bg-accent-blue/10 rounded-full"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
