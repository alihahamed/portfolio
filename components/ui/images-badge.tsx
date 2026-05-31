"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FileCard {
  id: string;
  title: string;
  copy: string;
}

interface ImagesBadgeProps {
  className?: string;
  folderSize?: { width: number; height: number };
}

export function ImagesBadge({
  className,
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // The 4 approach files/cards
  const cards: FileCard[] = [
    {
      id: "first move",
      title: "FIRST MOVE",
      copy: "Before anything gets designed, I spend time just understanding what the site needs to do. Not aesthetically, functionally. Who's landing on it, what they need to feel, what they need to do next. That clarity is what everything else gets built on.",
    },
    {
      id: "the feel",
      title: "THE FEEL",
      copy: "I decide how the site moves before I decide how it looks. Animation isn't decoration, it's how the page communicates. If the motion feels off, the whole thing feels off, no matter how good it looks static.",
    },
    {
      id: "edit",
      title: "WHAT GETS CUT",
      copy: "Most of my time is spent removing things. A section that doesn't pull its weight, a transition that's too much, copy that's trying too hard. The final version is usually half of what I started with.",
    },
    {
      id: "the hand off",
      title: "THE HAND OFF",
      copy: "I don't drop a Vercel link and disappear. I make sure whoever I'm handing this to actually understands what they have. Documented, clean, and built so it doesn't fall apart the moment someone touches it after me.",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none cursor-pointer",
        // Default: width 180px, height 120px, spread 64px, offset -110px, lift -45px
        "[--folder-w:180px] [--folder-h:120px] [--fan-spread:74px] [--fan-y:-70px] [--card-lift:-45px]",
        // Large monitor: width 215px, height 145px, spread 76px, offset -135px, lift -55px
        "monitor:[--folder-w:215px] monitor:[--folder-h:145px] monitor:[--fan-spread:86px] monitor:[--fan-y:-80px] monitor:[--card-lift:-55px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredCard(null);
      }}
      style={{
        width: "var(--folder-w)",
        height: "calc(var(--folder-h) + 40px)", // extra vertical padding for cards pop out
        perspective: 1200,
      }}
    >
      {/* 3D Physical Folder Wrapper - Kept straight, but tilted downwards from the top for massive 3D depth */}
      <motion.div
        className="relative w-full h-full transform-3d"
        style={{
          width: "var(--folder-w)",
          height: "var(--folder-h)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateZ: 0, // perfectly straight
          rotateX: isHovered ? -22 : -17, // tilted downwards from the top (laying back slightly on the page)
          y: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      >
        {/* FOLDER BACK - Deeper, highly-visible 3D drop shadow projecting onto document */}
        <div
          className="absolute inset-0 rounded-[6px] bg-[#851007] shadow-[0_25px_50px_rgba(44,10,7,0.5),_0_8px_20px_rgba(44,10,7,0.3)]"
          style={{
            transform: "translateZ(-15px)",
            border: "1px solid rgba(255, 247, 211, 0.15)",
          }}
        >
          {/* Folder Tab (Back Left) - Proportions computed via css variables */}
          <div
            className="absolute rounded-t-[4px] bg-[#AB1509]"
            style={{
              top: "calc(var(--folder-h) * -0.2 + 1px)",
              left: "4px",
              width: "calc(var(--folder-w) * 0.4)",
              height: "calc(var(--folder-h) * 0.2)",
              borderLeft: "1px solid rgba(255, 247, 211, 0.15)",
              borderTop: "1px solid rgba(255, 247, 211, 0.15)",
              borderRight: "1px solid rgba(255, 247, 211, 0.15)",
            }}
          />
        </div>

        {/* INTERACTIVE FILES (SLIDE UP & FAN OUT) */}
        {cards.map((card, index) => {
          const isCardHovered = hoveredCard === card.id;
          const totalCards = cards.length;

          // Fan out rotation and translation on main folder hover
          const fanRotation = (index - (totalCards - 1) / 2) * 18; // gentle fanning
          
          // Y-offset when teased vs fanned
          const teaseY = -12 + index * 1.5;

          // Active/Hovered card gets extra z-axis lift, rotation reset and scale
          const cardZ = isCardHovered ? 60 : -2 - index;
          const cardRotation = isHovered ? fanRotation : (index - 1.5) * 2; // keep fanned/tilted angle on hover as requested

          return (
            <motion.div
              key={card.id}
              className="absolute left-[12%] origin-bottom"
              style={{
                width: "76%", // narrower width to eliminate overlapping hover intercepts
                bottom: 0,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: isHovered
                  ? `calc(var(--fan-y) - ${(totalCards - index) * 6}px)`
                  : teaseY,
                x: isHovered
                  ? `calc(${index - 1.5} * var(--fan-spread))`
                  : 0,
                rotateZ: cardRotation,
                zIndex: isCardHovered ? 50 : 10 + index, // animate zIndex inside the fanned slot wrapper
                height: isHovered ? "130%" : "97%",
                width:isHovered ? "95%" : "76%", // dynamically taller ONLY when fanned out
              }}
              transition={
                isCardHovered
                  ? { type: "spring", stiffness: 220, damping: 22, delay: isHovered ? index * 0.04 : (totalCards - 1 - index) * 0.02 }
                  : { type: "tween", duration: 0.18, ease: "easeOut", delay: isHovered ? index * 0.04 : (totalCards - 1 - index) * 0.02 }
              }
              onMouseEnter={() => isHovered && setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* VISUAL PAPER CARD - Handles individual pop-up, Z-axis pop, and scale-up */}
              <motion.div
                className="w-full h-full rounded-[3px] bg-[#fff7d3] border border-[#AB1509] p-2 flex flex-col justify-between overflow-hidden shadow-[0_6px_15px_rgba(0,0,0,0.22),_0_2px_5px_rgba(0,0,0,0.12)] origin-bottom"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  y: isCardHovered ? "var(--card-lift)" : 0,
                  z: cardZ, // pop forward in 3D
                  scale: isCardHovered ? 1.12 : 1, // scale up by 12% on hover
                }}
                transition={
                  isCardHovered
                    ? { type: "spring", stiffness: 200, damping: 20 }
                    : { type: "tween", duration: 0.12, ease: "easeOut" }
                }
              >
                {/* Paper Tab Detail */}
                <div className="flex items-center justify-between border-b border-[#AB1509]/20 pb-1 mb-1">
                  <span className="text-[1.5vh] font-semibold tracking-widest font-montreal text-[#AB1509]">
                    {card.title}
                  </span>
                  <span className="text-[1.2vh] opacity-80 font-montreal text-[#AB1509]">
                    0{index + 1}
                  </span>
                </div>

                {/* Card Placeholder / Content Area */}
                <div className="flex-1 flex flex-col justify-center items-start text-[#AB1509] overflow-hidden">
                  <motion.p
                    className="text-[1.47vh] font-normal leading-[1.3] font-montreal tracking-tight text-left"
                    
                    transition={{ duration: 0.15 }}
                  >
                    {card.copy}
                  </motion.p>
                </div>

                {/* Minimalist physical paper line lines */}
                <div className="w-full h-[1px] bg-[#AB1509]/10 mt-1" />
              </motion.div>
            </motion.div>
          );
        })}

        {/* FOLDER FRONT (Opens up/flattens on hover) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-[6px] bg-[#AB1509] shadow-[0_-3px_12px_rgba(0,0,0,0.18)]"
          style={{
            borderLeft: "1px solid rgba(255, 247, 211, 0.15)",
            borderBottom: "1px solid rgba(255, 247, 211, 0.15)",
            borderRight: "1px solid rgba(255, 247, 211, 0.15)",
            transformStyle: "preserve-3d",
            zIndex: 30,
          }}
          animate={{
            rotateX: isHovered ? -42 : 0,
            scaleY: isHovered ? 0.95 : 1,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {/* Accent Line Detail like a real folder seam */}
          <div className="absolute top-2 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-[#fff7d3]/20 to-transparent" />
          
          {/* CENTER TEXT: "My Approach" in Soft Yellow Neue Montreal Medium */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[#fff7d3] font-montreal font-medium text-[2.2vh] tracking-wide select-none">
              How I Work
            </span>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
