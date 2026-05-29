"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  images: string[];
  description: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "HAUTE COUTURE NIGHTS – PARIS",
    images: ["/abg-2.png", "/abg-1.png", "/abg-3.png", "/abg-4.png"],
    description: "An immersive digital showcase capturing the elegance and fine craftsmanship of Parisian high fashion runways, designed with dark-mode brutalist elements and interactive projections.",
  },
  {
    id: 2,
    title: "VOGUE EVOLUTION – NEW YORK CITY",
    images: ["", "", "", ""],
    description: "Tracing the iconic styling and dynamic visual transformations of metropolitan streetwear and urban elegance through active scroll-driven landscape projections.",
  },
  {
    id: 3,
    title: "GLAMOUR IN THE DESERT – DUBAI",
    images: ["", "", "", ""],
    description: "A luxurious visual compilation of high-end design houses, shimmering architecture, and sand-themed color palettes integrated seamlessly with fluid motion physics.",
  },
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate all parent-level horizontal grid lines drawing out from left to right on scroll (scrubbed)
      const allLines = containerRef.current?.querySelectorAll(".work-line");
      if (allLines && allLines.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        tl.fromTo(
          allLines,
          { scaleX: 0 },
          {
            scaleX: 1,
            stagger: 0.08,
            ease: "none",
          }
        );
      }

      scenesRef.current.forEach((scene, index) => {
        if (!scene) return;

        const carousel = scene.querySelector(".work__carousel");
        const cards = scene.querySelectorAll(".work__card");

        // 3. Scroll-linked 3D cylinder rotation animation
        if (carousel && cards.length > 0) {
          const tl = gsap.timeline({
            defaults: { ease: "sine.inOut" },
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          tl.fromTo(carousel, { rotationY: 0 }, { rotationY: -180, duration: 1 }, 0)
            .fromTo(
              carousel,
              { rotationZ: 4, rotationX: 4 },
              { rotationZ: -4, rotationX: -4, duration: 1 },
              0
            )

          // 2. Separate, decoupled scroll-linked typing animation for project title - types scroll-down, redacts scroll-up
          const titleChars = scene.querySelectorAll(".work-scene-title-new .char");
          if (titleChars.length > 0) {
            gsap.fromTo(
              titleChars,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: 0.015,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top bottom",
                  end: "top 20%",
                  scrub: true,
                },
              }
            );
          }

          // 3. Separate, decoupled scroll-linked typing animation for project description - types scroll-down, redacts scroll-up
          const descChars = scene.querySelectorAll(".work-scene-desc-new .char");
          if (descChars.length > 0) {
            gsap.fromTo(
              descChars,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: 0.015,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top bottom",
                  end: "top 20%",
                  scrub: true,
                },
              }
            );
          }

          // Individually animate brightness of each card based on its position in the rotation (adds 3D lighting depth!)
          cards.forEach((card, cardIdx) => {
            if (cardIdx === 0) {
              // Card 1 (Front): Starts bright, dims as it rotates to the back
              tl.fromTo(card, 
                { filter: "brightness(80%)" }, 
                { filter: "brightness(65%)", duration: 0.5, ease: "sine.inOut" }, 
                0
              ).to(card, 
                { filter: "brightness(20%)", duration: 0.5, ease: "sine.inOut" }, 
                0.5
              );
            } else if (cardIdx === 1) {
              // Card 2 (Right Side): Starts dim, becomes bright at the center (0.5 scroll), then dims to the left
              tl.fromTo(card, 
                { filter: "brightness(45%)" }, 
                { filter: "brightness(80%)", duration: 0.5, ease: "sine.inOut" }, 
                0
              ).to(card, 
                { filter: "brightness(35%)", duration: 0.5, ease: "sine.inOut" }, 
                0.5
              );
            } else if (cardIdx === 2) {
              // Card 3 (Back): Starts dark, becomes bright as it rotates to the front
              tl.fromTo(card, 
                { filter: "brightness(20%)" }, 
                { filter: "brightness(45%)", duration: 0.5, ease: "sine.inOut" }, 
                0
              ).to(card, 
                { filter: "brightness(100%)", duration: 0.5, ease: "sine.inOut" }, 
                0.5
              );
            } else if (cardIdx === 3) {
              // Card 4 (Left Side): Starts dim, rotates to the back (dims), then returns to the side
              tl.fromTo(card, 
                { filter: "brightness(45%)" }, 
                { filter: "brightness(20%)", duration: 0.5, ease: "sine.inOut" }, 
                0
              ).to(card, 
                { filter: "brightness(45%)", duration: 0.5, ease: "sine.inOut" }, 
                0.5
              );
            }
          });

          tl.fromTo(
            cards,
            { rotationZ: 8 },
            { rotationZ: -8, duration: 1, ease: "none" },
            0
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden"
    >
      {/* "selected work" label placed inside a matching 4-column grid to align perfectly beneath the hero's ScrollArrow */}
      <div className="absolute top-10 left-0 w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 z-20 pointer-events-none select-none">
        <div className="hidden md:block md:col-span-3"></div>
        <div className="text-[12px] uppercase tracking-widest font-montreal text-[#fff7d3] font-medium pl-2 md:pl-12">
          Selected Work
        </div>
      </div>

      {/* Continuous Draw-out Horizontal brand-red grid lines across the entire 300vh work section */}
      {/* 5 lines per viewport height (spaced equally at 20vh intervals), 15 lines total across 300vh */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "5.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "10.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "16.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "23.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "30.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "36.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "43.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "50.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "56.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "63.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "70.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "76.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "83.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "90.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "96.66%", transform: "scaleX(0)" }} />
      </div>

      {PROJECTS_DATA.map((project, sceneIndex) => {
        // Splitting title and description into characters manually for react robust animation
        const titleChars = project.title.split("");
        const descChars = project.description.split("");

        return (
          <div
            key={project.id}
            ref={(el) => {
              scenesRef.current[sceneIndex] = el;
            }}
            className="work__scene"
          >
            {/* Bottom-left Project Title (styled with Tailwind CSS directly for manual edits) */}
            <h2 className="work-scene-title-new absolute m-0 pointer-events-none font-montreal font-medium text-yellow-soft uppercase tracking-normal z-20 text-[12px] md:text-[18px] text-left left-[max(2rem,calc(50%-300px))] right-[max(2rem,calc(50%-300px))] bottom-[10%] lg:left-10 lg:bottom-55 lg:text-left ">
              {titleChars.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="char inline-block select-none opacity-0"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>

            {/* Bottom-left Project Description (styled with Tailwind CSS directly for manual edits) */}
            <p className="work-scene-desc-new absolute m-0 pointer-events-none font-montreal font-normal text-yellow-soft/70 z-20 text-[10px] md:text-[15px] leading-[1.5] text-left left-[max(2rem,calc(50%-300px))] right-[max(2rem,calc(50%-300px))] bottom-[4%] lg:left-auto lg:right-10 lg:bottom-20 lg:text-right lg:w-[450px]">
              {descChars.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="char inline-block select-none opacity-0"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>

            {/* 3D Carousel Cylinder (4 card cells) */}
            <div className="work__carousel">
              {project.images.map((imgUrl, cardIndex) => {
                // Calculate circular geometry transforms for 4 cells (radius = 420px)
                const angle = cardIndex * 90; // 360 / 4 = 90
                const transform = `rotateY(${angle}deg) translateZ(420px)`;

                return (
                  <div
                    key={cardIndex}
                    className="work__carousel-cell"
                    style={{ transform }}
                  >
                    <div className="work__card">
                      <div
                        className="work__card-face"
                        style={{
                          backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
