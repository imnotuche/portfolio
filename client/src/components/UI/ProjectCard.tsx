"use client";

import { useState } from "react";
import GlassCard from "./GlassCard";

interface ProjectCardProps {
  title: string;
  desc: string;
  tags: string[];
  index: number;
  link: string;
}

export default function ProjectCard({ title, desc, tags, index, link }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={link}>
      <GlassCard glare
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`p-6.5 transition-all duration-300 ${
          hovered
            ? "-translate-y-1.5 border-white/18 shadow-[0_24px_64px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)]"
            : "translate-y-0 border-white/8 shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="font-mono text-[10px] text-white/20 tracking-[0.2em]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`text-base transition-all duration-300 inline-block ${
              hovered ? "text-white translate-x-0.5 -translate-y-0.5" : "text-white/20"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
        </div>

        <h3 className="text-[17px] font-bold text-white mb-2.5 tracking-tight leading-[1.3]">
          {title}
        </h3>

        <p className="text-[13px] text-white/42 leading-[1.75] mb-4.5">
          {desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </a>
  );
}