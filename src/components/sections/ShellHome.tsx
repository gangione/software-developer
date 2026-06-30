"use client";

import {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import BrainCosmosBackground from "@/components/3d/BrainCosmosBackground";
import TypewriterText from "@/components/ui/TypewriterText";
import { usePortfolioMode } from "@/components/ui/PortfolioModeProvider";

type ShellCommandId =
  | "help"
  | "aboutMe"
  | "projects"
  | "stack"
  | "experience"
  | "education"
  | "contact"
  | "cv"
  | "gui";

type ShellEntry = {
  id: string;
  command: string;
  lines: ShellOutputLine[];
};

type ShellOutputLine = {
  text: string;
  href?: string;
  command?: string;
  download?: string;
};

type CommandCard = {
  id: ShellCommandId;
  command: string;
  icon: "user" | "projects" | "stack" | "experience" | "education" | "contact";
};

const prompt = "gabriel@gangione.dev:~$";
const cvHref = "/Gabriel_Angione_CV_2026.pdf";

const shellLineLinks: Partial<Record<ShellCommandId, string[]>> = {
  experience: [
    "https://tecsolutions.com.ar/",
    "https://tecsolutions.com.ar/",
    "https://cauciones.com/",
  ],
  education: [
    "https://economicas.uba.ar/alumnos/sistemas/",
    "https://www.udemy.com/certificate/UC-3fb6e2d1-82ba-4d7b-88bd-c983d7c5e3c5/",
  ],
  contact: [
    "mailto:angionegabriel87@gmail.com",
    "https://github.com/gangione",
    "https://www.linkedin.com/in/gabriel-angione/",
  ],
};

function getShellLineLinks(locale: string): Partial<Record<ShellCommandId, string[]>> {
  return {
    ...shellLineLinks,
    projects: [
      `/${locale}/projects/track-signe`,
      `/${locale}/projects/ggm-fitness`,
      `/${locale}/projects/cauciones-digital`,
      `/${locale}/projects/pampazon`,
    ],
  };
}

const commandCards: CommandCard[] = [
  { id: "aboutMe", command: "/about-me", icon: "user" },
  { id: "projects", command: "/projects", icon: "projects" },
  { id: "stack", command: "/stack", icon: "stack" },
  { id: "experience", command: "/experience", icon: "experience" },
  { id: "education", command: "/education", icon: "education" },
  { id: "contact", command: "/contact", icon: "contact" },
];

const commandAliases: Record<string, ShellCommandId | "clear"> = {
  help: "help",
  "/help": "help",
  "/about": "aboutMe",
  "/about-me": "aboutMe",
  about: "aboutMe",
  "/projects": "projects",
  projects: "projects",
  "/stack": "stack",
  "/tech-stack": "stack",
  stack: "stack",
  "/experience": "experience",
  experience: "experience",
  "/education": "education",
  education: "education",
  "/contact": "contact",
  contact: "contact",
  "/cv": "cv",
  cv: "cv",
  "/gui": "gui",
  gui: "gui",
  clear: "clear",
  "/clear": "clear",
};

function commandToKey(commandId: ShellCommandId) {
  return commandId === "aboutMe" ? "aboutMe" : commandId;
}

function toShellOutputLines(
  commandId: ShellCommandId,
  rawLines: string[],
  lineLinks: Partial<Record<ShellCommandId, string[]>>,
): ShellOutputLine[] {
  if (commandId === "help") {
    return rawLines.map((text) => {
      const command = text.trim().match(/^\/[a-z-]+/)?.[0];
      return command ? { text, command } : { text };
    });
  }

  if (commandId === "cv") {
    return rawLines.map((text) => ({
      text,
      href: cvHref,
      download: "Gabriel_Angione_CV_2026.pdf",
    }));
  }

  const links = lineLinks[commandId];
  if (!links) {
    return rawLines.map((text) => ({ text }));
  }

  let linkedIndex = 0;
  return rawLines.map((text) => {
    if (!text.trim().startsWith(">")) {
      return { text };
    }

    const href = links[linkedIndex];
    linkedIndex += 1;
    return href ? { text, href } : { text };
  });
}

function ShellIcon({ icon }: { icon: CommandCard["icon"] }) {
  if (icon === "user") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }

  if (icon === "projects") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 8h.01M11 8h.01M15 8h2M7 12h5M7 15h9" />
      </svg>
    );
  }

  if (icon === "stack") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8 18-6-6 6-6" />
        <path d="m16 6 6 6-6 6" />
        <path d="m14 4-4 16" />
      </svg>
    );
  }

  if (icon === "experience") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    );
  }

  if (icon === "education") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c2 2 10 2 12 0v-5" />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

