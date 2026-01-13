// frontend/src/components/icons/CalculatorDarkIcon.jsx
import React from 'react';

export const CalculatorDarkIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="bodyGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#1F2937" />
      </linearGradient>
      <linearGradient id="screenGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F3F4F6" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
      <linearGradient id="buttonGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <ellipse cx="12" cy="21" rx="9" ry="1.5" fill="#000000" opacity="0.3" />
    <rect x="3" y="3" width="18" height="20" rx="3" fill="url(#bodyGradientDark)" />
    <rect x="6" y="5" width="1.5" height="0.5" rx="0.25" fill="#4B5563" />
    <rect x="8.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#4B5563" />
    <rect x="11" y="5" width="1.5" height="0.5" rx="0.25" fill="#4B5563" />
    <rect x="13.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#4B5563" />
    <rect x="16.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#4B5563" />
    <rect x="5" y="7.5" width="14" height="4" rx="0.5" fill="url(#screenGradientDark)" />
    <g fill="#34D399">
      {/* ... (same segment number code as before) ... */}
      <rect x="6" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="6" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="10.25" width="0.5" height="1" rx="0.1" />
      {/* ... (copy all number segments from the previous icon) ... */}
    </g>
    <g fill="#6B7280">
      <circle cx="6.5" cy="18" r="0.5" />
      <circle cx="8.5" cy="18" r="0.5" />
      <circle cx="10.5" cy="18" r="0.5" />
      <circle cx="12.5" cy="18" r="0.5" />
      <circle cx="14.5" cy="18" r="0.5" />
      <circle cx="16.5" cy="18" r="0.5" />
    </g>
    <g fill="#9CA3AF">
      <rect x="5.5" y="19.5" width="1" height="1" rx="0.2" />
      {/* ... (copy all number button segments from the previous icon) ... */}
    </g>
    <rect x="16.5" y="19.5" width="2.5" height="2.5" rx="0.5" fill="url(#buttonGradientDark)" />
  </svg>
);

export de