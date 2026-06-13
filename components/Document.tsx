import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ImagesBadge } from "./ui/images-badge";
import { motion } from "motion/react";
import gsap from "gsap";

const me = "/me.ppg"

const skills = [
  {
    name: "GSAP",
    src: "/gsapp.png",
    style: {
      left: "-5%",
      top: "0%",
      width: "15vh",
      height: "10vh",
      filter: "drop-shadow(0px 6px 10px rgba(0,0,0,0.35))"
    },
    rotate: -10
  },
  {
    name: "Next.js",
    src: "/next.png",
    style: {
      left: "38%",
      top: "10%",
      width: "10vh",
      height: "10vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.40))"
    },
    rotate: 6
  },
  {
    name: "tailwindcss",
    src: "/tw.png",
    style: {
      left: "70%",
      top: "2%",
      width: "12vh",
      height: "9.5vh",
      filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.30))"
    },
    rotate: -1
  },
  {
    name: "supabase",
    src: "/supabase.png",
    style: {
      left: "-5%",
      top: "43%",
      width: "10vh",
      height: "10vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.35))"
    },
    rotate: 13
  },
  {
    name: "TypeScript",
    src: "/ts.png",
    style: {
      left: "34%",
      top: "60%",
      width: "9.5vh",
      height: "9.5vh",
      filter: "drop-shadow(0px 4px 7px rgba(0,0,0,0.35))"
    },
    rotate: -15
  },
  {
    name: "Node.js",
    src: "/node.png",
    style: {
      left: "70%",
      top: "52%",
      width: "10vh",
      height: "10vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.32))"
    },
    rotate: 10
  },
  {
    name: "Docker",
    src: "/docker.png",
    style: {
      left: "5%",
      top: "88%",
      width: "9.5vh",
      height: "9.5vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.30))"
    },
    rotate: -8
  },
  {
    name: "SQL",
    src: "/sql.png",
    style: {
      left: "62%",
      top: "90%",
      width: "11vh",
      height: "11vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.30))"
    },
    rotate: 12
  }
];

const interests = [
  {
    name: "Interest 1",
    src: "/bike.png",
    desc: " i like bikes",
    style: {
      left: "4%",
      top: "5%",
      width: "12vh",
      height: "10vh",
      filter: "drop-shadow(0px 6px 10px rgba(0,0,0,0.35))"
    },
    rotate: -12
  },
  {
    name: "Interest 2",
    src: "/ps.png",
    desc: "always been a gamer",
    style: {
      left: "55%",
      top: "2%",
      width: "12vh",
      height: "12vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.40))"
    },
    rotate: 16
  },
  {
    name: "Interest 4",
    src: "/pink-floyd.png",
    desc: "yes..i listen to pink floyd",
    style: {
      left: "0%",
      top: "46%",
      width: "12vh",
      height: "12vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.35))"
    },
    rotate: 14
  },
  {
    name: "Interest 6",
    src: "/cinema.png",
    desc: "couch potato",
    style: {
      left: "60%",
      top: "48%",
      width: "13vh",
      height: "13vh",
      filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.32))"
    },
    rotate: 6
  }
];

interface SkillItem {
  name: string;
  src: string;
  style: React.CSSProperties;
  rotate: number;
}

interface InterestItem {
  name: string;
  src: string;
  desc: string;
  style: React.CSSProperties;
  rotate: number;
}

