"use client";

import { useEffect, useId, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import * as opentype from "opentype.js";
import { cn } from "@/lib/utils";

export interface SignatureRef {
  setProgress: (progress: number) => void;
}

interface SignatureProps {
  /** Text to generate signature for */
  text?: string;
  /** Color of the signature path */
  color?: string;
  /** Font size of the signature */
  fontSize?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view */
  inView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
}



export const Signature = forwardRef<SignatureRef, SignatureProps>(({
  text = "Signature",
  color = "currentColor",
  fontSize = 22,
  duration = 1.5,
  delay = 0,
  className,
  inView = false,
  once = true,
  fontUrl,
}, ref) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  
  // Refs for the path elements so we can mutate them imperatively
  const fillRef = useRef<SVGGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pathLengths = useRef<number[]>([]);

  const height = fontSize * 3; // Give plenty of vertical space
  const horizontalPadding = fontSize * 0.1;
  const topMargin = fontSize * 1.5; // Shift down
  const baseline = topMargin;
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    async function load() {
      try {
        let font;
        const fontPaths = fontUrl 
          ? [fontUrl] 
          : [
              "/LastoriaBoldRegular.otf",
              "./LastoriaBoldRegular.otf",
              "https://www.componentry.fun/LastoriaBoldRegular.otf",
            ];

        let buffer: ArrayBuffer | null = null;
        for (const path of fontPaths) {
          try {
            const response = await fetch(path);
            if (response.ok) {
              buffer = await response.arrayBuffer();
              break;
            }
          } catch {
            // Try next path
          }
        }

        if (!buffer) {
          throw new Error("Font buffer could not be loaded from any path");
        }

        font = opentype.parse(buffer);

        let x = horizontalPadding;
        const newPaths: string[] = [];

        for (const char of text) {
          const glyph = font.charToGlyph(char);
          const path = glyph.getPath(x, baseline, fontSize);
          newPaths.push(path.toPathData(3));

          const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
          x += advanceWidth * (fontSize / font.unitsPerEm);
        }

        setPaths(newPaths);
        setWidth(x + horizontalPadding);
      } catch (error) {
        console.error("Signature component font load error:", error);
        setPaths([]);
        setWidth(text.length * fontSize * 0.6);
      }
    }

    load();
  }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

  useImperativeHandle(ref, () => ({
    setProgress: (progress: number) => {
      pathRefs.current.forEach((path, i) => {
        if (!path) return;
        const length = pathLengths.current[i] || 0;
        const drawLength = length * progress;
        path.style.strokeDashoffset = String(length - drawLength);
      });
      
      if (fillRef.current) {
        if (progress > 0.9) {
          const fadeProgress = (progress - 0.9) / 0.1;
          fillRef.current.style.opacity = String(fadeProgress);
        } else {
          fillRef.current.style.opacity = "0";
        }
      }
    }
  }));

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      key={paths.length}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={cn("text-foreground overflow-visible", className)}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="white"
              strokeWidth={fontSize * 0.22}
              fill="none"
              // Only use variants if NOT using imperative progress
              variants={ref ? undefined : variants}
              transition={ref ? undefined : {
                pathLength: {
                  delay: delay + i * 0.2,
                  duration,
                  ease: "easeInOut",
                },
                opacity: {
                  delay: delay + i * 0.2 + 0.01,
                  duration: 0.01,
                },
              }}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </mask>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={i}
          ref={(el) => {
            // @ts-ignore - motion.path ref type mismatch
            pathRefs.current[i] = el;
            if (el && !pathLengths.current[i]) {
              // Only read getTotalLength once to avoid layout thrashing
              const len = el.getTotalLength();
              pathLengths.current[i] = len;
              // Initialize to 0 length if we have a ref (meaning GSAP controls it)
              if (ref) {
                el.style.strokeDasharray = String(len);
                el.style.strokeDashoffset = String(len);
              }
            }
          }}
          d={d}
          stroke={color}
          strokeWidth={2}
          fill="none"
          variants={ref ? undefined : variants}
          transition={ref ? undefined : {
            pathLength: {
              delay: delay + i * 0.2,
              duration,
              ease: "easeInOut",
            },
            opacity: {
              delay: delay + i * 0.2 + 0.01,
              duration: 0.01,
            },
          }}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      ))}

      <g ref={fillRef} style={{ opacity: 0 }}>
        {paths.map((d, i) => <path key={i} d={d} fill={color} />)}
      </g>
    </motion.svg>
  );
});