type ShellIdentityPanelProps = {
  greetingText: string;
  nameText: string;
  role: string;
  headline: string;
  summary: string;
  meta: string[];
};

function ShellIdentityPanel({
  greetingText,
  nameText,
  role,
  headline,
  summary,
  meta,
}: ShellIdentityPanelProps) {
  const [greetingDone, setGreetingDone] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const onGreetingComplete = useCallback(() => setGreetingDone(true), []);
  const onNameComplete = useCallback(() => setNameDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-w-0 lg:pt-8 xl:pt-10"
    >
      <div className="absolute -left-5 top-0 hidden h-7 w-7 border-l border-t border-accent-blue/45 lg:block" />

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

      <h1 className="mt-4 min-h-[1.05em] text-4xl font-bold leading-tight text-foreground drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] sm:text-5xl 2xl:text-6xl">
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
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mt-7 max-w-xl whitespace-pre-line text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {headline}
      </motion.h2>
      <div className="mt-7 h-px w-20 bg-accent-blue" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={nameDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="mt-8 max-w-lg text-lg leading-8 text-muted drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
      >
        {summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={nameDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.22 }}
        className="mt-10 grid gap-4 font-mono text-sm text-muted drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
      >
        {meta.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="text-accent-cyan">~/</span>
            {item}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function ShellHome() {
  const t = useTranslations("shell");
  const locale = useLocale();
  const hero = useTranslations("hero");
  const { setMode } = usePortfolioMode();
  const greetingText = hero("greeting");
  const nameText = hero("name");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineLinks = useMemo(() => getShellLineLinks(locale), [locale]);
  const initialEntries = useMemo<ShellEntry[]>(
    () => [
      {
        id: "initial-help",
        command: "/help",
        lines: toShellOutputLines(
          "help",
          t.raw("commands.help.output") as string[],
          lineLinks,
        ),
      },
      {
        id: "initial-projects",
        command: "/projects",
        lines: toShellOutputLines(
          "projects",
          t.raw("commands.projects.output") as string[],
          lineLinks,
        ),
      },
    ],
    [lineLinks, t]
  );
  const [entries, setEntries] = useState<ShellEntry[]>(initialEntries);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries]);

  const getOutput = useCallback(
    (commandId: ShellCommandId) => {
      return toShellOutputLines(
        commandId,
        t.raw(`commands.${commandToKey(commandId)}.output`) as string[],
        lineLinks,
      );
    },
    [lineLinks, t]
  );

  const runCommand = useCallback((rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    const normalized = command.toLowerCase();
    const commandId = commandAliases[normalized];
    setCommandHistory((current) => [...current, command]);
    setHistoryIndex(null);
    setInput("");

    if (commandId === "clear") {
      setEntries([]);
      return;
    }

    if (!commandId) {
      setEntries((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          command,
          lines: [{ text: t("errors.unknown", { command }) }],
        },
      ]);
      return;
    }

    setEntries((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        command,
        lines: getOutput(commandId),
      },
    ]);

    if (commandId === "cv") {
      const link = document.createElement("a");
      link.href = cvHref;
      link.download = "Gabriel_Angione_CV_2026.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    if (commandId === "gui") {
      window.setTimeout(() => setMode("visual"), 350);
    }
  }, [getOutput, setMode, t]);

  useEffect(() => {
    function onShellCommand(event: Event) {
      const command = (event as CustomEvent<string>).detail;
      if (typeof command === "string") {
        runCommand(command);
      }
    }

    window.addEventListener("portfolio-shell-command", onShellCommand);
    return () => {
      window.removeEventListener("portfolio-shell-command", onShellCommand);
    };
  }, [runCommand]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  function recallHistory(direction: "up" | "down") {
    if (commandHistory.length === 0) return;

    if (direction === "up") {
      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] ?? "");
      return;
    }

    if (historyIndex === null) return;

    const nextIndex = historyIndex + 1;
    if (nextIndex >= commandHistory.length) {
      setHistoryIndex(null);
      setInput("");
      return;
    }

    setHistoryIndex(nextIndex);
    setInput(commandHistory[nextIndex] ?? "");
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      recallHistory("up");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      recallHistory("down");
    }
  }

  function renderOutputLine(line: ShellOutputLine, index: number) {
    const className = `block w-full break-words text-left transition-colors ${
      line.text.startsWith(">") ? "text-accent-blue-light" : ""
    } ${
      line.href || line.command
        ? "cursor-pointer hover:text-accent-cyan hover:underline hover:underline-offset-4"
        : ""
    }`;

    if (line.command) {
      return (
        <button
          key={index}
          type="button"
          onClick={() => runCommand(line.command ?? "")}
          className={className}
        >
          {line.text}
        </button>
      );
    }

    if (line.href) {
      const isExternal = line.href.startsWith("http");
      return (
        <a
          key={index}
          href={line.href}
          download={line.download}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={className}
        >
          {line.text}
        </a>
      );
    }

    return (
      <p key={index} className={className}>
        {line.text}
      </p>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-16 text-foreground">
      <BrainCosmosBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cosmic-900/20 via-transparent" />

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col">
        <main className="mx-auto flex w-full min-w-0 max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid min-w-0 flex-1 items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <ShellIdentityPanel
              key={`${greetingText}-${nameText}`}
              greetingText={greetingText}
              nameText={nameText}
              role={hero("role")}
              headline={t("hero.headline")}
              summary={t("hero.summary")}
              meta={t.raw("hero.meta") as string[]}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="min-w-0 rounded-xl border border-accent-blue/55 bg-cosmic-900/95 shadow-2xl shadow-accent-blue/10 backdrop-blur-xl"
            >
              <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-accent-blue-light" />
                  <span className="h-3 w-3 rounded-full bg-accent-cyan" />
                  <span className="h-3 w-3 rounded-full border border-accent-blue/70" />
                </div>
                <p className="font-mono text-xs text-muted sm:text-sm">
                  gabriel@gangione.dev: ~
                </p>
                <span className="h-px w-5 bg-accent-cyan" />
              </div>

              <div
                ref={terminalRef}
                className="h-[420px] min-w-0 overflow-y-auto px-4 py-5 font-mono text-xs leading-6 text-foreground [overflow-wrap:anywhere] sm:px-6 sm:text-sm sm:leading-7"
                onClick={() => inputRef.current?.focus()}
              >
                {entries.map((entry) => (
                  <div key={entry.id} className="mb-5 min-w-0">
                    <p className="break-words">
                      <span className="text-accent-cyan">{prompt}</span>{" "}
                      <span className="text-accent-blue-light">{entry.command}</span>
                    </p>
                    <div className="mt-1 min-w-0 text-muted">
                      {entry.lines.map((line, index) =>
                        renderOutputLine(line, index),
                      )}
                    </div>
                  </div>
                ))}

                <form onSubmit={onSubmit} className="flex min-w-0 items-center gap-2">
                  <label htmlFor="shell-command" className="shrink-0 text-accent-cyan">
                    <span className="hidden sm:inline">{prompt}</span>
                    <span className="sm:hidden">gabriel:~$</span>
                  </label>
                  <input
                    id="shell-command"
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={onInputKeyDown}
                    className="min-w-0 flex-1 bg-transparent text-accent-blue-light caret-accent-cyan outline-none"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label={t("inputLabel")}
                  />
                </form>
              </div>
            </motion.div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-3 font-mono text-sm text-muted">
            <span className="rounded border border-accent-blue/50 px-2 py-1 text-accent-cyan">
              &gt;_
            </span>
            {t("hint")}
          </p>

          <div className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {commandCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => runCommand(card.command)}
                className="group min-w-0 rounded-lg border border-white/10 bg-surface/55 p-5 text-left shadow-xl shadow-cosmic-900/20 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent-blue/45 hover:bg-surface"
              >
                <span className="text-accent-cyan">
                  <ShellIcon icon={card.icon} />
                </span>
                <span className="mt-5 block font-mono text-base font-semibold text-foreground">
                  {card.command}
                </span>
                <span className="mt-3 block text-sm leading-6 text-muted">
                  {t(`cards.${commandToKey(card.id)}.description`)}
                </span>
              </button>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
