export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  key: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "backend",
    skills: [
      { name: "C# / .NET" },
      { name: "PHP / Laravel" },
      { name: "Node.js / Express" },
      { name: "Symfony" },
      { name: "REST APIs" },
      { name: "WebSockets" },
    ],
  },
  {
    key: "frontend",
    skills: [
      { name: "React / Next.js" },
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "HTML / CSS" },
      { name: "WordPress" },
    ],
  },
  {
    key: "databases",
    skills: [
      { name: "SQL Server" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Oracle" },
    ],
  },
  {
    key: "infrastructure",
    skills: [
      { name: "Docker" },
      { name: "Azure" },
      { name: "VMware" },
      { name: "IIS" },
      { name: "Linux" },
      { name: "Git" },
    ],
  },
  {
    key: "ai",
    skills: [
      { name: "AI Agents" },
      { name: "MCP Tools" },
      { name: "DDD with AI" },
      { name: "AI-Driven UIs" },
    ],
  },
  {
    key: "networking",
    skills: [
      { name: "Cisco" },
      { name: "Fortinet" },
      { name: "VPN / VLANs" },
      { name: "Active Directory" },
      { name: "Office 365" },
      { name: "DNS / DHCP" },
    ],
  },
];
