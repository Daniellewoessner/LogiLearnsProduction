import React from 'react';

const SuperheroIcons = () => {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {/* Background with subtle pattern */}
      <rect width="800" height="600" fill="#f0f6ff" />
      <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="#3366cc" opacity="0.2" />
      </pattern>
      <rect width="800" height="600" fill="url(#dots)" />
      
      {/* Title */}
      <text x="400" y="50" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="28" textAnchor="middle" fill="#3366cc" fontWeight="bold">Superhero Learning Icons</text>
      <text x="400" y="80" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="16" textAnchor="middle" fill="#333333">Dyslexia-Friendly Visual Elements</text>
      
      {/* Visual Learning Icon */}
      <g transform="translate(120, 180)">
        <circle cx="60" cy="60" r="60" fill="#e57373" />
        <path d="M60 30 A30 30 0 1 0 60 90 A30 30 0 1 0 60 30" fill="white" />
        <circle cx="60" cy="60" r="15" fill="#e57373" />
        <path d="M60 40 L120 20 L110 50 Z" fill="white" />
        <path d="M60 80 L120 100 L110 70 Z" fill="white" />
        <text x="60" y="140" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="18" textAnchor="middle" fill="#333333">👁️ Visual</text>
        <text x="60" y="160" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="14" textAnchor="middle" fill="#666666">Learning</text>
      </g>
      
      {/* Auditory Learning Icon */}
      <g transform="translate(280, 180)">
        <circle cx="60" cy="60" r="60" fill="#64b5f6" />
        <path d="M60 20 Q90 60 60 100 L80 100 Q110 60 80 20 Z" fill="white" />
        <path d="M40 40 Q60 60 40 80 L50 80 Q70 60 50 40 Z" fill="white" />
        <path d="M20 50 Q30 60 20 70 L25 70 Q35 60 25 50 Z" fill="white" />
        <text x="60" y="140" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="18" textAnchor="middle" fill="#333333">👂 Auditory</text>
        <text x="60" y="160" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="14" textAnchor="middle" fill="#666666">Learning</text>
      </g>
      
      {/* Tactile Learning Icon */}
      <g transform="translate(440, 180)">
        <circle cx="60" cy="60" r="60" fill="#81c784" />
        <path d="M40 30 L80 30 L80 90 L40 90 Z" fill="white" />
        <path d="M45 40 L55 40 L55 50 L45 50 Z" fill="#81c784" />
        <path d="M65 40 L75 40 L75 50 L65 50 Z" fill="#81c784" />
        <path d="M45 60 L55 60 L55 70 L45 70 Z" fill="#81c784" />
        <path d="M65 60 L75 60 L75 70 L65 70 Z" fill="#81c784" />
        <path d="M55 80 L65 80 L65 90 L55 90 Z" fill="#81c784" />
        <text x="60" y="140" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="18" textAnchor="middle" fill="#333333">✋ Tactile</text>
        <text x="60" y="160" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="14" textAnchor="middle" fill="#666666">Learning</text>
      </g>
      
      {/* Kinesthetic Learning Icon */}
      <g transform="translate(600, 180)">
        <circle cx="60" cy="60" r="60" fill="#ffb74d" />
        <circle cx="60" cy="40" r="15" fill="white" /> {/* head */}
        <path d="M50 55 L40 85 L50 80 L40 110" stroke="white" strokeWidth="6" fill="none" /> {/* left arm/leg */}
        <path d="M70 55 L80 85 L70 80 L80 110" stroke="white" strokeWidth="6" fill="none" /> {/* right arm/leg */}
        <path d="M60 55 L60 85" stroke="white" strokeWidth="8" fill="none" /> {/* body */}
        <text x="60" y="140" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="18" textAnchor="middle" fill="#333333">🏃 Kinesthetic</text>
        <text x="60" y="160" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="14" textAnchor="middle" fill="#666666">Learning</text>
      </g>
      
      {/* Discussion Learning Icon */}
      <g transform="translate(200, 350)">
        <circle cx="60" cy="60" r="60" fill="#9575cd" />
        <path d="M40 40 L40 70 L30 80 L40 80 L40 90 L70 90 L70 40 Z" fill="white" />
        <path d="M90 30 L90 60 L100 70 L90 70 L90 80 L60 80 L60 30 Z" fill="white" />
        <text x="60" y="140" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="18" textAnchor="middle" fill="#333333">💬 Discussion</text>
        <text x="60" y="160" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="14" textAnchor="middle" fill="#666666">Learning</text>
      </g>
      
      {/* Superhero Mask */}
      <g transform="translate(440, 350)">
        <circle cx="60" cy="60" r="60" fill="#3366cc" />
        <path d="M20 60 Q60 30 100 60 Q60 70 20 60 Z" fill="white" />
        <circle cx="40" cy="55" r="10" fill="#3366cc" />
        <circle cx="80" cy="55" r="10" fill="#3366cc" />
        <text x="60" y="140" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="18" textAnchor="middle" fill="#333333">Superhero</text>
        <text x="60" y="160" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="14" textAnchor="middle" fill="#666666">Theme</text>
      </g>
      
      {/* Caption explaining accessibility */}
      <text x="400" y="540" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="16" textAnchor="middle" fill="#333333">High contrast shapes with simple designs for easy visual processing</text>
      <text x="400" y="565" fontFamily="Comic Sans MS, OpenDyslexic, sans-serif" fontSize="16" textAnchor="middle" fill="#333333">Compatible with dyslexia-friendly fonts and color schemes</text>
    </svg>
  );
};

export default SuperheroIcons;