"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import NeuCard from "./NeuCard";

type Project = {
  title: string;
  category: string;
  problemStatement: string;
  github: string;
};

const PROJECTS_DATA: Project[] = [
  {
  title: "Course Registration System",
  category: "Java · Desktop Application",
  problemStatement: "A Java-based course registration system for managing course enrollment and registration requests.",
  github: "https://github.com/Sudipta-De/Course-Registration-System",
  },
  {
    title: "Visualization of Sorting Algorithms",
    category: "Web Development · Algorithm Visualization",
    problemStatement: "An interactive visual representation of sorting algorithms that makes their working easier to understand.",
    github: "https://github.com/Sudipta-De/Sorting-algorithms",
  },
  {
    title: "Currency Converter",
    category: "Java · Desktop Application",
    problemStatement: "A Java Swing desktop application for converting values between different currencies.",
    github: "https://github.com/Sudipta-De/Corrency-Converter",
  },
];

export default function Projects() {

  return (
    <section id="projects" className="relative rounded-[20px] bg-[#1a1a2e] shadow-neu-raised p-6 md:p-8 lg:p-10 scroll-mt-20 border border-white/5 space-y-10">
      {/* Decorative Glow Spot */}
      <div className="glow-spot-cyan absolute right-0 bottom-1/3 h-80 w-80 rounded-full" />

      <div className="space-y-2">
        <h2 className="text-fluid-h2 font-bold tracking-tight text-white">
          Featured{" "}
          <span className="bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent font-black">
            Projects
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
        <p className="max-w-xl text-fluid-body text-muted-text pt-2 leading-relaxed">
          A collection of academic and personal projects built while developing my programming, software development, and problem-solving skills.       
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_DATA.map((project, idx) => {
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true, amount: 0.15 }}
              className="flex"
            >
              <NeuCard className="group flex flex-col w-full h-full justify-between relative overflow-hidden" hoverGlow={true}>
                {/* Corner Accent Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-accent/5 via-transparent to-transparent rounded-tr-2xl pointer-events-none" />

                <div className="space-y-4 flex-1">
                  {/* Header */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary-accent font-mono-custom">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-primary-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Problem Statement (Inset Neumorphic) */}
                  <div className="space-y-1 bg-[#1a1a2e] shadow-neu-inset p-3.5 rounded-2xl border border-white/5">
                    <span className="text-[9px] uppercase font-bold text-muted-text tracking-wider font-mono-custom">Problem Statement</span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3.5 pt-4 mt-4 border-cyan-gradient-t">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-full btn-secondary-custom py-2.5 text-xs font-bold min-h-[40px] font-mono-custom"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </NeuCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
