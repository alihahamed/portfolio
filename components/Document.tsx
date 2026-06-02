import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ImagesBadge } from "./ui/images-badge";
import { motion } from "motion/react";
import gsap from "gsap";

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
    desc: "yep i like bikes",
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let currentRotateZ = skill.rotate;

    gsap.set(el, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: skill.rotate,
      transformPerspective: 1000
    });

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      lastX = clientX;
      lastY = clientY;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      gsap.to(el, {
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

      // Spin around Z-axis proportional to speed/velocity (inverted direction for natural feel)
      const spinDelta = -(dx - dy) * 0.7;
      currentRotateZ += spinDelta;

      // Realtime 3D tilt based on drag direction/velocity
      const targetRotateY = gsap.utils.clamp(-30, 30, dx * 1.5);
      const targetRotateX = gsap.utils.clamp(-30, 30, -dy * 1.5);

      gsap.to(el, {
        rotateZ: currentRotateZ,
        rotateY: targetRotateY,
        rotateX: targetRotateX,
        duration: 0.15,
        ease: "power1.out"
      });
    };

    const onMouseUp = () => {
      isDragging = false;

      // Spring flat 3D tilts, maintaining new accumulated spin angle
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        filter: "drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.25))",
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });

      // Clear any previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Start 10s timer to reset Z-rotation back to initial default angle
      timeoutRef.current = setTimeout(() => {
        gsap.to(el, {
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
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [skill.rotate]);

  return (
    <div
      ref={elRef}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        ...skill.style,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-full h-full pointer-events-none">
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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (!el) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let currentRotateZ = interest.rotate;

    gsap.set(el, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: interest.rotate,
      transformPerspective: 1000
    });

    const onEnter = () => {
      if (!isDragging) showTooltip();
    };
    const onLeave = () => {
      hideTooltip();
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      hideTooltip();

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      lastX = clientX;
      lastY = clientY;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      gsap.to(el, {
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

      gsap.to(el, {
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

      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        filter: "drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.25))",
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        gsap.to(el, {
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
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [interest.rotate]);

  return (
    <div
      ref={elRef}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        ...interest.style,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-full h-full pointer-events-none">
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
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute left-1/2 pointer-events-none font-montreal font-normal whitespace-nowrap"
        style={{
          top: "-3vh",
          transform: "translateX(-50%)",
          backgroundColor: "#000",
          color: "#fff7d3",
          fontSize: "1.3vh",
          padding: "0.5vh 1vh",
          borderRadius: "0.6vh",
          opacity: 0,
          letterSpacing: "0.02em",
        }}
      >
        {interest.desc}
      </div>
    </div>
  );
}

export default function Document() {
  return (
    <div className="w-full h-full relative text-[#AB1509]">
      {/* GRID LINES FOR BLUEPRINT STYLE */}
      {/* Left vertical line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#AB1509] pointer-events-none" style={{ left: "4%" }} />
      {/* Right vertical line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#AB1509] pointer-events-none" style={{ right: "4%" }} />
      {/* Center vertical line */}
      <div className="absolute top-[17%] bottom-0 w-[1px] bg-[#AB1509] pointer-events-none" style={{ left: "50%" }} />
      {/* Header horizontal line */}
      <div className="absolute left-0 right-0 h-[1px] bg-[#AB1509] pointer-events-none" style={{ top: "17%" }} />
      {/* Middle horizontal line (right side) */}
      <div className="absolute right-0 h-[1px] bg-[#AB1509] pointer-events-none" style={{ left: "50%", top: "66%" }} />
      {/* Lower horizontal line (right side) */}
      <div className="absolute right-0 h-[1px] bg-[#AB1509] pointer-events-none" style={{ left: "50%", top: "89%" }} />

      {/* HEADER (Top Section) */}
      <div className="absolute left-[7%] right-[7%] flex items-center justify-between z-10" style={{ top: "0", height: "17%" }}>
        <div className="flex items-baseline" style={{ gap: "0.5vh" }}>
          <h1 className="text-[8vw] md:text-[12.5vh] font-medium font-tusker-standard tracking-tight leading-none mt-6">About.</h1>
          <span className="border border-[#AB1509] rounded-full font-medium tracking-wider uppercase" style={{ padding: "0.1vh 0.8vh", fontSize: "0.9vh", lineHeight: "1" }}>cv</span>
        </div>
        {/* Asterisk icon */}
        <div className="text-[7.5vw] md:text-[4vh] font-bold leading-none select-none" style={{ transform: "translateY(0.4vh)" }}>*</div>
      </div>

      {/* LEFT COLUMN (Education, Skills & Experience) */}
      <div className="absolute flex flex-col justify-between font-montreal font-medium z-10" style={{ left: "7%", width: "40%", top: "18%", bottom: "5%" }}>
        {/* TOP SECTION: EDUCATION & SKILLS */}
        <div className="flex flex-col" style={{ gap: "2.5vh" }}>
          {/* EDUCATION */}
          <div>
            <h2 className="text-[3.2vw] md:text-[2vh] font-semibold uppercase tracking-wide font-montreal" style={{ marginBottom: "1.5%" }}>Education</h2>
            <div className="flex flex-col" style={{ gap: "4%" }}>
              <div style={{ marginBottom: "1%" }}>
                <h3 className="text-[2.2vw] md:text-[1.7vh] font-medium leading-tight mb-2">Undergraduate - Information Science & Engineering</h3>
                <p className="text-[1.6vw] md:text-[1.6vh] font-normal">Yenepoya Institute of Technology (2023 - 2027)</p>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="">
            <h2 className="text-[3.2vw] md:text-[2vh] font-semibold uppercase tracking-wide font-montreal" style={{ marginBottom: "1.5%" }}>Skills</h2>
            <div className="relative w-full h-[28vh]" style={{ perspective: "1000px" }}>
              {skills.map((skill, index) => (
                <DraggableSkill key={index} skill={skill} />
              ))}
            </div>
          </div>

          {/* INTERESTS */}
          <div className="" style={{ marginTop: "5vh" }}>
            <h2 className="text-[3.2vw] md:text-[2vh] font-semibold uppercase tracking-wide font-montreal" style={{ marginBottom: "1.5%" }}>What I alt-tab to</h2>
            <div className="relative w-full h-[28vh]" style={{ perspective: "1000px", overflow: "visible" }}>
              {interests.map((interest, index) => (
                <DraggableInterest key={index} interest={interest} />
              ))}
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="flex flex-col justify-end" style={{ marginTop: "2%" }}>
          {/* <h2 className="text-[3.2vw] md:text-[2vh] font-bold uppercase tracking-wide font-montreal" style={{ marginBottom: "3%" }}>Experience</h2>
          <div className="flex flex-col" style={{ gap: "3%" }}>
            <div style={{ marginBottom: "3%" }}>
              <h3 className="text-[2.2vw] md:text-[1.4vh] font-medium leading-tight">Creative Technologist</h3>
              <p className="text-[1.6vw] md:text-[1.2vh] font-medium opacity-80">INDEPENDENT | 2024 - PRESENT</p>
              <p className="text-[1.4vw] md:text-[1.1vh] leading-tight" style={{ marginTop: "1%" }}>
                Building fast, interactive portfolios, motion design suites, and performance-first 3D assets.
              </p>
            </div>
            <div style={{ marginBottom: "3%" }}>
              <h3 className="text-[2.2vw] md:text-[1.4vh] font-medium leading-tight">Design Head</h3>
              <p className="text-[1.6vw] md:text-[1.2vh] font-medium opacity-80">ENROOT Festival, Dubai | 2024</p>
              <p className="text-[1.4vw] md:text-[1.1vh] leading-tight" style={{ marginTop: "1%" }}>
                Led visual design and spatial interaction strategy. Managed frontend architecture and code.
              </p>
            </div>
            <div>
              <h3 className="text-[2.2vw] md:text-[1.4vh] font-medium leading-tight">Freelance Developer</h3>
              <p className="text-[1.6vw] md:text-[1.2vh] font-medium opacity-80">Dubai | 2022 - 2024</p>
              <p className="text-[1.4vw] md:text-[1.1vh] leading-tight" style={{ marginTop: "1%" }}>
                Built high-fidelity reactive components, custom typography, and fine-tuned scroll timelines.
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* RIGHT COLUMN (Photo, Profile, Interactive Folder) */}
      <div className="absolute flex flex-col justify-between font-montreal font-medium z-10" style={{ left: "53%", width: "40%", top: "19%", bottom: "6%" }}>
        {/* PHOTO & INITIALS & PROFILE */}
        <div>
          <div className="relative w-full aspect-[4/3] border border-[#AB1509] overflow-hidden">
            <Image
              src="/developer_portrait.png"
              alt="Ali Ahmed Portrait"
              fill
              sizes="(max-width: 768px) 35vw, 10vw"
              priority
              className="object-cover grayscale contrast-125 brightness-95"
            />
          </div>

          <div className="flex items-baseline" style={{ marginTop: "4%" }}>
            <h2 className="text-[6.5vw] md:text-[4.8vh] tracking-tight font-medium font-montreal leading-none">
              <span className="text-[9vw] md:text-[5.6vh] font-medium font-tusker-standard">A</span>li <span className="text-[9vw] md:text-[5.5vh] font-medium font-tusker-standard">A</span>hmed <span className="text-[9vw] md:text-[5.5vh] font-medium font-tusker-standard">S</span>yed
            </h2>
          </div>

          <div style={{ marginTop: "3%" }}>
            {/* <h3 className="text-[2.2vw] md:text-[2vh] monitor:text-[1.5vh] font-semibold uppercase tracking-wider font-montreal" style={{ marginBottom: "1%" }}>Profile</h3> */}
            <p className="text-[1.6vw] md:text-[1.7vh] monitor:text-[1.5vh] leading-tight font-normal">
              I started building websites because the ones I kept seeing were boring. That annoyance turned into a skillset, which turned into clients, which turned into this. 
            </p>
          </div>
        </div>

        {/* PHYSICAL APPROACH FOLDER */}
        <div className="flex items-center justify-center z-20 monitor:!h-[40%]" style={{ height: "40%" }}>
          <ImagesBadge folderSize={{ width: 180, height: 120 }} />
        </div>
      </div>

      {/* FOOTER QUOTE (At the bottom right, below 89% horizontal line) */}
      <div 
        id="contact"
        className="absolute z-10 flex flex-col justify-center text-[#AB1509]" 
        style={{ left: "53%", width: "40%", bottom: "2%", height: "8%" }}
      >
        <div className="w-full flex flex-col select-none">
          <p className="text-[2.2vh] font-montreal font-medium italic text-right leading-tight opacity-90">
            "The time you enjoy wasting is not wasted time."
          </p>
          <div className="w-full flex justify-start mt-1">
            <span className="text-[1vh] font-tusker-standard font-semibold uppercase tracking-tight opacity-85">
              — bertrand russell
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
