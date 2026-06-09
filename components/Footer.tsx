"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const redBlockContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactSection,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      });

      // Match the total timeline duration of Contact (4.8)
      tl.to({}, { duration: 5.8 }, 0);

      // Footer name text and red block content entrance animation
      // Starts exactly when retraction starts (3.0) and runs for full retraction duration (1.8)
      tl.fromTo(
        [nameRef.current, redBlockContentRef.current],
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: "power3.out",
          duration: 1.3,
        },
        4.0
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full h-[100dvh] bg-[#fff7d3] z-0 flex flex-col justify-end p-0 select-none pointer-events-auto overflow-hidden"
      style={{ 
        visibility: "hidden", 
        willChange: "transform" 
      }}
    >
      {/* Top typographic section (Soft yellow background with giant red text) */}
      <div className="relative w-full flex-1 flex flex-col justify-end items-center bg-[#fff7d3] z-10">
        {/* Outer clipping container */}
        <div className="footer-name-outer w-full overflow-hidden flex flex-col justify-end items-center origin-bottom pt-[12vw] pb-0">
          {/* Inner translated wrapper */}
          <div 
            ref={nameRef}
            className="footer-name-inner w-full flex flex-col justify-end items-center origin-bottom"
            style={{ willChange: "transform" }}
          >
            <h1 
              className="font-tusker-standard text-[21vw] md:text-[22vw] font-bold uppercase leading-[0.72] tracking-normal text-[#AB1509] select-none origin-bottom whitespace-nowrap text-center"
              style={{ 
                transform: "translateY(0%) scaleY(1.15) scaleX(1.20)",
                willChange: "transform" 
              }}
            >
              Ali Ahmed
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom brand red block */}
      <div className="w-full h-[38dvh] bg-[#AB1509] relative z-10 flex items-start justify-center pt-12 md:pt-30 px-6 md:px-12 select-none pointer-events-auto overflow-hidden">
        <div 
          ref={redBlockContentRef}
          className="w-full max-w-[1440px] grid grid-cols-3 gap-8 items-start font-montreal text-xs md:text-sm text-white"
          style={{ willChange: "transform" }}
        >
          {/* Col 1: Tech Stack */}
          <div className="flex flex-col gap-3 items-start text-left">
            <span className="opacity-70 uppercase tracking-wider text-[10px] md:text-xs">site built using</span>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0 font-medium text-white">
              <li>next.js</li>
              <li>gsap</li>
              <li>three.js</li>
              <li>framer motion</li>
            </ul>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-3 items-center text-center -mt-6 md:-mt-[72px]">
            <span className="opacity-70 uppercase tracking-wider text-[10px] md:text-xs">links</span>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0 font-medium">
              <li>
                <TransitionLink href="/" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  home
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/#about" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  about
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/#work" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  work
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/#contact" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  contact
                </TransitionLink>
              </li>
            </ul>

            {/* CTA Button */}
            <a 
              href="mailto:aliahmedyus@gmail.com"
              className="mt-6 overflow-hidden h-[36px] md:h-[50px] block group pointer-events-auto no-underline text-[#fff7d3]"
            >
              <span className="block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                {/* Normal State */}
                <span className="block h-[36px] md:h-[50px] flex items-center justify-center font-tusker-standard font-medium text-[20px] md:text-[36px] leading-none text-[#fff7d3] select-none uppercase tracking-tight">
                  lets work
                </span>
                {/* Hover State */}
                <span className="block h-[36px] md:h-[50px] flex items-center justify-center font-tusker-standard font-medium text-[20px] md:text-[36px] leading-none text-[#fff7d3] select-none uppercase tracking-tight">
                  or settle for average
                </span>
              </span>
            </a>
          </div>

          {/* Col 3: Social Links */}
          <div className="flex flex-col gap-3 items-end text-right">
            <span className="opacity-70 uppercase tracking-wider text-[10px] md:text-xs">socials</span>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0 font-medium">
              <li>
                <a href="https://github.com/alihahamed" target="_blank" rel="noopener noreferrer" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  github
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ali-ahmed-83613b271/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  linkedin
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/aliahmd.25/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  instagram
                </a>
              </li>
              <li>
                <a href="https://x.com/AhmedAli8177" target="_blank" rel="noopener noreferrer" className="hover:text-[#fff7d3] transition-colors duration-300 no-underline">
                  x
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
