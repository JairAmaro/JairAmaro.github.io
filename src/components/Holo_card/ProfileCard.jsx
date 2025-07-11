import React from "react";
import "./ProfileCard.css"; // reutilizamos estilos generales

const PhotoCard = ({
  title = "Data Science | Actuary",
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
        {/* Texto superior */}
        <div
          className="text-zone"
          style={{
            position: "absolute",
            top: "1.2em",
            width: "100%",
            textAlign: "center",
            zIndex: 10,
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {title}
        </div>

        {/* Imagen principal */}
        <div
          className="pc-avatar-content pc-content"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <img
            className="avatar"
            src={avatarUrl}
            alt={`${name} avatar`}
            loading="lazy"
            style={{ maxHeight: "80%", objectFit: "contain" }}
          />
        </div>

        {/* Footer con contacto */}
        <div className="pc-user-info" style={{ position: "absolute", bottom: "20px" }}>
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
