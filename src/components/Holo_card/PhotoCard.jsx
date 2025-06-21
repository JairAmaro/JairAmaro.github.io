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
  silkColor = "#7b7481",
}) => {
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
    maxHeight: "32%",
    width: "auto",
    objectFit: "contain",
    borderRadius: "1rem",
    ...avatarFilter,
  };

  return (
    <div className="pc-card-wrapper">
      <section
        className="pc-card relative overflow-hidden"
        style={{ width: "420px", height: "620px", borderRadius: "1.5rem" }}
      >
        {/* Silk background */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <Silk
            speed={5}
            scale={1}
            color={silkColor}
            noiseIntensity={2}
            rotation={1}
          />
        </div>

        {/* Header con texto */}
        <div
          className="text-zone"
          style={{
            position: "absolute",
            top: "2.5rem",
            width: "100%",
            textAlign: "center",
            zIndex: 10,
            fontWeight: "900",
            color: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <div style={{ fontSize: "2.6rem" }}>{name}</div>
          <div
            style={{
              display: "flex",
              gap: "0.5ch",
              alignItems: "center",
              fontSize: "1.3rem",
              fontWeight: "600",
            }}
          >
            <span>Data</span>
            <span
              style={{
                background: "rgba(255,255,255,0.15)",
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

        {/* Imagen */}
        <div
          className="pc-avatar-zone"
          style={{
            position: "absolute",
            bottom: "6.4rem",
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

        {/* Footer */}
        <div
          className="pc-user-info"
          style={{
            position: "absolute",
            bottom: "24px",
            left: "1rem",
            right: "1rem",
            zIndex: 10,
            backdropFilter: "blur(10px)",
            backgroundColor: glassColor,
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.6rem 1.2rem",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            fontFamily: "'Outfit', sans-serif",
            height: "58px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <img
              src={avatarUrl}
              alt="mini avatar"
              style={{ width: "26px", height: "26px", borderRadius: "50%" }}
            />
            <div style={{ fontSize: "0.85rem", lineHeight: "1.1" }}>
              <div>@{handle}</div>
              <div style={{ opacity: 0.75, fontSize: "0.72rem" }}>{status}</div>
            </div>
          </div>
          <button
            onClick={() => onContactClick?.()}
            type="button"
            aria-label={`Contact ${name}`}
            style={{
              padding: "0.4rem 1.2rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
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