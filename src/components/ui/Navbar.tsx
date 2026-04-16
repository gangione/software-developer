"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const anchorItems = [
  { key: "about", href: "/#about" },
  { key: "thinking", href: "/#thinking" },
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "techStack", href: "/#tech-stack" },
  { key: "education", href: "/#education" },
  { key: "contact", href: "/#contact" },
];

// const routeItems = [
//   { key: "blog", href: "/blog" },
// ];

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cosmic-900/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              <Image
                src="/images/avatar.png"
                alt="Gabriel Angione"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="sm:block text-sm text-muted group-hover:text-foreground transition-colors">
              gangione.dev
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {anchorItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {t(key)}
              </Link>
            ))}
            {/* {routeItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {t(key)}
              </Link>
            ))} */}
            <div className="ml-3 pl-3 border-l border-white/10">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
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
            className="md:hidden bg-cosmic-900/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {anchorItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/5"
                >
                  {t(key)}
                </Link>
              ))}
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
