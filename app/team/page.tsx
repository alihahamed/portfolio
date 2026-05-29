"use client";

import React from "react";
import { TransitionLink } from "@/components/PageTransition";

export default function TeamPage() {
  const members = [
    { name: "Ali Ahmed", role: "Creative Developer / Founder" },
    { name: "Tusker Grotesk", role: "Brutalist Heavy Weight Font" },
    { name: "Neue Montreal", role: "Geometric Grotesque Typographer" },
    { name: "GSAP & Lenis", role: "Butter-Smooth Physics Engine" },
  ];

  return (
    <div className="relative flex flex-col min-h-screen selection:bg-white selection:text-black font-sans antialiased text-white px-6 md:px-12 pt-28 pb-12 overflow-hidden justify-between">
      
      {/* Dynamic Header spacing spacer */}
      <div className="flex justify-between items-center w-full">
        <span className="font-montreal text-[10px] uppercase tracking-widest text-[#fff7d3]/50 font-bold">
          Team Roster
        </span>
        <span className="font-montreal text-[10px] uppercase tracking-widest text-[#fff7d3]/50 font-bold">
          Est. 2026
        </span>
      </div>

      {/* Massive heading with brutalist gradient */}
      <div className="relative flex flex-col w-full select-none gap-2 mt-12 md:mt-20">
        <h1 className="font-tusker-standard text-[10vw] md:text-[11.5vw] font-medium uppercase leading-[0.85] tracking-tight heading-gradient w-full text-left pb-2">
          MEET THE CREATORS
        </h1>
        
        {/* Horizontal dividing line */}
        <div className="w-full h-[1px] bg-white/20 mt-4"></div>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12 md:mt-16">
        {members.map((member, idx) => (
          <div 
            key={member.name} 
            className="flex flex-col gap-2 p-6 border border-white/[0.06] rounded-[0.5rem] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
          >
            <span className="font-montreal text-[12px] text-accent font-medium uppercase tracking-wider">
              0{idx + 1} // {member.role}
            </span>
            <span className="font-tusker-standard text-[2.5rem] md:text-[4rem] leading-[0.9] text-[#fff7d3] uppercase pt-2">
              {member.name}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Section with Back Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mt-20 gap-8 md:gap-0 border-t border-white/[0.06] pt-12">
        <div className="max-w-xl text-xs md:text-sm font-light text-white/90 leading-[1.3]">
          <p>
            We are a group of creative developers and typographers focused on building high-craft, fast-loading, and brutally beautiful digital experiences.
          </p>
        </div>
        
        {/* Customized transition link to return back home */}
        <TransitionLink 
          href="/"
          className="inline-flex items-center gap-2 group text-accent font-montreal font-medium text-xs md:text-sm uppercase tracking-widest no-underline transition-colors duration-300 hover:text-white"
        >
          <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span> Back to Portfolio
        </TransitionLink>
      </div>
    </div>
  );
}
