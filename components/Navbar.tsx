"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 shadow-neu-sm nav-glass"
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleScroll("home")}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-md group-hover:scale-105 group-hover:border-primary-accent/30 transition-all">
            <Image
              src="/Sudipta-img.png"
              alt="Sudipta De  Brand"
              fill
              className="object-cover"
              sizes="2.25rem"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white tracking-wide">Sudipta De </p>
            <span className="text-xs text-[#00b4d8] font-semibold font-mono-custom">CSE (Data Science) student passionate about software development and problem solving.</span>
          </div>
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className={`relative text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer font-mono-custom ${
                activeSection === section.id
                  ? "text-secondary-accent"
                  : "text-muted-text hover:text-white"
              }`}
            >
              <span>{section.label}</span>
              {activeSection === section.id && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-secondary-accent shadow-[0_0_8px_rgba(2,62,138,0.6)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Download Resume Button */}
          <a
            href="/Sudipta De Resume.pdf"
            download
            className="flex items-center gap-1.5 rounded-full btn-primary-custom px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold transition-all hover:-translate-y-0.5 font-mono-custom"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950/40 p-2 text-text/80 transition hover:border-secondary-accent/40 hover:text-white lg:hidden cursor-pointer"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation menu drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs p-6 shadow-2xl backdrop-blur-2xl border-l border-cyan-gradient-t lg:hidden flex flex-col justify-between"
              style={{ backgroundColor: "#1a1a2e" }}
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-cyan-gradient-b">
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-white tracking-wide">Sudipta De </p>
                    <span className="text-xs text-muted-text font-mono-custom">Navigation Menu</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-950/40 text-text/80 transition hover:border-secondary-accent/40 hover:text-white cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-2.5">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleScroll(section.id)}
                      className={`rounded-2xl px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between min-h-[48px] font-mono-custom ${
                        activeSection === section.id
                          ? "bg-secondary-accent/10 text-secondary-accent border-l-2 border-secondary-accent"
                          : "text-muted-text hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Download Resume */}
              <div className="pt-6 border-cyan-gradient-t">
                <a
                  href="/Sudipta De Resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 rounded-2xl btn-primary-custom px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider transition-all min-h-[48px] font-mono-custom"
                  onClick={() => setIsOpen(false)}
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
