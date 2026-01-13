// frontend/src/components/icons/CalculatorBlueIcon.jsx
import React from 'react';

export const CalculatorBlueIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="bodyGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#BFDBFE" />
      </linearGradient>
      <linearGradient id="screenGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <linearGradient id="buttonGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <ellipse cx="12" cy="21" rx="9" ry="1.5" fill="#000000" opacity="0.2" />
    <rect x="3" y="3" width="18" height="20" rx="3" fill="url(#bodyGradientBlue)" />
    <rect x="6" y="5" width="1.5" height="0.5" rx="0.25" fill="#64748B" />
    <rect x="8.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#64748B" />
    <rect x="11" y="5" width="1.5" height="0.5" rx="0.25" fill="#64748B" />
    <rect x="13.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#64748B" />
    <rect x="16.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#64748B" />
    <rect x="5" y="7.5" width="14" height="4" rx="0.5" fill="url(#screenGradientBlue)" />
    <g fill="#60A5FA">
      {/* ... (same segment number code as before) ... */}
      <rect x="6" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="6" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="10.25" width="0.5" height="1" rx="0.1" />
      {/* ... (copy all number segments from the previous icon) ... */}
    </g>
    <g fill="#9CA3AF">
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
    <rect x="16.5" y="19.5" width="2.5" height="2.5" rx="0.5" fill="url(#buttonGradientBlue)" />
  </svg>
);