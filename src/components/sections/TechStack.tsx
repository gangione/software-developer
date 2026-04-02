"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

export default function TechStack() {
  const t = useTranslations("techStack");

  return (
    <SectionWrapper id="tech-stack">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="group p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-accent-blue/20 transition-all backdrop-blur-sm"
          >
            <h3 className="text-sm font-mono uppercase tracking-wider text-accent-blue mb-4">
              {t(`categories.${category.key}`)}
            </h3>

            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: catIndex * 0.1 + skillIndex * 0.05,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/60" />
                  <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Category decoration */}
            <div className="mt-4 h-px bg-gradient-to-r from-accent-blue/20 to-transparent" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
