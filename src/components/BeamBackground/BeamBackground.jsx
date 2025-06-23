"use client";

import Beams from "./Beams";

export default function BeamBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Beams
        beamWidth={3}
        beamHeight={30}
        beamNumber={20}
        lightColor="#8000ff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
      />
    </div>
  );
}
