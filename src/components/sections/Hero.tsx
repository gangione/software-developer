"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TypewriterText from "@/components/ui/TypewriterText";

const BrainCosmosBackground = dynamic(
  () => import("@/components/3d/BrainCosmosBackground"),
  { ssr: false }
);

export default function Hero() {
  const t = useTranslations("hero");
  const [greetingDone, setGreetingDone] = useState(false);
  const [nameDone, setNameDone] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BrainCosmosBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-900/20 via-transparent pointer-events-none" />

      {/* Content — centered single column */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Dark backdrop for text readability */}
        <div className="absolute -inset-8 sm:-inset-12 rounded-3xl bg-radial-[ellipse_at_center] from-cosmic-900/90 via-cosmic-900/40 to-transparent pointer-events-none" />

        <p className="relative text-accent-blue font-mono text-sm sm:text-base tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          <TypewriterText
            text={t("greeting")}
            delay={400}
            speed={80}
            cursorClassName="bg-accent-blue"
            showCursor={!greetingDone}
            onComplete={() => setGreetingDone(true)}
          />
        </p>

        <h1 className="relative mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
          <span className="bg-gradient-to-r from-foreground via-accent-blue-light to-foreground bg-clip-text text-transparent">
            {greetingDone && (
              <TypewriterText
                text={t("name")}
                delay={0}
                speed={70}
                cursorClassName="bg-accent-blue-light"
                onComplete={() => setNameDone(true)}
              />
            )}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={nameDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mt-4 text-xl sm:text-2xl lg:text-3xl text-accent-gold font-light drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
        >
          {t("role")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={nameDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-6 max-w-2xl text-muted text-base sm:text-lg drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={nameDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group px-8 py-3 bg-accent-blue/10 border border-accent-blue/30 rounded-full text-accent-blue-light hover:bg-accent-blue/20 hover:border-accent-blue/50 transition-all text-sm font-medium"
          >
            {t("cta.projects")}
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-white/10 rounded-full text-muted hover:text-foreground hover:border-white/20 transition-all text-sm font-medium"
          >
            {t("cta.contact")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2 bg-accent-blue rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
