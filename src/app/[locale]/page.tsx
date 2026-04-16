import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Thinking from "@/components/sections/Thinking";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Thinking />
      <Experience />
      <Projects />
      <TechStack />
      <Education />
      <Contact />
    </>
  );
}
