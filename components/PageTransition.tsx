"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP plugins
// Dynamically import Preloader to prevent circular dependency and disable SSR
const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

interface TransitionContextType {
  triggerTransition: (href: string) => Promise<void>;
  triggerPreloadTransition: (customTitle: string) => Promise<void>;
  triggerEnterTransition: () => Promise<void>;
  isTransitioning: boolean;
  showPreloader: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionContext must be used within a PageTransitionProvider");
  }
  return context;
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const splitTitleRef = useRef<SplitText | null>(null);
  const percentageVerticalClipRef = useRef<number>(10);

  // Set up custom Hop ease curve on client mount and check preloader session state
  useEffect(() => {
    CustomEase.create("hop", "0.85, 0, 0.15, 1");

    const hasPlayed = sessionStorage.getItem("portfolio-preloader-played");
    if (hasPlayed === "true") {
      setShowPreloader(false);
    }
  }, []);

  // Calculate dynamic clip percentage so the strip opens perfectly around the heading bounds
  const getPercentageVerticalClip = () => {
    if (!titleRef.current) return;
    const titleBound = titleRef.current.getBoundingClientRect();
    const halfHeightTitle = titleBound.height / 2;
    const halfHeightViewport = window.innerHeight / 2;

    // Convert to vertical viewport percentage coordinate
    percentageVerticalClipRef.current = (halfHeightTitle / halfHeightViewport) * 50;
  };

  // Barba-like "Leave" lifecycle hook
  const playLeaveAnimation = useCallback((nextHref: string, customTitle?: string): Promise<void> => {
    return new Promise((resolve) => {
      const overlay = overlayRef.current;
      const title = titleRef.current;
      if (!overlay || !title) {
        resolve();
        return;
      }

      setIsTransitioning(true);
      document.body.classList.add("is__transitioning");
      overlay.classList.add("team__transition");

      if (customTitle) {
        title.innerHTML = customTitle;
      } else {
        // Extract destination route name
        const pathSegments = nextHref.split("/").filter(Boolean);
        const nextDestination = pathSegments[pathSegments.length - 1] || "home";
        // Setup destination title text
        title.innerHTML = `we're going to ${nextDestination}`;
      }

      // Reset and trigger SplitText words slicing
      if (splitTitleRef.current) {
        splitTitleRef.current.revert();
      }
      splitTitleRef.current = new SplitText(title, {
        type: "words",
        wordsClass: "words",
      });

      // Recalculate dynamic text vertical bounds
      getPercentageVerticalClip();
      const clipHeight = percentageVerticalClipRef.current;

      // 1. Initial State: Thin horizontal strip around the text, words translated down out of view
      gsap.set(overlay, {
        pointerEvents: "auto",
        autoAlpha: 1,
        visibility: "visible",
        "--clip": `polygon(0% ${50 - clipHeight}%, 0% ${50 - clipHeight}%, 0% ${50 + clipHeight}%, 0% ${50 + clipHeight}%)`,
      });
      if (splitTitleRef.current && splitTitleRef.current.words.length > 0) {
        gsap.set(splitTitleRef.current.words, { yPercent: 120 });
      }

      // 2. Play Leave Timeline
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        onComplete: () => {
          tl.kill();
          resolve();
        },
      });

      // Step A: Expand thin strip horizontally across the full width
      tl.to(overlay, {
        "--clip": `polygon(0% ${50 - clipHeight}%, 100% ${50 - clipHeight}%, 100% ${50 + clipHeight}%, 0% ${50 + clipHeight}%)`,
      });

      // Step B: Stagger reveal the title words upwards into view inside the strip
      if (splitTitleRef.current && splitTitleRef.current.words.length > 0) {
        tl.to(
          splitTitleRef.current.words,
          {
            yPercent: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
          },
          "<+0.15" // Start slightly after horizontal expand begins
        );
      }

      // Step C: Expand thin strip vertically to cover full screen
      tl.to(
        overlay,
        {
          "--clip": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        "+=0.3" // Short pause so name inside the line remains readable before covering screen
      );
    });
  }, []);

  // Barba-like "After/Enter" lifecycle hook
  const playEnterAnimation = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const overlay = overlayRef.current;
      const splitTitle = splitTitleRef.current;
      if (!overlay) {
        resolve();
        return;
      }

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "hop" },
        onComplete: () => {
          // Cleanup split text structure
          if (splitTitleRef.current) {
            splitTitleRef.current.revert();
            splitTitleRef.current = null;
          }

          // Reset overlay positioning
          gsap.set(overlay, {
            pointerEvents: "none",
            autoAlpha: 0,
            visibility: "hidden",
          });

          document.body.classList.remove("is__transitioning");
          overlay.classList.remove("team__transition");
          setIsTransitioning(false);

          tl.kill();
          resolve();
        },
      });

      // Step A: Stagger target split words upwards out of view
      if (splitTitle && splitTitle.words.length > 0) {
        tl.to(splitTitle.words, {
          yPercent: -120,
          duration: 0.65,
          stagger: {
            amount: 0.25,
          },
          ease: "elastic.in(1, 0.75)",
        });
      }

      // Step B: Collapse the clip-path overlay to the top
      tl.to(
        overlay,
        {
          "--clip": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        },
        "<+0.25"
      );
    });
  }, []);

  // Main navigation click handler with hash scroll support
  const triggerTransition = useCallback(async (href: string) => {
    const [targetPath, targetHash] = href.split("#");
    const isCurrentPageHash = targetHash && (pathname === targetPath || (pathname === "/" && targetPath === ""));

    if (isCurrentPageHash) {
      let customTitle: string | undefined;
      if (targetHash === "work") {
        customTitle = "selected work";
      } else if (targetHash === "about") {
        customTitle = "about the studio";
      } else if (targetHash === "contact") {
        customTitle = "get in touch";
      }

      // A: Leave Phase
      await playLeaveAnimation(href, customTitle);

      // B: Position viewport at the hash element instantly while screen is fully covered
      const el = document.getElementById(targetHash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }

      // C: Enter Phase
      await playEnterAnimation();
    } else {
      if (pathname === href) return;
      // Standard cross-page transition
      await playLeaveAnimation(href);
      router.push(href);
    }
  }, [pathname, router, playLeaveAnimation, playEnterAnimation]);

  // Specialized preload wipe handler
  const triggerPreloadTransition = useCallback(async (customTitle: string) => {
    await playLeaveAnimation("/", customTitle);
  }, [playLeaveAnimation]);

  // Manual trigger for entering the page
  const triggerEnterTransition = useCallback(async () => {
    await playEnterAnimation();
  }, [playEnterAnimation]);

  // Trigger enter reveal animation whenever path changes successfully
  useEffect(() => {
    // Play transition entry if we currently have the overlay active
    if (isTransitioning) {
      playEnterAnimation();
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ triggerTransition, triggerPreloadTransition, triggerEnterTransition, isTransitioning, showPreloader }}>
      {showPreloader && (
        <Preloader
          onComplete={() => {
            sessionStorage.setItem("portfolio-preloader-played", "true");
            setShowPreloader(false);
          }}
        />
      )}
      {children}
      
      {/* Fixed global overlay layer */}
      <div ref={overlayRef} className="transition__overlay">
        <h1 ref={titleRef} className="title__destination">
          we&apos;re going to
        </h1>
      </div>
    </TransitionContext.Provider>
  );
};

// Customized Link component that wraps routing actions with transition cues
export const TransitionLink: React.FC<{
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}> = ({ href, className, onClick, children }) => {
  const { triggerTransition, isTransitioning } = useTransitionContext();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick(e);

    // Intercept both cross-page links and hash-links starting with "/"
    if (href.startsWith("/")) {
      e.preventDefault();
      if (!isTransitioning) {
        triggerTransition(href);
      }
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
