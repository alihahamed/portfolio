"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Intro Animations to slide in headings and details
    const ctx = gsap.context(() => {
      // Animate text reveal masks (slide up)
      gsap.from(".text-reveal", {
        y: "110%",
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.3,
      });

      // Animate stats and description elements fade-in
      gsap.from(".fade-in-item", {
        opacity: 0,
        y: 15,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-screen max-h-screen overflow-hidden selection:bg-white selection:text-black font-sans antialiased text-white"
    >
      {/* Tactile Noise Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* HEADER SECTION (Without grid borders, clean and floating) */}
      <header className="relative z-10 w-full px-6 md:px-12 pt-6 pb-2">
        <div className="flex justify-between items-center w-full">
          {/* Logo - Circular Monogram in PP Neue Montreal */}
          <div className="fade-in-item flex items-center justify-center h-10 w-10 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            <span className="text-xs font-medium tracking-tight text-white hover:text-black">ALH</span>
          </div>

          {/* Menu Pill Button in PP Neue Montreal Medium */}
          <button className="fade-in-item flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 text-[10px] uppercase tracking-widest font-medium cursor-pointer">
            Menu
            <span className="h-1 w-1 rounded-full bg-[#10b981]"></span>
          </button>
        </div>
      </header>

      {/* HERO / CONTENT REGION (Configured as full-viewport, flex-1 layout) */}
      <main className="relative z-10 flex flex-col flex-1 w-full justify-between px-6 md:px-12 pb-6 overflow-hidden">
        
        {/* TOP STATS ROW (Clean PP Neue Montreal Medium typography, no borders) */}
        <div className="grid grid-cols-1 md:grid-cols-4 w-full -pt-4 pb-2 text-[10px] font-medium uppercase tracking-wider text-white/80 gap-4 md:gap-0">
          <div className="fade-in-item pl-2">
            50+ Projects Completed
          </div>
          <div className="fade-in-item pl-2">
            6+ Years of Experience
          </div>
          <div className="fade-in-item pl-2">
            {/* Empty space */}
          </div>
          <div className="fade-in-item text-left md:text-right pr-2">
            98.9/100 Average Performance Score
          </div>
        </div>

        {/* TYPOGRAPHY WRAPPER (Restored manual lg:mt-0 spacing change, headings in Tusker standard font-medium) */}
        <div className="flex flex-col w-full select-none gap-2 md:gap-2 mt-6 md:mt-10 lg:mt-0">
          {/* Line 1: Wider font-tusker-expanded, end-to-end with side margins, restored manual font-medium change */}
          <div className="overflow-hidden w-full py-1">
            <h1 className="text-reveal font-tusker-standard text-[10vw] md:text-[11.5vw] font-medium uppercase leading-[0.85] tracking-tight heading-gradient w-full text-left pb-2">
              I Code Brutal Motion
            </h1>
          </div>

          {/* Line 2: Aligned Right-Center, slightly reduced height text */}
          <div className="flex justify-end w-full">
            <div className="overflow-hidden py-1 flex flex-col items-end max-w-full">
              <h1 className="text-reveal font-tusker-standard text-[8vw] md:text-[10vw] font-medium uppercase leading-[0.85] tracking-tight heading-gradient pb-2">
                For Websites
              </h1>
              {/* Custom thin white underline below second line */}
              <div className="w-full h-[1.5px] bg-white mt-2"></div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: About / Description (Restored manual -mt-6 md:-mt-16 lg:-mt-10 alignment) */}
        <div className="grid grid-cols-1 md:grid-cols-4 w-full -mt-6 md:-mt-16 lg:-mt-10 z-20 pb-1">
          
          {/* Col 1: Standalone About title on the left in PP Neue Montreal Bold */}
          <div className="fade-in-item pl-2 pb-2 md:pb-0 text-[10px] uppercase tracking-widest text-white/50 font-bold">
            About
          </div>

          {/* Col 2-3: Paragraph description pushed to the right of the About label, restored manual md:pl-1 change, styled in Neue Montreal Light */}
          <div className="fade-in-item md:col-span-2 md:pl-1 flex flex-col gap-3 text-xs md:text-sm font-light text-white leading-[1.2] normal-case max-w-xl">
            <p className="text-white/90">
              I&apos;m a web developer focused on building modern, fast, and
              reliable websites. I care not only about how a site looks, but
              also about how it performs, access, and feels for real users. From
              clean code and responsive layouts to performance optimization and
              SEO, I make sure every project is built with attention to detail
              and long-term quality in mind.
            </p>
            <div>
              <a
                href="#about"
                className="inline-flex items-center gap-1 hover:underline text-white font-medium text-xs md:text-sm transition-all"
              >
                Learn more ↗
              </a>
            </div>
          </div>

          {/* Col 4: Empty spacer */}
          <div className="hidden md:block"></div>
        </div>

      </main>
    </div>
  );
}