function DraggableSkill({ skill }: { skill: SkillItem }) {
  const elRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileStyle = {
    "GSAP": { left: "0%", top: "0%", width: "80px", height: "55px" },
    "Next.js": { left: "38%", top: "6%", width: "70px", height: "70px" },
    "tailwindcss": { left: "74%", top: "0%", width: "80px", height: "64px" },
    "supabase": { left: "3%", top: "36%", width: "70px", height: "70px" },
    "TypeScript": { left: "38%", top: "38%", width: "65px", height: "65px" },
    "Node.js": { left: "73%", top: "36%", width: "70px", height: "70px" },
    "Docker": { left: "18%", top: "70%", width: "70px", height: "70px" },
    "SQL": { left: "58%", top: "69%", width: "75px", height: "75px" }
  }[skill.name] || {};

  const finalStyle = isMobile ? { ...skill.style, ...mobileStyle } : skill.style;

  useEffect(() => {
    const el = elRef.current;
    const imgWrapper = imageWrapperRef.current;
    if (!el || !imgWrapper) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let currentRotateZ = skill.rotate;

    gsap.set(imgWrapper, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: skill.rotate,
      scale: 1,
      transformPerspective: 1000
    });

    const onEnter = () => {
      if (!isDragging) {
        gsap.set(el, { zIndex: 999 });
      }
    };

    const onLeave = () => {
      if (!isDragging) {
        gsap.set(el, { zIndex: "" });
      }
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      gsap.set(el, { zIndex: 1000 });
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      lastX = clientX;
      lastY = clientY;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      gsap.to(imgWrapper, {
        scale: 1.2,
        filter: "drop-shadow(0px 18px 25px rgba(0, 0, 0, 0.45))",
        duration: 0.3,
        ease: "power2.out"
      });

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onMouseMove, { passive: false });
      document.addEventListener("touchend", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - lastX;
      const dy = clientY - lastY;

      lastX = clientX;
      lastY = clientY;

      const dragSpeed = Math.sqrt(dx * dx + dy * dy);
      if (dragSpeed === 0) return;

      const spinDelta = -(dx - dy) * 0.7;
      currentRotateZ += spinDelta;

      const targetRotateY = gsap.utils.clamp(-30, 30, dx * 1.5);
      const targetRotateX = gsap.utils.clamp(-30, 30, -dy * 1.5);

      gsap.to(imgWrapper, {
        rotateZ: currentRotateZ,
        rotateY: targetRotateY,
        rotateX: targetRotateX,
        duration: 0.15,
        ease: "power1.out"
      });
    };

    const onMouseUp = () => {
      isDragging = false;
      gsap.set(el, { zIndex: "" });

      gsap.to(imgWrapper, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        filter: finalStyle.filter || "drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.25))",
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        gsap.to(imgWrapper, {
          rotateZ: skill.rotate,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            currentRotateZ = skill.rotate;
          }
        });
      }, 10000);

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("touchstart", onMouseDown, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [skill.rotate, finalStyle.filter]);

  const { left, top, width, height } = finalStyle;

  return (
    <div
      ref={elRef}
      className="absolute cursor-grab active:cursor-grabbing select-none reveal-skill-item"
      style={{
        left,
        top,
        width,
        height
      }}
    >
      <div
        ref={imageWrapperRef}
        className="relative w-full h-full pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          filter: finalStyle.filter,
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden"
        }}
      >
        <Image
          src={skill.src}
          alt={skill.name}
          fill
          sizes="12vh"
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}

