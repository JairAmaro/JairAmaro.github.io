import React from "react";
import RotatingText from "./RotatingText";
import Silk from "./silk";
import "./ProfileCard.css";

const PhotoCard = ({
  avatarUrl = "/img/Patrick_moño.png",
  name = "Oscar Amaro",
  handle = "oscar_amaro",
  status = "Online",
  contactText = "Contact me",
  onContactClick,
}) => {
  return (
    <div className="pc-card-wrapper">
      <section className="pc-card relative overflow-hidden w-[320px] h-[480px]">
        {/* Silk background dentro de la tarjeta */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <Silk
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>

        {/* Texto animado arriba */}
        <div
          className="text-zone"
          style={{
            position: "absolute",
            top: "1.2em",
            width: "100%",
            textAlign: "center",
            zIndex: 10,
            fontSize: "1.4rem",
            fontWeight: "900",
            color: "#dcdcdc",
            display: "flex",
            justifyContent: "center",
            gap: "0.4ch",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700 }}>Data</span>
          <span
            style={{
              background: "#6b38fb",
              color: "white",
              borderRadius: "8px",
              padding: "0 0.4em",
              fontWeight: 800,
            }}
          >
            <RotatingText
              texts={["Analysis", "Engineering", "Science"]}
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

        {/* Imagen principal */}
        <div
          className="pc-avatar-zone"
          style={{
            position: "absolute",
            top: "4em",
            bottom: "5em",
            left: "0",
            right: "0",
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
            style={{
              maxHeight: "75%",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Footer con contacto */}
        <div className="pc-user-info" style={{ position: "absolute", bottom: "20px", zIndex: 10 }}>
          <div className="pc-user-details">
            <div className="pc-mini-avatar">
              <img src={avatarUrl} alt={`${name} mini avatar`} loading="lazy" />
            </div>
            <div className="pc-user-text">
              <div className="pc-handle">@{handle}</div>
              <div className="pc-status">{status}</div>
            </div>
          </div>
          <button
            className="pc-contact-btn"
            onClick={() => onContactClick?.()}
            type="button"
            aria-label={`Contact ${name}`}
            style={{ pointerEvents: "auto" }}
          >
            {contactText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default PhotoCard;
