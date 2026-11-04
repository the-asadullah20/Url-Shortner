import React from 'react';

/**
 * OwlMascot Component
 * Playful brand mascot perched on the edge of the authentication card.
 * Intelligently peeks when password inputs are focused.
 * Scaled and positioned for perfect laptop viewport clearance.
 */
export default function OwlMascot({ activeField, isPasswordVisible }) {
  const isPeeking = activeField === 'password' || activeField === 'confirmPassword';
  const isEmail = activeField === 'email';

  let pupilTransform = 'translate(0px, 0px)';
  let headTransform = 'rotate(0deg) translate(0px, 0px)';
  let eyeScale = 'scale(1)';

  if (isPeeking) {
    headTransform = 'rotate(-10deg) translate(-3px, 4px)';
    pupilTransform = 'translate(-4px, 5px)';
    eyeScale = isPasswordVisible ? 'scale(1.18)' : 'scale(1.08)';
  } else if (isEmail) {
    headTransform = 'rotate(-3deg) translate(-1px, 2px)';
    pupilTransform = 'translate(-2px, 3px)';
  }

  return (
    <div
      className="absolute -top-11 sm:-top-13 right-6 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none select-none z-20 transition-all duration-300"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full overflow-visible drop-shadow-md"
      >
        {/* Talons gripping the card edge */}
        <g id="talons" className="transition-transform duration-300">
          <ellipse cx="44" cy="108" rx="4" ry="3" fill="#F45B0B" />
          <ellipse cx="48" cy="109" rx="4" ry="3" fill="#F45B0B" />
          <ellipse cx="52" cy="108" rx="4" ry="3" fill="#F45B0B" />

          <ellipse cx="68" cy="108" rx="4" ry="3" fill="#F45B0B" />
          <ellipse cx="72" cy="109" rx="4" ry="3" fill="#F45B0B" />
          <ellipse cx="76" cy="108" rx="4" ry="3" fill="#F45B0B" />
        </g>

        {/* Body and head group with breathing animation if idle */}
        <g className={isPeeking ? '' : 'owl-breathe'}>
          {/* Main Body */}
          <path
            d="M 32 60 C 32 40 45 35 60 35 C 75 35 88 40 88 60 C 88 88 84 106 60 106 C 36 106 32 88 32 60 Z"
            fill="#242729"
            stroke="#A8C9C8"
            strokeWidth="1.8"
          />

          {/* Left Wing */}
          <path
            d="M 32 62 C 26 72 26 88 38 98 C 34 88 35 74 32 62 Z"
            fill="#1C1F20"
            stroke="#A8C9C8"
            strokeWidth="1"
          />
          {/* Right Wing */}
          <path
            d="M 88 62 C 94 72 94 88 82 98 C 86 88 85 74 88 62 Z"
            fill="#1C1F20"
            stroke="#A8C9C8"
            strokeWidth="1"
          />

          {/* Chest plumage (Powder Blue #A8C9C8) */}
          <path
            d="M 44 68 C 44 60 52 56 60 56 C 68 56 76 60 76 68 C 76 88 72 102 60 102 C 48 102 44 88 44 68 Z"
            fill="#A8C9C8"
            fillOpacity="0.9"
          />

          {/* Chest feather accents */}
          <path d="M 54 74 Q 60 77 66 74" fill="none" stroke="#242729" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 51 83 Q 60 87 69 83" fill="none" stroke="#242729" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 55 92 Q 60 95 65 92" fill="none" stroke="#242729" strokeWidth="1.5" strokeLinecap="round" />

          {/* Head Group */}
          <g
            style={{
              transformOrigin: '60px 48px',
              transform: headTransform,
              transition: 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Left Ear */}
            <polygon
              points="34,35 44,14 50,30"
              fill="#242729"
              stroke="#A8C9C8"
              strokeWidth="1.4"
            />
            <polygon points="41,20 44,14 47,22" fill="#A8C9C8" />

            {/* Right Ear */}
            <polygon
              points="86,35 76,14 70,30"
              fill="#242729"
              stroke="#A8C9C8"
              strokeWidth="1.4"
            />
            <polygon points="79,20 76,14 73,22" fill="#A8C9C8" />

            {/* Head Dome */}
            <ellipse
              cx="60"
              cy="44"
              rx="28"
              ry="24"
              fill="#242729"
              stroke="#A8C9C8"
              strokeWidth="1.8"
            />

            {/* Eyebrow Arc */}
            <path
              d="M 36 38 C 45 32 55 36 60 41 C 65 36 75 32 84 38"
              fill="none"
              stroke="#A8C9C8"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Left Eye */}
            <g
              style={{
                transformOrigin: '48px 45px',
                transform: eyeScale,
                transition: 'transform 260ms ease-out',
              }}
            >
              <circle cx="48" cy="45" r="10" fill="#FFFFFF" stroke="#242729" strokeWidth="1" />
              <circle cx="48" cy="45" r="6.8" fill="#A8C9C8" />

              <g
                style={{
                  transform: pupilTransform,
                  transition: 'transform 240ms cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                <circle cx="48" cy="45" r="4.2" fill="#1C1F20" />
                <circle cx="46.5" cy="43.5" r="1.4" fill="#FFFFFF" />
                <circle cx="49.5" cy="46.5" r="0.6" fill="#FFFFFF" />
              </g>

              {!isPeeking && (
                <rect
                  x="37"
                  y="34"
                  width="22"
                  height="22"
                  fill="#242729"
                  clipPath="url(#leftEyeClip)"
                  className="owl-eyelid-blink"
                  style={{ transformOrigin: '48px 36px' }}
                />
              )}
            </g>

            {/* Right Eye */}
            <g
              style={{
                transformOrigin: '72px 45px',
                transform: eyeScale,
                transition: 'transform 260ms ease-out',
              }}
            >
              <circle cx="72" cy="45" r="10" fill="#FFFFFF" stroke="#242729" strokeWidth="1" />
              <circle cx="72" cy="45" r="6.8" fill="#A8C9C8" />

              <g
                style={{
                  transform: pupilTransform,
                  transition: 'transform 240ms cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                <circle cx="72" cy="45" r="4.2" fill="#1C1F20" />
                <circle cx="70.5" cy="43.5" r="1.4" fill="#FFFFFF" />
                <circle cx="73.5" cy="46.5" r="0.6" fill="#FFFFFF" />
              </g>

              {!isPeeking && (
                <rect
                  x="61"
                  y="34"
                  width="22"
                  height="22"
                  fill="#242729"
                  clipPath="url(#rightEyeClip)"
                  className="owl-eyelid-blink"
                  style={{ transformOrigin: '72px 36px' }}
                />
              )}
            </g>

            {/* Owl Beak */}
            <polygon
              points="60,45 56,54 64,54"
              fill="#F45B0B"
              stroke="#DC4A04"
              strokeWidth="0.8"
            />
          </g>
        </g>

        <defs>
          <clipPath id="leftEyeClip">
            <circle cx="48" cy="45" r="10" />
          </clipPath>
          <clipPath id="rightEyeClip">
            <circle cx="72" cy="45" r="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
