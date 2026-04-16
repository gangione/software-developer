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
