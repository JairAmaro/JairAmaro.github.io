// src/components/BeamBackground/SilkBackground.jsx
import { Silk } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function SilkBackground() {
  return (
    <div className="beams-wrapper">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight />
        <Silk
          speed={0.7}
          scale={0.6}
          color="#7a5cff"
          noiseIntensity={1.1}
          rotation={45}
        />
      </Canvas>
    </div>
  );
}
