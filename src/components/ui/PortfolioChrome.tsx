"use client";

import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { usePortfolioMode } from "@/components/ui/PortfolioModeProvider";

export default function PortfolioChrome({ children }: { children: ReactNode }) {
  const { mode } = usePortfolioMode();
  const isVisual = mode === "visual";

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      {isVisual && (
        <>
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </>
  );
}
