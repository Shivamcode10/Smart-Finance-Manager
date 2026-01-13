// frontend/src/components/icons/CalculatorMiniIcon.jsx
import React from 'react';

export const CalculatorMiniIcon = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="bodyGradientMini" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F3F4F6" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
      <linearGradient id="screenGradientMini" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
      <linearGradient id="buttonGradientMini" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="url(#bodyGradientMini)" />
    <rect x="6" y="6" width="12" height="3" rx="0.5" fill="url(#screenGradientMini)" />
    <g fill="#10B981">
      {/* Mini display segments - simplified for smaller size */}
      <rect x="7" y="7" width="0.4" height="0.8" rx="0.1" />
      <rect x="7.6" y="7" width="0.4" height="0.8" rx="0.1" />
      <rect x="8.2" y="7" width="0.4" height="0.8" rx="0.1" />
      <rect x="7" y="8" width="0.4" height="0.8" rx="0.1" />
      <rect x="7.6" y="8" width="0.4" height="0.8" rx="0.1" />
      <rect x="8.2" y="8" width="0.4" height="0.8" rx="0.1" />
      {/* ... (you can add more or fewer segments for a simpler look) ... */}
    </g>
    <g fill="#6B7280">
      <circle cx="7" cy="16" r="0.4" />
      <circle cx="8.5" cy="16" r="0.4" />
      <circle cx="10" cy="16" r="0.4" />
      <circle cx="11.5" cy="16" r="0.4" />
      <circle cx="13" cy="16" r="0.4" />
      <circle cx="14.5" cy="16" r="0.4" />
      <circle cx="16" cy="16" r="0.4" />
    </g>
    <g fill="#9CA3AF">
      <rect x="6" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="7.2" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="8.4" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="9.6" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="10.8" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="12" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="13.2" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="14.4" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="15.6" y="17.5" width="0.8" height="0.8" rx="0.2" />
      <rect x="17" y="17.5" width="0.8" height="0.8" rx="0.2" />
    </g>
    <rect x="15" y="17.5" width="2" height="2" rx="0.5" fill="url(#buttonGradientMini)" />
  </svg>
);