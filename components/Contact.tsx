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
          start: "top bottom", // Start when the top of the contact section enters the viewport
          end: "bottom bottom", // End when the contact section fully covers the viewport
          scrub: true,
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

      // Subtle editorial vertical translate for the title as it is revealed
      tl.fromTo(
        ".reveal-contact-title",
        { y: 80 },
        {
          y: 0,
          ease: "power2.out",
        },
        0.5 // Start sliding in the second half of the scrub
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="contact-section"
      className="relative w-full h-[150vh] z-[60] pointer-events-none"
    >
      {/* Viewport-fixed background wrapper with clip-path reveal */}
      <div 
        ref={circleRef}
        className="fixed inset-0 w-full h-screen bg-[#050505] z-0 pointer-events-none flex flex-col items-center justify-center"
        style={{
          clipPath: "circle(0% at 50% 100%)",
          willChange: "clip-path",
        }}
      >
        {/* Giant Contact Heading (revealed as the circle covers the screen) */}
        <h2 className="reveal-contact-title font-tusker-standard text-[12vw] md:text-[15vw] font-medium uppercase tracking-tighter leading-none text-[#fff7d3] select-none pointer-events-auto">
          Contact
        </h2>
      </div>
    </section>
  );
}
