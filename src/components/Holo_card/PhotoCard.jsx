import React from "react";
import RotatingText from "./RotatingText";
import Silk from "./silk";
import "./ProfileCard.css";

const PhotoCard = ({
  avatarUrl = "/img/Patrick_moño.png",
  name = "Oscar J. Amaro",
  rotatingTexts = ["Analysis", "Engineering", "Science"],
  handle = "oscar_amaro",
  status = "Online",
  contactText = "Contact me",
  onContactClick,
  glassColor = "#ffffff22",
  grayscale = false,
}) => {
  const silkColor = "#3f3c9e";
  const textBgColor = "#ffffff22";
  const avatarFilter =
    grayscale === true
      ? { filter: "grayscale(100%)" }
      : typeof grayscale === "string"
      ? {
          filter: "brightness(0) saturate(100%)",
          mixBlendMode: "color",
          backgroundColor: grayscale,
        }
      : {};

  const imageStyle = {
    maxHeight: "60%",
    width: "auto",
    objectFit: "contain",
    borderRadius: "1rem",
    ...avatarFilter,
  };

  return (
    <div className="pc-card-wrapper">
      <section
        className="pc-card relative overflow-hidden"
        style={{ width: "400px", height: "520px", borderRadius: "1.5rem" }}
      >
        {/* Silk background */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <Silk
            speed={5}
            scale={2.5}
            color={silkColor}
            noiseIntensity={1.5}
            rotation={2.5}
          />
        </div>

        {/* Name and rotating text */}
        <div
          className="text-zone"
          style={{
            position: "absolute",
            top: "2rem",
            width: "100%",
            textAlign: "center",
            zIndex: 10,
            fontWeight: "900",
            color: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <div style={{ fontSize: "1.8rem" }}>{name}</div>
          <div
            style={{
              display: "flex",
              gap: "0.5ch",
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            <span>Data</span>
            <span
              style={{
                background: textBgColor,
                padding: "0.25em 0.6em",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <RotatingText
                texts={rotatingTexts}
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
            <span>| Actuary</span>
          </div>
        </div>

        {/* Centered image */}
        <div
          className="pc-avatar-zone"
          style={{
            position: "absolute",
            bottom: "6.5rem",
            left: 0,
            right: 0,
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            loading="lazy"
            style={imageStyle}
          />
        </div>

        {/* Contact footer */}
        <div
          className="pc-user-info"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "1rem",
            right: "1rem",
            zIndex: 10,
            backdropFilter: "blur(10px)",
            backgroundColor: glassColor,
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1rem",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img
              src={avatarUrl}
              alt="mini avatar"
              style={{ width: "36px", height: "36px", borderRadius: "50%" }}
            />
            <div style={{ display: "flex", flexDirection: "column", fontSize: "0.85rem" }}>
              <span>@{handle}</span>
              <span style={{ opacity: 0.7 }}>{status}</span>
            </div>
          </div>
          <button
            onClick={() => onContactClick?.()}
            type="button"
            aria-label={`Contact ${name}`}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            {contactText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default PhotoCard;
