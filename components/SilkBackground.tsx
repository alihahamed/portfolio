"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Silk = dynamic(() => import("@/components/Silk"), {
  ssr: false,
});

export default function SilkBackground() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none bg-transparent">
      <Silk
        color="#AB1509"
        scale={0.9}
        noiseIntensity={2.5}
        rotation={1.3}
        speed={5}
      />
    </div>
  );
}
