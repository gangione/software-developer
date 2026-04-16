"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const NetworkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6" />
  </svg>
);

const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const CpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="9" y="9" width="6" height="6" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const cards = [
  { key: "systems", icon: <NetworkIcon />, accent: "text-accent-blue" },
  { key: "ddd", icon: <LayersIcon />, accent: "text-accent-purple" },
  { key: "ai", icon: <CpuIcon />, accent: "text-accent-cyan" },
  { key: "buildLearn", icon: <RocketIcon />, accent: "text-accent-gold" },
] as const;

export default function Thinking() {
  const t = useTranslations("thinking");

  return (
    <SectionWrapper id="thinking">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map(({ key, icon, accent }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-accent-blue/20 transition-all backdrop-blur-sm"
          >
            <div className={`mb-4 ${accent} opacity-80`}>{icon}</div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              {t(`items.${key}.title`)}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {t(`items.${key}.description`)}
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-accent-blue/20 to-transparent" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
