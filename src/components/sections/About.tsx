"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = ["years", "projects", "roles"] as const;

export default function About() {
  const t = useTranslations("about");
  const [flipAngle, setFlipAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipAngle((prev) => prev + 180);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionWrapper id="about">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Text content */}
        <div className="lg:col-span-3 space-y-6 p-6 rounded-2xl bg-surface/50 border border-white/5 backdrop-blur-sm">
          {/* Profile photo — coin flip between caricature and real photo */}
          <div
            className="flex justify-center mb-6 lg:float-right lg:ml-6 lg:mb-4"
            style={{ perspective: 900 }}
          >
            <motion.div
              animate={{ rotateY: flipAngle }}
              transition={{
                duration: 1.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-32 h-32 lg:w-40 lg:h-40"
            >
              {/* Front face — caricature */}
              <Image
                src="/images/profile.png"
                alt="Gabriel Angione"
                fill
                sizes="160px"
                className="object-contain"
                style={{
                  backfaceVisibility: "hidden",
                  filter:
                    "drop-shadow(0 0 14px rgba(59,130,246,0.45)) drop-shadow(0 0 5px rgba(139,92,246,0.3))",
                }}
                priority
              />
              {/* Back face — avatar */}
              <Image
                src="/images/avatar.png"
                alt="Gabriel Angione"
                fill
                sizes="160px"
                className="object-contain"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  filter:
                    "drop-shadow(0 0 14px rgba(59,130,246,0.45)) drop-shadow(0 0 5px rgba(139,92,246,0.3))",
                }}
              />
            </motion.div>
          </div>

          {(["p1", "p2", "p3", "p4"] as const).map((key, i) => (
            <motion.p
              key={key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-muted leading-relaxed"
            >
              {t(key)}
            </motion.p>
          ))}

          <motion.a
            href="/Gabriel_Angione_CV_2026.pdf"
            download
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="group inline-flex items-center gap-3 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-5 py-3 text-sm font-medium text-accent-blue-light transition-all hover:border-accent-blue/60 hover:bg-accent-blue/20 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-background"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-blue/15 text-accent-blue-light transition-transform group-hover:-translate-y-0.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5 5 5-5" />
                <path d="M12 15V3" />
              </svg>
            </span>
            {t("downloadCv")}
          </motion.a>
        </div>

        {/* Stats sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-surface/50 border border-white/5 backdrop-blur-sm"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                {t(`highlight.${stat}`)}
              </div>
              <div className="mt-1 text-sm text-muted">
                {t(`highlight.${stat}Label`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
