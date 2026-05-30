"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Signature, SignatureRef } from "@/components/ui/signature";

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
        // Set initial positions
        gsap.set(redBgRef.current, { yPercent: 100 });
        gsap.set(docWrapRef.current, { yPercent: -150, opacity: 0 });
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

        // Stage 4 (time 8.5 to 10.5): Signature zooms out (scales up massively) to cover the screen
        tl.to(signatureWrapRef.current, {
          scale: 120,
          duration: 2,
          ease: "power2.in"
        }, 8.5);

        // Stage 5 (time 10.5 to 12.5): Document drops down
        tl.fromTo(docWrapRef.current,
          { yPercent: -150, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.out"
          },
          10.5
        );

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
      id="about-section"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-transparent pointer-events-none z-20"
    >
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
        
        <div
          ref={redBgRef}
          className="absolute inset-0 w-full h-full bg-[#AB1509] flex items-center justify-center overflow-hidden z-30 pointer-events-auto"
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
            className="absolute left-1/2 -translate-x-1/2 w-[92vw] md:w-[70vw] max-w-[780px] h-full bg-[#fff7d3] border-x border-[#2c0a07] shadow-[0_30px_70px_rgba(0,0,0,0.7)] z-50 flex flex-col justify-between p-8 md:p-12 overflow-hidden"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-full flex justify-between items-start border-b border-[#2c0a07]/20 pb-3 font-montreal">
              <span className="text-[10px] uppercase font-bold text-[#2c0a07]/60 tracking-widest">[ Resume ]</span>
              <span className="text-[10px] uppercase font-bold text-[#2c0a07] tracking-widest">Creative Developer</span>
            </div>

            <div className="w-full grid grid-cols-12 gap-6 items-center mt-3">
              {/* Name Column */}
              <div className="col-span-8 relative flex flex-col justify-center select-none">
                <h1 className="m-0 font-tusker-standard font-medium text-[54px] md:text-[68px] leading-[0.8] text-[#AB1509] tracking-tighter">
                  ALI
                </h1>
                <h1 className="m-0 font-tusker-standard font-medium text-[54px] md:text-[68px] leading-[0.8] text-[#AB1509] tracking-tighter relative">
                  AHMED
                  {/* Elegant dark cursive overlay signature */}
                  <span className="absolute bottom-[-15px] left-[15%] font-pinyon text-[28px] md:text-[36px] text-[#2c0a07]/75 font-normal tracking-normal lowercase select-none pointer-events-none transform -rotate-6">
                    Ali Ahmed
                  </span>
                </h1>
              </div>

              {/* Portrait Column */}
              <div className="col-span-4 flex justify-end">
                <div className="relative w-[85px] h-[85px] md:w-[110px] md:h-[110px] border border-[#2c0a07] bg-zinc-200 overflow-hidden shadow-[2px_2px_0px_#2c0a07]">
                  <Image
                    src="/developer_portrait.png"
                    alt="Ali Ahmed Portrait"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-2 border-t border-b border-[#2c0a07]/20 py-2 mt-3 font-montreal">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-[#2c0a07]/60 uppercase tracking-wider">Phone</span>
                <span className="text-[10px] text-[#2c0a07] font-medium">[ +91 98765 43210 ]</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-[#2c0a07]/60 uppercase tracking-wider">Website</span>
                <span className="text-[10px] text-[#2c0a07] font-medium">ALIAHMED.DEV</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[8px] font-bold text-[#2c0a07]/60 uppercase tracking-wider">Email</span>
                <span className="text-[10px] text-[#2c0a07] font-medium">HI@ALIAHMED.DEV</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1.5 mt-3 flex flex-col gap-4 font-montreal text-[#2c0a07] scrollbar-thin">
              {/* Profile Summary */}
              <div className="flex flex-col">
                <h3 className="m-0 text-[#AB1509] font-bold text-[10px] uppercase tracking-wider border-b border-[#2c0a07]/10 pb-1 mb-1.5">
                  Profile Summary
                </h3>
                <p className="m-0 text-[10px] leading-[1.3] text-[#2c0a07]/85 font-light text-justify uppercase">
                  Creative and detail-oriented developer skilled in frontend architecture, high-end 3D WebGL animations, and responsive interactive interfaces. Dedicated to creating immersive digital products that engage users and define contemporary digital brands.
                </p>
              </div>

              {/* Skills Block */}
              <div className="flex flex-col">
                <h3 className="m-0 text-[#AB1509] font-bold text-[10px] uppercase tracking-wider border-b border-[#2c0a07]/10 pb-1 mb-1.5">
                  Skills
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9px] font-bold text-[#2c0a07]/80 uppercase">
                  <div className="flex flex-col gap-1">
                    <span>• Frontend Engineering</span>
                    <span>• 3D WebGL & Shaders (Three.js)</span>
                    <span>• UI/UX & Interaction Design</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>• React & Next.js Ecosystem</span>
                    <span>• Motion Graphics & Animations (GSAP)</span>
                    <span>• Collaboration & Creative Coding</span>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="flex flex-col">
                <h3 className="m-0 text-[#AB1509] font-bold text-[10px] uppercase tracking-wider border-b border-[#2c0a07]/10 pb-1 mb-1.5">
                  Work Experience
                </h3>
                <div className="flex flex-col gap-3">
                  {/* Experience 1 */}
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-5 flex flex-col">
                      <span className="text-[9px] font-bold text-[#2c0a07] uppercase">Senior Creative Developer</span>
                      <span className="text-[8px] font-medium text-[#2c0a07]/60 uppercase">Studio Alchemy — [ 2023 - Present ]</span>
                    </div>
                    <div className="col-span-7">
                      <p className="m-0 text-[9px] leading-[1.3] text-[#2c0a07]/80 uppercase">
                        • Built high-performance interactive experiences and WebGL interfaces for acclaimed global brands, boosting user engagement by 45%.
                      </p>
                    </div>
                  </div>
                  {/* Experience 2 */}
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-5 flex flex-col">
                      <span className="text-[9px] font-bold text-[#2c0a07] uppercase">Creative Tech Intern</span>
                      <span className="text-[8px] font-medium text-[#2c0a07]/60 uppercase">Coding Labs — [ 2021 - 2023 ]</span>
                    </div>
                    <div className="col-span-7">
                      <p className="m-0 text-[9px] leading-[1.3] text-[#2c0a07]/80 uppercase">
                        • Developed responsive web applications and high-end GSAP motion design systems compliant with brutalist creative standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Certifications Side-by-Side */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <h3 className="m-0 text-[#AB1509] font-bold text-[10px] uppercase tracking-wider border-b border-[#2c0a07]/10 pb-1 mb-1.5">
                    Certifications
                  </h3>
                  <div className="flex flex-col gap-1 text-[9px] font-bold text-[#2c0a07]/80 uppercase">
                    <span>• Creative WebGL Certification</span>
                    <span>• Advanced Motion Graphics Systems</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="m-0 text-[#AB1509] font-bold text-[10px] uppercase tracking-wider border-b border-[#2c0a07]/10 pb-1 mb-1.5">
                    Education
                  </h3>
                  <div className="flex flex-col text-[9px] font-bold text-[#2c0a07]/80 uppercase">
                    <span className="text-[#2c0a07]">B.Sc. in Computer Science</span>
                    <span className="text-[#2c0a07]/60 font-medium">Tech University — [ 2017 - 2021 ]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center border-t border-[#2c0a07]/20 pt-3 mt-4 font-montreal text-[8px] md:text-[9px] uppercase font-bold text-[#2c0a07]/60 tracking-wider">
              <div>© 2026 Ali Ahmed</div>
              <div>[Scroll to explore]</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
