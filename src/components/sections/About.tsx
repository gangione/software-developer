"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = ["years", "projects", "roles"] as const;

const PROFILE_PHOTO = "/images/profile.png"; // Replace with "/images/profile.jpg" when available

export default function About() {
  const t = useTranslations("about");

  return (
    <SectionWrapper id="about">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Text content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="float-right ml-6 mb-4 hidden lg:block"
          >
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-accent-blue/5">
              {PROFILE_PHOTO ? (
                <Image
                  src={PROFILE_PHOTO}
                  alt="Gabriel Angione"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent-blue/20 via-accent-purple/20 to-accent-gold/20 flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                    GA
                  </span>
                </div>
              )}
            </div>
          </motion.div>

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
