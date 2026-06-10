"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Drawer, DrawerContent } from "./ui/drawer";

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  label: string;
  value: number;
  suffix?: string;
}

interface TechItem {
  label: string;
  iconKey: string;
}

interface Project {
  id: number;
  title: string;
  images: string[];
  description: string;
  approach: string;
  techStack: TechItem[];
  metrics: Metric[];
  projectUrl: string;
  projectVideo: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Accountants For Global Business",
    images: ["/agb-3.png", "/agb.png", "/agb-2.png", "/agb-4.png"],
    description: "AGB needed more than just a website. they needed a whole ecosystem where accounting firms from around the world could be found, contacted and trusted. I built that. a global directory, country specific business guides, service pages and a full CMS so the client never has to ask a developer to update anything. just a platform that works and keeps working.",
    approach: "I didn't just build pages, I thought about the two people using this thing. the business owner who needs an accountant in a country they've never worked in, and the firm that wants to be found without chasing leads. everything I built was with both of them in mind.",
    techStack: [
      { label: "Next.js", iconKey: "nextjs" },
      { label: "TypeScript", iconKey: "typescript" },
      { label: "Tailwind CSS", iconKey: "tailwind" },
      { label: "GSAP 3D", iconKey: "gsap" },
      { label: "Supabase", iconKey: "supabase" },
      { label: "Payload CMS", iconKey: "payload" }
    ],
    metrics: [
      { label: "Runways Mapped", value: 12, suffix: "" },
      { label: "Avg Engagement", value: 87, suffix: "%" },
      { label: "Assets Rendered", value: 142, suffix: "" }
    ],
    projectUrl: "https://agb-website.vercel.app/",
    projectVideo: "demo.mp4"
  },
  {
    id: 2,
    title: "PrimeCrest Property Management",
    images: ["/pmc-2.png", "/pmc-1.png", "/pmc-3.png", "/pmc-4.png"],
    description: "PrimeCrest needed a sharp, premium landing page to capture high-value leads for their real estate broking and property services. I built them a dark-mode, high-end single page site focused entirely on turning casual traffic into actual inquiries. Users land on a clean, visual hero section and get guided straight to an enquiry form or a savings calculator without any distraction.",
    approach: "My approach was simple. They needed leads, so I built a direct path from landing on the site to sending an inquiry. We went with a dark-mode/light-mode, premium look and kept everything focused. No unnecessary pages, no distractions. Just a clear, simple flow that makes it easy for a user to see what they offer and get in touch.",
    techStack: [
      { label: "Vite", iconKey: "vite" },
      { label: "TypeScript", iconKey: "typescript" },
      { label: "Tailwind CSS", iconKey: "tailwind" },
      { label: "Framer Motion", iconKey: "framer" },
      { label: "Supabase", iconKey: "supabase" },
      { label: "Resend", iconKey: "resend" },
      { label: "shadcn/ui", iconKey: "shadcn" }
    ],
    metrics: [
      { label: "Projects Tracked", value: 8, suffix: "" },
      { label: "Scrub Frames", value: 1440, suffix: "" },
      { label: "Projections", value: 350, suffix: "m" }
    ],
    projectUrl: "https://primecrestproperty.in/",
    projectVideo: "https://assets.mixkit.co/videos/preview/mixkit-urban-fashion-runway-showcase-40290-large.mp4"
  },
  {
    id: 3,
    title: "DigiDifference (Concept Redesign)",
    images: ["/digi-2.png", "/digi-1.png", "/digi-3.png", "/digi-4.png"],
    description: "DigiDifference had the right energy but a site that didn't show it. the original didn't match the confidence of what they actually do. I took it apart and rebuilt it from scratch as a concept, tightening the structure, fixing the section flow and giving it a visual identity that actually felt like a digital marketing agency worth hiring.",
    approach: "the whole site runs on GSAP. scroll-triggered reveals, smooth section transitions, text animations that feel intentional rather than decorative. I wanted every interaction to feel like the site was alive, not just a static page you scroll through. the goal was to make the design do the selling before anyone reads a single word.",
    techStack: [
      { label: "Next.js", iconKey: "nextjs" },
      { label: "TypeScript", iconKey: "typescript" },
      { label: "Tailwind CSS", iconKey: "tailwind" },
      { label: "GSAP", iconKey: "gsap" }
    ],
    metrics: [
      { label: "Houses Detailed", value: 15, suffix: "" },
      { label: "Ratio Grids", value: 32, suffix: "" },
      { label: "Ambient Frames", value: 240, suffix: "" }
    ],
    projectUrl: "https://digi-difference.vercel.app/",
    projectVideo: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-neon-lights-40296-large.mp4"
  }
];

