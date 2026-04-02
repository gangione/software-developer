"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted hover:text-foreground border border-white/10 rounded-full hover:border-accent-blue/30 transition-all"
      aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
    >
      <span className={locale === "en" ? "text-foreground" : "text-muted"}>
        EN
      </span>
      <span className="text-white/20">/</span>
      <span className={locale === "es" ? "text-foreground" : "text-muted"}>
        ES
      </span>
    </button>
  );
}
