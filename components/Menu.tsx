"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { TransitionLink, useTransitionContext } from "@/components/PageTransition";

export default function Menu() {
  const { showPreloader } = useTransitionContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const bgPanelsRef = useRef<HTMLDivElement[]>([]);
  const menuLinksRef = useRef<HTMLLIElement[]>([]);
  const fadeTargetsRef = useRef<HTMLDivElement[]>([]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Portal needs client mount
  useEffect(() => { 
    setMounted(true); 
  }, []);

  useEffect(() => {
    if (mounted && !showPreloader) {
      // Elegant, clean entrance animation for the menu trigger button
      gsap.fromTo(
        ".menu-trigger-wrap",
        { y: -60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.3, // Perfect alignment with hero intro
        }
      );
    }
  }, [mounted, showPreloader]);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("menuEase", "0.65, 0.01, 0.05, 0.99");

    const tl = gsap.timeline({
      defaults: { ease: "menuEase", duration: 0.7 },
    });

    if (isOpen) {
      document.body.style.overflow = "hidden";

      const panels = bgPanelsRef.current.filter(Boolean);
      const links = menuLinksRef.current.filter(Boolean);
      const targets = fadeTargetsRef.current.filter(Boolean);

      tl.clear()
        .set(overlayRef.current, { display: "block" })
        .set(menuRef.current, { display: "flex" })
        .set(menuRef.current, { xPercent: 0 })
        .fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1 })
        .fromTo(
          panels,
          { xPercent: 101 },
          { xPercent: 0, stagger: 0.12, duration: 0.575 },
          "<"
        )
        .fromTo(
          links.map((el) => el.querySelector(".menu-link")),
          { yPercent: 140, rotate: 10 },
          { yPercent: 0, rotate: 0, stagger: 0.05 },
          "<+=0.5"
        )
        .fromTo(
          targets,
          { autoAlpha: 0, yPercent: 50 },
          { autoAlpha: 1, yPercent: 0, stagger: 0.04 },
          "<+=0.2"
        );
    } else {
      document.body.style.overflow = "";
      const panels = bgPanelsRef.current.filter(Boolean);

      tl.clear()
        .to(overlayRef.current, { autoAlpha: 0 })
        .to(menuRef.current, { xPercent: 120 }, "<")
        .to(panels, { xPercent: 101, stagger: 0.05, duration: 0.5 }, "<")
        .set(overlayRef.current, { display: "none" })
        .set(menuRef.current, { display: "none" });
    }

    return () => { tl.kill(); };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Home", num: "00", href: "/" },
    { label: "About", num: "01", href: "/#about" },
    { label: "Work", num: "02", href: "/#work" },
    { label: "Contact", num: "03", href: "/#contact" },
  ];

  const socials = [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "X/Twitter", href: "#" },
    { label: "Instagram", href: "#" },
  ];

  // The menu overlay is rendered via portal to document.body
  // so it escapes all parent stacking contexts and overflow-hidden
  const menuOverlay = (
    <div
      ref={navRef}
      className="fixed inset-0 w-full h-dvh pointer-events-none"
      style={{ zIndex: 9999 }}
      data-nav={isOpen ? "open" : "closed"}
    >
      {/* Full-screen blurred overlay */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="absolute inset-0 cursor-pointer pointer-events-auto hidden"
        style={{
          backgroundColor: "rgba(5, 5, 5, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          opacity: 0,
        }}
      ></div>

      {/* Sliding Curved Menu Panel */}
      <nav
        ref={menuRef}
        className="absolute top-0 right-0 bottom-0 w-full md:w-[35rem] h-full flex flex-col justify-between items-start pt-24 md:pt-28 pb-8 rounded-l-[1rem] md:rounded-l-[1rem] overflow-hidden pointer-events-auto hidden"
        style={{ zIndex: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div
            ref={(el) => { if (el) bgPanelsRef.current[0] = el; }}
            className="absolute inset-0 bg-accent rounded-l-[2rem] md:rounded-l-[2rem]"
          ></div>
          <div
            ref={(el) => { if (el) bgPanelsRef.current[1] = el; }}
            className="absolute inset-0 bg-[#fff7d3] rounded-l-[2rem] md:rounded-l-[2rem]"
          ></div>
          <div
            ref={(el) => { if (el) bgPanelsRef.current[2] = el; }}
            className="absolute inset-0 bg-[#050505] rounded-l-[2rem] md:rounded-l-[2rem]"
          ></div>
        </div>

        <div className="relative w-full h-full flex flex-col justify-between items-start" style={{ zIndex: 1 }}>
          {/* Menu Links */}
          <ul className="flex flex-col w-full list-none p-0 m-0">
            {menuItems.map((item, index) => (
              <li
                key={item.label}
                ref={(el) => { if (el) menuLinksRef.current[index] = el; }}
                className="relative overflow-hidden w-full border-b border-white/[0.06] will-change-transform"
              >
                <TransitionLink
                  href={item.href}
                  onClick={closeMenu}
                  className="menu-link relative flex items-baseline gap-3 py-5 md:py-6 px-6 md:px-10 w-full no-underline group/link select-none"
                >
                  {/* Text roll hover via text-shadow trick */}
                  <div className="menu-link-heading-wrap relative overflow-hidden pt-2">
                    <span
                      className="block font-tusker-standard text-[2.75rem] md:text-[7rem] font-medium uppercase leading-[0.85] tracking-tight whitespace-nowrap text-[#fff7d3] transition-transform duration-500 ease-out group-hover/link:-translate-y-[1em] select-none"
                      style={{ textShadow: "0px 1em 0px #AB1509" }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Numeric Eyebrow - Neue Montreal Medium, inline next to text */}
                  <span className="font-montreal text-[12px] text-accent uppercase font-medium shrink-0 group-hover/link:text-black transition-colors duration-300">
                    {item.num}
                  </span>

                  {/* Hover bg */}
                  <div className="absolute inset-0 bg-[#fff7d3] max-w-full origin-bottom scale-y-0 group-hover/link:scale-y-100 transition-transform duration-500 ease-out -z-10"></div>
                </TransitionLink>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex flex-col gap-3 px-6 md:px-10 w-full">
            <p
              ref={(el) => { if (el) fadeTargetsRef.current[0] = el; }}
              className="text-[16px] uppercase tracking-widest text-white/40 font-light"
              data-menu-fade=""
            >
              Socials
            </p>
            <div
              ref={(el) => { if (el) fadeTargetsRef.current[1] = el; }}
              className="flex flex-row flex-wrap gap-x-5 gap-y-2"
              data-menu-fade=""
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={closeMenu}
                  className="relative py-1 text-[10px] uppercase tracking-widest whitespace-nowrap font-light text-white/50 hover:text-[#fff7d3] transition-colors duration-300 group/social"
                >
                  {social.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-right scale-x-0 group-hover/social:scale-x-100 group-hover/social:origin-left transition-transform duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Seamless Toggle Trigger - Placed inside the Portal so it sits on top of overlay z-index */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleMenu}
        onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
        className={`menu-trigger-wrap fixed top-6 right-6 md:right-12 group flex items-center justify-center w-10 h-10 cursor-pointer select-none outline-none z-[10000] pointer-events-auto transition-all duration-500 ease-out ${showPreloader ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"}`}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {/* ME/NU Text - animates away when open */}
        <div className={`absolute flex flex-col items-start font-tusker-standard text-[2.2rem] md:text-[2rem] font-medium leading-[0.75] mt-10 tracking-tighter text-white hover:text-yellow-soft transition-all duration-500 ease-out origin-center ${isOpen ? "opacity-0 scale-75 rotate-90 pointer-events-none" : "opacity-100 scale-100 rotate-0"
          }`}>
          <span className="block font-tusker-standard leading-[0.75] group-hover:translate-x-1 transition-transform duration-300 pb-2">ME</span>
          <span className="block font-tusker-standard leading-[0.75] pb-1 group-hover:-translate-x-1 transition-transform duration-300">NU</span>
        </div>

        {/* Sleek Geometric X - animates in when open */}
        <div className={`absolute w-6 h-6 flex items-center justify-center transition-all duration-500 ease-out origin-center mt-10 ${isOpen ? "opacity-100 scale-100 rotate-0 group-hover:rotate-90" : "opacity-0 scale-75 -rotate-90 pointer-events-none"
          }`}>
          <span className="absolute w-6 h-[2px] bg-white group-hover:bg-accent transition-colors duration-300 transform rotate-45"></span>
          <span className="absolute w-6 h-[2px] bg-white group-hover:bg-accent transition-colors duration-300 transform -rotate-45"></span>
        </div>
      </div>
    </div>
  );

  if (showPreloader) return null;

  return (
    <>
      {/* Portal renders menu at document.body level — above all stacking contexts */}
      {mounted && createPortal(menuOverlay, document.body)}
    </>
  );
}
