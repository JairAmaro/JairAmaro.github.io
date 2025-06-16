import React from "react";
import Silk from "./silk";

const SilkTest = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
        border: "2px solid white",
        overflow: "hidden",
        margin: "2rem auto",
      }}
    >
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Fondo Silk Test
      </div>
    </div>
  );
};

export default SilkTest;
