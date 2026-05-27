"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ScrollArrow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<SVGSVGElement>(null);
  const shaftRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // 2. Set initial hidden states
    gsap.set(shaftRef.current, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(headRef.current, { scaleY: 0, transformOrigin: "top center", opacity: 0 });

    // 3. Drawing timeline
    const drawTl = gsap.timeline();

    drawTl.to(shaftRef.current, {
      scaleY: 1,
      duration: 1.2,
      ease: "power2.inOut",
    });

    drawTl.to(headRef.current, {
      scaleY: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4");

    // 4. Liquid flow loop (paused initially)
    const flowTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });

    flowTl.fromTo(
      flowRef.current,
      { clipPath: "inset(0% 0% 88% 0%)" },
      {
        clipPath: "inset(88% 0% 0% 0%)",
        duration: 2.2,
        ease: "power2.inOut",
      }
    );

    // Play loop when drawing is complete
    drawTl.eventCallback("onComplete", () => {
      flowTl.play();
    });

    return () => {
      drawTl.kill();
      flowTl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center select-none"
      style={{ width: "50px", height: "80px" }}
    >
      {/* Background Track (Thin, Subtle White Arrow) */}
      <svg 
        width="38" 
        height="88" 
        viewBox="0 0 18 70" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute text-white opacity-[0.45]"
      >
        <path ref={shaftRef} d="M9 0V64" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path ref={headRef} d="M3 58L9 64L15 58" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Foreground Highlight (Deep Accent Yellow Flowing Highlight) */}
      <svg 
        ref={flowRef}
        width="38" 
        height="88" 
        viewBox="0 0 18 70" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute text-accent"
        style={{ willChange: "clip-path" }}
      >
        <path d="M9 0V64" stroke="#fff7d3" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M3 58L9 64L15 58" stroke="#fff7d3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
