"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type PortfolioMode = "visual" | "shell";

type PortfolioModeContextValue = {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
};

const STORAGE_KEY = "gangione-portfolio-mode";

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(
  null
);

let currentMode: PortfolioMode = "visual";
const listeners = new Set<() => void>();

function parseMode(value: string | null): PortfolioMode | null {
  return value === "shell" || value === "visual" ? value : null;
}

function getUrlMode() {
  const url = new URL(window.location.href);
  const searchMode = parseMode(url.searchParams.get("mode"));
  if (searchMode) return searchMode;

  const hash = url.hash.replace(/^#/, "");
  if (hash.startsWith("mode=")) {
    return parseMode(hash.replace(/^mode=/, ""));
  }

  return parseMode(hash);
}

function persistMode(mode: PortfolioMode) {
  window.localStorage.setItem(STORAGE_KEY, mode);

  const url = new URL(window.location.href);
  if (mode === "shell") {
    url.searchParams.set("mode", "shell");
  } else {
    url.searchParams.delete("mode");
  }

  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function getPreferredMode() {
  if (typeof window === "undefined") {
    return currentMode;
  }

  return (
    getUrlMode() ??
    parseMode(window.localStorage.getItem(STORAGE_KEY)) ??
    currentMode
  );
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.setTimeout(() => {
      const preferredMode = getPreferredMode();
      if (preferredMode !== currentMode) {
        currentMode = preferredMode;
        persistMode(preferredMode);
      }
      listener();
    }, 0);
    window.addEventListener("popstate", listener);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("popstate", listener);
    }
  };
}

function emitModeChange() {
  listeners.forEach((listener) => listener());
}

function setStoredMode(nextMode: PortfolioMode) {
  currentMode = nextMode;
  if (typeof window !== "undefined") {
    persistMode(nextMode);
  }
  emitModeChange();
}

function getServerSnapshot(): PortfolioMode {
  return "visual";
}

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(
    subscribe,
    getPreferredMode,
    getServerSnapshot
  );

  const setMode = useCallback((nextMode: PortfolioMode) => {
    setStoredMode(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setStoredMode(mode === "shell" ? "visual" : "shell");
  }, [mode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode]
  );

  return (
    <PortfolioModeContext.Provider value={value}>
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode() {
  const context = useContext(PortfolioModeContext);
  if (!context) {
    throw new Error("usePortfolioMode must be used within PortfolioModeProvider");
  }

  return context;
}
