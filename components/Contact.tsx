"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
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
        0.45
      );

      // Email, phone and social links wipe down under the title when it reaches the top-left
      tl.fromTo(
        [".reveal-contact-email", ".reveal-contact-phone", ".reveal-contact-social"],
        {
          y: -20,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          duration: 0.10,
          stagger: 0.02,
        },
        0.70
      );

      // Status text reveal after heading sits in the corner
      tl.fromTo(
        ".reveal-contact-status",
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.10,
        },
        0.70
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
          duration: 0.10,
        },
        0.70
      );

      // Parallax for single tall image on the right: Project B from bottom, stops in middle with inner-image parallax
      tl.fromTo(
        ".reveal-contact-image-2",
        { y: "100vh" },
        {
          y: "0vh",
          ease: "power2.inOut",
          duration: 0.20,
        },
        0.80
      );

      tl.fromTo(
        ".reveal-img-inner-2",
        { yPercent: -6, scale: 1.15 },
        {
          yPercent: 6,
          scale: 1.15,
          ease: "none",
          duration: 0.20,
        },
        0.80
      );

      // --- RETRACTION STAGE (1.00 to 1.25) ---
      // 1. Slide the entire fixed viewport circle wrapper up to reveal the sticky footer
      tl.to(
        circleRef.current,
        {
          yPercent: -100,
          ease: "none",
          duration: 0.25,
        },
        1.00
      );

      // 2. Parallax retract for Image B (slide up faster than container)
      tl.to(
        ".reveal-contact-image-2",
        {
          yPercent: -35,
          ease: "none",
          duration: 0.25,
        },
        1.00
      );

      // 3. Staggered parallax retract for title, links and text elements
      tl.to(
        [
          ".reveal-contact-title", 
          ".reveal-contact-email", 
          ".reveal-contact-phone", 
          ".reveal-contact-social", 
          ".reveal-contact-message"
        ],
        {
          yPercent: -120,
          ease: "none",
          duration: 0.25,
          stagger: 0.015,
        },
        1.00
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
        <div className="reveal-contact-title absolute top-[6px] left-[4px] select-none pointer-events-auto whitespace-nowrap">
          <h2 className="font-tusker-standard text-[8vw] md:text-[11vw] font-medium uppercase tracking-tighter leading-none text-[#fff7d3] inline-block">
            have an idea?
          </h2>
          <span 
            className="reveal-contact-status absolute left-[calc(100%+16px)] md:left-[calc(100%+24px)] top-[0.8vw] md:top-[0.3vw] font-montreal font-normal text-[#AB1509] text-[10px] md:text-sm tracking-normal inline-block opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            Available for Projects
          </span>
        </div>

        {/* Large contact links (Email & Phone) revealed below the heading */}
        <div 
          className="absolute left-[6px] top-[calc(8vw+16px)] md:top-[calc(11vw+24px)] flex flex-col gap-1.5 md:gap-1 pointer-events-auto z-[70]"
        >
          {/* Email link */}
          <a 
            href="mailto:aliahmedyus@gmail.com" 
            className="reveal-contact-email font-montreal font-medium text-[#fff7d3] text-[3.5vw] md:text-[4vw] tracking-normal leading-[1.35] overflow-hidden h-[1.35em] block group"
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            <span className="email-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
              {/* Normal State */}
              <span className="email-line-normal block h-[1.35em] leading-[1.35] text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300">
                aliahmedyus@gmail.com
              </span>
              {/* Hover State */}
              <span className="email-line-hover block h-[1.35em] leading-[1.35] text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300 flex items-center">
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
            className="reveal-contact-phone font-montreal font-medium text-[#fff7d3] text-[3.5vw] md:text-[4vw] tracking-normal leading-[1.35] overflow-hidden h-[1.35em] block group"
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            <span className="phone-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
              {/* Normal State */}
              <span className="phone-line-normal block h-[1.35em] leading-[1.35] text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300">
                +91 8867145921
              </span>
              {/* Hover State */}
              <span className="phone-line-hover block h-[1.35em] leading-[1.35] text-[#fff7d3] group-hover:text-[#AB1509] transition-colors duration-300 flex items-center">
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

          {/* Social links below phone link */}
          <div className="flex flex-col gap-1.5 md:gap-1 mt-4 md:mt-0">
            {/* Github */}
            <a 
              href="https://github.com/alihahamed" 
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-contact-social font-montreal font-normal text-[#AB1509] text-[12px] md:text-[1.8vw] tracking-normal leading-[1.35] overflow-hidden h-[1.35em] block w-max group"
              style={{ clipPath: "inset(0% 0% 100% 0%)" }}
            >
              <span className="social-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                <span className="social-line-normal block h-[1.35em] leading-[1.35] text-[#AB1509] group-hover:text-[#fff7d3] transition-colors duration-300">
                  github ↗
                </span>
                <span className="social-line-hover block h-[1.35em] leading-[1.35] text-[#fff7d3] transition-colors duration-300">
                  github ↗
                </span>
              </span>
            </a>
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/ali-ahmed-83613b271/" 
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-contact-social font-montreal font-normal text-[#AB1509] text-[12px] md:text-[1.8vw] tracking-normal leading-[1.35] overflow-hidden h-[1.35em] block w-max group"
              style={{ clipPath: "inset(0% 0% 100% 0%)" }}
            >
              <span className="social-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                <span className="social-line-normal block h-[1.35em] leading-[1.35] text-[#AB1509] group-hover:text-[#fff7d3] transition-colors duration-300">
                  linkedin ↗
                </span>
                <span className="social-line-hover block h-[1.35em] leading-[1.35] text-[#fff7d3] transition-colors duration-300">
                  linkedin ↗
                </span>
              </span>
            </a>
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/aliahmd.25/" 
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-contact-social font-montreal font-normal text-[#AB1509] text-[12px] md:text-[1.8vw] tracking-normal leading-[1.35] overflow-hidden h-[1.35em] block w-max group"
              style={{ clipPath: "inset(0% 0% 100% 0%)" }}
            >
              <span className="social-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                <span className="social-line-normal block h-[1.35em] leading-[1.35] text-[#AB1509] group-hover:text-[#fff7d3] transition-colors duration-300">
                  instagram ↗
                </span>
                <span className="social-line-hover block h-[1.35em] leading-[1.35] text-[#fff7d3] transition-colors duration-300">
                  instagram ↗
                </span>
              </span>
            </a>
            {/* X */}
            <a 
              href="https://x.com/AhmedAli8177" 
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-contact-social font-montreal font-normal text-[#AB1509] text-[12px] md:text-[1.8vw] tracking-normal leading-[1.35] overflow-hidden h-[1.35em] block w-max group"
              style={{ clipPath: "inset(0% 0% 100% 0%)" }}
            >
              <span className="social-roll-wrapper block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                <span className="social-line-normal block h-[1.35em] leading-[1.35] text-[#AB1509] group-hover:text-[#fff7d3] transition-colors duration-300">
                  x ↗
                </span>
                <span className="social-line-hover block h-[1.35em] leading-[1.35] text-[#fff7d3] transition-colors duration-300">
                  x ↗
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Dynamic editorial bottom-left message */}
        <div 
          className="reveal-contact-message absolute bottom-6 left-6 md:bottom-1 md:left-2 flex flex-col md:flex-row gap-6 md:gap-16 max-w-[90vw] md:max-w-[800px] items-start pointer-events-auto"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <p className="max-w-[280px] md:max-w-[340px] font-montreal font-normal text-white/90 text-[14px] md:text-[15px] monitor:text-[17.5px] leading-[1.3] select-none">
            I build for people who think settling for good enough is the problem. Founders, brands, agencies — if you've got something worth building and you want it done right, not just done fast, let's make something people can't stop looking at.
          </p>
          <p className="max-w-[280px] md:max-w-[320px] font-montreal font-normal text-[#AB1509] text-[14px] md:text-[15px] monitor:text-[17.5px] leading-[1.3] select-none whitespace-pre-line">
            If you want generic templates,{"\n"}
            rushed timelines, or high volume,{"\n"}
            Ali is the wrong choice.
          </p>
        </div>

        {/* Tall parallax image on the right (Vertically centered) */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden md:block z-50">
          <div 
            className="reveal-contact-image-2 w-[20vw] aspect-[9/16] bg-neutral-900 relative overflow-hidden"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/you-consumed-enough.png"
              alt="You consumed enough"
              fill
              className="reveal-img-inner-2 object-cover"
              sizes="18vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