function DraggableInterest({ interest }: { interest: InterestItem }) {
  const elRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileStyle = {
    "Interest 1": { left: "10%", top: "5%", width: "85px", height: "70px" },
    "Interest 2": { left: "65%", top: "0%", width: "85px", height: "85px" },
    "Interest 4": { left: "10%", top: "52%", width: "85px", height: "85px" },
    "Interest 6": { left: "65%", top: "50%", width: "90px", height: "90px" }
  }[interest.name] || {};

  const finalStyle = isMobile ? { ...interest.style, ...mobileStyle } : interest.style;

  const showTooltip = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    gsap.killTweensOf(tooltip);
    gsap.to(tooltip, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out"
    });
  };

  const hideTooltip = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    gsap.killTweensOf(tooltip);
    gsap.to(tooltip, {
      opacity: 0,
      y: 6,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in"
    });
  };

  useEffect(() => {
    const el = elRef.current;
    const imgWrapper = imageWrapperRef.current;
    if (!el || !imgWrapper) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let currentRotateZ = interest.rotate;

    gsap.set(imgWrapper, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: interest.rotate,
      scale: 1,
      transformPerspective: 1000
    });

    let tooltipVisible = false;
    let tooltipTimeout: NodeJS.Timeout | null = null;

    const onEnter = () => {
      if (!isDragging && window.innerWidth > 768) {
        showTooltip();
        gsap.set(el, { zIndex: 999 });
      }
    };
    const onLeave = () => {
      if (!isDragging && window.innerWidth > 768) {
        hideTooltip();
        gsap.set(el, { zIndex: "" });
      }
    };

    const onClick = (e: Event) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        if (tooltipVisible) {
          hideTooltip();
          tooltipVisible = false;
          if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = null;
          }
        } else {
          showTooltip();
          tooltipVisible = true;
          if (tooltipTimeout) clearTimeout(tooltipTimeout);
          tooltipTimeout = setTimeout(() => {
            hideTooltip();
            tooltipVisible = false;
          }, 3000);
        }
      }
    };

    const handleGlobalClick = () => {
      if (tooltipVisible) {
        hideTooltip();
        tooltipVisible = false;
        if (tooltipTimeout) {
          clearTimeout(tooltipTimeout);
          tooltipTimeout = null;
        }
      }
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("click", onClick);
    document.addEventListener("click", handleGlobalClick);

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      hideTooltip();
      gsap.set(el, { zIndex: 1000 });

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      lastX = clientX;
      lastY = clientY;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      gsap.to(imgWrapper, {
        scale: 1.2,
        filter: "drop-shadow(0px 18px 25px rgba(0, 0, 0, 0.45))",
        duration: 0.3,
        ease: "power2.out"
      });

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onMouseMove, { passive: false });
      document.addEventListener("touchend", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - lastX;
      const dy = clientY - lastY;

      lastX = clientX;
      lastY = clientY;

      const dragSpeed = Math.sqrt(dx * dx + dy * dy);
      if (dragSpeed === 0) return;

      const spinDelta = -(dx - dy) * 0.7;
      currentRotateZ += spinDelta;

      const targetRotateY = gsap.utils.clamp(-30, 30, dx * 1.5);
      const targetRotateX = gsap.utils.clamp(-30, 30, -dy * 1.5);

      gsap.to(imgWrapper, {
        rotateZ: currentRotateZ,
        rotateY: targetRotateY,
        rotateX: targetRotateX,
        duration: 0.15,
        ease: "power1.out"
      });
    };

    const onMouseUp = () => {
      isDragging = false;
      hideTooltip();
      gsap.set(el, { zIndex: "" });

      gsap.to(imgWrapper, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        filter: finalStyle.filter || "drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.25))",
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        gsap.to(imgWrapper, {
          rotateZ: interest.rotate,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            currentRotateZ = interest.rotate;
          }
        });
      }, 10000);

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("touchstart", onMouseDown, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("click", onClick);
      document.removeEventListener("click", handleGlobalClick);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [interest.rotate, finalStyle.filter]);

  const { left, top, width, height } = finalStyle;

  return (
    <div
      ref={elRef}
      className="absolute cursor-grab active:cursor-grabbing select-none reveal-interest-item"
      style={{
        left,
        top,
        width,
        height
      }}
    >
      <div
        ref={imageWrapperRef}
        className="relative w-full h-full pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          filter: finalStyle.filter,
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden"
        }}
      >
        <Image
          src={interest.src}
          alt={interest.name}
          fill
          sizes="200px"
          priority
          unoptimized
          className="object-contain"
        />
      </div>
      <div
        ref={tooltipRef}
        className="left-1/2 z-50 absolute font-montreal font-normal whitespace-nowrap pointer-events-none"
        style={{
          top: "-3.5vh",
          transform: "translateX(-50%)",
          backgroundColor: "#000",
          color: "#fff7d3",
          fontSize: "1.3vh",
          padding: "0.5vh 1vh",
          borderRadius: "0.6vh",
          opacity: 0,
          letterSpacing: "0.02em",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.15)"
        }}
      >
        {interest.desc}
      </div>
    </div>
  );
}

// EditorialText removed for performance and non-fade entrance animations