const TECH_ICONS: { [key: string]: React.ReactNode } = {
  nextjs: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#FFFFFF" }}>
      <title>Next.js</title>
      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
    </svg>
  ),
  typescript: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#3178C6" }}>
      <title>TypeScript</title>
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  tailwind: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#06B6D4" }}>
      <title>Tailwind CSS</title>
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  gsap: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#0AE448" }}>
      <title>GSAP</title>
      <path d="M9.83,7.59C10.647,7.595 11.267,7.828 11.672,8.282C12.055,8.713 12.239,9.336 12.219,10.132L12.205,10.193C12.197,10.211 12.185,10.229 12.17,10.243C12.14,10.272 12.099,10.288 12.057,10.288L10.398,10.288C10.29,10.288 10.199,10.2 10.199,10.093C10.199,9.669 10.071,9.435 9.809,9.383L9.689,9.372C9.347,9.372 9.125,9.583 9.119,9.951C9.112,10.361 9.344,10.734 10.004,11.374C10.872,12.19 11.221,12.913 11.204,13.867C11.177,15.411 10.127,16.41 8.531,16.41C7.716,16.41 7.093,16.191 6.678,15.761C6.258,15.324 6.066,14.683 6.106,13.855C6.108,13.813 6.125,13.772 6.155,13.743C6.185,13.714 6.226,13.698 6.267,13.698L7.983,13.698C8.007,13.699 8.03,13.705 8.052,13.715C8.073,13.726 8.092,13.741 8.107,13.76C8.12,13.775 8.129,13.793 8.135,13.813C8.14,13.832 8.141,13.853 8.137,13.873C8.118,14.171 8.171,14.394 8.288,14.518C8.363,14.598 8.469,14.639 8.599,14.639C8.916,14.639 9.102,14.414 9.109,14.024C9.115,13.687 9.007,13.39 8.427,12.792C7.676,12.058 7.003,11.3 7.024,10.108C7.037,9.416 7.311,8.784 7.798,8.327C8.312,7.845 9.014,7.59 9.83,7.59ZM4.047,7.618C4.794,7.612 5.381,7.842 5.789,8.303C6.221,8.79 6.44,9.524 6.441,10.485C6.44,10.527 6.422,10.567 6.392,10.597C6.362,10.626 6.322,10.643 6.28,10.643L4.479,10.643C4.448,10.642 4.417,10.629 4.395,10.607C4.373,10.584 4.361,10.553 4.36,10.522C4.346,9.899 4.172,9.576 3.828,9.538L3.757,9.534C3.067,9.535 2.66,10.472 2.444,10.992C2.142,11.719 1.988,12.507 2.018,13.293C2.033,13.659 2.092,14.173 2.438,14.386C2.746,14.575 3.185,14.45 3.451,14.24C3.716,14.031 3.93,13.669 4.02,13.339C4.033,13.293 4.033,13.258 4.021,13.241C4.015,13.233 4.003,13.229 3.989,13.226L3.485,13.222C3.461,13.222 3.436,13.216 3.414,13.206C3.392,13.196 3.372,13.181 3.356,13.162C3.344,13.148 3.335,13.13 3.331,13.112C3.327,13.093 3.327,13.074 3.331,13.056L3.647,11.682C3.663,11.611 3.726,11.558 3.804,11.548L3.804,11.545L6.839,11.545C6.846,11.545 6.854,11.545 6.86,11.546C6.939,11.556 6.995,11.63 6.994,11.71L6.994,11.714L6.678,13.085C6.661,13.163 6.583,13.22 6.494,13.22L6.113,13.22C6.1,13.22 6.086,13.225 6.075,13.233C6.064,13.241 6.056,13.253 6.052,13.266C5.7,14.46 5.223,15.282 4.594,15.775C4.058,16.195 3.399,16.391 2.517,16.391C1.725,16.391 1.191,16.136 0.738,15.633C0.14,14.967 -0.107,13.879 0.043,12.566C0.313,10.103 1.589,7.618 4.047,7.618ZM21.016,7.75C23.026,7.75 24.03,8.662 23.999,10.461C23.962,12.569 22.678,14.119 20.745,14.477C20.47,14.527 20.191,14.547 19.912,14.545L18.978,14.541C18.963,14.541 18.948,14.547 18.937,14.558C18.926,14.568 18.92,14.583 18.92,14.598C18.92,14.608 18.922,14.618 18.928,14.627C18.933,14.636 18.941,14.643 18.95,14.648L19.744,15.062C19.809,15.096 19.835,15.153 19.82,15.226C19.815,15.249 19.618,16.139 19.613,16.159C19.596,16.237 19.533,16.282 19.442,16.282L17.739,16.282C17.715,16.282 17.69,16.277 17.668,16.267C17.646,16.257 17.626,16.241 17.61,16.223C17.598,16.208 17.589,16.191 17.585,16.173C17.58,16.155 17.581,16.135 17.585,16.116L19.481,7.875C19.5,7.789 19.581,7.751 19.653,7.751L21.016,7.75ZM17.273,7.762C17.292,7.77 17.31,7.781 17.324,7.795C17.338,7.81 17.351,7.828 17.358,7.847C17.366,7.866 17.369,7.886 17.369,7.906L17.358,16.119C17.361,16.138 17.36,16.158 17.355,16.177C17.35,16.196 17.34,16.213 17.328,16.228C17.313,16.245 17.295,16.259 17.274,16.268C17.254,16.277 17.232,16.282 17.21,16.281L15.397,16.281C15.377,16.282 15.356,16.277 15.337,16.27C15.318,16.262 15.3,16.25 15.286,16.236C15.272,16.221 15.26,16.204 15.253,16.185C15.245,16.166 15.241,16.146 15.241,16.125L15.28,15.328C15.282,15.241 15.28,15.217 15.229,15.211L15.161,15.209L13.447,15.209C13.323,15.209 13.314,15.22 13.27,15.334L12.914,16.191C12.882,16.252 12.818,16.281 12.722,16.281L10.927,16.281C10.818,16.281 10.74,16.173 10.781,16.072L14.499,7.873C14.524,7.824 14.562,7.75 14.648,7.75L17.214,7.75C17.234,7.75 17.254,7.754 17.273,7.762ZM15.5,9.985C15.492,9.953 15.466,9.956 15.445,9.998C15.43,10.028 15.416,10.06 15.405,10.091L14.121,13.274C14.114,13.294 14.109,13.31 14.105,13.322C14.104,13.328 14.103,13.335 14.104,13.341C14.105,13.347 14.108,13.353 14.111,13.358C14.115,13.363 14.12,13.367 14.126,13.37C14.131,13.373 14.137,13.376 14.143,13.376L15.215,13.39C15.334,13.38 15.34,13.374 15.352,13.253C15.354,13.21 15.506,10.022 15.5,9.985ZM20.112,9.582C20.097,9.582 20.083,9.588 20.072,9.599C20.061,9.609 20.055,9.624 20.054,9.639C20.054,9.649 20.057,9.659 20.062,9.668C20.068,9.677 20.075,9.685 20.084,9.69C20.097,9.697 20.869,10.104 20.926,10.135C20.968,10.158 20.969,10.198 20.955,10.267C20.948,10.298 20.415,12.642 20.416,12.644C20.419,12.647 20.435,12.655 20.515,12.655L20.551,12.655C21.446,12.619 21.934,11.561 21.952,10.534C21.961,9.979 21.772,9.638 21.429,9.588L21.358,9.582L20.112,9.582Z" />
    </svg>
  ),
  supabase: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#3FCF8E" }}>
      <title>Supabase</title>
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
    </svg>
  ),
  payload: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#FFFFFF" }}>
      <title>Payload CMS</title>
      <path d="M11.068 0 22.08 6.625v12.573L13.787 24V11.427L2.769 4.808 11.068 0ZM1.92 18.302l8.31-4.812v9.812l-8.31-5Z" />
    </svg>
  ),
  webgl: (
    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  react: (
    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0 12 12)" />
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  framer: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#0055FF" }}>
      <title>Framer Motion</title>
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  vite: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#9135FF" }}>
      <title>Vite</title>
      <path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z" />
    </svg>
  ),
  resend: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#FFFFFF" }}>
      <title>Resend</title>
      <path d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z" />
    </svg>
  ),
  shadcn: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ fill: "#FFFFFF" }}>
      <title>shadcn/ui</title>
      <path d="M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z" />
    </svg>
  )
};

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  // Bottom drawer state for mobile/tablet detail views
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerProjectId, setDrawerProjectId] = useState<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const xToRef = useRef<((val: number) => void) | null>(null);
  const yToRef = useRef<((val: number) => void) | null>(null);

  // Set mounted flag on client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize GSAP quickTo refs when portal container mounts on client
  useEffect(() => {
    if (mounted && cursorRef.current) {
      xToRef.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power2.out" });
      yToRef.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power2.out" });
    }
  }, [mounted]);

  // Disable body scroll when drawer is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [isDrawerOpen]);

  const handleDrawerOpenChange = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleTooltipMouseMove = (e: React.MouseEvent) => {
    if (xToRef.current && yToRef.current) {
      xToRef.current(e.clientX);
      yToRef.current(e.clientY);
    }
  };

  const handleTooltipMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
    document.body.classList.add("carousel-hovered");
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 1,
        scale: 1,
        overwrite: "auto",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleTooltipMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
    document.body.classList.remove("carousel-hovered");
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0.5,
        overwrite: "auto",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Entrance & counters logic when activeProjectId changes
  useEffect(() => {
    if (activeProjectId === null) return;

    const detailsContainer = containerRef.current?.querySelector(`#details-${activeProjectId}`);
    if (detailsContainer) {
      const elements = detailsContainer.querySelectorAll(".details-wipe-reveal");

      gsap.killTweensOf(elements);

      // Set initial clip-path wipe states
      gsap.set(elements, { clipPath: "inset(0% 0% 100% 0%)", y: 20, opacity: 1 });

      // Wipe in with premium editorial motion
      gsap.to(elements, {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration: 1.4,
        ease: "power3.inOut",
        stagger: 0.15,
      });

      // Animate the metrics count-up odometers
      const activeProj = PROJECTS_DATA.find((p) => p.id === activeProjectId);
      if (activeProj) {
        activeProj.metrics.forEach((metric, idx) => {
          const numEl = detailsContainer.querySelector(`.metric-num-${idx}`);
          if (numEl) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: metric.value,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => {
                numEl.textContent = Math.round(obj.val).toString() + (metric.suffix || "");
              },
            });
          }
        });
      }

      // Smoothly scale up the title element inside the scene
      // const titleEl = detailsContainer.parentElement?.querySelector(".work-scene-title-new");
      // if (titleEl) {
      //   gsap.to(titleEl, {
      //     scale: 1.15,
      //     transformOrigin: "left bottom",
      //     duration: 1.2,
      //     ease: "power3.out",
      //   });
      // }

      // IMMERSIVE: Smoothly slide and fade the global Menu trigger button away
      gsap.to(".menu-trigger-wrap", {
        y: -100,
        opacity: 0,
        scale: 0.8,
        pointerEvents: "none",
        duration: 0.8,
        ease: "power3.inOut",
      });


    }
  }, [activeProjectId]);

  // Scroll dismissal logic (15vh scroll down threshold)
  useEffect(() => {
    if (activeProjectId === null) return;

    const startScroll = window.scrollY;
    const threshold = window.innerHeight * 0.15; // 15vh

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll - startScroll > threshold) {
        closeDetails();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeProjectId]);

  // Resize listener to bridge/reset layouts dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setActiveProjectId(null);
      } else {
        setIsDrawerOpen(false);
        setDrawerProjectId(null);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeDetails = () => {
    if (activeProjectId === null) return;
    const idToClose = activeProjectId;

    // Clear state immediately to prevent click-lock race conditions
    setActiveProjectId(null);

    const detailsContainer = containerRef.current?.querySelector(`#details-${idToClose}`);
    if (detailsContainer) {
      const elements = detailsContainer.querySelectorAll(".details-wipe-reveal");

      gsap.to(elements, {
        clipPath: "inset(0% 0% 100% 0%)",
        y: 20,
        duration: 1.0,
        ease: "power3.inOut",
        stagger: 0.05
      });

      // Smoothly scale back the title to its default state
      // const titleEl = detailsContainer.parentElement?.querySelector(".work-scene-title-new");
      // if (titleEl) {
      //   gsap.to(titleEl, {
      //     scale: 1.0,
      //     duration: 1.0,
      //     ease: "power3.inOut",
      //   });
      // }

      // IMMERSIVE: Smoothly restore the global Menu trigger button
      gsap.to(".menu-trigger-wrap", {
        y: 0,
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.8,
        ease: "power3.inOut",
      });


    }
  };

  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleCarouselMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCarouselClick = (e: React.MouseEvent, projectId: number) => {
    if (!dragStartPos.current) {
      handleCardClick(projectId);
      return;
    }
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    dragStartPos.current = null;

    if (dist < 8) {
      handleCardClick(projectId);
    }
  };

  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleCarouselTouchEnd = (e: React.TouchEvent, projectId: number) => {
    if (!touchStartPos.current) return;
    const dx = e.changedTouches[0].clientX - touchStartPos.current.x;
    const dy = e.changedTouches[0].clientY - touchStartPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    touchStartPos.current = null;

    if (dist < 8) {
      handleCardClick(projectId);
    }
  };

  const handleCardClick = (projectId: number) => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      // Mobile/tablet path: Open bottom drawer
      setDrawerProjectId(projectId);
      setIsDrawerOpen(true);
    } else {
      // Desktop path: Inline overlay
      if (activeProjectId === projectId) {
        closeDetails();
      } else {
        if (activeProjectId !== null) {
          closeDetails();
        }
        setActiveProjectId(projectId);
      }
    }
  };

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      // 1. Animate all parent-level horizontal grid lines drawing out from left to right on scroll (scrubbed)
      const allLines = containerRef.current?.querySelectorAll(".work-line");
      if (allLines && allLines.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        tl.fromTo(
          allLines,
          { scaleX: 0 },
          {
            scaleX: 1,
            stagger: 0.08,
            ease: "none",
          }
        );
      }

      scenesRef.current.forEach((scene, index) => {
        if (!scene) return;

        const carousel = scene.querySelector(".work__carousel") as HTMLElement;
        const cards = scene.querySelectorAll(".work__card");

        if (carousel && cards.length > 0) {
          // Drag-to-rotate interactive behavior (does not scroll page)
          let isDragging = false;
          let startX = 0;
          let targetDragRotationY = 0;
          const dragRotationState = { y: 0 };
          let dragVelocity = 0;
          let lastMoveTime = 0;

          // Proxy object to store GSAP animated values for combined rendering
          const rotationProxy = {
            scrollRotationY: 0,
            rotationZ: 4,
            rotationX: 4,
            cardsRotationZ: 8
          };

          const updateCarouselRotation = () => {
            const totalRotationY = rotationProxy.scrollRotationY + dragRotationState.y;
            
            let zVal = -300;
            if (window.innerWidth <= 768) {
              zVal = -160;
            } else if (window.innerWidth <= 1024) {
              zVal = -220;
            }
            
            gsap.set(carousel, {
              rotationY: totalRotationY,
              rotationZ: rotationProxy.rotationZ,
              rotationX: rotationProxy.rotationX,
              z: zVal
            });

            gsap.set(cards, {
              rotationZ: rotationProxy.cardsRotationZ
            });
          };

          const onDragStart = (clientX: number) => {
            isDragging = true;
            startX = clientX;
            dragVelocity = 0;
            lastMoveTime = performance.now();

            // Intercept active kinetic glide tweens instantly on mouse down
            gsap.killTweensOf(dragRotationState);
            targetDragRotationY = dragRotationState.y;
            
            document.body.style.cursor = "grabbing";
            document.body.style.userSelect = "none";
          };

          const onDragMove = (clientX: number) => {
            if (!isDragging) return;
            const deltaX = clientX - startX;
            startX = clientX;

            const now = performance.now();
            const dt = now - lastMoveTime;
            if (dt > 0) {
              // Capture instantaneous move velocity (px/ms)
              dragVelocity = deltaX / dt;
            }
            lastMoveTime = now;
            
            // Drag left (negative deltaX) -> rotates counter-clockwise (decreases rotationY)
            const dragSensitivity = 0.45;
            targetDragRotationY += deltaX * dragSensitivity;

            // Stop kinetic conflicts during active drag move
            gsap.killTweensOf(dragRotationState);

            // Dynamic spring-like lag-behind follow
            gsap.to(dragRotationState, {
              y: targetDragRotationY,
              duration: 0.5,
              ease: "power3.out",
              onUpdate: updateCarouselRotation
            });
          };

          const onDragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";

            const now = performance.now();
            const dt = now - lastMoveTime;
            
            // Rejects late velocity release (if mouse stayed static for > 80ms before release)
            const velocity = dt > 80 ? 0 : dragVelocity;

            if (Math.abs(velocity) > 0.15) {
              // Stark luxury kinetic inertia/flick glide decay
              const glideFactor = 120;
              const extraRotation = velocity * glideFactor;
              targetDragRotationY += extraRotation;

              gsap.killTweensOf(dragRotationState);
              gsap.to(dragRotationState, {
                y: targetDragRotationY,
                duration: 1.2,
                ease: "power4.out",
                onUpdate: updateCarouselRotation
              });
            }
          };

          // Mouse Event Handlers
          const handleMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return; // Only left click
            onDragStart(e.clientX);
            
            const handleMouseMove = (moveEvt: MouseEvent) => {
              onDragMove(moveEvt.clientX);
            };

            const handleMouseUp = () => {
              onDragEnd();
              window.removeEventListener("mousemove", handleMouseMove);
              window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
          };

          // Touch Event Handlers
          const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 0) return;
            onDragStart(e.touches[0].clientX);
            
            const handleTouchMove = (moveEvt: TouchEvent) => {
              if (moveEvt.touches.length === 0) return;
              if (Math.abs(moveEvt.touches[0].clientX - startX) > 5) {
                moveEvt.preventDefault();
              }
              onDragMove(moveEvt.touches[0].clientX);
            };

            const handleTouchEnd = () => {
              onDragEnd();
              window.removeEventListener("touchmove", handleTouchMove);
              window.removeEventListener("touchend", handleTouchEnd);
            };

            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            window.addEventListener("touchend", handleTouchEnd);
          };

          carousel.addEventListener("mousedown", handleMouseDown);
          carousel.addEventListener("touchstart", handleTouchStart, { passive: true });

          cleanups.push(() => {
            carousel.removeEventListener("mousedown", handleMouseDown);
            carousel.removeEventListener("touchstart", handleTouchStart);
          });

          // Initialize rotation values
          updateCarouselRotation();

          const tl = gsap.timeline({
            defaults: { ease: "sine.inOut" },
            onUpdate: () => {
              updateCarouselRotation();
            },
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });

          tl.fromTo(rotationProxy, { scrollRotationY: 0 }, { scrollRotationY: -180, duration: 1 }, 0)
            .fromTo(
              rotationProxy,
              { rotationZ: 4, rotationX: 4 },
              { rotationZ: -4, rotationX: -4, duration: 1 },
              0
            );

          // 2. Separate, decoupled typing animation for project title - triggers once on enter
          const titleChars = scene.querySelectorAll(".work-scene-title-new .char");
          if (titleChars.length > 0) {
            gsap.fromTo(
              titleChars,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: 0.012,
                duration: 0.08,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }

          // Underline drawing animation on scroll - triggers once on enter
          const underline = scene.querySelector(".work-title-underline");
          if (underline) {
            gsap.fromTo(
              underline,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }

          // 3. Separate, decoupled typing animation for project description - triggers once on enter
          const descChars = scene.querySelectorAll(".work-scene-desc-new .char");
          if (descChars.length > 0) {
            gsap.fromTo(
              descChars,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: 0.006, // Fast, clean typing stagger for full description
                duration: 0.05,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }

          tl.fromTo(
            rotationProxy,
            { cardsRotationZ: 8 },
            { cardsRotationZ: -8, duration: 1, ease: "none" },
            0
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden"
    >
      <div id="work-inner" className="w-full h-full transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        {/* "selected work" label placed inside a matching 4-column grid to align perfectly beneath the hero's ScrollArrow */}
      <div className={`selected-work-label absolute top-6 left-6 md:top-10 md:left-0 w-full px-0 md:px-12 grid grid-cols-1 md:grid-cols-4 z-20 pointer-events-none select-none transition-all duration-700 ease-in-out ${
        activeProjectId !== null ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
      }`}>
        <div className="hidden md:block md:col-span-3"></div>
        <div className="text-[10px] md:text-[12px] monitor:text-[14px] uppercase tracking-widest font-montreal text-[#fff7d3] font-medium pl-0 md:pl-10">
          Selected Work
        </div>
      </div>

      {/* Continuous Draw-out Horizontal brand-red grid lines across the entire 300vh work section */}
      <div className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-500 ease-in-out ${
        activeProjectId !== null && isLinkHovered ? "opacity-[0.15]" : "opacity-100"
      }`}>
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "5.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "10.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "16.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "23.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "30.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "36.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "43.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "50.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "56.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "63.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "70.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "76.66%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "83.33%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "90.00%", transform: "scaleX(0)" }} />
        <div className="work-line absolute left-0 w-full h-[1px] bg-[#AB1509]/30 origin-left" style={{ top: "96.66%", transform: "scaleX(0)" }} />
      </div>

      {PROJECTS_DATA.map((project, sceneIndex) => {
        // Splitting title and description into characters manually for react robust animation
        const titleChars = project.title.split("");
        const descChars = project.description.split("");

        return (
          <div
            key={project.id}
            ref={(el) => {
              scenesRef.current[sceneIndex] = el;
            }}
            className="work__scene"
          >
            {/* Project Details Overlay Grid (shows detailed specs when clicked) */}
            <div
              id={`details-${project.id}`}
              className={`absolute inset-0 w-full h-full pointer-events-none z-30 transition-all duration-500 ${activeProjectId === project.id ? "opacity-100" : "opacity-0"
                }`}
            >
               {/* TOP LEFT: Brutalist Metrics Grid (Horizontal) */}
              <div className={`absolute top-[23%] left-6 md:left-12 lg:left-4 flex flex-row gap-6 md:gap-12 text-left pointer-events-auto select-none z-30 transition-opacity duration-500 ease-in-out ${
                isLinkHovered ? "opacity-25" : "opacity-100"
              }`}>
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="details-wipe-reveal opacity-0 flex flex-col items-start gap-1"
                    style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  >
                    <span className="font-montreal font-normal text-[#AB1509] text-[9px] md:text-[11px] monitor:text-[13px] uppercase tracking-normal">
                      {metric.label}
                    </span>
                    <span
                      className={`metric-num-${idx} font-montreal font-normal text-white/90 text-[24px] md:text-[48px] monitor:text-[50px] leading-none tracking-tighter`}
                    >
                      0{metric.suffix || ""}
                    </span>
                  </div>
                ))}
              </div>

               {/* TOP RIGHT: Immersive Website Link with Video/Image Floating Preview Card */}
              <div className="absolute top-[23%] right-6 md:right-12 lg:right-10 pointer-events-auto text-right z-30 flex flex-col items-end group/link">
                {/* Wiping reveal container for link text */}
                <div 
                  className="details-wipe-reveal opacity-0"
                  style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                >
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsLinkHovered(true)}
                    onMouseLeave={() => setIsLinkHovered(false)}
                    className="font-montreal font-normal text-white/90 hover:text-white text-[15px] monitor:text-[17px] leading-[1.5] uppercase tracking-normal border-b border-white/20 hover:border-white/90 transition-all duration-300 flex items-center gap-1.5"
                  >
                    Visit Work ↗
                  </a>
                </div>

                {/* Floating Video Preview Card — commented out until R2 videos are ready
                <div className="absolute top-full mt-4 w-[380px]  border border-[#AB1509] rounded-none overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 scale-95 -translate-y-2 pointer-events-none group-hover/link:opacity-100 group-hover/link:scale-100 group-hover/link:translate-y-0 transition-all duration-300 ease-out origin-top-right z-50">
                  <div className="w-full h-full relative">
                    <video
                      src={project.projectVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#AB1509]/15 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                */}
              </div>

               {/* BOTTOM LEFT: Approach Block */}
              <div
                className="details-wipe-reveal absolute bottom-[3%] left-6 right-6 lg:bottom-[4%] lg:left-4 lg:w-[90%] lg:max-w-[450px] monitor:!max-w-[550px] pointer-events-auto text-center lg:text-left opacity-0 flex flex-col z-30"
                style={{ clipPath: "inset(0% 0% 100% 0%)" }}
              >
                <div className={`w-full flex flex-col items-center lg:items-start gap-1 transition-opacity duration-500 ease-in-out ${
                  isLinkHovered ? "opacity-25" : "opacity-100"
                }`}>
                  <span className="font-montreal font-normal text-[#AB1509] text-[9px] md:text-[11px] monitor:text-[13px] uppercase tracking-normal">
                    Approach
                  </span>
                  <p className="font-montreal font-normal text-white/90 text-[11px] md:text-[13px] monitor:text-[15px] leading-[1.2]">
                    {project.approach}
                  </p>
                </div>
              </div>

               {/* BOTTOM CENTER-RIGHT (UPPER): Stark Tech Stack Icons */}
              <div
                className="details-wipe-reveal absolute bottom-[30%] lg:bottom-[38%] right-6 md:right-12 lg:right-10 flex flex-col items-end pointer-events-auto text-right opacity-0 flex z-30"
                style={{ clipPath: "inset(0% 0% 100% 0%)" }}
              >
                <div className={`w-full flex flex-col items-end gap-2 transition-opacity duration-500 ease-in-out ${
                  isLinkHovered ? "opacity-25" : "opacity-100"
                }`}>
                  <span className="font-montreal font-normal text-[#AB1509] text-[9px] md:text-[11px] monitor:text-[13px] uppercase tracking-normal mb-1">
                    Technologies
                  </span>
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center">
                    {project.techStack.map((tech, idx) => (
                      <div
                        key={idx}
                        className="group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 monitor:w-[38px] monitor:h-[38px] text-yellow-soft hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        title={tech.label}
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 monitor:w-[22px] monitor:h-[22px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                          {TECH_ICONS[tech.iconKey]}
                        </div>
                        {/* Tooltip on hover */}
                        <span className="absolute bottom-full mb-2 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-black border border-white/10 text-yellow-soft text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                          {tech.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-left Project Title and Underline Wrapper */}
            <div className={`work-title-wrapper absolute z-20 pointer-events-none left-6 right-6 top-[15%] md:top-[18%] lg:top-auto lg:bottom-65 lg:left-4 lg:right-auto monitor:bottom-75 transition-opacity duration-500 ease-in-out ${
              activeProjectId === project.id && isLinkHovered ? "opacity-[0.35]" : "opacity-100"
            }`}>
              <h2 className="work-scene-title-new m-0 font-tusker-standard font-medium text-yellow-soft/90 tracking-normal text-[26px] md:text-[36px] lg:text-[32px] monitor:!text-[45px] text-center lg:text-left">
                {titleChars.map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="char inline-block select-none opacity-0"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
              {/* Draw-out Underline */}
              {/* <div
                className="work-title-underline h-[1.5px] bg-white/50 mt-1.5 origin-left w-[120px] md:w-[200px]"
                style={{ transform: "scaleX(0)" }}
              /> */}
            </div>

            {/* Bottom-right Project Description (styled with Tailwind CSS directly for manual edits) */}
            <p className={`work-scene-desc-new absolute m-0 pointer-events-none font-montreal font-normal text-yellow-soft/90 z-20 text-[12px] md:text-[15px] monitor:text-[17px] leading-[1.3] text-center lg:text-right left-6 right-6 bottom-[10%] md:bottom-[12%] lg:left-auto lg:right-10 lg:bottom-[4%] lg:text-right lg:w-[420px] monitor:w-[470px] transition-opacity duration-500 ease-in-out ${
              activeProjectId === project.id && isLinkHovered ? "opacity-25" : "opacity-100"
            }`}>
              {descChars.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="char inline-block select-none opacity-0"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>

            {/* 3D Carousel Cylinder (4 card cells) - flat parent click listener to prevent 3D transform flakiness */}
            <div 
              className="work__carousel cursor-pointer pointer-events-auto z-20"
              onMouseDown={handleCarouselMouseDown}
              onClick={(e) => handleCarouselClick(e, project.id)}
              onTouchStart={handleCarouselTouchStart}
              onTouchEnd={(e) => handleCarouselTouchEnd(e, project.id)}
              onMouseMove={handleTooltipMouseMove}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              {project.images.map((imgUrl, cardIndex) => {
                // Calculate circular geometry transforms for 4 cells (radius driven by responsive CSS variable)
                const angle = cardIndex * 90; // 360 / 4 = 90
                const transform = `rotateY(${angle}deg) translateZ(var(--carousel-z))`;

                return (
                  <div
                    key={cardIndex}
                    className="work__carousel-cell"
                    style={{ transform }}
                  >
                    <div className={`work__card transition-opacity duration-500 ease-in-out ${
                      activeProjectId === project.id && isLinkHovered ? "opacity-25" : "opacity-100"
                    }`}>
                      <div className="work__card-face relative overflow-hidden bg-[#121212]">
                        {imgUrl && (
                          <Image
                            src={imgUrl}
                            alt={`${project.title} - View ${cardIndex + 1}`}
                            fill
                            unoptimized
                            loading="lazy"
                            className="object-cover pointer-events-none"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      </div>
      {/* Decoupled custom white circular tooltip cursor saying "open" in black rendered via Portal to document.body */}
      {mounted && createPortal(
        <div
          ref={cursorRef}
          className="hidden lg:flex fixed top-0 left-0 w-12 h-12 rounded-full bg-white text-black font-montreal font-medium text-[11px] tracking-normal flex items-center justify-center pointer-events-none z-[9999] opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 will-change-transform select-none uppercase"
        >
          {activeProjectId !== null ? "Close" : "Open"}
        </div>,
        document.body
      )}

      {/* Drawer component for mobile/tablet detail views */}
      <Drawer open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
        <DrawerContent className="bg-[#121212]! border-t border-white/10! text-white max-h-[75vh]! h-[75vh]! rounded-t-2xl flex flex-col pointer-events-auto">
          {/* Vaul drag handle indicator */}
          <div className="mx-auto w-12 h-1 rounded-full bg-white/20 my-4 shrink-0" />
          
          {drawerProjectId !== null && (
            (() => {
              const activeProj = PROJECTS_DATA.find((p) => p.id === drawerProjectId);
              if (!activeProj) return null;
              return (
                <div className="flex-1 overflow-y-auto px-6 pb-12 flex flex-col gap-6">
                  {/* Row 1: Visit Work URL */}
                  <div className="py-2 flex flex-col items-center">
                    <span className="font-montreal font-normal text-[#AB1509] text-[10px] uppercase tracking-normal mb-1">
                      Website
                    </span>
                    <a
                      href={activeProj.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-montreal font-normal text-white/90 hover:text-white text-[15px] uppercase tracking-normal border-b border-white/20 transition-all duration-300"
                    >
                      Visit Work ↗
                    </a>
                  </div>
                  
                  {/* Row 2: Metrics */}
                  <div className="py-3 flex flex-col items-center">
                    <span className="font-montreal font-normal text-[#AB1509] text-[10px] uppercase tracking-normal mb-3">
                      Key Metrics
                    </span>
                    <div className="flex gap-10 justify-center">
                      {activeProj.metrics.map((metric, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <span className="font-montreal font-normal text-white/40 text-[9px] uppercase tracking-normal">
                            {metric.label}
                          </span>
                          <span className="font-montreal font-normal text-white text-[24px] leading-none tracking-tighter">
                            {metric.value}{metric.suffix || ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Row 3: Technologies */}
                  <div className="py-3 flex flex-col items-center">
                    <span className="font-montreal font-normal text-[#AB1509] text-[10px] uppercase tracking-normal mb-3">
                      Technologies
                    </span>
                    <div className="flex gap-4 items-center justify-center">
                      {activeProj.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-full"
                          title={tech.label}
                        >
                          <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                            {TECH_ICONS[tech.iconKey]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Row 4: Approach */}
                  <div className="py-3 flex flex-col items-center text-center">
                    <span className="font-montreal font-normal text-[#AB1509] text-[10px] uppercase tracking-normal mb-2">
                      Approach
                    </span>
                    <p className="font-montreal font-normal text-white/80 text-[12px] leading-[1.4] max-w-[400px]">
                      {activeProj.approach}
                    </p>
                  </div>
                </div>
              );
            })()
          )}
        </DrawerContent>
      </Drawer>
    </section>
  );
}
