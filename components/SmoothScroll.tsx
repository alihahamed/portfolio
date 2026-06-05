"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    // Bridge Lenis virtual scroll → GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker as the single RAF loop (syncs Lenis + GSAP perfectly)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP ticker gives seconds, Lenis expects ms
    });
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from throttling during heavy frames

    return () => {
      (window as any).lenis = undefined;
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  return <>{children}</>;
}
