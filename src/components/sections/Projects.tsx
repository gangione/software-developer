"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";

// Visual config per stack position (0 = front/active, 1-3 = behind peeking right)
const STACK_SM = [
  { x: 0,  y: 0,  rotateY: 0,   scale: 1.00, opacity: 1.00, z: 40 },
  { x: 26, y: 12, rotateY: -5,  scale: 0.93, opacity: 0.85, z: 30 },
  { x: 48, y: 22, rotateY: -9,  scale: 0.86, opacity: 0.65, z: 20 },
  { x: 66, y: 30, rotateY: -12, scale: 0.79, opacity: 0.45, z: 10 },
];

// Larger offsets for md+ screens — cards peek further right
const STACK_MD = [
  { x: 0,   y: 0,  rotateY: 0,   scale: 1.00, opacity: 1.00, z: 40 },
  { x: 58,  y: 14, rotateY: -6,  scale: 0.93, opacity: 0.85, z: 30 },
  { x: 106, y: 26, rotateY: -10, scale: 0.86, opacity: 0.65, z: 20 },
  { x: 146, y: 36, rotateY: -13, scale: 0.79, opacity: 0.45, z: 10 },
];

export default function Projects() {
  const t = useTranslations("projects");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWide, setIsWide] = useState(false);
  const wheelAccum = useRef(0);
  const lastAdvanceTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const n = projects.length;
  const STACK = isWide ? STACK_MD : STACK_SM;

  // Track breakpoint for responsive stack offsets
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => {
      const now = Date.now();
      if (now - lastAdvanceTime.current < 380) return;
      lastAdvanceTime.current = now;
      wheelAccum.current = 0;
      setActiveIndex((prev) => (prev + dir + n) % n);
    },
    [n]
  );

  // Horizontal scroll wheel navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      wheelAccum.current += e.deltaX;
      if (Math.abs(wheelAccum.current) > 45) {
        advance(wheelAccum.current > 0 ? 1 : -1);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  return (
    <SectionWrapper id="projects">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div ref={containerRef} className="relative" style={{ perspective: "1000px" }}>
        {/* Stack container — fixed height, overflow visible so peeking cards show */}
        <div className="relative h-[480px] mx-auto max-w-xl md:max-w-2xl">
          {projects.map((project, index) => {
            const offset = (index - activeIndex + n) % n;
            const cfg = STACK[offset];
            const isActive = offset === 0;

            return (
              <motion.div
                key={project.key}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                whileDrag={{ scale: 1.03 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -450) advance(1);
                  else if (info.offset.x > 70 || info.velocity.x > 450) advance(-1);
                }}
                animate={{
                  x: cfg.x,
                  y: cfg.y,
                  rotateY: cfg.rotateY,
                  scale: cfg.scale,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                }}
                initial={false}
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 28 },
                  y: { type: "spring", stiffness: 280, damping: 28 },
                  rotateY: { type: "spring", stiffness: 280, damping: 28 },
                  scale: { type: "spring", stiffness: 280, damping: 28 },
                  opacity: { duration: 0.22 },
                  zIndex: { duration: 0.28, ease: "linear" },
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  transformOrigin: "center center",
                  cursor: isActive ? "grab" : "default",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                className="rounded-2xl bg-surface/95 border border-white/5 overflow-hidden shadow-2xl"
              >
                {/* Project image */}
                <div className="relative w-full h-44 overflow-hidden bg-cosmic-800/50 shrink-0">
                  <Image
                    src={project.image}
                    alt={t(`items.${project.key}.title`)}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 576px"
                    unoptimized={project.image.endsWith(".svg")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(`items.${project.key}.title`)}
                    </h3>
                    <div className="flex gap-2 shrink-0 flex-wrap justify-end">
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
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {t(`items.${project.key}.description`)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
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
                  <div className="flex items-center gap-4 pt-1">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-accent-blue hover:text-accent-blue-light transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => advance(-1)}
            className="p-2.5 rounded-full border border-white/10 bg-surface/60 hover:bg-surface hover:border-accent-blue/40 transition-all text-muted hover:text-foreground backdrop-blur-sm"
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-accent-blue"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => advance(1)}
            className="p-2.5 rounded-full border border-white/10 bg-surface/60 hover:bg-surface hover:border-accent-blue/40 transition-all text-muted hover:text-foreground backdrop-blur-sm"
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-muted/40 mt-3">
          {t("dragHint")}
        </p>
      </div>
    </SectionWrapper>
  );
}
