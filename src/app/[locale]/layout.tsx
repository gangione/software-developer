import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = "https://gangione.dev";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gabriel Angione",
  url: baseUrl,
  jobTitle: "Software Architect",
  worksFor: {
    "@type": "Organization",
    name: "Tec Solutions",
    url: "https://tecsolutions.com.ar/",
  },
  sameAs: [
    "https://github.com/gangione",
    "https://www.linkedin.com/in/gabriel-angione/",
  ],
  knowsAbout: [
    "Domain-Driven Design",
    "AI Agents",
    "MCP Protocol",
    ".NET",
    "CQRS",
    "Clean Architecture",
    "Software Architecture",
    "C#",
    "Angular",
    "React",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const url = `${baseUrl}/${locale}`;

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "Gabriel Angione",
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      images: [
        {
          url: `${baseUrl}/images/avatar.png`,
          width: 512,
          height: 512,
          alt: "Gabriel Angione",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/images/avatar.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
