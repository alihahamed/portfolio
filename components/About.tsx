"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Signature, SignatureRef } from "@/components/ui/signature";
import Document from "@/components/Document";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const redBgRef = useRef<HTMLDivElement>(null);
  const signatureWrapRef = useRef<HTMLDivElement>(null);
  const docWrapRef = useRef<HTMLDivElement>(null);
  
  // Ref to directly control Signature draw progress via GSAP without React re-renders
  const sigRef = useRef<SignatureRef>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    const initScrollTrigger = () => {
      const workEl = document.getElementById("work");
      const workInnerEl = document.getElementById("work-inner");
      
      if (!workEl || !workInnerEl || !containerRef.current) {
        setTimeout(initScrollTrigger, 50);
        return;
      }

      // Ensure SelectedWork container stays below About transition elements
      workEl.style.zIndex = "10";

      // Set transform origin perfectly anchored at the bottom-center of #work-inner
      // to keep it pinned at the bottom of the screen during 3D recede (not pushing upwards)
      gsap.set(workInnerEl, { 
        transformPerspective: 1200, 
        transformOrigin: "50% 100%" 
      });

      // Set transform origin of signature wrapper to zoom directly into a letter stroke
      gsap.set(signatureWrapRef.current, { 
        transformOrigin: "45% 55%" 
      });

      ctx = gsap.context(() => {
        // Clear SSR inline transforms so GSAP can take over cleanly without matrix concatenation bugs
        if (redBgRef.current) redBgRef.current.style.transform = "";
        if (docWrapRef.current) docWrapRef.current.style.transform = "";

        // Set initial positions
        gsap.set(redBgRef.current, { yPercent: 100 });
        if (redBgRef.current) redBgRef.current.style.display = "none";
        gsap.set(docWrapRef.current, { xPercent: -50, yPercent: -150 });
        gsap.set(signatureWrapRef.current, { scale: 1, opacity: 1 });
        
        // Ensure signature is hidden initially
        if (sigRef.current) sigRef.current.setProgress(0);

        // Set initial positions for entrance reveal animations (folder image badge remains static)
        gsap.set(".reveal-line-v", { opacity: 1, scaleY: 0, transformOrigin: "50% 0%" });
        gsap.set(".reveal-line-h", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(".reveal-footer", { opacity: 0, y: 20 });
        gsap.set(".reveal-interests-title", { opacity: 1, x: -20, clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(".reveal-skills-title", { opacity: 1, x: -20, clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(".reveal-profile", { opacity: 1, y: 30, clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(".reveal-education", { opacity: 1, y: 30, clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(".reveal-header", { opacity: 1, y: -20, clipPath: "inset(0% 0% 100% 0%)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current, 
            start: "top bottom",           
            end: "bottom bottom",          
            pin: "#work",
            pinSpacing: false,
            scrub: 2,                      
            onEnter: () => {
              if (redBgRef.current) redBgRef.current.style.display = "";
            },
            onEnterBack: () => {
              if (redBgRef.current) redBgRef.current.style.display = "";
            },
            onLeave: () => {
              if (redBgRef.current) redBgRef.current.style.display = "none";
            },
            onLeaveBack: () => {
              if (redBgRef.current) redBgRef.current.style.display = "none";
              if (sigRef.current) sigRef.current.setProgress(0);
            }
          }
        });

        // We use an arbitrary total duration of 10 to easily map scroll percentages.

        // Stage 1 (time 0 to 7.0): 3D recede #work-inner + red panel slides up (duration extended for slower entry/exit)
        tl.fromTo(workInnerEl,
          { scale: 1, z: 0, opacity: 1, rotateX: 0 },
          { 
            scale: 0.72, 
            z: -450, 
            opacity: 0, 
            rotateX: 12, 
            duration: 7.0, 
            ease: "power1.inOut" 
          },
          0
        );

        tl.fromTo(redBgRef.current,
          { yPercent: 100 },
          { 
            yPercent: 0, 
            duration: 7.0, 
            ease: "power1.inOut" 
          },
          0
        );

        // Slowly animate background gradient vertical position on scroll
        tl.fromTo(redBgRef.current,
          { backgroundPositionY: "100%" },
          { 
            backgroundPositionY: "0%", 
            duration: 30.5, 
            ease: "none" 
          },
          0
        );

        // Stage 2 (time 7.0 to 11.0): Signature physically draws over time (scrubbed)
        const sigProxy = { val: 0 };
        tl.to(sigProxy, {
          val: 1,
          duration: 4.0,
          ease: "none",
          onUpdate: () => {
            if (sigRef.current) sigRef.current.setProgress(sigProxy.val);
          }
        }, 7.0);

        // Stage 3 (time 11.0 to 11.5): Brief hold/buffer
        tl.to({}, { duration: 0.5 }, 11.0);

        // Stage 4 (time 11.5 to 16.5): Signature physically zooms out (scales up massively) to cover the screen
        tl.to(signatureWrapRef.current, {
          scale: 120,
          duration: 5,
          ease: "power2.in"
        }, 11.5);

        // Stage 5 (time 16.5 to 24.5): Document lowers into position — NO fade, pure scroll-driven descent (duration extended to 8)
        tl.fromTo(docWrapRef.current,
          { yPercent: -150 },
          {
            yPercent: 0,
            duration: 8,
            ease: "none" // Linear mapping makes it feel 1:1 physically controlled by the scroll wheel
          },
          16.5
        );

        // Subtle gravity pendulum swing anchored at the top center (50% 0%) of the document
        tl.fromTo(docWrapRef.current,
          { rotate: 0, transformOrigin: "50% 0%" },
          { rotate: 3.5, duration: 2, ease: "power1.inOut" },
          16.5
        );
        tl.to(docWrapRef.current,
          { rotate: -2.8, duration: 2, ease: "power1.inOut" },
          18.5
        );
        tl.to(docWrapRef.current,
          { rotate: 1.8, duration: 2, ease: "power1.inOut" },
          20.5
        );
        tl.to(docWrapRef.current,
          { rotate: -0.8, duration: 1.5, ease: "power1.inOut" },
          22.5
        );
        tl.to(docWrapRef.current,
          { rotate: 0, duration: 1.5, ease: "power2.out" },
          24.0
        );

        // --- PREPARE INITIAL STATES FOR EDITORIAL REVEALS (Replacing opacity-0 fade-ins) ---
        gsap.set(".reveal-line-v", { scaleY: 0, transformOrigin: "top" });
        gsap.set(".reveal-line-h", { scaleX: 0, transformOrigin: "left" });
        gsap.set(".reveal-footer", { opacity: 0, y: 20 });
        gsap.set(".reveal-interests-title, .reveal-skills-title", { x: -20, clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(".reveal-profile, .reveal-education", { y: 30, clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(".reveal-header", { y: -20, clipPath: "inset(0% 0% 100% 0%)" });
        // -------------------------------------------------------------------------------------

        // Define a unified, real-time sequential entrance timeline for the document contents
        const entranceTimeline = gsap.timeline({ paused: true });

        // Step 1: Grid lines draw immediately (no delay) + footer quote reveal (fade + slide up)
        entranceTimeline.to(".reveal-line-v", { scaleY: 1, duration: 1.2, stagger: 0.08, ease: "power4.inOut" }, 0)
          .to(".reveal-line-h", { scaleX: 1, duration: 1.2, stagger: 0.08, ease: "power4.inOut" }, 0)
          .to(".reveal-footer", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0);

        // Step 2: Interests title reveal (exactly 0.3s after Step 1, folder image badge is static)
        entranceTimeline.to(".reveal-interests-title", { x: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out" }, 0.3);

        // Step 3: Skills title & profile reveal (exactly 0.3s after Step 2)
        entranceTimeline.to(".reveal-skills-title", { x: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out" }, 0.6)
          .to(".reveal-profile", { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out" }, 0.6);

        // Step 4: Education reveal (exactly 0.3s after Step 3)
        entranceTimeline.to(".reveal-education", { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out" }, 0.9);

        // Step 5: Header reveal (exactly 0.3s after Step 4)
        entranceTimeline.to(".reveal-header", { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, stagger: 0.1, ease: "power4.out" }, 1.2);

        // Trigger the sequential entrance reveals on scroll (redacts instantly on scroll back up)
        tl.call(() => {
          const isForward = tl.scrollTrigger ? tl.scrollTrigger.direction > 0 : true;
          if (isForward) {
            entranceTimeline.play();
          } else {
            entranceTimeline.pause(0); // Seek to 0 and pause (redact)
          }
        }, undefined, 18.5);

        // Add a 100vh scroll hold at the end of the document animation (duration 6.0 units)
        // to pin the fully rendered resume before entering the contact section circular reveal.
        tl.to({}, { duration: 6.0 }, 24.5);

      });
    };

    initScrollTrigger();

    return () => {
      if (ctx) ctx.revert();
      const workEl = document.getElementById("work");
      if (workEl) {
        workEl.style.position = "";
        workEl.style.bottom = "";
        workEl.style.zIndex = "";
      }
      const workInnerEl = document.getElementById("work-inner");
      if (workInnerEl) {
        gsap.set(workInnerEl, { scale: 1, z: 0, opacity: 1, rotateX: 0, clearProps: "all" });
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-transparent pointer-events-none z-20"
    >
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
        
        <div
          ref={redBgRef}
          className="about-red-bg absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden z-30 pointer-events-auto"
          style={{ 
            transform: "translateY(100%)",
            background: "linear-gradient(to bottom, #000000 0%, #150100 35%, #b80d00 75%, #ff1500 100%)",
            backgroundSize: "100% 200%",
            backgroundPositionY: "100%"
          }}
        >
          <div
            ref={signatureWrapRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none transform origin-center z-40"
          >
            {/* Mounted immediately so Opentype can load the font, but drawn via GSAP scrub */}
            <Signature
              ref={sigRef}
              text="Ali Ahmed"
              color="#fff7d3"
              fontSize={50}
              inView={false}
              once={true}
            />
          </div>

          <div
            ref={docWrapRef}
            className="about-doc-wrap absolute left-1/2 w-[90vw] h-screen md:w-[78vh] md:h-screen lg:w-[82vh] lg:h-screen bg-[#fff7d3] border-l border-r border-[#AB1509] shadow-[0_30px_70px_rgba(0,0,0,0.7)] z-50 overflow-visible select-none"
            style={{ 
              transform: "translate(-50%, -150%)", 
              willChange: "transform"
            }}
          >
            <Document />
          </div>
        </div>
      </div>
    </section>
  );
}
