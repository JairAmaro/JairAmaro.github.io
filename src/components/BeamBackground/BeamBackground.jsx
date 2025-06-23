"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Beams from "./Beams";
import "./Beams.css";

// Envoltorio de canvas para el fondo
function CanvasWrapper({ children }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="always"
      className="beams-container"
      style={{ background: "black" }}
    >
      {children}
    </Canvas>
  );
}

// Grupo con rotación infinita
function RotatingGroup({ children, speed = 30 }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += THREE.MathUtils.degToRad(speed) * delta * 0.1;
    }
  });
  return <group ref={groupRef}>{children}</group>;
}

// Componente principal que renderiza los Beams con fondo fijo
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
        overflow: "hidden",
      }}
    >
      <CanvasWrapper>
        <RotatingGroup speed={30}>
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#4079ff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0} // ya está controlado por RotatingGroup
          />
          <ambientLight intensity={1} />
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
        </RotatingGroup>
      </CanvasWrapper>
    </div>
  );
}
