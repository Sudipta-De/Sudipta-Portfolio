import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ConstellationBackground from "@/components/ConstellationBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen text-text bg-transparent">
      {/* Animated constellation background */}
      <ConstellationBackground />

      {/* High-tech Ambient Gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.1),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.08),_transparent_55%)]" />
      
      {/* Tech grid/dots pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/bg-dots.svg')] bg-[length:32px_32px] bg-repeat opacity-[0.035]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 pt-[72px] md:px-6 lg:px-8">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
