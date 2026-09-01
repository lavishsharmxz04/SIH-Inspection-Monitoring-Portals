import React from 'react';

export const Emblem = ({ size = 44, className = '' }) => {
  return (
    <div
      className={`gov-seal-placeholder ${className}`}
      style={{ width: size, height: size }}
      title="Government Digital Platform Seal"
    >
      <svg
        width={size * 0.65}
        height={size * 0.65}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ashoka Chakra & Emblem Motif Stylized Placeholder */}
        <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="4" />
        <circle cx="50" cy="50" r="38" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="50" cy="50" r="16" stroke="#FFFFFF" strokeWidth="3" fill="#1769AA" />
        <circle cx="50" cy="50" r="4" fill="#D4AF37" />
        
        {/* 24 Spoke rays */}
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 16 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={50 + 16 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        ))}

        {/* Heraldic Shield / Pillar elements */}
        <path
          d="M32 78L50 88L68 78V66H32V78Z"
          fill="#D4AF37"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        <path
          d="M40 22C40 22 45 14 50 14C55 14 60 22 60 22"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
