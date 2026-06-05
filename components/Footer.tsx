"use client";

import React from "react";

export default function Footer() {
  return (
    <footer 
      className="fixed bottom-0 left-0 w-full h-[100dvh] bg-[#AB1509] z-0 flex flex-col justify-between p-6 md:p-12 select-none pointer-events-auto"
      style={{ 
        visibility: "hidden", 
        willChange: "transform" 
      }}
    >
      {/* Top row of the footer */}
      <div className="flex justify-between items-start w-full">
        {/* Top Left: Small editorial mark */}
        <div className="flex flex-col gap-1">
          <span className="font-montreal font-medium text-[10px] md:text-xs uppercase tracking-widest text-[#fff7d3]/60">
            Portfolio
          </span>
          <span className="font-montreal font-normal text-[11px] md:text-sm text-[#fff7d3]/95 leading-tight">
            Designed to hit different.
          </span>
        </div>

        {/* Top Right: Tech Stack */}
        <div className="text-right flex flex-col gap-1">
          <span className="font-montreal font-medium text-[10px] md:text-xs uppercase tracking-widest text-[#fff7d3]/60">
            Built using
          </span>
          <div className="font-montreal font-normal text-[11px] md:text-sm text-[#fff7d3]/95 leading-tight flex flex-col md:flex-row md:gap-2 justify-end">
            <span>Next.js 16</span>
            <span className="hidden md:inline text-[#fff7d3]/40">•</span>
            <span>GSAP & Lenis</span>
            <span className="hidden md:inline text-[#fff7d3]/40">•</span>
            <span>Three.js WebGL</span>
          </div>
        </div>
      </div>

      {/* Bottom row: Huge Name Typography */}
      <div className="w-full flex justify-center items-end mt-auto overflow-hidden">
        <h1 className="font-tusker-expanded text-[13vw] md:text-[14vw] font-medium uppercase leading-[0.75] tracking-tighter text-[#fff7d3] select-none translate-y-[2vw]">
          Ali Ahmed
        </h1>
      </div>
    </footer>
  );
}
