import React from "react";
import Image from "next/image";
import { ImagesBadge } from "./ui/images-badge";

export default function Document() {
  return (
    <div className="w-full h-full relative text-[#AB1509]">
      {/* GRID LINES FOR BLUEPRINT STYLE */}
      {/* Left vertical line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#AB1509]/30 pointer-events-none" style={{ left: "4%" }} />
      {/* Right vertical line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#AB1509]/30 pointer-events-none" style={{ right: "4%" }} />
      {/* Center vertical line */}
      <div className="absolute top-[17%] bottom-0 w-[1px] bg-[#AB1509] pointer-events-none" style={{ left: "50%" }} />
      {/* Header horizontal line */}
      <div className="absolute left-0 right-0 h-[1px] bg-[#AB1509] pointer-events-none" style={{ top: "17%" }} />
      {/* Middle horizontal line (right side) */}
      <div className="absolute right-0 h-[1px] bg-[#AB1509] pointer-events-none" style={{ left: "50%", top: "66%" }} />
      {/* Lower horizontal line (right side) */}
      <div className="absolute right-0 h-[1px] bg-[#AB1509] pointer-events-none" style={{ left: "50%", top: "89%" }} />

      {/* HEADER (Top Section) */}
      <div className="absolute left-[7%] right-[7%] flex items-center justify-between z-10" style={{ top: "0", height: "17%" }}>
        <div className="flex items-baseline" style={{ gap: "0.5vh" }}>
          <h1 className="text-[8vw] md:text-[12.5vh] font-medium font-tusker-standard tracking-tight leading-none mt-6">About.</h1>
          <span className="border border-[#AB1509] rounded-full font-medium tracking-wider uppercase" style={{ padding: "0.1vh 0.8vh", fontSize: "0.9vh", lineHeight: "1" }}>cv</span>
        </div>
        {/* Asterisk icon */}
        <div className="text-[7.5vw] md:text-[4vh] font-bold leading-none select-none" style={{ transform: "translateY(0.4vh)" }}>*</div>
      </div>

      {/* LEFT COLUMN (Education & Experience) */}
      <div className="absolute flex flex-col justify-between font-montreal font-medium z-10" style={{ left: "7%", width: "40%", top: "18%", bottom: "5%" }}>
        {/* EDUCATION */}
        <div>
          <h2 className="text-[3.2vw] md:text-[2vh] font-semibold uppercase tracking-wide font-montreal" style={{ marginBottom: "1%" }}>Education</h2>
          <div className="flex flex-col" style={{ gap: "4%" }}>
            <div style={{ marginBottom: "3%" }}>
              <h3 className="text-[2.2vw] md:text-[1.7vh] font-medium leading-tight mb-2">Undergraduate - Information Science & Engineering</h3>
              <p className="text-[1.6vw] md:text-[1.6vh] font-normal ">Yenepoya Institute of Technology (2023 - 2027)</p>
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="flex flex-col justify-end" style={{ marginTop: "4%" }}>
          <h2 className="text-[3.2vw] md:text-[2vh] font-bold uppercase tracking-wide font-montreal" style={{ marginBottom: "3%" }}>Experience</h2>
          <div className="flex flex-col" style={{ gap: "3%" }}>
            <div style={{ marginBottom: "3%" }}>
              <h3 className="text-[2.2vw] md:text-[1.4vh] font-medium leading-tight">Creative Technologist</h3>
              <p className="text-[1.6vw] md:text-[1.2vh] font-medium opacity-80">INDEPENDENT | 2024 - PRESENT</p>
              <p className="text-[1.4vw] md:text-[1.1vh] leading-tight" style={{ marginTop: "1%" }}>
                Building fast, interactive portfolios, motion design suites, and performance-first 3D assets.
              </p>
            </div>
            <div style={{ marginBottom: "3%" }}>
              <h3 className="text-[2.2vw] md:text-[1.4vh] font-medium leading-tight">Design Head</h3>
              <p className="text-[1.6vw] md:text-[1.2vh] font-medium opacity-80">ENROOT Festival, Dubai | 2024</p>
              <p className="text-[1.4vw] md:text-[1.1vh] leading-tight" style={{ marginTop: "1%" }}>
                Led visual design and spatial interaction strategy. Managed frontend architecture and code.
              </p>
            </div>
            <div>
              <h3 className="text-[2.2vw] md:text-[1.4vh] font-medium leading-tight">Freelance Developer</h3>
              <p className="text-[1.6vw] md:text-[1.2vh] font-medium opacity-80">Dubai | 2022 - 2024</p>
              <p className="text-[1.4vw] md:text-[1.1vh] leading-tight" style={{ marginTop: "1%" }}>
                Built high-fidelity reactive components, custom typography, and fine-tuned scroll timelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN (Photo, Profile, Interactive Folder) */}
      <div className="absolute flex flex-col justify-between font-montreal font-medium z-10" style={{ left: "53%", width: "40%", top: "19%", bottom: "6%" }}>
        {/* PHOTO & INITIALS & PROFILE */}
        <div>
          <div className="relative w-full aspect-[4/3] border border-[#AB1509] overflow-hidden">
            <Image
              src="/developer_portrait.png"
              alt="Ali Ahmed Portrait"
              fill
              sizes="(max-width: 768px) 35vw, 10vw"
              priority
              className="object-cover grayscale contrast-125 brightness-95"
            />
          </div>

          <div className="flex items-baseline" style={{ marginTop: "6%" }}>
            <h2 className="text-[6.5vw] md:text-[4.8vh] tracking-tight font-medium font-montreal  leading-none">
              <span className="text-[9vw] md:text-[5.6vh] font-medium font-tusker-standard">A</span>li <span className="text-[9vw] md:text-[5.5vh] font-medium font-tusker-standard">A</span>hmed <span className="text-[9vw] md:text-[5.5vh] font-medium font-tusker-standard">S</span>yed
            </h2>
          </div>

          <div style={{ marginTop: "6%" }}>
            <h3 className="text-[2.2vw] md:text-[2vh] monitor:text-[1.5vh] font-semibold uppercase tracking-wider font-montreal" style={{ marginBottom: "1%" }}>Profile</h3>
            <p className="text-[1.6vw] md:text-[1.7vh] monitor:text-[1.5vh] leading-tight font-normal">
I started building websites because the ones I kept seeing were boring. That annoyance turned into a skillset, which turned into clients, which turned into this.            </p>
          </div>
        </div>

        {/* PHYSICAL APPROACH FOLDER */}
        <div className="flex items-center justify-center z-20 monitor:!h-[40%]" style={{ height: "45%",  }}>
          <ImagesBadge folderSize={{ width: 180, height: 120 }} />
        </div>
      </div>

      {/* SKILLS (At the very bottom right, below 89% horizontal line) */}
      <div className="absolute font-montreal font-medium z-10 flex items-center justify-between" style={{ left: "53%", width: "40%", bottom: "4.5%", height: "7.5%" }}>
        <h3 className="text-[2.2vw] md:text-[2vh] monitor:text-[1.5vh] font-semibold uppercase tracking-wider font-montreal">Skills</h3>
        <div className="text-right italic opacity-85 font-medium font-montreal" style={{ fontSize: "0.8vh" }}>
          *Portfolio available upon request
        </div>
      </div>
    </div>
  );
}
