import React from 'react';

interface VoloCSLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const VoloCSLogo: React.FC<VoloCSLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'compact',
  theme = 'light',
  showSubtitle = false,
}) => {
  // Dimension scaling
  const sizeMap = {
    sm: { icon: 24, text: 'text-base', subText: 'text-[7px]' },
    md: { icon: 34, text: 'text-xl', subText: 'text-[9px]' },
    lg: { icon: 46, text: 'text-2xl', subText: 'text-[11px]' },
    xl: { icon: 64, text: 'text-4xl', subText: 'text-[13px]' },
  };

  const { icon, text, subText } = sizeMap[size];

  // Colors based on theme
  const voloTextColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-700';
  const subtitleColor = theme === 'dark' ? 'text-amber-300/80' : 'text-amber-700';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* VoloCS 3D Cloud + Swoosh + Tech Nodes SVG Emblem */}
      <svg
        width={icon}
        height={icon * 0.72}
        viewBox="0 0 160 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
        aria-label="VoloSC Logo"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id="voloGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E29D" />
            <stop offset="35%" stopColor="#D89E34" />
            <stop offset="70%" stopColor="#FDEAB4" />
            <stop offset="100%" stopColor="#B87B1A" />
          </linearGradient>

          <linearGradient id="voloGoldAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B37812" />
            <stop offset="50%" stopColor="#E8B548" />
            <stop offset="100%" stopColor="#FFF0B8" />
          </linearGradient>

          {/* Deep Royal / Sapphire Blue Gradients */}
          <linearGradient id="voloBlueDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="voloSwooshBlue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="40%" stopColor="#2563EB" />
            <stop offset="80%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          <linearGradient id="voloBeamGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="70%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F6C85F" />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="voloGlow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Golden Base & Right Cloud Arch */}
        <path
          d="M 42 88 C 22 88 12 75 14 58 C 16 42 30 32 46 32 C 54 32 60 35 66 40 C 72 26 88 18 104 22 C 114 24 121 31 124 39 C 138 39 150 49 148 64 C 146 78 133 88 116 88 C 104 88 98 83 95 78 C 88 90 60 92 42 88 Z"
          stroke="url(#voloGoldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.95"
        />

        {/* 2. Outer Sapphire Cloud Silhouette Ribbons */}
        <path
          d="M 38 84 C 20 84 14 70 17 56 C 20 42 34 35 48 36 C 54 26 68 18 82 20 C 96 22 106 31 108 42 C 120 41 133 48 134 60 C 135 73 124 82 110 82"
          stroke="url(#voloBlueDark)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 3. Central Dynamic Swoosh (V-Shape Wing) */}
        <path
          d="M 28 68 C 34 76 43 82 52 82 C 60 82 68 76 76 64 C 88 45 106 32 128 26"
          stroke="url(#voloSwooshBlue)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#voloGlow)"
        />

        {/* Second inner highlight swoosh for 3D metallic feel */}
        <path
          d="M 38 68 C 44 74 50 77 56 77 C 64 77 72 70 80 58 C 90 43 104 33 122 28"
          stroke="url(#voloGoldAccent)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />

        {/* 4. Four Rising Tech Data Beams (at ~45 deg angle) */}
        {/* Beam 1 */}
        <line x1="88" y1="46" x2="102" y2="28" stroke="url(#voloBeamGrad)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="103" cy="27" r="4.2" fill="url(#voloGoldGrad)" />

        {/* Beam 2 */}
        <line x1="99" y1="42" x2="116" y2="20" stroke="url(#voloBeamGrad)" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="117" cy="19" r="4.4" fill="url(#voloGoldGrad)" />

        {/* Beam 3 */}
        <line x1="112" y1="40" x2="131" y2="14" stroke="url(#voloBeamGrad)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="132" cy="13" r="4.6" fill="url(#voloGoldGrad)" />

        {/* Beam 4 */}
        <line x1="126" y1="39" x2="146" y2="10" stroke="url(#voloBeamGrad)" strokeWidth="3.8" strokeLinecap="round" />
        <circle cx="147" cy="9" r="5" fill="url(#voloGoldGrad)" />
      </svg>

      {/* Typography: Volo (Blue) + SC (Gold) */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-black tracking-tight ${text} flex items-baseline`}>
            <span className={voloTextColor}>Volo</span>
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent ml-0.5 drop-shadow-2xs">
              SC
            </span>
          </div>

          {(showSubtitle || variant === 'full') && (
            <span
              className={`font-bold tracking-[0.22em] uppercase ${subText} ${subtitleColor} mt-0.5`}
            >
              ENTERPRISE CLOUD OS
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const VoloSCLogo = VoloCSLogo;
