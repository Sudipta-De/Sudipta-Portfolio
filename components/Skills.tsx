"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Database, Globe2, Layers3, LucideIcon, Network, Wrench } from "lucide-react";

type SkillGroup = {
  title: string;
  icon: LucideIcon;
  skills: string[];
  color: "cyan" | "violet" | "orange" | "green" | "blue" | "pink" | "amber";
};

const SKILLS_DATA: SkillGroup[] = [
  // {
  //   title: "ML & AI",
  //   icon: Brain,
  //   color: "cyan",
  //   skills: [
  //     "PyTorch",
  //     "TensorFlow",
  //     "Scikit-learn",
  //     "XGBoost",
  //     "OpenCV",
  //     "LangChain",
  //     "LlamaIndex",
  //     "RAG Architectures",
  //     "OpenAI & Gemini APIs",
  //     "CNNs",
  //     "LSTMs",
  //     "Model Quantization"
  //   ]
  // },

  // {
  //   title: "Backend & Infra",
  //   icon: Cloud,
  //   color: "cyan",
  //   skills: [
  //     "FastAPI",
  //     "Next.js",
  //     "Node.js",
  //     "React",
  //     "Docker",
  //     "AWS (SageMaker/S3/EC2)",
  //     "Firebase",
  //     "MLflow",
  //     "CI/CD Pipelines",
  //     "PostgreSQL",
  //     "MongoDB",
  //     "Git",
  //     "Linux"
  //   ]
  // },
  {
    title: "Languages",
    icon: Code2,
    color: "violet",
    skills: ["Python","Java", "C","C++", "SQL", "TypeScript", "JavaScript"]
  },
  {
    title:"Web Development",
    icon: Globe2,
    color : "blue",
    skills: [
      "HTML5",
      " CSS3",
      "JavaScript",
      "React.js",
      "Vite"
    ]
  },
  {
    title:"Frameworks & Libraries",
    icon: Layers3,
    color : "pink",
    skills: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
      "Recharts"
    ]
  },
  {
    title:"Database",
    icon: Database,
    color: "orange",
    skills:[
      "Oracle SQL",
      "SQL",
      "DBMS",
      "Relational Databases"
    ]
  },
  {
    title:"Computer Networks",
    icon: Network,
    color : "green",
    skills: [
      "Cisco Packet Tracer",
      "TCP /IP",
      "DHCP",
      "CRC",
      "Routing & Network Configuration"
    ]

  },
  {
    title:"Tools & Platforms",
    icon: Wrench,
    color : "cyan",
    skills: [
      "VS Code",
      "Git",
      "GitHub",
      "Jupyter Notebook",
      "Google Colab",
      "Netlify",
      "Vercel"
    ]

  },
  {
    title:"Core Concepts",
    icon: Brain,
    color : "amber",
    skills: [
      "DSA",
      "OOP",
      "Computer Networks",
      "DBMS",
      
    ]

  }
  

];

export default function Skills() {
  return (
    <section id="skills" className="relative rounded-[20px] bg-[#1a1a2e] shadow-neu-raised p-6 md:p-8 lg:p-10 scroll-mt-20 border border-white/5 space-y-10">
      {/* Decorative Glow Spot */}
      <div className="glow-spot-violet absolute left-0 bottom-1/4 h-80 w-80 rounded-full" />

      <div className="space-y-2">
        <h2 className="text-fluid-h2 font-bold tracking-tight text-white">
          Technical{" "}
          <span className="bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent font-black">
            Competencies
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
        <p className="max-w-xl text-fluid-body text-muted-text pt-2 leading-relaxed">
           A collection of programming languages, development tools, frameworks, and core concepts I use to build projects and strengthen my technical skills.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {SKILLS_DATA.map((group, idx) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              viewport={{ once: true, amount: 0.15 }}
              className="bg-[#1a1a2e] shadow-neu-raised rounded-2xl p-6 border border-white/5 relative overflow-hidden group transition-all duration-300 hover:border-primary-accent/20 hover:shadow-neu-glow"
            >
              {/* Watermark outline icon */}
              <div
                className="absolute -right-4 -top-4 text-white/[0.015] transition-colors pointer-events-none z-0 group-hover:text-primary-accent/[0.02]"
              >
                <Icon className="w-28 h-28" strokeWidth={1} />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2.5 border-cyan-gradient-b pb-3">
                  <div
                    className="p-2 rounded-xl transition-colors border bg-primary-accent/10 border-primary-accent/10 text-primary-accent group-hover:bg-primary-accent group-hover:text-slate-950"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono-custom">{group.title}</h3>
                </div>

                {/* Skills Tags layout */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                       key={skill}
                       className="skill-tag rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


