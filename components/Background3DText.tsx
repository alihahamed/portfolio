"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LEFT_ITEMS = [
  "DESIGN FORWARD", "BUILT DIFFERENT", "STAY HUNGRY", "PIXEL PERFECT", "BREAK RULES", "THINK BIGGER",
  "DESIGN FORWARD", "BUILT DIFFERENT", "STAY HUNGRY", "PIXEL PERFECT", "BREAK RULES", "THINK BIGGER",
  "DESIGN FORWARD", "BUILT DIFFERENT", "STAY HUNGRY", "PIXEL PERFECT", "BREAK RULES", "THINK BIGGER",
  "DESIGN FORWARD", "BUILT DIFFERENT", "STAY HUNGRY", "PIXEL PERFECT", "BREAK RULES", "THINK BIGGER"
];

const RIGHT_ITEMS = [
  "NEVER SETTLE", "MOVE FAST", "STAY SHARP", "PURE CRAFT", "PUSH LIMITS", "GO FURTHER",
  "NEVER SETTLE", "MOVE FAST", "STAY SHARP", "PURE CRAFT", "PUSH LIMITS", "GO FURTHER",
  "NEVER SETTLE", "MOVE FAST", "STAY SHARP", "PURE CRAFT", "PUSH LIMITS", "GO FURTHER",
  "NEVER SETTLE", "MOVE FAST", "STAY SHARP", "PURE CRAFT", "PUSH LIMITS", "GO FURTHER"
];

export default function Background3DText() {
  const leftWrapperRef = useRef<HTMLUListElement>(null);
  const rightWrapperRef = useRef<HTMLUListElement>(null);
  const leftItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const rightItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const calculateStaticPositions = () => {
      const leftItems = leftItemsRef.current.filter(Boolean);
      const rightItems = rightItemsRef.current.filter(Boolean);

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Position left items statically
      if (leftWrapperRef.current && leftItems.length > 0) {
        const radius = leftWrapperRef.current.offsetWidth / 2;
        const totalItems = leftItems.length;
        const spacing = Math.PI / totalItems;

        leftItems.forEach((item, index) => {
          const angle = index * spacing;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const rotation = (angle * 180) / Math.PI;

          gsap.set(item, {
            x,
            y,
            rotation,
            transformOrigin: "center center",
          });
        });
      }

      // Position right items statically
      if (rightWrapperRef.current && rightItems.length > 0) {
        const radius = rightWrapperRef.current.offsetWidth / 2;
        const totalItems = rightItems.length;
        const spacing = Math.PI / totalItems;

        rightItems.forEach((item, index) => {
          const angle = index * spacing;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const rotation = (angle * 180) / Math.PI + 180;

          gsap.set(item, {
            x,
            y,
            rotation,
            transformOrigin: "center center",
          });
        });
      }
    };

    // Calculate static positions immediately
    calculateStaticPositions();

    const handleResize = () => {
      calculateStaticPositions();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="z-30 absolute inset-0 w-full h-full overflow-hidden about-3d-text-container pointer-events-none select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-left {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes spin-right {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-left {
          animation: spin-left 150s linear infinite;
          will-change: transform;
          transform-style: preserve-3d;
          transform-origin: center center;
        }
        .animate-spin-right {
          animation: spin-right 150s linear infinite;
          will-change: transform;
          transform-style: preserve-3d;
          transform-origin: center center;
        }
      `}} />

      {/* Left text wheel container */}
      <div className="left-[23%] absolute w-[100vw] h-full -translate-x-full pointer-events-none">
        <ul
          ref={leftWrapperRef}
          className="m-0 p-0 w-full h-full animate-spin-left list-none"
        >
          {LEFT_ITEMS.map((name, index) => (
            <li
              key={index}
              ref={(el) => {
                leftItemsRef.current[index] = el;
              }}
              className="top-0 left-0 absolute w-[10rem] w-[25rem] sm:w-[15rem] md:w-[25rem] font-tusker-standard font-medium text-[#AB1509]/30 text-[clamp(1.5rem,5vw,6.5rem)] uppercase leading-none tracking-tighter whitespace-nowrap -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right text wheel container */}
      <div className="left-[83%] absolute w-[100vw] h-full pointer-events-none">
        <ul
          ref={rightWrapperRef}
          className="m-0 p-0 w-full h-full animate-spin-right list-none"
        >
          {RIGHT_ITEMS.map((name, index) => (
            <li
              key={index}
              ref={(el) => {
                rightItemsRef.current[index] = el;
              }}
              className="top-0 left-0 absolute w-[10rem] w-[25rem] sm:w-[15rem] md:w-[25rem] font-tusker-standard font-medium text-[#AB1509]/30 text-[clamp(1.5rem,5vw,6.5rem)] text-left uppercase leading-none tracking-tighter whitespace-nowrap -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
