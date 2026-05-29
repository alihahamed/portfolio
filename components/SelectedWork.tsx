"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  label: string;
  value: number;
  suffix?: string;
}

interface TechItem {
  label: string;
  iconKey: string;
}

interface Project {
  id: number;
  title: string;
  images: string[];
  description: string;
  approach: string;
  techStack: TechItem[];
  metrics: Metric[];
  projectUrl: string;
  projectVideo: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "HAUTE COUTURE NIGHTS – PARIS",
    images: ["/abg-1.png", "/abgg.png", "/ab.png", "/abg.png"],
    description: "An immersive digital showcase capturing the elegance and fine craftsmanship of Parisian high fashion runways, designed with dark-mode brutalist elements and interactive projections.",
    approach: "Blending high-fashion editorial aesthetics with raw brutalist code structure. We engineered a seamless 3D projections system that casts virtual runway shadows across deep-pitch black frames. Standard scroll physics are modified to mimic the slow, luxurious pacing of Parisian high couture walks, creating a high-contrast experience.",
    techStack: [
      { label: "Next.js", iconKey: "nextjs" },
      { label: "GSAP 3D", iconKey: "gsap" },
      { label: "Tailwind CSS", iconKey: "tailwind" },
      { label: "WebGL Engine", iconKey: "webgl" }
    ],
    metrics: [
      { label: "Runways Mapped", value: 12, suffix: "" },
      { label: "Avg Engagement", value: 87, suffix: "%" },
      { label: "Assets Rendered", value: 142, suffix: "" }
    ],
    projectUrl: "https://haute-couture.paris",
    projectVideo: "demo.mp4"
  },
  {
    id: 2,
    title: "VOGUE EVOLUTION – NEW YORK CITY",
    images: ["", "", "", ""],
    description: "Tracing the iconic styling and dynamic visual transformations of metropolitan streetwear and urban elegance through active scroll-driven landscape projections.",
    approach: "Capturing the relentless pace of Manhattan's fashion underground. The motion system uses high-velocity scroll-scrubs, triggering reactive typographic overlays that warp alongside the rotating cylinder carousel. Our layouts leverage high-contrast frames and modular raw elements to structure urban storytelling.",
    techStack: [
      { label: "React 19", iconKey: "react" },
      { label: "GSAP Scrub", iconKey: "gsap" },
      { label: "Tailwind v4", iconKey: "tailwind" },
      { label: "Framer Motion", iconKey: "framer" }
    ],
    metrics: [
      { label: "Projects Tracked", value: 8, suffix: "" },
      { label: "Scrub Frames", value: 1440, suffix: "" },
      { label: "Projections", value: 350, suffix: "m" }
    ],
    projectUrl: "https://vogue.nyc",
    projectVideo: "https://assets.mixkit.co/videos/preview/mixkit-urban-fashion-runway-showcase-40290-large.mp4"
  },
  {
    id: 3,
    title: "GLAMOUR IN THE DESERT – DUBAI",
    images: ["", "", "", ""],
    description: "A luxurious visual compilation of high-end design houses, shimmering architecture, and sand-themed color palettes integrated seamlessly with fluid motion physics.",
    approach: "Evoking golden desert sands and architectural brilliance using high-end fluid WebGL motion. We mapped shimmering light projections to scroll positions, letting users drag and rotate massive circular frames that simulate the sweeping desert wind. Typography uses custom editorial spacing.",
    techStack: [
      { label: "Next.js 15", iconKey: "nextjs" },
      { label: "GSAP Motion", iconKey: "gsap" },
      { label: "Tailwind CSS", iconKey: "tailwind" },
      { label: "Fluid Shader", iconKey: "webgl" }
    ],
    metrics: [
      { label: "Houses Detailed", value: 15, suffix: "" },
      { label: "Ratio Grids", value: 32, suffix: "" },
      { label: "Ambient Frames", value: 240, suffix: "" }
    ],
    projectUrl: "https://glamour-desert.dubai",
    projectVideo: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-neon-lights-40296-large.mp4"
  }
];