export default function Document() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth <= 768);

    const updateClock = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: false
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="relative flex flex-col gap-6 px-6 py-6 pb-8 w-full text-[#AB1509] select-none">
        {/* Mobile vertical grid lines */}
        <div className="top-0 bottom-0 left-[16px] absolute bg-[#AB1509] opacity-0 w-[1px] pointer-events-none reveal-line-v" />
        <div className="top-0 right-[16px] bottom-0 absolute bg-[#AB1509] opacity-0 w-[1px] pointer-events-none reveal-line-v" />

        {/* HEADER */}
        <div className="flex justify-between items-center opacity-0 w-full reveal-header">
          <h1 className="mt-2 font-tusker-standard font-medium text-[14.5vw] leading-none tracking-tight">About.</h1>
          <div className="flex flex-col items-end text-right">
            <span className="font-bold text-[8vw] leading-none select-none">*</span>
            <div className="flex items-center gap-1.5 mt-1 font-montreal font-normal text-[#AB1509] text-[11px]">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="#AB1509"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>Mangalore</span>
              </div>
              <span className="opacity-40">/</span>
              <span>29°C</span>
              <span className="opacity-40">/</span>
              <span className="tabular-nums">{mounted ? time : "--:--:--"} IST</span>
            </div>
          </div>
        </div>
        <div className="bg-[#AB1509] opacity-0 -mx-6 -my-3 w-[calc(100%+3rem)] h-[1px] pointer-events-none reveal-line-h" />

        {/* PHOTO & PROFILE */}
        <div className="flex flex-col gap-4">
          <div className="relative border border-[#AB1509] w-full aspect-[4/3] overflow-hidden reveal-photo">
            <Image
              src="/meee.png"
              alt="Ali Ahmed Portrait"
              fill
              sizes="90vw"
              priority
              className="brightness-100 object-cover contrast-125"
            />
          </div>

          <div className="flex items-baseline reveal-profile">
            <h2 className="font-montreal font-medium text-[10vw] leading-none tracking-tight">
              <span className="font-tusker-standard font-medium text-[12vw]">A</span>li <span className="font-tusker-standard font-medium text-[12vw]">A</span>hmed <span className="font-tusker-standard font-medium text-[12vw]">S</span>yed
            </h2>
          </div>

          <div className="reveal-profile">
            <p className="font-normal text-[14px] leading-tight tracking-tight">
              I started building websites because the ones I kept seeing were boring. That annoyance turned into a skillset, which turned into clients, which turned into this.
              <br />
              <br />
              I'm a full stack dev who believes great products are built through equal parts design and code.
            </p>
          </div>
        </div>
        <div className="bg-[#AB1509] opacity-0 -mx-6 -my-3 w-[calc(100%+3rem)] h-[1px] pointer-events-none reveal-line-h" />

        {/* EDUCATION */}
        <div className="py-4 reveal-education">
          <h2 className="mb-2 font-montreal font-semibold text-[14px] uppercase tracking-wide">
            Education
          </h2>
          <h3 className="mb-1 font-medium text-[13px] leading-tight">
            Undergraduate - Information Science & Engineering
          </h3>
          <p className="opacity-80 font-normal text-[12px]">
            Yenepoya Institute of Technology (2023 - 2027)
          </p>
        </div>
        <div className="bg-[#AB1509] opacity-0 -mx-6 -my-3 w-[calc(100%+3rem)] h-[1px] pointer-events-none reveal-line-h" />

        {/* SKILLS */}
        <div className="flex flex-col gap-2">
          <h2 className="font-montreal font-semibold text-[14px] uppercase tracking-wide reveal-skills-title">Skills</h2>
          <div className="relative w-full h-[190px]" style={{ perspective: "1000px" }}>
            {skills.map((skill, index) => (
              <DraggableSkill key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* INTERESTS */}
        <div className="flex flex-col gap-2">
          <h2 className="font-montreal font-semibold text-[14px] uppercase tracking-wide reveal-interests-title">What I alt-tab to</h2>
          <div className="relative w-full h-[150px]" style={{ perspective: "1000px", overflow: "visible" }}>
            {interests.map((interest, index) => (
              <DraggableInterest key={index} interest={interest} />
            ))}
          </div>
        </div>

        {/* PHYSICAL APPROACH FOLDER */}
        <div className="bg-[#AB1509] opacity-0 -mx-6 my-4 w-[calc(100%+3rem)] h-[1px] pointer-events-none reveal-line-h" />
        <div className="flex flex-col justify-center items-center py-6 reveal-folder">
          <div className="z-20 scale-100">
            <ImagesBadge folderSize={{ width: 200, height: 160 }} />
          </div>
        </div>
        <div className="bg-[#AB1509] opacity-0 -mx-6 -my-3 w-[calc(100%+3rem)] h-[1px] pointer-events-none reveal-line-h" />

        {/* FOOTER QUOTE */}
        <div className="flex flex-col justify-center opacity-0 pt-4 pb-0 text-[#AB1509] reveal-footer">
          <p className="opacity-90 font-montreal font-medium text-[16px] text-center italic leading-tight">
            "The time you enjoy wasting is not wasted time."
          </p>
          <div className="flex justify-center mt-2 w-full">
            <span className="opacity-85 font-tusker-standard font-semibold text-[10px] uppercase tracking-tight">
              — bertrand russell
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full text-[#AB1509]">
      {/* GRID LINES FOR BLUEPRINT STYLE */}
      {/* Left vertical line */}
      <div className="top-0 bottom-0 absolute bg-[#AB1509] opacity-0 w-[1px] pointer-events-none reveal-line-v" style={{ left: "4%" }} />
      {/* Right vertical line */}
      <div className="top-0 bottom-0 absolute bg-[#AB1509] opacity-0 w-[1px] pointer-events-none reveal-line-v" style={{ right: "4%" }} />
      {/* Center vertical line */}
      <div className="top-[17%] bottom-0 absolute bg-[#AB1509] opacity-0 w-[1px] pointer-events-none reveal-line-v" style={{ left: "50%" }} />
      {/* Header horizontal line */}
      <div className="right-0 left-0 absolute bg-[#AB1509] opacity-0 h-[1px] pointer-events-none reveal-line-h" style={{ top: "17%" }} />
      {/* Middle horizontal line (right side) */}
      <div className="right-0 absolute bg-[#AB1509] opacity-0 h-[1px] pointer-events-none reveal-line-h" style={{ left: "50%", top: "66%" }} />
      {/* Lower horizontal line (right side) */}
      <div className="right-0 absolute bg-[#AB1509] opacity-0 h-[1px] pointer-events-none reveal-line-h" style={{ left: "50%", top: "89%" }} />

      {/* HEADER (Top Section) */}
      <div className="right-[7%] left-[7%] z-10 absolute flex justify-between items-center" style={{ top: "0", height: "17%" }}>
        <div className="flex items-baseline opacity-0 reveal-header" style={{ gap: "0.5vh" }}>
          <h1 className="mt-6 font-tusker-standard font-medium text-[8vw] md:text-[12.5vh] leading-none tracking-tight">About.</h1>
        </div>

        {/* Far Right Header Info & Asterisk */}
        <div className="flex flex-col justify-between items-end opacity-0 h-full select-none reveal-header" style={{ paddingTop: "2vh", paddingBottom: "1vh" }}>
          <div className="mt-2 font-bold text-[7.5vw] md:text-[8vh] leading-none select-none">*</div>

          {/* Location, Temperature & Indian Standard Time */}
          <div
            className="flex items-center font-montreal font-normal text-[#AB1509]"
            style={{ fontSize: "1.4vh", gap: "0.6vh", marginBottom: "0.1vh" }}
          >
            {/* Location Icon with Red Outline */}
            <div className="flex items-center" style={{ gap: "0.4vh" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="#AB1509"
                className="w-[1.5vh] h-[1.5vh]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>Mangalore</span>
            </div>

            <span className="opacity-40">/</span>

            {/* Temperature */}
            <span>29°C</span>

            <span className="opacity-40">/</span>

            {/* Indian Standard Time */}
            <span className="tabular-nums">{mounted ? time : "--:--:--"} IST</span>
          </div>
        </div>
      </div>

      {/* LEFT COLUMN (Education, Skills & Experience) */}
      <div className="z-10 absolute flex flex-col justify-between font-montreal font-medium" style={{ left: "7%", width: "40%", top: "18%", bottom: "5%" }}>
        {/* TOP SECTION: EDUCATION & SKILLS */}
        <div className="flex flex-col" style={{ gap: "2.5vh" }}>
          {/* EDUCATION */}
          <div className="reveal-education">
            <h2 className="font-montreal font-semibold text-[3.2vw] md:text-[2vh] uppercase tracking-wide" style={{ marginBottom: "1.5%" }}>
              Education
            </h2>
            <div className="flex flex-col" style={{ gap: "4%" }}>
              <div style={{ marginBottom: "1%" }}>
                <h3 className="mb-2 font-medium text-[2.2vw] md:text-[1.7vh] leading-tight">
                  Undergraduate - Information Science & Engineering
                </h3>
                <p className="font-normal text-[1.6vw] md:text-[1.6vh]">
                  Yenepoya Institute of Technology (2023 - 2027)
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div>
            <h2 className="font-montreal font-semibold text-[3.2vw] md:text-[2vh] uppercase tracking-wide reveal-skills-title" style={{ marginBottom: "1.5%" }}>Skills</h2>
            <div className="relative w-full h-[28vh]" style={{ perspective: "1000px" }}>
              {skills.map((skill, index) => (
                <DraggableSkill key={index} skill={skill} />
              ))}
            </div>
          </div>

          {/* INTERESTS */}
          <div style={{ marginTop: "5vh" }}>
            <h2 className="font-montreal font-semibold text-[3.2vw] md:text-[2vh] uppercase tracking-wide reveal-interests-title" style={{ marginBottom: "1.5%" }}>What I alt-tab to</h2>
            <div className="relative w-full h-[28vh]" style={{ perspective: "1000px", overflow: "visible" }}>
              {interests.map((interest, index) => (
                <DraggableInterest key={index} interest={interest} />
              ))}
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}

      </div>
      {/* RIGHT COLUMN (Photo, Profile) */}
      <div className="z-10 absolute flex flex-col justify-between font-montreal font-medium" style={{ left: "53%", width: "40%", top: "18%", bottom: "34%" }}>
        {/* PHOTO & INITIALS & PROFILE */}
        <div>
          <div className="relative border border-[#AB1509] w-full aspect-[4/3] overflow-hidden reveal-photo">
            <Image
              src="/meee.png"
              alt="Ali Ahmed Portrait"
              fill
              sizes="(max-width: 768px) 35vw, 10vw"
              priority
              className="brightness-100 object-cover contrast-125"
            />
          </div>

          <div className="flex items-baseline reveal-profile" style={{ marginTop: "4%" }}>
            <h2 className="font-montreal font-medium text-[6.5vw] md:text-[4.5vh] leading-none tracking-tight">
              <span className="font-tusker-standard font-medium text-[9vw] md:text-[5.6vh]">A</span>li <span className="font-tusker-standard font-medium text-[9vw] md:text-[5.5vh]">A</span>hmed <span className="font-tusker-standard font-medium text-[9vw] md:text-[5.5vh]">S</span>yed
            </h2>
          </div>

          <div className="reveal-profile" style={{ marginTop: "3%" }}>
            {/* <h3 className="font-montreal font-semibold text-[2.2vw] md:text-[2vh] monitor:text-[1.5vh] uppercase tracking-wider" style={{ marginBottom: "1%" }}>Profile</h3> */}
            <p className="font-normal text-[1.6vw] md:text-[1.7vh] monitor:text-[1.5vh] leading-tight">
              I started building websites because the ones I kept seeing were boring. That annoyance turned into a skillset, which turned into clients, which turned into this.
              <br />
              I'm a full stack dev who believes great products are built through equal parts design and code.
            </p>
          </div>
        </div>
      </div>

      {/* PHYSICAL APPROACH FOLDER */}
      <div className="z-20 absolute flex justify-center items-center reveal-folder" style={{ left: "53%", width: "40%", top: "68%", height: "23%" }}>
        <ImagesBadge folderSize={{ width: 180, height: 120 }} />
      </div>

      {/* FOOTER QUOTE (At the bottom right, below 89% horizontal line) */}
      <div
        id="about-quote"
        className="z-10 absolute flex flex-col justify-center opacity-0 text-[#AB1509] reveal-footer"
        style={{ left: "53%", width: "40%", bottom: "2%", height: "8%" }}
      >
        <div className="flex flex-col w-full select-none">
          <p className="opacity-90 font-montreal font-medium text-[2.2vh] text-right italic leading-tight">
            "The time you enjoy wasting is not wasted time."
          </p>
          <div className="flex justify-start mt-1 w-full">
            <span className="opacity-85 font-tusker-standard font-semibold text-[1vh] uppercase tracking-tight">
              — bertrand russell
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
