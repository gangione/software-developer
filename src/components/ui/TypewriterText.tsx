"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 60,
  className = "",
  cursorClassName = "",
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      onComplete?.();
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed, onComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      className={className}
    >
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[3px] ml-0.5 align-baseline ${
            done ? "animate-pulse" : "animate-[blink_0.7s_step-end_infinite]"
          } ${cursorClassName}`}
          style={{ height: "0.85em" }}
        >
          &nbsp;
        </span>
      )}
    </motion.span>
  );
}
