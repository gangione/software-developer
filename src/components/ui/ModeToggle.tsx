"use client";

import { useTranslations } from "next-intl";
import { PortfolioMode, usePortfolioMode } from "@/components/ui/PortfolioModeProvider";

type ModeToggleProps = {
  className?: string;
};

export default function ModeToggle({ className = "" }: ModeToggleProps) {
  const t = useTranslations("shell.toggle");
  const { mode, setMode } = usePortfolioMode();

  const modes: PortfolioMode[] = ["visual", "shell"];

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-cosmic-900/70 p-1 shadow-lg shadow-cosmic-900/30 backdrop-blur-xl ${className}`}
      aria-label={t("label")}
    >
      {modes.map((item) => {
        const active = mode === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              active
                ? item === "shell"
                  ? "bg-accent-cyan/15 text-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.22)]"
                  : "bg-accent-blue/15 text-accent-blue-light"
                : "text-muted hover:text-foreground"
            }`}
            aria-pressed={active}
          >
            {t(item)}
          </button>
        );
      })}
    </div>
  );
}
