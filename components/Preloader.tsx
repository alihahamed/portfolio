"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTransitionContext } from "./PageTransition";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { triggerPreloadTransition, triggerEnterTransition } = useTransitionContext();
  const [isMounted, setIsMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const timelineStartedRef = useRef(false);

  // Prevent hydration discrepancies
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (timelineStartedRef.current) return;
    timelineStartedRef.current = true;

    const container = containerRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const row3 = row3Ref.current;
    if (!container || !row1 || !row2 || !row3) return;

    // Reset all animated rows to initial hidden state to handle React StrictMode double mounts safely
    gsap.set([row1, row2, row3], { autoAlpha: 0, visibility: "hidden" });

    // Stark Brutalist Light Bulb Switch Timeline
    const tl = gsap.timeline({
      onComplete: async () => {
        // Keep the grid layout intact so row2 doesn't jump or collapse.
        // row1 and row3 are already hidden via autoAlpha: 0 and visibility: "hidden" from the timeline.

        // 1. Play the Red Transition leave wipe displaying "Ali Ahmed"
        await triggerPreloadTransition("Ali Ahmed");
        
        // 2. Unmount the preloader from the DOM
        onComplete();
        
        // 3. Play the Enter transition collapse reveal to show Home Page
        triggerEnterTransition();
      }
    });

    // Zero-duration .set() acts like a stark light switch flipping ON/OFF synchronously
    
    // t = 0.0s: Row 1 Switches ON instantly
    tl.set(row1, { autoAlpha: 1, visibility: "visible" })
      
      // t = 2.0s: Row 1 Switches OFF instantly
      .set(row1, { autoAlpha: 0, visibility: "hidden" }, "+=2.0")
      
      // t = 3.0s (1s dark pause): Row 3 Switches ON instantly
      .set(row3, { autoAlpha: 1, visibility: "visible" }, "+=1.0")
      
      // t = 5.0s: Row 3 Switches OFF instantly
      .set(row3, { autoAlpha: 0, visibility: "hidden" }, "+=2.0")
      
      // t = 6.0s (1s dark pause): Row 2 (Middle) Switches ON instantly — stays visible through wipe
      .set(row2, { autoAlpha: 1, visibility: "visible" }, "+=1.0")
      
      // t = 8.0s (Row 2 stays ON for exactly 2.0s before timeline finishes and triggers wipe)
      .to({}, { duration: 2.0 });

    return () => {
      tl.kill();
    };
  }, [isMounted, triggerPreloadTransition, triggerEnterTransition, onComplete]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-dvh bg-[#050505] select-none grid grid-rows-3 overflow-hidden"
      style={{ zIndex: 9999 }} // Underneath transition overlay (99999) to cover smoothly
    >
      {/* 16px Grid noise texture for brutal print effect */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[radial-gradient(#050505_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Row 1 (Top): "MOST WEBSITES LOOK THE SAME" - stretched end-to-end with slight top margin */}
      <div 
        ref={row1Ref} 
        className="flex items-start justify-start w-full overflow-hidden pt-3 mt-3 z-20"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <svg viewBox="0 0 1000 110" className="w-full h-auto block select-none leading-none" preserveAspectRatio="none">
          <text 
            x="0" 
            y="90" 
            fontFamily="var(--font-tusker-standard)" 
            fontSize="100" 
            fontWeight="500" 
            textLength="1000" 
            lengthAdjust="spacingAndGlyphs" 
            fill="#fff7d3"
          >
            MOST WEBSITES LOOK THE SAME
          </text>
        </svg>
      </div>

      {/* Row 2 (Middle): "LETS FIND OUT." - centered brutalist */}
      <div 
        ref={row2Ref} 
        className="flex items-center justify-center w-full overflow-hidden px-6 z-20"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <h1 
          className="font-tusker-standard text-[8.5vw] md:text-[7.5vw] font-medium tracking-tight text-center uppercase leading-none text-[#fff7d3]"
        >
          LETS FIND OUT.
        </h1>
      </div>

      {/* Row 3 (Bottom): "THIS ONE PROBABLY DOES TOO" - stretched end-to-end with slight bottom margin */}
      <div 
        ref={row3Ref} 
        className="flex items-end justify-start w-full overflow-hidden pb-2 mb-2 z-20"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <svg viewBox="0 0 1000 110" className="w-full h-auto block select-none leading-none" preserveAspectRatio="none">
          <text 
            x="0" 
            y="90" 
            fontFamily="var(--font-tusker-standard)" 
            fontSize="100" 
            fontWeight="500" 
            textLength="1000" 
            lengthAdjust="spacingAndGlyphs" 
            fill="#fff7d3"
          >
            THIS ONE PROBABLY DOES TOO
          </text>
        </svg>
      </div>
    </div>
  );
}
