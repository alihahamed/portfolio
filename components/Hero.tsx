"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Menu from "@/components/Menu";
import { Signature, SignatureRef } from "@/components/ui/signature";
import ScrollArrow from "@/components/ScrollArrow";
import { TransitionLink, useTransitionContext } from "@/components/PageTransition";
import SilkBackground from "@/components/SilkBackground";

export default function Hero() {
  const context = useTransitionContext();
  const showPreloader = context?.showPreloader;
  const containerRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SignatureRef>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);


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

      // Step 1: Clean, untilted mask reveal sliding straight up with dramatic custom ease
      // Length: starts at 0.1, duration 1.8, stagger 0.18 -> completes at 0.1 + 0.18 + 1.8 = 2.08
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

      // Step 2: About description with 0.1s of gap (starts at 2.08 + 0.1 = 2.18)
      // Length: duration 1.4 -> completes at 2.18 + 1.4 = 3.58
      tl.fromTo(".about-label-reveal",
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out"
        },
        2.18
      );

      tl.fromTo(".about-para-reveal",
        { clipPath: "inset(0% 0% 100% 0%)", y: 20 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.4,
          ease: "power3.inOut"
        },
        2.18
      );

      // Step 3: Lines, signature, and statistics with 0.1s of gap (starts at 3.58 + 0.1 = 3.68)
      // Both stats connector lines (top & bottom)
      tl.to("#stat-connector-line", {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
      }, 3.68);

      tl.to("#top-stat-connector-line", {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
      }, 3.68);

      // Odometer counts for the stats numbers
      tl.to(projectsObj, {
        value: 10,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          if (projectsRef.current) {
            projectsRef.current.innerText = Math.round(projectsObj.value).toString();
          }
        }
      }, 3.68);

      tl.to(yearsObj, {
        value: 1.,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          if (yearsRef.current) {
            yearsRef.current.innerText = Math.round(yearsObj.value).toString();
          }
        }
      }, 3.68);

      tl.to(scoreObj, {
        value: 98.9,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: () => {
          if (scoreRef.current) {
            scoreRef.current.innerText = scoreObj.value.toFixed(1);
          }
        }
      }, 3.68);

      // Fade and translate secondary stats container frames in
      tl.fromTo(".fade-in-item", 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.0, 
          ease: "power3.out" 
        }, 
        3.68
      );

      // Draw signature stroke dynamically in sync with timeline
      const sigObj = { progress: 0 };
      tl.to(sigObj, {
        progress: 1,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (signatureRef.current) {
            signatureRef.current.setProgress(sigObj.progress);
          }
        }
      }, 3.68);

    }, containerRef);

    return () => ctx.revert();
  }, [showPreloader]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col selection:bg-white w-full font-sans text-white selection:text-black antialiased"
    >


      {/* HERO SECTION CONTAINER (Fills exactly 100vh/100dvh, transparent background to reveal WebGL) */}
      <div className="relative flex flex-col justify-between pb-4 md:pb-6 w-full h-dvh min-h-[500px] md:min-h-[650px] overflow-hidden">
        {/* WebGL Background Canvas limited strictly to the Hero Section */}
        <SilkBackground />

        {/* HEADER SECTION (Without grid borders, clean and floating) */}
        <header className="top-0 left-0 z-20 absolute md:relative px-6 md:px-12 pt-8 pb-2 w-full shrink-0">
          <div className="flex justify-between items-center w-full">
            {/* Logo - Handwritten Cursive Signature */}
            {!showPreloader ? (
              <Signature ref={signatureRef} text="Ali Ahmed" color="#fff7d3" fontSize={24} className="w-[100px] md:w-[140px] h-auto" />
            ) : (
              <div />
            )}

            {/* Stylized ME/NU Stacked Menu Component */}
            <Menu delay={3.88} />
          </div>
        </header>

        {/* HERO / CONTENT REGION (Configured as full-viewport layout) */}
        <main className="z-10 relative flex flex-col flex-1 justify-between px-6 md:px-12 pb-0 w-full overflow-hidden">
          {/* TOP STATS ROW SPACER */}
          <div className="hidden -bottom-22 relative md:flex justify-end w-full font-medium text-[10px] text-transparent uppercase tracking-wider pointer-events-none select-none">
            <div className="pr-2 text-right">
              98.9/100 Average Performance Score
            </div>
          </div>

          {/* TYPOGRAPHY WRAPPER */}
          <div className="relative flex flex-col md:flex-initial flex-1 justify-center md:justify-start items-center gap-2 md:gap-2 mt-2 md:mt-10 lg:mt-0 w-full text-center select-none">
            {/* Top-right stat with long connector line */}
            <div className="top-0 md:top-[-2vw] left-0 md:left-2 md:absolute relative flex justify-center md:justify-between items-center order-1 px-2 md:px-0 py-1 md:py-0 w-full font-montreal font-medium text-[9px] text-white/80 md:text-[10px] uppercase tracking-wider fade-in-item">
              <div 
                id="top-stat-connector-line" 
                className="hidden md:block flex-1 bg-white/50 mr-6 h-[1px] scale-x-0 origin-right"
              />
              <div className="shrink-0">
                <span ref={scoreRef}>0.0</span>/100 Average Performance Score
              </div>
            </div>

            {/* Line 1: Static Heading */}
            <div className="order-2 pt-1 md:pt-3 pb-1 w-full overflow-hidden">
              {/* Desktop heading */}
              <h1 className="hidden md:flex flex-wrap items-baseline gap-x-[0.25em] pb-2 w-full font-tusker-standard font-medium text-[#fff7d3] text-[10vw] text-reveal text-left uppercase leading-[0.85] tracking-tight">
                <span className="heading-gradient">I Build</span>
                <span className="heading-gradient">Websites</span>
                <span className="heading-gradient">That</span>
              </h1>
              {/* Mobile heading */}
              <h1 className="md:hidden flex flex-wrap justify-center items-center gap-x-[0.2em] pb-0 w-full font-tusker-standard font-medium text-[#fff7d3] text-[16vw] text-reveal sm:text-[13.5vw] uppercase leading-[0.9] tracking-tighter whitespace-nowrap">
                <span className="heading-gradient">I Build</span>
                <span className="heading-gradient">Websites</span>
              </h1>
            </div>

            {/* Bottom stats container */}
            <div className="bottom-0 md:bottom-[8vw] left-0 md:left-2 md:absolute relative flex justify-center md:justify-between items-center gap-6 order-4 my-3 md:my-0 px-2 md:px-0 py-3 md:py-0 border-white/10 border-y md:border-none w-full md:w-[46vw] font-montreal font-medium text-[9px] text-white/80 md:text-[10px] uppercase tracking-wider whitespace-nowrap fade-in-item shrink-0">
              <div><span ref={projectsRef}>0</span>+ Projects Completed</div>
              <div 
                id="stat-connector-line" 
                className="hidden md:block flex-1 bg-white/50 mx-6 h-[1px] scale-x-0 origin-left"
              />
              <div><span ref={yearsRef}>0</span>+ Years of Experience</div>
            </div>

            {/* Line 2: "Hit Different" */}
            <div className="flex justify-start md:justify-end order-3 w-full max-w-[150vw]">
              <div className="flex flex-col items-center md:items-end pt-1 md:pt-3 pb-1 w-full max-w-full overflow-hidden">
                {/* Desktop Line 2 */}
                <h1 className="hidden md:block pb-2 font-tusker-standard font-medium text-[9.5vw] text-reveal uppercase leading-[0.85] tracking-tight">
                  <span className="heading-gradient">Hit Different</span>
                </h1>
                {/* Mobile Line 2 */}
                <h1 className="md:hidden block pb-1 w-full font-tusker-standard font-medium text-[14.5vw] text-reveal sm:text-[12vw] text-center uppercase leading-[0.9] tracking-tighter whitespace-nowrap">
                  <span className="heading-gradient">That Hit Different</span>
                </h1>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: About label and description */}
          <div className="bottom-0 md:bottom-auto left-0 md:left-auto z-20 absolute md:relative flex flex-col items-center md:grid md:grid-cols-4 mt-2 md:-mt-16 lg:-mt-10 px-6 md:px-0 pb-0 md:pb-1 w-full md:text-left text-center">
            <div className="pb-2 md:pb-0 md:pl-2 font-montreal font-medium text-[10px] text-white/70 md:text-left text-center uppercase tracking-widest about-label-reveal">
              About
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 md:col-span-2 md:pl-1 max-w-xl font-montreal font-medium text-white/80 monitor:text-[16px] text-xs md:text-sm md:text-left text-center normal-case leading-[1.2] about-para-reveal">
              <p className="text-white/90">
                I'm Ali. I spend way too much time thinking about why some websites make you stay and others make you leave. Then I build the kind that make you stay. Fast, sharp, and designed like someone actually gave a damn. That's the only way I know how to build.
              </p>
              <div>
                <TransitionLink
                  href="/#about"
                  className="inline-flex items-center gap-1 font-medium text-white text-xs md:text-sm hover:underline transition-all"
                >
                  Learn more ↗
                </TransitionLink>
              </div>
            </div>

            <div className="hidden md:flex justify-start items-center pt-2 pl-16 fade-in-item">
              <ScrollArrow />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
