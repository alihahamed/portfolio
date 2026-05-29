"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Menu from "@/components/Menu";
// import Signature from "@/components/Signature";
import ScrollArrow from "@/components/ScrollArrow";
import { useTransitionContext } from "@/components/PageTransition";

export default function Home() {
  const context = useTransitionContext();
  const showPreloader = context?.showPreloader;
  const containerRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);

  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [virtualIndex, setVirtualIndex] = useState(0);
  const activeIndex = virtualIndex % 4;
  const [wordWidths, setWordWidths] = useState<number[]>([]);
  const words = ["Websites", "Experiences", "Interfaces", "Products", "Websites"]; // Extended with duplicate for infinite forward scroll

  // 1. Measure responsive widths of all words dynamically on mount and window resize
  useEffect(() => {
    const measure = () => {
      const widths = words.map((_, i) => {
        const el = document.getElementById(`word-measure-${i}`);
        return el ? el.getBoundingClientRect().width : 0;
      });
      setWordWidths(widths);
    };

    // Tiny delay to ensure font resources are parsed and rendered by browser
    const timeout = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // 2. Odometer & Vertical Sliding Cycling Timer (Only starts AFTER the intro has fully finished!)
  useEffect(() => {
    if (!isIntroFinished) return;
    const interval = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isIntroFinished]);

  // 3. Vertical sliding track width and motion-blur offset timeline
  useEffect(() => {
    if (wordWidths.length === 0) return;

    const activeWordIndex = virtualIndex % 4;
    const targetWidth = wordWidths[activeWordIndex];

    // Keep track static, flat, and at initial word width during the intro animation
    if (!isIntroFinished || (virtualIndex === 0 && !drumRef.current?.style.width)) {
      gsap.set(drumRef.current, { width: wordWidths[0] });
      gsap.set(".sliding-track", { yPercent: 0 });
      return;
    }

    const tl = gsap.timeline();

    // Smoothly transition container width in sync with slide
    tl.to(drumRef.current, {
      width: targetWidth,
      duration: 0.6,
      ease: "power2.out"
    }, 0);

    // Dynamic slot-machine downward vertical slide with motion blur and spring bounce!
    const targetY = -virtualIndex * 20;

    tl.fromTo(".sliding-track",
      { filter: "blur(0px)" },
      {
        yPercent: targetY,
        filter: "blur(1.5px)",
        duration: 0.8,
        ease: "back.out(1.8)",
        onComplete: () => {
          gsap.set(".sliding-track", { filter: "blur(0px)" });
          
          // If we reach the duplicate "Websites" at the bottom (index 4), reset instantly to top
          if (virtualIndex > 0 && virtualIndex % 4 === 0) {
            gsap.set(".sliding-track", { yPercent: 0 });
            setVirtualIndex(0);
          }
        }
      },
      0
    );

  }, [virtualIndex, wordWidths, isIntroFinished]);

  // 4. Master Creative Intro Animation Timeline on Load
  useEffect(() => {
    if (showPreloader) return;
    const projectsObj = { value: 0 };
    const yearsObj = { value: 0 };
    const scoreObj = { value: 0 };

    const ctx = gsap.context(() => {
      // Register CustomEase for the ultimate dramatic acceleration curve
      gsap.registerPlugin(CustomEase);
      CustomEase.create("heroEntranceEase", "0.85, 0, 0.2, 1");

      const tl = gsap.timeline({ delay: 0.2 });

      // Trigger isIntroFinished = true when the timeline has fully completed playing
      tl.eventCallback("onComplete", () => {
        setIsIntroFinished(true);
      });

      // Step 1: Clean, untilted mask reveal sliding straight up with dramatic custom ease
      tl.fromTo(".text-reveal", 
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.8,
          ease: "heroEntranceEase",
          stagger: 0.18,
        },
        0.1
      );

      // Step 2: Odometer counts for the stats numbers
      tl.to(projectsObj, {
        value: 50,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          if (projectsRef.current) {
            projectsRef.current.innerText = Math.round(projectsObj.value).toString();
          }
        }
      }, 0.6);

      tl.to(yearsObj, {
        value: 6,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          if (yearsRef.current) {
            yearsRef.current.innerText = Math.round(yearsObj.value).toString();
          }
        }
      }, 0.7);

      tl.to(scoreObj, {
        value: 98.9,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: () => {
          if (scoreRef.current) {
            scoreRef.current.innerText = scoreObj.value.toFixed(1);
          }
        }
      }, 0.5);

      // Step 3: Fade and translate secondary stats container frames in
      tl.fromTo(".fade-in-item", 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.0, 
          ease: "power3.out" 
        }, 
        0.8
      );

      // Step 4: Expand both stats connector lines (top & bottom) once numbers are counting
      tl.to("#stat-connector-line", {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
      }, 1.0);

      tl.to("#top-stat-connector-line", {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
      }, 1.0);

      // Step 5: Horizontal slide-out for the About column label
      tl.fromTo(".about-label-reveal",
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out"
        },
        0.9
      );

      // Step 6: Vertical SVG-style clip wipe for the About paragraph block
      tl.fromTo(".about-para-reveal",
        { clipPath: "inset(0% 0% 100% 0%)", y: 20 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.4,
          ease: "power3.inOut"
        },
        1.0
      );

    }, containerRef);

    return () => ctx.revert();
  }, [showPreloader]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-screen max-h-screen overflow-hidden selection:bg-white selection:text-black font-sans antialiased text-white"
    >
      {/* Tactile Noise Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Hidden measuring nodes to read viewport-relative text widths dynamically */}
      <div className="absolute opacity-0 pointer-events-none select-none invisible whitespace-nowrap" aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={`measure-${w}`}
            id={`word-measure-${i}`}
            className="font-tusker-standard text-[8.5vw] md:text-[10vw] font-medium uppercase tracking-tight"
          >
            {w}
          </span>
        ))}
      </div>

      {/* HEADER SECTION (Without grid borders, clean and floating) */}
      <header className="relative z-10 w-full px-6 md:px-12 pt-6 pb-2">
        <div className="flex justify-between items-center w-full">
          {/* Logo - Handwritten Cursive Signature */}
          {/* <Signature /> */}

          {/* Stylized ME/NU Stacked Menu Component */}
          <Menu />
        </div>
      </header>

      {/* HERO / CONTENT REGION (Configured as full-viewport, flex-1 layout) */}
      <main className="relative z-10 flex flex-col flex-1 w-full justify-between px-6 md:px-12 pb-6 overflow-hidden">
        
        {/* TOP STATS ROW SPACER (Preserves the exact vertical layout flow and height) */}
        <div className="flex justify-end w-full relative -bottom-22 text-[10px] font-medium uppercase tracking-wider text-transparent select-none pointer-events-none">
          <div className="text-right pr-2">
            98.9/100 Average Performance Score
          </div>
        </div>

        {/* TYPOGRAPHY WRAPPER (Restored manual lg:mt-0 spacing change, headings in Tusker standard font-medium) */}
        <div className="relative flex flex-col w-full select-none gap-2 md:gap-2 mt-6 md:mt-10 lg:mt-0">
          
          {/* Top-right stat with long connector line stretching to the left (aligned with 'I') */}
          <div className="absolute left-2 top-[-2vw] fade-in-item flex justify-between items-center text-[10px] font-medium uppercase font-montreal tracking-wider text-white/80 pl-2 pr-2 w-full">
            {/* Top connector line drawing from right to left */}
            <div 
              id="top-stat-connector-line" 
              className="hidden md:block flex-1 h-[1px] bg-white/50 origin-right scale-x-0 mr-6"
            ></div>
            <div className="shrink-0">
              <span ref={scoreRef}>0.0</span>/100 Average Performance Score
            </div>
          </div>

          {/* Line 1: Wider font-tusker-expanded, end-to-end with side margins, restored manual font-medium change */}
          <div className="overflow-hidden w-full py-1">
            <h1 className="text-reveal font-tusker-standard text-[8.5vw] md:text-[10vw] font-medium uppercase leading-[0.85] tracking-tight w-full text-left pb-2 flex flex-wrap items-baseline gap-x-[0.25em] text-[#fff7d3]">
              <span className="heading-gradient">I Build</span>
              
              {/* Perfect Baseline-Aligned Vertical Sliding Track */}
              <span 
                ref={drumRef} 
                className="relative inline-flex h-[0.85em] overflow-hidden align-baseline select-none" 
                style={{ 
                  verticalAlign: "baseline",
                  willChange: "width"
                }}
              >
                {/* Static layout text to establish perfect line-height & baseline alignment */}
                <span className="opacity-0 select-none pointer-events-none heading-gradient">
                  {words[0]}
                </span>
                
                {/* Vertical sliding track (100% baseline perfect) */}
                <span 
                  className="sliding-track absolute left-0 top-0 flex flex-col w-full h-[500%] justify-start"
                  style={{ willChange: "transform, filter" }}
                >
                  {words.map((w, i) => (
                    <span 
                      key={`${w}-${i}`} 
                      className="h-1/5 flex items-center justify-start heading-gradient whitespace-nowrap"
                    >
                      {w}
                    </span>
                  ))}
                </span>
              </span>

              <span className="heading-gradient">That</span>
            </h1>
          </div>

          {/* Bottom stats absolutely positioned relative to the typography wrapper */}
          <div className="absolute left-2 bottom-[8vw] fade-in-item flex shrink-0 whitespace-nowrap font-montreal justify-between items-center text-[10px] font-medium uppercase tracking-wider text-white/80 pl-2 w-full md:w-[46vw]">
            <div><span ref={projectsRef}>0</span>+ Projects Completed</div>
            {/* Connector line that scales dynamically with the container width */}
            <div 
              id="stat-connector-line" 
              className="hidden md:block flex-1 h-[1px] bg-white/50 origin-left scale-x-0 mx-6"
            ></div>
            <div><span ref={yearsRef}>0</span>+ Years of Experience</div>
          </div>

          {/* Line 2: "Hit Different" title on the right */}
          <div className="flex justify-end w-full">
            {/* Title: aligned right */}
            <div className="overflow-hidden py-1 flex flex-col items-end max-w-full">
              <h1 className="text-reveal font-tusker-standard text-[8vw] md:text-[9.5vw] font-medium uppercase leading-[0.85] tracking-tight heading-gradient pb-2">
                Hit Different
              </h1>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: About / Description (Restored manual -mt-6 md:-mt-16 lg:-mt-10 alignment) */}
        <div className="grid grid-cols-1 md:grid-cols-4 w-full -mt-6 md:-mt-16 lg:-mt-10 z-20 pb-1">
          
          {/* Col 1: Standalone About title on the left in PP Neue Montreal Bold */}
          <div className="about-label-reveal pl-2 pb-2 md:pb-0 text-[10px] uppercase tracking-widest font-montreal text-white/70 font-bold">
            About
          </div>

          {/* Col 2-3: Paragraph description pushed to the right of the About label, restored manual md:pl-1 change, styled in Neue Montreal Light */}
          <div className="about-para-reveal md:col-span-2 md:pl-1 flex flex-col gap-3 text-xs md:text-sm font-medium font-montreal text-white/80 leading-[1.2] normal-case max-w-xl">
            <p className="text-white/90">
              I'm Ali. I spend way too much time thinking about why some websites make you stay and others make you leave. Then I build the kind that make you stay. Fast, sharp, and designed like someone actually gave a damn. That's the only way I know how to build.
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

          {/* Col 4: Scroll Arrow (Asymmetrical, unevenly positioned) */}
          <div className="hidden md:flex items-center justify-start pl-16 pt-2 fade-in-item">
            <ScrollArrow />
          </div>
        </div>

      </main>
    </div>
  );
}
