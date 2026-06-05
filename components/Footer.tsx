"use client";

import React from "react";

export default function Footer() {
  return (
    <footer 
      className="fixed bottom-0 left-0 w-full h-[100dvh] bg-[#fff7d3] z-0 flex flex-col justify-end p-0 select-none pointer-events-auto overflow-hidden"
      style={{ 
        visibility: "hidden", 
        willChange: "transform" 
      }}
    >
      {/* Top typographic section (Soft yellow background with giant red text) */}
      <div className="relative w-full flex-1 flex flex-col justify-end items-center bg-[#fff7d3]">
        {/* Animated wrapper container */}
        <div 
          className="footer-name-wrapper w-full overflow-hidden flex flex-col justify-end items-center origin-bottom"
          style={{ willChange: "transform, clip-path" }}
        >
          <h1 
            className="font-tusker-standard text-[21vw] md:text-[22vw] font-bold uppercase leading-[0.72] tracking-normal text-[#AB1509] select-none origin-bottom whitespace-nowrap text-center"
            style={{ 
              transform: "translateY(5.6%) scaleY(1.15) scaleX(1.20)",
              willChange: "transform" 
            }}
          >
            Ali Ahmed
          </h1>
        </div>
      </div>

      {/* Bottom brand red block */}
      <div className="w-full h-[38dvh] bg-[#AB1509] relative z-10 flex items-center justify-center" />
    </footer>
  );
}
