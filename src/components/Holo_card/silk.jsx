import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SilkMaterial({ speed = 5, color = "#7B7481", noiseIntensity = 1.5, rotation = 0 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, rotation]}>
      <planeGeometry args={[1, 1, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
          uNoiseIntensity: { value: noiseIntensity }
        }}
        vertexShader={`
          uniform float uTime;
          uniform float uNoiseIntensity;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float noise = sin(pos.y * 10.0 + uTime) * cos(pos.x * 10.0 + uTime);
            pos.z += noise * 0.1 * uNoiseIntensity;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float shade = sin(vUv.y * 3.1415);
            gl_FragColor = vec4(uColor * shade, 1.0);
          }
        `}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
}

export default function Silk({ speed, scale = 1, color, noiseIntensity, rotation }) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 0 }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      <SilkMaterial
        speed={speed}
        color={color}
        noiseIntensity={noiseIntensity}
        rotation={rotation}
      />
    </Canvas>
  );
}
