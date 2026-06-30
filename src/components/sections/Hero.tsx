"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TypewriterText from "@/components/ui/TypewriterText";

const BrainCosmosBackground = dynamic(
  () => import("@/components/3d/BrainCosmosBackground"),
  { ssr: false }
);

type HeroTypewriterContentProps = {
  greetingText: string;
  nameText: string;
  role: string;
  firstLine: string;
  secondLine: string;
  summary: string;
  meta: string[];
  projectsLabel: string;
  contactLabel: string;
};

function HeroTypewriterContent({
  greetingText,
  nameText,
  role,
  firstLine,
  secondLine,
  summary,
  meta,
  projectsLabel,
  contactLabel,
}: HeroTypewriterContentProps) {
  const [greetingDone, setGreetingDone] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const onGreetingComplete = useCallback(() => setGreetingDone(true), []);
  const onNameComplete = useCallback(() => setNameDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55 }}
      className="relative flex max-w-3xl flex-col items-center"
    >
      <p className="font-mono text-sm uppercase tracking-widest text-accent-cyan drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] sm:text-base">
        <TypewriterText
          key={greetingText}
          text={greetingText}
          delay={300}
          speed={75}
          cursorClassName="bg-accent-cyan"
          showCursor={!greetingDone}
          onComplete={onGreetingComplete}
        />
      </p>

      <h1 className="mt-4 min-h-[1.05em] text-4xl font-bold leading-tight text-foreground drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl">
        {greetingDone && (
          <TypewriterText
            key={nameText}
            text={nameText}
            className="inline-flex whitespace-nowrap"
            speed={70}
            cursorClassName="bg-accent-blue-light"
            onComplete={onNameComplete}
          />
        )}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={nameDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="mt-4 font-mono text-sm uppercase tracking-[0.22em] text-accent-cyan drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-base"
      >
        {role}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={nameDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mt-6 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {firstLine}
        {secondLine && (
          <>
            <br />
            <span className="text-accent-blue-light">{secondLine}</span>
          </>
        )}
      </motion.h2>

      <div className="mt-8 h-px w-24 bg-accent-blue" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={nameDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mt-8 max-w-2xl text-lg leading-8 text-muted drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-xl"
      >
        {summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={nameDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mt-10 grid gap-4 font-mono text-sm text-muted drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
      >
        {meta.map((item) => (
          <div key={item} className="flex items-center justify-center gap-3">
            <span className="text-accent-cyan">~/</span>
            {item}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={nameDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.32 }}
        className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
      >
        <a
          href="#projects"
          className="group rounded-full border border-accent-blue/45 bg-accent-blue/10 px-8 py-3 text-center text-sm font-semibold text-accent-blue-light transition-all hover:border-accent-blue/70 hover:bg-accent-blue/20"
        >
          {projectsLabel}
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/10 bg-cosmic-900/45 px-8 py-3 text-center text-sm font-semibold text-muted backdrop-blur-md transition-all hover:border-accent-blue/35 hover:text-foreground"
        >
          {contactLabel}
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations("shell.hero");
  const hero = useTranslations("hero");
  const nav = useTranslations("nav");
  const greetingText = hero("greeting");
  const nameText = hero("name");
  const role = hero("role");
  const headline = t("headline");
  const heroMeta = t.raw("meta") as string[];
  const [firstLine, ...headlineRest] = headline.split("\n");
  const secondLine = headlineRest.join("\n");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16 text-foreground">
      <BrainCosmosBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cosmic-900/20 via-transparent" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-radial-[ellipse_at_center] from-cosmic-900/90 via-cosmic-900/40 to-transparent sm:-inset-12" />
        <HeroTypewriterContent
          key={`${greetingText}-${nameText}`}
          greetingText={greetingText}
          nameText={nameText}
          role={role}
          firstLine={firstLine}
          secondLine={secondLine}
          summary={t("summary")}
          meta={heroMeta}
          projectsLabel={nav("projects")}
          contactLabel={nav("contact")}
        />
      </div>
    </section>
  );
}
