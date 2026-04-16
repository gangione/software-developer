import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Gabriel Angione",
    default: "Gabriel Angione — Software Architect & Builder",
  },
  description:
    "Software Architect specializing in .NET, DDD, CQRS, and AI-driven development. Founder of Track Signe. Building scalable, knowledge-driven systems.",
  keywords: [
    "Software Architect",
    "DDD",
    "Domain Driven Design",
    "AI Agents",
    "MCP",
    "Model Context Protocol",
    "CQRS",
    ".NET",
    "C#",
    "Angular",
    "React",
    "Clean Architecture",
    "Gabriel Angione",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
