"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";

export default function Projects() {
  const t = useTranslations("projects");

  return (
    <SectionWrapper id="projects">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <div className="h-full rounded-2xl bg-surface/50 border border-white/5 hover:border-accent-blue/20 transition-all backdrop-blur-sm hover:-translate-y-1 duration-300 overflow-hidden">
              {/* Project image */}
              <div className="relative w-full h-52 overflow-hidden bg-cosmic-800/50">
                <Image
                  src={project.image}
                  alt={t(`items.${project.key}.title`)}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={project.image.endsWith(".svg")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
              </div>

              <div className="p-6">
                {/* Header with badges */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-blue-light transition-colors">
                    {t(`items.${project.key}.title`)}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {"inDevelopment" in project && project.inDevelopment && (
                      <span className="px-2 py-0.5 text-[10px] font-mono text-accent-gold bg-accent-gold/10 rounded-full border border-accent-gold/20">
                        {t("inDevelopment")}
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-[10px] font-mono text-accent-purple bg-accent-purple/10 rounded-full">
                      {t(`items.${project.key}.role`)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {t(`items.${project.key}.description`)}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(t.raw(`items.${project.key}.tags`) as string[]).map(
                    (tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono text-accent-cyan bg-accent-cyan/10 rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                {/* Links */}
                <div className="mt-5 flex items-center gap-4">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent-blue hover:text-accent-blue-light transition-colors"
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
                      {t("viewProject")}
                    </a>
                  )}
                  {"github" in project && project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      {t("viewCode")}
                    </a>
                  )}
                  {project.featured && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-accent-purple hover:text-accent-purple/80 transition-colors ml-auto"
                    >
                      {t("viewCaseStudy")} →
                    </Link>
                  )}
                </div>
              </div>

              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
