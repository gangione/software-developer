"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16 text-center"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-accent-blue-light to-foreground bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="mt-4 text-muted text-lg">{subtitle}</p>
      <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent-blue to-transparent" />
    </motion.div>
  );
}
