"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolioMode } from "./PortfolioModeProvider";

const commandIds = [
  "about",
  "thinking",
  "experience",
  "projects",
  "techStack",
  "education",
  "contact",
  "downloadCv",
] as const;

type CommandId = (typeof commandIds)[number];

const sectionTargets: Partial<Record<CommandId, string>> = {
  about: "about",
  thinking: "thinking",
  experience: "experience",
  projects: "projects",
  techStack: "tech-stack",
  education: "education",
  contact: "contact",
};

const shellCommands: Partial<Record<CommandId, string>> = {
  about: "/about-me",
  thinking: "help",
  experience: "/experience",
  projects: "/projects",
  techStack: "/stack",
  education: "/education",
  contact: "/contact",
};

const cvHref = "/Gabriel_Angione_CV_2026.pdf";

function isEscapeKey(event: Pick<KeyboardEvent, "key" | "code" | "keyCode">) {
  return (
    event.key === "Escape" ||
    event.key === "Esc" ||
    event.code === "Escape" ||
    event.keyCode === 27
  );
}

type CommandPaletteProps = {
  shortcutMedia?: string;
};

export default function CommandPalette({ shortcutMedia }: CommandPaletteProps) {
  const t = useTranslations("commandPalette");
  const locale = useLocale();
  const { mode } = usePortfolioMode();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const openPalette = useCallback(() => {
    setOpen(true);
    setActiveIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const commands = useMemo(
    () =>
      commandIds.map((id) => ({
        id,
        label: t(`commands.${id}.label`),
        description: t(`commands.${id}.description`),
      })),
    [t]
  );

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) => {
      const searchable = `${command.label} ${command.description}`.toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (shortcutMedia && !window.matchMedia(shortcutMedia).matches) {
          return;
        }
        event.preventDefault();
        if (open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePalette, open, openPalette, shortcutMedia]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        closePalette();
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [closePalette, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (isEscapeKey(event)) {
        closePalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyDown);
    };
  }, [closePalette, open]);

  function executeCommand(commandId: CommandId) {
    closePalette();

    if (commandId === "downloadCv") {
      const link = document.createElement("a");
      link.href = cvHref;
      link.download = "Gabriel_Angione_CV_2026.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    if (mode === "shell") {
      const shellCommand = shellCommands[commandId];
      if (shellCommand) {
        window.dispatchEvent(
          new CustomEvent("portfolio-shell-command", { detail: shellCommand }),
        );
      }
      return;
    }

    const target = sectionTargets[commandId];
    if (!target) {
      return;
    }

    const localeHome = `/${locale}`;
    const currentPath = window.location.pathname.replace(/\/$/, "");

    if (currentPath !== localeHome) {
      window.location.assign(`${localeHome}/#${target}`);
      return;
    }

    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${target}`);
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (isEscapeKey(event.nativeEvent)) {
      closePalette();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (filteredCommands.length === 0) {
        return;
      }
      setActiveIndex((current) =>
        Math.min(current + 1, filteredCommands.length - 1)
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (filteredCommands.length === 0) {
        return;
      }
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter" && filteredCommands[activeIndex]) {
      event.preventDefault();
      executeCommand(filteredCommands[activeIndex].id);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-cosmic-900/55 px-3 text-xs text-muted shadow-lg shadow-cosmic-900/25 backdrop-blur-xl transition-all hover:border-accent-blue/40 hover:bg-accent-blue/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
        aria-label={t("triggerLabel")}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m18 16 4-4-4-4" />
          <path d="m6 8-4 4 4 4" />
          <path d="m14.5 4-5 16" />
        </svg>
        <span className="hidden 2xl:inline">{t("triggerLabel")}</span>
        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted 2xl:inline">
          {t("shortcut")}
        </kbd>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cosmic-900/75 px-4 py-24 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
            onPointerDownCapture={(event) => {
              if (!panelRef.current?.contains(event.target as Node)) {
                closePalette();
              }
            }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full cursor-default"
              aria-label={t("closeLabel")}
              onClick={closePalette}
            />
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative z-10 mx-auto max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-surface/95 shadow-2xl shadow-accent-blue/10"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-blue-light"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder={t("placeholder")}
                  className="h-10 min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted"
                />
                <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-muted">
                  Esc
                </kbd>
              </div>

              <div className="max-h-[56vh] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => (
                    <button
                      key={command.id}
                      type="button"
                      onClick={() => executeCommand(command.id)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left transition-colors ${
                        index === activeIndex
                          ? "bg-accent-blue/15 text-foreground"
                          : "text-muted hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-medium">
                          {command.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {command.description}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {command.id === "downloadCv" ? "PDF" : "#"}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-muted">
                    {t("noResults")}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
