"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const educationItems = ["uba", "bachiller", "udemy"] as const;

const educationIcons: Record<string, React.ReactNode> = {
  uba: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  ),
  bachiller: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  udemy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
};

export default function Education() {
  const t = useTranslations("education");

  return (
    <SectionWrapper id="education">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid md:grid-cols-3 gap-6">
        {educationItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-accent-gold/20 transition-all backdrop-blur-sm"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold mb-4">
              {educationIcons[item]}
            </div>

            {/* Status badge */}
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono text-accent-gold bg-accent-gold/10 rounded-full mb-3">
              {t(`items.${item}.status`)}
            </span>

            <h3 className="text-base font-semibold text-foreground leading-tight">
              {t(`items.${item}.title`)}
            </h3>

            <p className="mt-1 text-sm text-accent-blue">
              {t(`items.${item}.institution`)}
            </p>

            <p className="mt-1 text-xs text-muted font-mono">
              {t(`items.${item}.period`)}
            </p>

            <p className="mt-3 text-sm text-muted leading-relaxed">
              {t(`items.${item}.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
