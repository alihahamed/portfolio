"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LEFT_ITEMS = [
  "DESIGN FORWARD", "BUILT DIFFERENT", "STAY HUNGRY",
  "PIXEL PERFECT", "BREAK RULES", "THINK BIGGER",
];

const RIGHT_ITEMS = [
  "NEVER SETTLE", "MOVE FAST", "STAY SHARP",
  "PURE CRAFT", "PUSH LIMITS", "GO FURTHER",
];

const buildTrack = (items: string[]) => {
  const set = [...items, ...items, ...items]; 
  return [...set, ...set]; 
};

export default function Background3DText() {
  const leftTrack = buildTrack(LEFT_ITEMS);
  const rightTrack = buildTrack(RIGHT_ITEMS);
  const leftWrapperRef = useRef<HTMLDivElement>(null);
  const rightWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial 2D state for straight marquee
    gsap.set(leftWrapperRef.current, {
      perspective: "none",
      transformStyle: "flat",
      rotateY: 0,
    });
    
    gsap.set(rightWrapperRef.current, {
      perspective: "none",
      transformStyle: "flat",
      rotateY: 0,
    });
  }, []);

  return (
    <div 
      className="about-3d-text-container z-30 absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .marquee-track-up {
          animation: marquee-up 45s linear infinite;
          will-change: transform;
        }
        .marquee-track-down {
          animation: marquee-down 45s linear infinite;
          will-change: transform;
        }
      `}} />

      {/* Left column */}
      <div 
        ref={leftWrapperRef}
        className="top-0 left-0 absolute w-[23%] h-full overflow-visible text-3d-left-wrapper origin-right"
      >
        <div className="flex flex-col marquee-track-up">
          {leftTrack.map((text, i) => (
            <div
              key={i}
              className="py-[1vw] font-tusker-standard font-medium text-[#AB1509]/30 text-[clamp(1.5rem,5vw,6.5rem)] uppercase leading-[1.15] tracking-tighter whitespace-nowrap"
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div 
        ref={rightWrapperRef}
        className="top-0 right-0 text-3d-right-wrapper absolute w-[23%] h-full overflow-visible origin-left"
      >
        <div className="flex flex-col marquee-track-down">
          {rightTrack.map((text, i) => (
            <div
              key={i}
              className="py-[1vw] font-tusker-standard font-medium text-[#AB1509]/30 text-[clamp(1.5rem,5vw,6.5rem)] text-right uppercase leading-[1.15] tracking-tighter whitespace-nowrap"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