const TECH_ICONS: { [key: string]: React.ReactNode } = {
  nextjs: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 22.525H0L12 1.475L24 22.525Z" />
    </svg>
  ),
  gsap: (
    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12C2 12 5 3 12 3C19 3 22 12 22 12C22 12 19 21 12 21C5 21 2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  tailwind: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
  ),
  webgl: (
    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  react: (
    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0 12 12)" />
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  framer: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  )
};

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  // Entrance & counters logic when activeProjectId changes
  useEffect(() => {
    if (activeProjectId === null) return;

    const detailsContainer = containerRef.current?.querySelector(`#details-${activeProjectId}`);
    if (detailsContainer) {
      const elements = detailsContainer.querySelectorAll(".details-wipe-reveal");

      gsap.killTweensOf(elements);

      // Set initial clip-path wipe states
      gsap.set(elements, { clipPath: "inset(0% 0% 100% 0%)", y: 20, opacity: 1 });

      // Wipe in with premium editorial motion
      gsap.to(elements, {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration: 1.4,
        ease: "power3.inOut",
        stagger: 0.15,
      });

      // Animate the metrics count-up odometers
      const activeProj = PROJECTS_DATA.find((p) => p.id === activeProjectId);
      if (activeProj) {
        activeProj.metrics.forEach((metric, idx) => {
          const numEl = detailsContainer.querySelector(`.metric-num-${idx}`);
          if (numEl) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: metric.value,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => {
                numEl.textContent = Math.round(obj.val).toString() + (metric.suffix || "");
              },
            });
          }
        });
      }

      // Smoothly scale up the title element inside the scene
      // const titleEl = detailsContainer.parentElement?.querySelector(".work-scene-title-new");
      // if (titleEl) {
      //   gsap.to(titleEl, {
      //     scale: 1.15,
      //     transformOrigin: "left bottom",
      //     duration: 1.2,
      //     ease: "power3.out",
      //   });
      // }

      // IMMERSIVE: Smoothly slide and fade the global Menu trigger button away
      gsap.to(".menu-trigger-wrap", {
        y: -100,
        opacity: 0,
        scale: 0.8,
        pointerEvents: "none",
        duration: 0.8,
        ease: "power3.inOut",
      });


    }
  }, [activeProjectId]);

  // Scroll dismissal logic (15vh scroll down threshold)
  useEffect(() => {
    if (activeProjectId === null) return;

    const startScroll = window.scrollY;
    const threshold = window.innerHeight * 0.15; // 15vh

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll - startScroll > threshold) {
        closeDetails();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeProjectId]);

  const closeDetails = () => {
    if (activeProjectId === null) return;
    const idToClose = activeProjectId;

    // Clear state immediately to prevent click-lock race conditions
    setActiveProjectId(null);

    const detailsContainer = containerRef.current?.querySelector(`#details-${idToClose}`);
    if (detailsContainer) {
      const elements = detailsContainer.querySelectorAll(".details-wipe-reveal");

      gsap.to(elements, {
        clipPath: "inset(0% 0% 100% 0%)",
        y: 20,
        duration: 1.0,
        ease: "power3.inOut",
        stagger: 0.05
      });

      // Smoothly scale back the title to its default state
      // const titleEl = detailsContainer.parentElement?.querySelector(".work-scene-title-new");
      // if (titleEl) {
      //   gsap.to(titleEl, {
      //     scale: 1.0,
      //     duration: 1.0,
      //     ease: "power3.inOut",
      //   });
      // }

      // IMMERSIVE: Smoothly restore the global Menu trigger button
      gsap.to(".menu-trigger-wrap", {
        y: 0,
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.8,
        ease: "power3.inOut",
      });


    }
  };

  const handleCardClick = (projectId: number) => {
    if (activeProjectId === projectId) {
      closeDetails();
    } else {
      if (activeProjectId !== null) {
        closeDetails();
      }
      setActiveProjectId(projectId);
    }
  };

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

          // 2. Separate, decoupled typing animation for project title - triggers once on enter
          const titleChars = scene.querySelectorAll(".work-scene-title-new .char");
          if (titleChars.length > 0) {
            gsap.fromTo(
              titleChars,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: 0.012,
                duration: 0.08,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }

          // Underline drawing animation on scroll - triggers once on enter
          const underline = scene.querySelector(".work-title-underline");
          if (underline) {
            gsap.fromTo(
              underline,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }

          // 3. Separate, decoupled typing animation for project description - triggers once on enter
          const descChars = scene.querySelectorAll(".work-scene-desc-new .char");
          if (descChars.length > 0) {
            gsap.fromTo(
              descChars,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: 0.006, // Fast, clean typing stagger for full description
                duration: 0.05,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                }
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
                { filter: "brightness(90%)", duration: 0.5, ease: "sine.inOut" },
                0
              ).to(card,
                { filter: "brightness(65%)", duration: 0.5, ease: "sine.inOut" },
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
                { filter: "brightness(20%)", duration: 0.5, ease: "sine.inOut" },
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

    // 4. Decoupled Tooltip Cursor tracking on 3D carousel hover
    const carousels = containerRef.current?.querySelectorAll(".work__carousel");
    const cursor = cursorRef.current;

    let onMouseMove: (e: MouseEvent) => void;
    let onMouseEnter: () => void;
    let onMouseLeave: () => void;

    if (cursor && carousels && carousels.length > 0) {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

      onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      onMouseEnter = () => {
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      onMouseLeave = () => {
        gsap.to(cursor, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      carousels.forEach((carousel) => {
        carousel.addEventListener("mousemove", onMouseMove as EventListener);
        carousel.addEventListener("mouseenter", onMouseEnter);
        carousel.addEventListener("mouseleave", onMouseLeave);
      });
    }

    return () => {
      ctx.revert();
      if (carousels && carousels.length > 0 && onMouseMove) {
        carousels.forEach((carousel) => {
          carousel.removeEventListener("mousemove", onMouseMove as EventListener);
          carousel.removeEventListener("mouseenter", onMouseEnter);
          carousel.removeEventListener("mouseleave", onMouseLeave);
        });
      }
    };
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden"
    >
      {/* "selected work" label placed inside a matching 4-column grid to align perfectly beneath the hero's ScrollArrow */}
      <div className={`selected-work-label absolute top-10 left-0 w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 z-20 pointer-events-none select-none transition-all duration-700 ease-in-out ${
        activeProjectId !== null ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
      }`}>
        <div className="hidden md:block md:col-span-3"></div>
        <div className="text-[12px] monitor:text-[14px] uppercase tracking-widest font-montreal text-[#fff7d3] font-medium pl-2 md:pl-10">
          Selected Work
        </div>
      </div>

      {/* Continuous Draw-out Horizontal brand-red grid lines across the entire 300vh work section */}
      <div className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-500 ease-in-out ${
        activeProjectId !== null && isLinkHovered ? "opacity-[0.15]" : "opacity-100"
      }`}>
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
            {/* Project Details Overlay Grid (shows detailed specs when clicked) */}
            <div
              id={`details-${project.id}`}
              className={`absolute inset-0 w-full h-full pointer-events-none z-30 transition-all duration-500 ${activeProjectId === project.id ? "opacity-100" : "opacity-0"
                }`}
            >
              {/* TOP LEFT: Brutalist Metrics Grid (Horizontal) */}
              <div className={`absolute top-[12%] left-6 md:left-12 lg:left-4 flex flex-row gap-12 text-left pointer-events-auto select-none hidden md:flex z-30 transition-opacity duration-500 ease-in-out ${
                isLinkHovered ? "opacity-25" : "opacity-100"
              }`}>
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="details-wipe-reveal opacity-0 flex flex-col items-start gap-1"
                    style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  >
                    <span className="font-montreal font-normal text-[#AB1509] text-[11px] monitor:text-[13px] uppercase tracking-normal">
                      {metric.label}
                    </span>
                    <span
                      className={`metric-num-${idx} font-montreal font-normal text-white/90 text-[36px] md:text-[48px] monitor:text-[50px] leading-none tracking-tighter`}
                    >
                      0{metric.suffix || ""}
                    </span>
                  </div>
                ))}
              </div>

              {/* TOP RIGHT: Immersive Website Link with Video/Image Floating Preview Card */}
              <div className="absolute top-[12%] right-6 md:right-12 lg:right-10 pointer-events-auto text-right z-30 flex flex-col items-end group/link">
                {/* Wiping reveal container for link text */}
                <div 
                  className="details-wipe-reveal opacity-0"
                  style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                >
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsLinkHovered(true)}
                    onMouseLeave={() => setIsLinkHovered(false)}
                    className="font-montreal font-normal text-white/90 hover:text-white text-[15px] monitor:text-[17px] leading-[1.5] uppercase tracking-normal border-b border-white/20 hover:border-white/90 transition-all duration-300 flex items-center gap-1.5"
                  >
                    Visit Work ↗
                  </a>
                </div>

                {/* Floating Video Preview Card (Sibling of clip-path block to prevent clipping) */}
                <div className="absolute top-full mt-4 w-[380px]  border border-[#AB1509] rounded-none overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 scale-95 -translate-y-2 pointer-events-none group-hover/link:opacity-100 group-hover/link:scale-100 group-hover/link:translate-y-0 transition-all duration-300 ease-out origin-top-right z-50">
                  <div className="w-full h-full relative">
                    <video
                      src={project.projectVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle red tint overlay to match the branding */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#AB1509]/15 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* BOTTOM LEFT: Approach Block */}
              <div
                className="details-wipe-reveal absolute bottom-[4%] left-6 md:left-12 lg:left-4 w-[90%] max-w-[450px] monitor:!max-w-[550px] pointer-events-auto text-left opacity-0 hidden lg:flex flex-col z-30"
                style={{ clipPath: "inset(0% 0% 100% 0%)" }}
              >
                <div className={`w-full flex flex-col gap-2 transition-opacity duration-500 ease-in-out ${
                  isLinkHovered ? "opacity-25" : "opacity-100"
                }`}>
                  <span className="font-montreal font-normal text-[#AB1509] text-[11px] monitor:text-[13px] uppercase tracking-normal">
                    Approach
                  </span>
                  <p className="font-montreal font-normal text-white/90 text-[13px] monitor:text-[15px] leading-[1.2]">
                    {project.approach}
                  </p>
                </div>
              </div>

              {/* BOTTOM CENTER-RIGHT (UPPER): Stark Tech Stack Icons */}
              <div
                className="details-wipe-reveal absolute bottom-[38%] right-6 md:right-12 lg:right-10 flex flex-col items-end pointer-events-auto text-right opacity-0 hidden lg:flex z-30"
                style={{ clipPath: "inset(0% 0% 100% 0%)" }}
              >
                <div className={`w-full flex flex-col items-end gap-2 transition-opacity duration-500 ease-in-out ${
                  isLinkHovered ? "opacity-25" : "opacity-100"
                }`}>
                  <span className="font-montreal font-normal text-[#AB1509] text-[11px] monitor:text-[13px] uppercase tracking-normal mb-1">
                    Technologies
                  </span>
                  <div className="flex gap-4 items-center">
                    {project.techStack.map((tech, idx) => (
                      <div
                        key={idx}
                        className="group relative flex items-center justify-center w-9 h-9 monitor:w-[38px] monitor:h-[38px] rounded-full bg-white/5 border border-white/10 text-yellow-soft hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        title={tech.label}
                      >
                        <div className="w-5 h-5 monitor:w-[22px] monitor:h-[22px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                          {TECH_ICONS[tech.iconKey]}
                        </div>
                        {/* Tooltip on hover */}
                        <span className="absolute bottom-full mb-2 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-black border border-white/10 text-yellow-soft text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                          {tech.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-left Project Title and Underline Wrapper */}
            <div className={`absolute z-20 pointer-events-none left-[max(2rem,calc(50%-300px))] right-[max(2rem,calc(50%-300px))] bottom-[10%] lg:left-4 lg:right-auto lg:bottom-65 monitor:bottom-75 transition-opacity duration-500 ease-in-out ${
              activeProjectId === project.id && isLinkHovered ? "opacity-[0.35]" : "opacity-100"
            }`}>
              <h2 className="work-scene-title-new m-0 font-tusker-standard font-medium text-yellow-soft uppercase tracking-normal text-[12px] md:text-[29px] monitor:!text-[40px]  text-left">
                {titleChars.map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="char inline-block select-none opacity-0"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
              {/* Draw-out Underline */}
              <div
                className="work-title-underline h-[1.5px] bg-white/50 mt-1.5 origin-left w-[120px] md:w-[200px]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {/* Bottom-right Project Description (styled with Tailwind CSS directly for manual edits) */}
            <p className={`work-scene-desc-new absolute m-0 pointer-events-none font-montreal font-normal text-yellow-soft/80 z-20 text-[10px] md:text-[15px] monitor:text-[17px] leading-[1.2] text-left left-[max(2rem,calc(50%-300px))] right-[max(2rem,calc(50%-300px))] bottom-[4%] lg:left-auto lg:right-10 lg:bottom-[4%] lg:text-right lg:w-[420px] transition-opacity duration-500 ease-in-out ${
              activeProjectId === project.id && isLinkHovered ? "opacity-25" : "opacity-100"
            }`}>
              {descChars.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="char inline-block select-none opacity-0"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>

            {/* 3D Carousel Cylinder (4 card cells) - flat parent click listener to prevent 3D transform flakiness */}
            <div 
              className={`work__carousel cursor-pointer pointer-events-auto z-20 transition-opacity duration-500 ease-in-out ${
                activeProjectId === project.id && isLinkHovered ? "opacity-25" : "opacity-100"
              }`}
              onClick={() => handleCardClick(project.id)}
            >
              {project.images.map((imgUrl, cardIndex) => {
                // Calculate circular geometry transforms for 4 cells (radius = 300px)
                const angle = cardIndex * 90; // 360 / 4 = 90
                const transform = `rotateY(${angle}deg) translateZ(300px)`;

                return (
                  <div
                    key={cardIndex}
                    className="work__carousel-cell"
                    style={{ transform }}
                  >
                    <div className="work__card">
                      <div className="work__card-face relative overflow-hidden bg-[#121212]">
                        {imgUrl && (
                          <Image
                            src={imgUrl}
                            alt={`${project.title} - View ${cardIndex + 1}`}
                            fill
                            unoptimized
                            loading="lazy"
                            className="object-cover pointer-events-none"
                            style={{
                              transform: "translateZ(0)",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* Decoupled custom white circular tooltip cursor saying "open" in black */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full bg-white text-black font-montreal font-medium text-[11px] tracking-normal flex items-center justify-center pointer-events-none z-[9999] opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 will-change-transform select-none uppercase"
      >
        {activeProjectId !== null ? "Close" : "Open"}
      </div>
    </section>
  );
}
