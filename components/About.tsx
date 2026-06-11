"use client";

import React, { useEffect, useRef, useState } from "react";
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
  
  const sigRef = useRef<SignatureRef>(null);
  const sigRef1 = useRef<SignatureRef>(null);
  const sigRef2 = useRef<SignatureRef>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      // Scale proportionally to viewport so signature fills screen on all monitor sizes
      // Base: 1x at 1440px, scales up on larger screens
      const sigBaseScale = isMobile ? 1 : Math.max(1, window.innerWidth / 1440);
      
      // Scale the inner signature container to sigBaseScale around its center
      const innerContainer = signatureWrapRef.current?.querySelector(".signature-scale-container");
      if (innerContainer) {
        gsap.set(innerContainer, {
          scale: sigBaseScale,
          transformOrigin: "center center"
        });
      }

      // Calculate percentage-based transform origin relative to screen center.
      // On desktop, zooms into a letter stroke. On mobile, zooms from screen center.
      const originX = isMobile 
        ? window.innerWidth / 2 
        : window.innerWidth / 2 - 115.2 * sigBaseScale;
      const originY = isMobile 
        ? window.innerHeight / 2 
        : window.innerHeight / 2 + 18 * sigBaseScale;

      const pctX = (originX / window.innerWidth) * 100;
      const pctY = (originY / window.innerHeight) * 100;

      // Set transform origin of signature wrapper
      gsap.set(signatureWrapRef.current, { 
        transformOrigin: `${pctX}% ${pctY}%`,
        scale: 1
      });

      ctx = gsap.context(() => {
        // Clear SSR inline transforms so GSAP can take over cleanly without matrix concatenation bugs
        if (redBgRef.current) redBgRef.current.style.transform = "";
        if (docWrapRef.current) docWrapRef.current.style.transform = "";

        let entranceTimeline: gsap.core.Timeline;

        // Set initial positions
        gsap.set(redBgRef.current, { yPercent: 100 });
        if (redBgRef.current) redBgRef.current.style.display = "none";
        gsap.set(docWrapRef.current, { xPercent: -50, yPercent: -150 });
        gsap.set(signatureWrapRef.current, { 
          transformOrigin: `${pctX}% ${pctY}%`,
          scale: 1, 
          opacity: 1 
        });
        
        // Ensure signature is hidden initially
        if (isMobile) {
          if (sigRef1.current) sigRef1.current.setProgress(0);
          if (sigRef2.current) sigRef2.current.setProgress(0);
        } else {
          if (sigRef.current) sigRef.current.setProgress(0);
        }

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
            scrub: 0.8,                      
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
              if (isMobile) {
                if (sigRef1.current) sigRef1.current.setProgress(0);
                if (sigRef2.current) sigRef2.current.setProgress(0);
              } else {
                if (sigRef.current) sigRef.current.setProgress(0);
              }
            },
            onUpdate: (self) => {
              const isTransitioning = document.body.classList.contains("is__transitioning");
              if (self.progress > 0.65) {
                if (isTransitioning) {
                  entranceTimeline.progress(1);
                } else {
                  const isForward = self.direction > 0;
                  if (isForward && entranceTimeline.progress() < 1) {
                    entranceTimeline.play();
                  }
                }
              } else {
                entranceTimeline.pause(0);
              }
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
        // Gentle ease makes the draw feel more organic
        const sigProxy = { val: 0 };
        tl.to(sigProxy, {
          val: 1,
          duration: 4.0,
          ease: "power1.inOut",
          onUpdate: () => {
            if (isMobile) {
              if (sigRef1.current) sigRef1.current.setProgress(sigProxy.val);
              if (sigRef2.current) sigRef2.current.setProgress(sigProxy.val);
            } else {
              if (sigRef.current) sigRef.current.setProgress(sigProxy.val);
            }
          }
        }, 7.0);

        // Stage 2b: Subtle vertical parallax drift on the signature during drawing
        tl.fromTo(signatureWrapRef.current,
          { y: isMobile ? 0 : 8 },
          { y: isMobile ? 0 : -8, duration: 4.0, ease: "power1.inOut" },
          7.0
        );

        // Stage 3 (time 11.0 to 13.0): Hold/buffer — lets the viewer absorb the signature
        tl.to({}, { duration: 2.0 }, 11.0);

        // Stage 4 (time 13.0 to 25.0): Signature zooms with long scroll span and deep parallax drift
        const targetScale = isMobile ? 18 : 120;
        const targetX = isMobile ? 0 : -window.innerWidth * 0.06;
        const targetY = isMobile ? 0 : -window.innerHeight * 0.18;

        tl.fromTo(signatureWrapRef.current,
          {
            scale: 1,
            x: 0,
            y: isMobile ? 0 : -8,
            transformOrigin: `${pctX}% ${pctY}%`
          },
          {
            scale: targetScale,
            x: targetX,
            y: targetY,
            transformOrigin: `${pctX}% ${pctY}%`,
            duration: 12,
            ease: "power1.inOut"
          },
          13.0
        );

        if (isMobile) {
          tl.to(signatureWrapRef.current, {
            opacity: 0,
            duration: 8,
            ease: "power1.in"
          }, 14.5);
        }

        // Stage 5 (time 25.0 to 35.0): Document lowers into position — NO fade, pure scroll-driven descent
        tl.fromTo(docWrapRef.current,
          { yPercent: -150 },
          {
            yPercent: 0,
            duration: 10,
            ease: "none" // Linear mapping makes it feel 1:1 physically controlled by the scroll wheel
          },
          25.0
        );

        // Subtle gravity pendulum swing anchored at the top center (50% 0%) of the document
        tl.fromTo(docWrapRef.current,
          { rotate: 0, transformOrigin: "50% 0%" },
          { rotate: 3.5, duration: 2.5, ease: "power1.inOut" },
          25.0
        );
        tl.to(docWrapRef.current,
          { rotate: -2.8, duration: 2.5, ease: "power1.inOut" },
          27.5
        );
        tl.to(docWrapRef.current,
          { rotate: 1.8, duration: 2.5, ease: "power1.inOut" },
          30.0
        );
        tl.to(docWrapRef.current,
          { rotate: -0.8, duration: 2, ease: "power1.inOut" },
          32.5
        );
        tl.to(docWrapRef.current,
          { rotate: 0, duration: 1.5, ease: "power2.out" },
          34.5
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
        entranceTimeline = gsap.timeline({ paused: true });

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

        // Add a 100vh scroll hold at the end of the document animation (duration 6.0 units)
        // to pin the fully rendered resume before entering the contact section circular reveal.
        tl.to({}, { duration: 6.0 }, 35.0);

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
  }, [isMobile]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-transparent pointer-events-none z-20"
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
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none transform z-40"
          >
            <div className="signature-scale-container flex items-center justify-center">
              {/* Mounted immediately so Opentype can load the font, but drawn via GSAP scrub */}
              {isMobile ? (
                <div className="flex flex-col items-center justify-center gap-1">
                  <Signature
                    ref={sigRef1}
                    text="Ali"
                    color="#fff7d3"
                    fontSize={36}
                    inView={false}
                    once={true}
                  />
                  <Signature
                    ref={sigRef2}
                    text="Ahmed"
                    color="#fff7d3"
                    fontSize={36}
                    inView={false}
                    once={true}
                  />
                </div>
              ) : (
                <Signature
                  ref={sigRef}
                  text="Ali Ahmed"
                  color="#fff7d3"
                  fontSize={50}
                  inView={false}
                  once={true}
                />
              )}
            </div>
          </div>

          <div
            ref={docWrapRef}
            className="about-doc-wrap absolute left-1/2 w-full h-screen md:w-[78vh] md:h-screen lg:w-[82vh] lg:h-screen bg-[#fff7d3] md:border-l md:border-r md:border-[#AB1509] shadow-[0_30px_70px_rgba(0,0,0,0.7)] z-50 overflow-y-auto md:overflow-visible select-none"
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
