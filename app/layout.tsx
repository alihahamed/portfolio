import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Register Tusker Grotesk multi-width custom fonts
const tuskerCondensed = localFont({
  src: [
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-2500Medium.ttf", weight: "500", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-2600Semibold.ttf", weight: "600", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-2700Bold.ttf", weight: "700", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-2800Super.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-tusker-condensed",
  display: "swap",
});

const tuskerStandard = localFont({
  src: [
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-4500Medium.ttf", weight: "500", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-4600Semibold.ttf", weight: "600", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-4700Bold.ttf", weight: "700", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-4800Super.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-tusker-standard",
  display: "swap",
});

const tuskerExpanded = localFont({
  src: [
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-6500Medium.ttf", weight: "500", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-6600Semibold.ttf", weight: "600", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-6700Bold.ttf", weight: "700", style: "normal" },
    { path: "../Tusker.Grotesk/Tusker.Grotesk/Tusker.Grotesk/TuskerGrotesk-6800Super.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-tusker-expanded",
  display: "swap",
});

// Register PP Neue Montreal custom foundry fonts
const neueMontreal = localFont({
  src: [
    { path: "../NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "../NeueMontreal-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../NeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "../NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "../NeueMontreal-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../NeueMontreal-Bold.otf", weight: "700", style: "normal" },
    { path: "../NeueMontreal-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

import SilkBackground from "@/components/SilkBackground";
import SmoothScroll from "@/components/SmoothScroll";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { PageTransitionProvider } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Tusker Grotesk - Portfolio",
  description: "High-craft portfolio designed with Tusker Grotesk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${tuskerCondensed.variable} ${tuskerStandard.variable} ${tuskerExpanded.variable} ${neueMontreal.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-white relative">
        <PageTransitionProvider>
          {/* Global WebGL Background Canvas */}
          <SilkBackground />
          
          {/* Custom fluid cursor follower */}
          <SmoothCursor />
          
          {/* Butter-Smooth Lenis Scrolling Wrapper */}
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
