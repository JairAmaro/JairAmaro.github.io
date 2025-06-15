import React, { useRef } from 'react';
import './ProfileCard.css';

export default function ProfileCard({
  name,
  title,
  avatarUrl,
  miniAvatarUrl,
  handle,
  contactText,
  status,
  showUserInfo,
  onContactClick,
  showBehindGradient = true,
  grainUrl,
  enableTilt = false 
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = Math.abs(Math.floor(100 / rect.width * x) - 100);
    const py = Math.abs(Math.floor(100 / rect.height * y) - 100);
    const pa = (50 - px) + (50 - py);
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + (Math.abs(pa) * 1.5);
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    // Set transform
    card.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;

    // Set custom CSS variables
    card.style.setProperty('--spark-pos', `${px_spark}% ${py_spark}%`);
    card.style.setProperty('--grad-pos', `${lp}% ${tp}%`);
    card.style.setProperty('--spark-opacity', `${p_opc / 100}`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = '';
    card.style.setProperty('--spark-opacity', `0.75`);
  };

  return (
    <div
      className={`card pika animated`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--front': `url(${avatarUrl})` }}
    >
      {/* Aquí puedes seguir agregando el contenido visual, texto, etc. */}
    </div>
  );
}
