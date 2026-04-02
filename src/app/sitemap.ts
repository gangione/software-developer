import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gangione.dev";
  const locales = ["en", "es"];
  const now = new Date().toISOString();

  const routes = ["", "/blog"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "monthly" : "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
