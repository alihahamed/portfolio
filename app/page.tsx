"use client";

import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex flex-col w-full  font-sans antialiased text-white">
      {/* 1. Hero section containing localized WebGL Silk Background */}
      <Hero />

      {/* 2. Selected work horizontal carousel section */}
      <SelectedWork />

      {/* 3. About section with dynamic SVG grid lines and draggable stickers */}
      <About />

      {/* 4. Contact section with circular background clipPath reveal and dynamic corner rounding */}
      <Contact />

      {/* 5. sticky brutality red footer */}
      <Footer />
    </div>
  );
}
