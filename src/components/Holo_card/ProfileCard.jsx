import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";
import Silk from "./silk";

const ProfileCardComponent = ({
  avatarUrl = "<Placeholder for avatar URL>",
  iconUrl = "<Placeholder for icon URL>",
  grainUrl = "<Placeholder for grain URL>",
  className = "",
  miniAvatarUrl,
  name = "Nombre",
  title = "Subtitulo",
  handle = "usuario",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()}>
      <section
        ref={cardRef}
        className="pc-card relative overflow-hidden w-[320px] h-[480px]"
      >
        {/* Fondo tipo Silk */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
        </div>

        {/* Contenido */}
        <div className="pc-inside relative z-10">
          <div className="pc-avatar-content pc-content">
            <img className="avatar" src={avatarUrl} alt={`${name} avatar`} loading="lazy" />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img src={miniAvatarUrl || avatarUrl} alt={`${name} mini avatar`} loading="lazy" />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                <button
                  className="pc-contact-btn"
                  onClick={handleContactClick}
                  type="button"
                  aria-label={`Contact ${name}`}
                  style={{ pointerEvents: "auto" }}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
          <div className="pc-content pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
