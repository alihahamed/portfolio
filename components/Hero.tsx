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
        value: 50,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          if (projectsRef.current) {
            projectsRef.current.innerText = Math.round(projectsObj.value).toString();
          }
        }
      }, 3.68);

      tl.to(yearsObj, {
        value: 6,
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
      className="relative flex flex-col w-full selection:bg-white selection:text-black font-sans antialiased text-white"
    >


      {/* HERO SECTION CONTAINER (Fills exactly 100vh, transparent background to reveal WebGL) */}
      <div className="relative w-full h-screen min-h-[650px] flex flex-col justify-between overflow-hidden pb-6">
        {/* WebGL Background Canvas limited strictly to the Hero Section */}
        <SilkBackground />

        {/* HEADER SECTION (Without grid borders, clean and floating) */}
        <header className="relative z-10 w-full px-6 md:px-12 pt-8 pb-2 shrink-0">
          <div className="flex justify-between items-center w-full">
            {/* Logo - Handwritten Cursive Signature */}
            {!showPreloader ? (
              <Signature ref={signatureRef} text="Ali Ahmed" color="#fff7d3" fontSize={12} />
            ) : (
              <div />
            )}

            {/* Stylized ME/NU Stacked Menu Component */}
            <Menu delay={3.88} />
          </div>
        </header>

        {/* HERO / CONTENT REGION (Configured as full-viewport layout) */}
        <main className="relative z-10 flex flex-col flex-1 w-full justify-between px-6 md:px-12 pb-0 overflow-hidden">
          {/* TOP STATS ROW SPACER */}
          <div className="flex justify-end w-full relative -bottom-22 text-[10px] font-medium uppercase tracking-wider text-transparent select-none pointer-events-none">
            <div className="text-right pr-2">
              98.9/100 Average Performance Score
            </div>
          </div>

          {/* TYPOGRAPHY WRAPPER */}
          <div className="relative flex flex-col w-full select-none gap-2 md:gap-2 mt-6 md:mt-10 lg:mt-0">
            {/* Top-right stat with long connector line */}
            <div className="absolute left-2 top-[-2vw] fade-in-item flex justify-between items-center text-[10px] font-medium uppercase font-montreal tracking-wider text-white/80 pl-2 pr-2 w-full">
              <div 
                id="top-stat-connector-line" 
                className="hidden md:block flex-1 h-[1px] bg-white/50 origin-right scale-x-0 mr-6"
              />
              <div className="shrink-0">
                <span ref={scoreRef}>0.0</span>/100 Average Performance Score
              </div>
            </div>

            {/* Line 1: Static Heading */}
            <div className="overflow-hidden w-full py-1">
              <h1 className="text-reveal font-tusker-standard text-[8.5vw] md:text-[10vw] font-medium uppercase leading-[0.85] tracking-tight w-full text-left pb-2 flex flex-wrap items-baseline gap-x-[0.25em] text-[#fff7d3]">
                <span className="heading-gradient">I Build</span>
                <span className="heading-gradient">Websites</span>
                <span className="heading-gradient">That</span>
              </h1>
            </div>

            {/* Bottom stats container */}
            <div className="absolute left-2 bottom-[8vw] fade-in-item flex shrink-0 whitespace-nowrap font-montreal justify-between items-center text-[10px] font-medium uppercase tracking-wider text-white/80 pl-2 w-full md:w-[46vw]">
              <div><span ref={projectsRef}>0</span>+ Projects Completed</div>
              <div 
                id="stat-connector-line" 
                className="hidden md:block flex-1 h-[1px] bg-white/50 origin-left scale-x-0 mx-6"
              />
              <div><span ref={yearsRef}>0</span>+ Years of Experience</div>
            </div>

            {/* Line 2: "Hit Different" */}
            <div className="flex justify-end w-full">
              <div className="overflow-hidden py-1 flex flex-col items-end max-w-full">
                <h1 className="text-reveal font-tusker-standard text-[8vw] md:text-[9.5vw] font-medium uppercase leading-[0.85] tracking-tight heading-gradient pb-2">
                  Hit Different
                </h1>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: About label and description */}
          <div className="grid grid-cols-1 md:grid-cols-4 w-full -mt-6 md:-mt-16 lg:-mt-10 z-20 pb-1">
            <div className="about-label-reveal pl-2 pb-2 md:pb-0 text-[10px] uppercase tracking-widest font-montreal text-white/70 font-medium">
              About
            </div>

            <div className="about-para-reveal md:col-span-2 md:pl-1 flex flex-col gap-3 text-xs md:text-sm monitor:text-[16px] font-medium font-montreal text-white/80 leading-[1.2] normal-case max-w-xl">
              <p className="text-white/90">
                I'm Ali. I spend way too much time thinking about why some websites make you stay and others make you leave. Then I build the kind that make you stay. Fast, sharp, and designed like someone actually gave a damn. That's the only way I know how to build.
              </p>
              <div>
                <TransitionLink
                  href="/#about"
                  className="inline-flex items-center gap-1 hover:underline text-white font-medium text-xs md:text-sm transition-all"
                >
                  Learn more ↗
                </TransitionLink>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-start pl-16 pt-2 fade-in-item">
              <ScrollArrow />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
