"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import CommandPalette from "./CommandPalette";
import LanguageSwitcher from "./LanguageSwitcher";
import ModeToggle from "./ModeToggle";
import { usePortfolioMode } from "./PortfolioModeProvider";

const anchorItems = [
  { key: "about", href: "/#about", command: "/about-me" },
  { key: "thinking", href: "/#thinking", command: "help" },
  { key: "experience", href: "/#experience", command: "/experience" },
  { key: "projects", href: "/#projects", command: "/projects" },
  { key: "techStack", href: "/#tech-stack", command: "/stack" },
  { key: "education", href: "/#education", command: "/education" },
  { key: "contact", href: "/#contact", command: "/contact" },
];

// const routeItems = [
//   { key: "blog", href: "/blog" },
// ];

export default function Navbar() {
  const t = useTranslations("nav");
  const { mode } = usePortfolioMode();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isShell = mode === "shell";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function runShellCommand(command: string) {
    window.dispatchEvent(
      new CustomEvent("portfolio-shell-command", { detail: command })
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isShell
          ? "border-b border-white/10 bg-cosmic-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-cosmic-900/35 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-3">
          <Link href="/" className="group flex shrink-0 items-center gap-2">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/avatar.png"
                alt="Gabriel Angione"
                width={32}
                height={32}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="text-sm text-muted transition-colors group-hover:text-foreground sm:block">
              gangione.dev
            </span>
          </Link>

          <div className="hidden min-w-0 items-center justify-center gap-0.5 overflow-hidden xl:flex 2xl:gap-1">
            {anchorItems.map(({ key, href, command }) =>
              isShell ? (
                <button
                  key={key}
                  type="button"
                  onClick={() => runShellCommand(command)}
                  className="flex h-11 w-[5.7rem] flex-none items-center justify-center rounded-lg px-1.5 text-center font-mono text-[12px] leading-tight text-muted transition-colors hover:bg-white/5 hover:text-foreground 2xl:h-9 2xl:w-auto 2xl:whitespace-nowrap 2xl:px-3 2xl:text-sm 2xl:leading-none"
                >
                  {command}
                </button>
              ) : (
                <Link
                  key={key}
                  href={href}
                  className="flex h-11 w-[5.7rem] flex-none items-center justify-center rounded-lg px-1.5 text-center font-mono text-[12px] leading-tight text-muted transition-colors hover:bg-white/5 hover:text-foreground 2xl:h-9 2xl:w-auto 2xl:whitespace-nowrap 2xl:px-3 2xl:text-sm 2xl:leading-none"
                >
                  {t(key)}
                </Link>
              )
            )}
            {/* {routeItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {t(key)}
              </Link>
            ))} */}
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
            <CommandPalette shortcutMedia="(min-width: 1280px)" />
            <div className="border-l border-white/10 pl-2">
              <LanguageSwitcher />
            </div>
            <ModeToggle className="ml-1" />
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <CommandPalette shortcutMedia="(max-width: 1279px)" />
            <ModeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-muted hover:text-foreground"
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-b border-white/10 bg-cosmic-900/95 backdrop-blur-xl xl:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <div className="mb-3">
                <LanguageSwitcher />
              </div>
              {anchorItems.map(({ key, href, command }) =>
                isShell ? (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      runShellCommand(command);
                      setMobileOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left font-mono text-sm text-muted hover:bg-white/5 hover:text-foreground"
                  >
                    {command}
                  </button>
                ) : (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 font-mono text-sm text-muted hover:bg-white/5 hover:text-foreground"
                  >
                    {t(key)}
                  </Link>
                )
              )}
              {/* {routeItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/5"
                >
                  {t(key)}
                </Link>
              ))} */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
