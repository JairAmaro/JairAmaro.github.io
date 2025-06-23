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
      {/* Para cambiar el tamaño de la tarjeta w - h */}
      <section className="pc-card relative overflow-hidden w-[360px] h-[460px]">
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

        {/* Texto animado arriba Oscar J Amaro */}
        <div
          className="text-zone"
          style={{
            position: "absolute",
            top: "1.5rem",
            width: "100%",
            textAlign: "center",
            zIndex: 10,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          {/* Nombre */}
          <div style={{ fontSize: "4rem", fontWeight: 700 }}>Oscar J. Amaro</div>

          {/* Línea con texto animado */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4ch",
              fontSize: "2rem",
              fontWeight: 500,
            }}
          >
            <span>Data</span>
            <span
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                padding: "0.1em 0.5em",
                color: "#fff",
                backdropFilter: "blur(6px)",
                fontSize: "inherit",       // asegura tamaño uniforme
                fontWeight: "inherit",     // asegura peso uniforme
                lineHeight: "1",           // mejora alineación vertical
                display: "flex",           // centra el texto internamente
                alignItems: "center",      // centra verticalmente
              }}
            >
              <RotatingText
                texts={["Analysis", "Engineering", "Science"]}
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                elementLevelClassName="text-rotate-element-uniform"
              />
            </span>
            <span>| Actuary</span>
          </div>
        </div>

        {/* Imagen principal (donde esta patrick)
        Top 16em entre mas garnde mas baja la imagen */}
        <div
          className="pc-avatar-zone"
          style={{
            position: "absolute",
            top: "16em",
            bottom: "4em",
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
              maxHeight: "85%", // tamaño de la imagen 
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
