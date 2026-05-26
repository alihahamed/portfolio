"use client";

import dynamic from "next/dynamic";

const Silk = dynamic(() => import("@/components/Silk"), {
  ssr: false,
});

export default function SilkBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Silk
        color="#AB1509"
        scale={0.7}
        noiseIntensity={2.9}
        rotation={1.66}
        speed={5}
      />
    </div>
  );
}
