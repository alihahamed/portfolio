"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Instantly kill the About section DOM rendering once circle covers viewport
            // This fires on every scroll frame with ZERO delay (bypasses scrub lag)
            const aboutRedBg = document.querySelector<HTMLElement>('.about-red-bg');
            if (aboutRedBg) {
              if (self.progress > 0.4) {
                aboutRedBg.style.display = 'none';
              } else {
                aboutRedBg.style.display = '';
              }
            }
          },
        },
      });

      // Animate the clipPath circle radius from 0% to 150% relative to the viewport
      tl.fromTo(
        circleRef.current,
        { clipPath: "circle(0% at 50% 100%)" },
        {
          clipPath: "circle(150% at 50% 100%)",
          ease: "none",
        },
        0
      );

      // Strong parallax: Slide the CV document up a little
      tl.fromTo(
        ".about-doc-wrap",
        { yPercent: 0 },
        {
          yPercent: -35,
          ease: "none",
        },
        0
      );

      // Slower parallax: Slide the red background up a very little
      tl.fromTo(
        ".about-red-bg",
        { yPercent: 0 },
        {
          yPercent: -15,
          ease: "none",
        },
        0
      );

      // Title slides up from bottom center to viewport center as the circle expands
      tl.fromTo(
        ".reveal-contact-title",
        {
          x: () => window.innerWidth / 2 - 4,
          xPercent: -50,
          y: () => window.innerHeight + 200,
          yPercent: -50,
        },
        {
          x: () => window.innerWidth / 2 - 4,
          xPercent: -50,
          y: () => window.innerHeight / 2 - 6,
          yPercent: -50,
          ease: "power1.out",
          duration: 0.5,
        },
        0
      );

      // Title slides to the top-left corner (2px margin) in the final part of the scroll
      tl.to(
        ".reveal-contact-title",
        {
          x: 0,
          xPercent: 0,
          y: 0,
          yPercent: 0,
          ease: "power2.inOut",
          duration: 0.25,
        },
        0.5
      );

      // Email and phone links wipe down under the title when it reaches the top-left
      tl.fromTo(
        [".reveal-contact-email", ".reveal-contact-phone"],
        {
          y: -20,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          duration: 0.25,
          stagger: 0.08,
        },
        0.75
      );

      // Bottom-left message reveal
      tl.fromTo(
        ".reveal-contact-message",
        {
          y: 40,
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          duration: 0.25,
        },
        0.75
      );

      // Parallax for tall images on the right
      tl.fromTo(
        ".reveal-contact-image-1",
        { yPercent: 60 },
        {
          yPercent: -15,
          ease: "none",
        },
        0
      );

      tl.fromTo(
        ".reveal-contact-image-2",
        { yPercent: 100 },
        {
          yPercent: -25,
          ease: "none",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="contact-section"
      className="relative w-full h-[300vh] z-[60] pointer-events-none"
    >
      {/* Viewport-fixed background wrapper with clip-path reveal */}
      <div 
        ref={circleRef}
        className="fixed inset-0 w-full h-screen bg-[#050505] z-[60] pointer-events-none"
        style={{
          clipPath: "circle(0% at 50% 100%)",
          willChange: "clip-path",
        }}
      >
        {/* Giant Contact Heading (revealed as the circle covers the screen) */}
        <h2 className="reveal-contact-title absolute top-[6px] left-[4px] font-tusker-standard text-[8vw] md:text-[11vw] font-medium uppercase tracking-tighter leading-none text-[#fff7d3] select-none pointer-events-auto whitespace-nowrap">
          have an idea?
        </h2>

        {/* Large contact links (Email & Phone) revealed below the heading */}
        <div 
          className="absolute left-[6px] top-[calc(8vw+16px)] md:top-[calc(11vw+24px)] flex flex-col gap-1.5 md:gap-3 pointer-events-auto z-[70]"
        >
          {/* Email link */}
          <a 
            href="mailto:aliahmedyus@gmail.com" 
            className="reveal-contact-email font-montreal font-medium text-[#fff7d3] text-[3.5vw] md:text-[4vw] tracking-normal leading-none overflow-hidden h-[1.2em] block group"
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            <span className="email-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
              {/* Normal State */}
              <span className="email-line-normal block h-[1.2em] leading-none text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300">
                aliahmedyus@gmail.com
              </span>
              {/* Hover State */}
              <span className="email-line-hover block h-[1.2em] leading-none text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300 flex items-center">
                send mail 
                <svg 
                  className="inline-block w-[0.85em] h-[0.85em] translate-x-[-12px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 ease-out ml-3 align-middle"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </span>
          </a>

          {/* Phone link */}
          <a 
            href="tel:+918867145921" 
            className="reveal-contact-phone font-montreal font-medium text-[#fff7d3] text-[3.5vw] md:text-[4vw] tracking-normal leading-none overflow-hidden h-[1.2em] block group"
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            <span className="phone-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
              {/* Normal State */}
              <span className="phone-line-normal block h-[1.2em] leading-none text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300">
                +91 8867145921
              </span>
              {/* Hover State */}
              <span className="phone-line-hover block h-[1.2em] leading-none text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300 flex items-center">
                call me
                <svg 
                  className="inline-block w-[0.85em] h-[0.85em] translate-x-[-12px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 ease-out ml-3 align-middle"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.03.65-1.92 1.63-2.21l2.58-.77c.8-.24 1.65.23 1.94 1l1.21 3.24c.25.68-.01 1.45-.63 1.84L7.75 10.72a10.5 10.5 0 005.55 5.55l1.02-1.22c.39-.46 1.1-.63 1.74-.38l3.24 1.21c.77.29 1.24 1.14 1 1.94l-.77 2.58c-.29.98-1.18 1.63-2.21 1.63A17.25 17.25 0 012.25 6.62z" />
                </svg>
              </span>
            </span>
          </a>
        </div>

        {/* Dynamic editorial bottom-left message */}
        <div 
          className="reveal-contact-message absolute bottom-6 left-6 md:bottom-8 md:left-4 flex flex-col md:flex-row gap-6 md:gap-16 max-w-[90vw] md:max-w-[800px] items-start pointer-events-auto"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <p className="max-w-[280px] md:max-w-[340px] font-montreal font-normal text-white/90 text-[14px] md:text-[15px] leading-[1.3] select-none">
            I build for people who think settling for good enough is the problem. Founders, brands, agencies — if you've got something worth building and you want it done right, not just done fast, let's make something people can't stop looking at.
          </p>
          <p className="max-w-[280px] md:max-w-[320px] font-montreal font-normal text-white/90 text-[14px] md:text-[15px] leading-[1.3] select-none whitespace-pre-line">
            If you want generic templates,{"\n"}
            rushed timelines, or high volume,{"\n"}
            Ali is the wrong choice.
          </p>
        </div>

        {/* Tall parallax images on the right */}
        <div className="absolute right-[6%] bottom-[8vh] flex gap-6 md:gap-8 items-end select-none pointer-events-none hidden md:flex z-50">
          <div 
            className="reveal-contact-image-1 w-[13vw] aspect-[3/4] bg-neutral-900 border border-white/10 relative overflow-hidden"
            style={{ willChange: "transform" }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-montreal text-xs uppercase tracking-widest">
              [ Project A ]
            </div>
          </div>
          <div 
            className="reveal-contact-image-2 w-[13vw] aspect-[3/4] bg-neutral-900 border border-white/10 relative overflow-hidden mb-[8vh]"
            style={{ willChange: "transform" }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-montreal text-xs uppercase tracking-widest">
              [ Project B ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
