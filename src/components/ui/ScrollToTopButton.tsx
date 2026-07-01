"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

const trailStars = [
  { x: -18, y: 18, drift: -8, travel: 64, size: 3, delay: 0 },
  { x: 12, y: 22, drift: 7, travel: 72, size: 2, delay: 0.08 },
  { x: -3, y: 27, drift: -2, travel: 82, size: 4, delay: 0.16 },
  { x: 21, y: 30, drift: 10, travel: 68, size: 2, delay: 0.24 },
  { x: -24, y: 34, drift: -12, travel: 78, size: 2, delay: 0.32 },
  { x: 5, y: 38, drift: 3, travel: 88, size: 3, delay: 0.4 },
  { x: 26, y: 42, drift: 14, travel: 74, size: 2, delay: 0.48 },
  { x: -12, y: 46, drift: -5, travel: 92, size: 2, delay: 0.56 },
  { x: 15, y: 50, drift: 8, travel: 84, size: 3, delay: 0.64 },
  { x: -28, y: 54, drift: -14, travel: 96, size: 2, delay: 0.72 },
];

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function ArrowIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="drop-shadow-[0_0_10px_rgba(96,165,250,0.45)]"
    >
      <path d="m6 14 6-6 6 6" />
      <path d="M12 8v10" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_0_14px_rgba(6,182,212,0.52)]"
    >
      <motion.g
        animate={{ y: [0, -0.8, 0.5, -0.4, 0], x: [0, 0.45, -0.35, 0.25, 0] }}
        transition={{ duration: 0.22, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M10.1 22.4c-2.8.55-4.55 2.15-5.5 5.15 3-.95 4.6-2.7 5.15-5.5"
          className="fill-accent-blue/20 stroke-accent-cyan"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.9 22.4c2.8.55 4.55 2.15 5.5 5.15-3-.95-4.6-2.7-5.15-5.5"
          className="fill-accent-blue/20 stroke-accent-cyan"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 3.2c5.2 4.35 8.05 10.75 7.1 18.05-.22 1.7-1.35 3.14-2.94 3.78L18 26.72l-4.16-1.69c-1.59-.64-2.72-2.08-2.94-3.78C9.95 13.95 12.8 7.55 18 3.2Z"
          className="fill-accent-blue-light stroke-accent-cyan"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 3.2c2.5 2.1 4.45 4.66 5.64 7.56H12.36C13.55 7.86 15.5 5.3 18 3.2Z"
          className="fill-accent-cyan/70 stroke-accent-cyan"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="18"
          cy="15.5"
          r="3.1"
          className="fill-cosmic-900/25 stroke-white/90"
          strokeWidth="1.55"
        />
        <circle cx="18" cy="15.5" r="1.35" className="fill-white/70" />
        <path
          d="M14.1 25.1h7.8l-1.68 3.05a2.53 2.53 0 0 1-4.44 0L14.1 25.1Z"
          className="fill-accent-gold stroke-accent-gold-light"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
      <motion.g
        animate={{ opacity: [0.7, 1, 0.75], scaleY: [0.82, 1.3, 0.92] }}
        transition={{ duration: 0.18, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "18px 30px" }}
      >
        <path
          d="M15.4 29.4 18 34l2.6-4.6"
          className="fill-accent-gold-light stroke-accent-gold-light"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
      <path
        d="M14 29.8c-1.35 1.18-3.58 2.06-5.2 2.2.14-1.62 1.02-3.85 2.2-5.2M22 29.8c1.35 1.18 3.58 2.06 5.2 2.2-.14-1.62-1.02-3.85-2.2-5.2"
        className="stroke-accent-blue-light/70"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ScrollToTopButton() {
  const t = useTranslations("scrollToTop");
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [launchId, setLaunchId] = useState(0);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(window.innerHeight * 2.4, 1400);
      setVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (scrollFrameRef.current) {
      cancelAnimationFrame(scrollFrameRef.current);
    }

    if (reduceMotion) {
      setLaunching(false);
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const startY = window.scrollY;
    if (startY <= 1) {
      setLaunching(false);
      return;
    }

    const duration = Math.min(700, Math.max(450, startY / 4));
    const startTime = performance.now();

    setLaunching(true);
    setLaunchId((current) => current + 1);

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextY = Math.round(startY * (1 - easeOutCubic(progress)));

      window.scrollTo(0, nextY);

      if (progress < 1 && nextY > 1) {
        scrollFrameRef.current = requestAnimationFrame(tick);
      } else {
        window.scrollTo(0, 0);
        scrollFrameRef.current = null;
        setLaunching(false);
      }
    };

    scrollFrameRef.current = requestAnimationFrame(tick);
  }

  const shown = visible || launching;

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 22, scale: 0.9, rotate: -4 }}
          animate={{
            opacity: 1,
            y: launching ? [-1, -4, -2, -5, -1] : 0,
            x: launching ? [0, 1, -1, 0.6, 0] : 0,
            scale: launching ? 1.04 : 1,
            rotate: launching ? [0, 1.5, -1.2, 0.8, 0] : 0,
          }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{
            duration: launching ? 0.18 : 0.24,
            repeat: launching ? Infinity : 0,
            ease: "linear",
          }}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToTop}
          className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center overflow-visible rounded-full border border-accent-blue/30 bg-cosmic-900/75 text-accent-blue-light shadow-xl shadow-accent-blue/10 backdrop-blur-xl transition-colors hover:border-accent-cyan/60 hover:bg-accent-blue/15 hover:text-foreground hover:shadow-accent-cyan/20 focus:outline-none focus:ring-2 focus:ring-accent-blue/60 sm:bottom-7 sm:right-7"
          aria-label={t("label")}
        >
          <span className="pointer-events-none absolute inset-[-10px] rounded-full bg-accent-cyan/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
          <AnimatePresence>
            {launching && (
              <motion.span
                key={launchId}
                className="pointer-events-none absolute left-1/2 top-1/2 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
                aria-hidden="true"
              >
                {trailStars.map((star, index) => (
                  <motion.span
                    key={`${launchId}-${index}`}
                    className="absolute rounded-full bg-accent-gold-light shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    style={{
                      width: star.size,
                      height: star.size,
                      left: star.x,
                      top: star.y,
                    }}
                    initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.2, 1.25, 0.45],
                      y: [0, star.travel],
                      x: [0, star.drift],
                    }}
                    transition={{
                      duration: 0.82,
                      delay: star.delay,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.span>
            )}
          </AnimatePresence>

          <span className="pointer-events-none relative z-10 grid h-8 w-8 place-items-center">
            <AnimatePresence initial={false} mode="popLayout">
              {!launching && (
                <motion.span
                  key="arrow"
                  className="absolute inset-0 grid place-items-center"
                  initial={{ opacity: 0, y: 6, scale: 0.82 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -7, scale: 0.48 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <ArrowIcon />
                </motion.span>
              )}

              {launching && (
                <motion.span
                  key="rocket"
                  className="absolute inset-0 grid place-items-center"
                  initial={{ opacity: 0, y: 9, scale: 0.42 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <RocketIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
