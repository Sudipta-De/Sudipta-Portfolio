"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 relative overflow-hidden py-10 md:py-12 bg-transparent">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-1/3 w-96 h-20 bg-secondary-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-xs sm:flex-row md:px-6 lg:px-8">
        <div className="text-center sm:text-left space-y-1">
          <p className="text-text/90 font-medium text-sm">
            &copy; {year} <span className="bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent font-bold">Sudipta De </span>. All rights reserved.
          </p>
        </div>

        {/* Social Link circles (Neumorphic raised -> inset) */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Sudipta-De"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#1a1a2e] shadow-neu-sm border border-white/5 p-2.5 text-slate-300 hover:text-[#00b4d8] hover:shadow-neu-inset hover:border-[#023e8a]/40 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/sudipta-de"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#1a1a2e] shadow-neu-sm border border-white/5 p-2.5 text-slate-300 hover:text-[#00b4d8] hover:shadow-neu-inset hover:border-[#023e8a]/40 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:sudiptade506@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-[#1a1a2e] shadow-neu-sm border border-white/5 p-2.5 text-slate-300 hover:text-[#00b4d8] hover:shadow-neu-inset hover:border-[#023e8a]/40 transition-all duration-300"
            aria-label="Email Contact"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
