import React from "react";

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export default function NeuCard({ children, className = "", hoverGlow = true, ...props }: NeuCardProps) {
  return (
    <div
      className={`rounded-2xl bg-[#1a1a2e] shadow-neu-raised p-6 border border-white/5 transition-all duration-300 ${
        hoverGlow ? "hover:border-[#023e8a]/20 hover:shadow-neu-glow" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
