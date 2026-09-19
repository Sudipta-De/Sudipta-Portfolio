"use client";

import Image from "next/image";
import { ChevronRight, Mail, Briefcase } from "lucide-react";

export default function Hero() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const skills = [
    { name: "Python", icon: "🐍" },
    { name: "C", icon: "🔥" },
    { name: "Java", icon: "☕" },
    { name: "C++", icon: "⚙️" },
    { name: "SQL", icon: "🗄️" },
    { name: "JavaScript", icon: "⚡" },
    { name: "TypeScript", icon: "🔷" },
    { name: "React", icon: "⚛️" },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-72px)] flex-col justify-center overflow-hidden py-8 lg:py-12 scroll-mt-20 scanlines bg-transparent"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-[#023e8a]/10 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-[#023e8a]/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          
          {/* LEFT COLUMN */}
          <div className="space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-[#1a1a2e] shadow-neu-sm px-3.5 py-1.5 text-xs font-semibold text-[#00b4d8] font-mono-custom">
              <Briefcase className="h-3.5 w-3.5" />
              <span>B.Tech CSE (Data Science) | Developer | Problem Solver</span>
            </div>

            {/* Headline and Subheadline */}
            <div className="space-y-3 w-full">
              <h1 className="font-extrabold tracking-tight uppercase leading-none text-left lg:text-left flex flex-col">
                <span className="text-xl sm:text-2xl font-light text-[#00b4d8] block mb-2 font-mono-custom">I&apos;m Sudipta,</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white block">I Build Web & Software Projects</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00b4d8] block mt-1">That Actually Ship</span>
              </h1>
              
              {/* Single, punchy description (max 15 words) */}
              <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0 font-mono-custom">
                  Computer Science student passionate about development, problem solving, and data-driven technologies.
              </p>
            </div>

            {/* Stat line (Subtle neumorphic badges) */}
            

            {/* CTA Buttons (Neumorphic raised with hover transitions) */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-1 w-full sm:w-auto font-mono-custom">
              {/* Primary CTA (filled blue, white text, raised/inset hover) */}
              <button
                onClick={() => handleScroll("projects")}
                className="group flex items-center justify-center gap-2 rounded-full bg-[#023e8a] hover:bg-[#023e8a]/90 px-6 py-3 text-sm font-bold text-white shadow-neu-sm hover:shadow-neu-inset hover:border-[#023e8a]/40 border border-transparent transition-all duration-300 cursor-pointer w-full sm:w-auto min-h-[44px]"
              >
                <span>View Projects</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              {/* Secondary CTA (outlined, blue border, raised/inset hover) */}
              <a
                href="/Sudipta De Resume.pdf"
                download
                className="flex items-center justify-center gap-2 rounded-full border border-[#023e8a] text-[#00b4d8] hover:bg-[#023e8a]/10 bg-transparent px-6 py-3 text-sm font-semibold shadow-neu-sm hover:shadow-neu-inset transition-all duration-300 w-full sm:w-auto min-h-[44px]"
              >
                <span>Download Resume</span>
              </a>
              {/* Tertiary CTA (text link only) */}
              <button
                onClick={() => handleScroll("contact")}
                className="flex items-center justify-center gap-2 text-slate-400 hover:text-[#00b4d8] transition-colors text-sm font-semibold cursor-pointer w-full sm:w-auto min-h-[44px]"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm mx-auto w-full gap-4">
            {/* Orbit Container wrapping Avatar and revolving Core ML & Deploy/Infra skills */}
            <div className="orbit-container relative flex items-center justify-center w-[180px] h-[180px] min-[390px]:w-[230px] min-[390px]:h-[230px] sm:w-[280px] sm:h-[280px] mx-auto select-none my-6">
              
              {/* Central Avatar */}
              <div className="relative z-20 group p-1.5">
                {/* Ambient blur behind headshot */}
                <div className="absolute -inset-1 rounded-full bg-[#023e8a]/20 opacity-25 blur-lg transition duration-700 group-hover:opacity-45" />
   
                {/* Circular Headshot Card (Neumorphic double ring) */}
                <div 
                  className="relative h-24 w-24 min-[390px]:h-32 min-[390px]:w-32 sm:h-40 sm:w-40 rounded-full bg-[#1a1a2e] p-1.5 overflow-hidden transition-all duration-300"
                  style={{ boxShadow: "0 0 0 3px #1a1a2e, 0 0 0 5px rgba(2, 62, 138, 0.6)" }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1a1a2e]">
                    <Image
                      src="/Sudipta-img.png"
                      alt="Sudipta De  Portrait"
                      fill
                      priority
                      className="object-cover transition-transform duration-750 group-hover:scale-105"
                      sizes="(max-width: 390px) 6rem, (max-width: 640px) 8rem, 10rem"
                    />
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent opacity-70 animate-[scan_4s_infinite_linear]" style={{ top: "0%" }} />
                  </div>
                </div>
              </div>

              {/* Orbiting Paths (Multiple rings for premium sci-fi feel) */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#00b4d8]/15 pointer-events-none" />
              <div className="absolute inset-3 rounded-full border border-dashed border-[#023e8a]/10 pointer-events-none" />

              {/* Spinning Wrapper */}
              <div className="orbit-spin absolute inset-0">
                {skills.map((skill, index) => {
                  const angle = index * (360 / skills.length);
                  return (
                    <div
                      key={skill.name}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-1/2 pointer-events-auto z-30"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                        }}
                      >
                        <div className="orbit-spin-reverse">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#1a1a2e] shadow-neu-sm border border-white/5 px-1.5 py-0.5 text-[9px] min-[390px]:px-2.5 min-[390px]:py-1 min-[390px]:text-[10px] sm:text-[11px] font-semibold text-slate-200 font-mono-custom hover:text-[#00b4d8] hover:border-[#00b4d8]/30 transition-all duration-300 hover:scale-110 cursor-default whitespace-nowrap">
                            {skill.icon} {skill.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Current Focus banner below avatar */}
            <div className="w-full text-center mt-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#1a1a2e] shadow-neu-raised border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b4d8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00b4d8]"></span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono-custom">Current Focus:</span>
                <span className="text-xs text-white font-bold font-mono-custom">Software Development & Data Science</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scan animation */}
      <style jsx global>{`
        @keyframes scan {
          0%, 100% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
        }
      `}</style>
    </section>
  );
}
