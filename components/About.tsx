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
        gsap.set(docWrapRef.current, { xPercent: -50, yPercent: -150 });
        gsap.set(signatureWrapRef.current, { scale: 1, opacity: 1 });
        
        // Ensure signature is hidden initially
        if (sigRef.current) sigRef.current.setProgress(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current, 
            start: "top bottom",           
            end: "bottom bottom",          
            pin: "#work",
            pinSpacing: false,
            scrub: 1,                      
            onUpdate: (self) => {
              if (self.progress === 0) {
                gsap.set(workInnerEl, { scale: 1, z: 0, opacity: 1, rotateX: 0, y: 0 });
              }
            },
            onLeaveBack: () => {
              gsap.set(workInnerEl, { scale: 1, z: 0, opacity: 1, rotateX: 0, y: 0 });
              if (sigRef.current) sigRef.current.setProgress(0);
            }
          }
        });

        // We use an arbitrary total duration of 10 to easily map scroll percentages.

        // Stage 1 (time 0 to 4.5): 3D recede #work-inner + red panel slides up
        tl.fromTo(workInnerEl,
          { scale: 1, z: 0, opacity: 1, rotateX: 0 },
          { 
            scale: 0.72, 
            z: -450, 
            opacity: 0, 
            rotateX: 12, 
            duration: 4.5, 
            ease: "power2.inOut" 
          },
          0
        );

        tl.fromTo(redBgRef.current,
          { yPercent: 100 },
          { 
            yPercent: 0, 
            duration: 4.5, 
            ease: "power2.inOut" 
          },
          0
        );

        // Stage 2 (time 4.5 to 8.0): Signature physically draws over time (scrubbed)
        const sigProxy = { val: 0 };
        tl.to(sigProxy, {
          val: 1,
          duration: 3.5,
          ease: "none",
          onUpdate: () => {
            if (sigRef.current) sigRef.current.setProgress(sigProxy.val);
          }
        }, 4.5);

        // Stage 3 (time 8.0 to 8.5): Brief hold/buffer
        tl.to({}, { duration: 0.5 }, 8.0);

        // Stage 4 (time 8.5 to 13.5): Signature physically zooms out (scales up massively) to cover the screen
        tl.to(signatureWrapRef.current, {
          scale: 120,
          duration: 5,
          ease: "power2.in"
        }, 8.5);

        // Stage 5 (time 13.5 to 18.5): Document lowers into position — NO fade, pure scroll-driven descent
        tl.fromTo(docWrapRef.current,
          { yPercent: -150 },
          {
            yPercent: 0,
            duration: 5,
            ease: "none" // Linear mapping makes it feel 1:1 physically controlled by the scroll wheel
          },
          13.5
        );

        // Stage 6 (time 18.5 to 22.0): Black horizontal blueprint drafting lines draw out staggered
        const allAboutLines = redBgRef.current?.querySelectorAll(".about-line");
        if (allAboutLines && allAboutLines.length > 0) {
          tl.fromTo(allAboutLines,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 3.5,
              stagger: 0.15,
              ease: "power2.out"
            },
            18.5
          );
        }

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
      className="relative w-full h-[300vh] bg-transparent pointer-events-none z-20"
    >
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
        
        <div
          ref={redBgRef}
          className="absolute inset-0 w-full h-full bg-[#AB1509] flex items-center justify-center overflow-hidden z-30 pointer-events-auto"
          style={{ transform: "translateY(100%)" }}
        >
          {/* Deep black horizontal blueprint drafting lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
            <div className="about-line absolute left-0 w-full h-[2px] origin-left" style={{ top: "16.6%", transform: "scaleX(0)" }} />
            <div className="about-line absolute left-0 w-full h-[2px] origin-left" style={{ top: "33.3%", transform: "scaleX(0)" }} />
            <div className="about-line absolute left-0 w-full h-[2px] origin-left" style={{ top: "50%", transform: "scaleX(0)" }} />
            <div className="about-line absolute left-0 w-full h-[2px] origin-left" style={{ top: "66.6%", transform: "scaleX(0)" }} />
            <div className="about-line absolute left-0 w-full h-[2px] origin-left" style={{ top: "83.3%", transform: "scaleX(0)" }} />
          </div>

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
            className="absolute left-1/2 w-[90vw] h-screen md:w-[78vh] md:h-screen lg:w-[82vh] lg:h-screen bg-[#fff7d3] border-l border-r border-[#AB1509] shadow-[0_30px_70px_rgba(0,0,0,0.7)] z-50 overflow-visible select-none"
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
