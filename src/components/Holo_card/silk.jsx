// silk.jsx
import React, { useRef, useEffect } from "react";

const Silk = ({ speed = 5, scale = 1, color = "#7B7481", noiseIntensity = 1.5, rotation = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let time = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % w;
        const y = Math.floor(i / 4 / w);
        const noise = Math.floor(
          128 +
            128 *
              Math.sin((x * scale + time * speed) * 0.01) *
              Math.cos((y * scale + time * speed) * 0.01)
        );

        data[i] = Math.min(255, parseInt(color.slice(1, 3), 16) + noise * noiseIntensity);
        data[i + 1] = Math.min(255, parseInt(color.slice(3, 5), 16) + noise * noiseIntensity);
        data[i + 2] = Math.min(255, parseInt(color.slice(5, 7), 16) + noise * noiseIntensity);
        data[i + 3] = 50;
      }

      ctx.putImageData(imageData, 0, 0);
      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, scale, color, noiseIntensity]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: 0.3,
        transform: `rotate(${rotation}deg)`,
        zIndex: 0,
      }}
    />
  );
};

export default Silk;
