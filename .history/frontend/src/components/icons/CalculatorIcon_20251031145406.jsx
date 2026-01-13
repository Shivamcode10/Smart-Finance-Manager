// frontend/src/components/icons/CalculatorIcon.jsx
import React from 'react';

export const CalculatorIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F3F4F6" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
      <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
      <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <ellipse cx="12" cy="21" rx="9" ry="1.5" fill="#000000" opacity="0.2" />
    <rect x="3" y="3" width="18" height="20" rx="3" fill="url(#bodyGradient)" />
    <rect x="6" y="5" width="1.5" height="0.5" rx="0.25" fill="#9CA3AF" />
    <rect x="8.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#9CA3AF" />
    <rect x="11" y="5" width="1.5" height="0.5" rx="0.25" fill="#9CA3AF" />
    <rect x="13.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#9CA3AF" />
    <rect x="16.5" y="5" width="1.5" height="0.5" rx="0.25" fill="#9CA3AF" />
    <rect x="5" y="7.5" width="14" height="4" rx="0.5" fill="url(#screenGradient)" />
    <g fill="#10B981">
      {/* 0 */}
      <rect x="6" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="6" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="10.25" width="0.5" height="1" rx="0.1" />
      {/* 1 */}
      <rect x="9" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="9.75" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="10.5" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="9" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="9.75" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="10.5" y="10.25" width="0.5" height="1" rx="0.1" />
      {/* 2 */}
      <rect x="12" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="12.75" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="13.5" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="12" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="12.75" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="13.5" y="10.25" width="0.5" height="1" rx="0.1" />
      {/* 3 */}
      <rect x="15" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="15.75" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="16.5" y="9" width="0.5" height="1" rx="0.1" />
      <rect x="15" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="15.75" y="10.25" width="0.5" height="1" rx="0.1" />
      <rect x="16.5" y="10.25" width="0.5" height="1" rx="0.1" />
      {/* 4 */}
      <rect x="6" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="6" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="12.75" width="0.5" height="1" rx="0.1" />
      {/* 5 */}
      <rect x="9" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="9.75" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="10.5" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="9" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="9.75" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="10.5" y="12.75" width="0.5" height="1" rx="0.1" />
      {/* 6 */}
      <rect x="12" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="12.75" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="13.5" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="12" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="12.75" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="13.5" y="12.75" width="0.5" height="1" rx="0.1" />
      {/* 7 */}
      <rect x="15" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="15.75" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="16.5" y="11.5" width="0.5" height="1" rx="0.1" />
      <rect x="15" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="15.75" y="12.75" width="0.5" height="1" rx="0.1" />
      <rect x="16.5" y="12.75" width="0.5" height="1" rx="0.1" />
      {/* 8 */}
      <rect x="6" y="14" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="14" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="14" width="0.5" height="1" rx="0.1" />
      <rect x="6" y="15.25" width="0.5" height="1" rx="0.1" />
      <rect x="6.75" y="15.25" width="0.5" height="1" rx="0.1" />
      <rect x="7.5" y="15.25" width="0.5" height="1" rx="0.1" />
      {/* 9 */}
      <rect x="9" y="14" width="0.5" height="1" rx="0.1" />
      <rect x="9.75" y="14" width="0.5" height="1" rx="0.1" />
      <rect x="10.5" y="14" width="0.5" height="1" rx="0.1" />
      <rect x="9" y="15.25" width="0.5" height="1" rx="0.1" />
      <rect x="9.75" y="15.25" width="0.5" height="1" rx="0.1" />
      <rect x="10.5} y="15.25" width="0.5" height="1" rx="0.1" />
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
      <rect x="7.5" y="19.5" width="1" height="1" rx="0.2" />
      <rect x="9.5" y="19.5" width="1" height="1" rx="0.2" />
      <rect x="11.5" y="19.5" width="1" height="1" rx="0.2" />
      <rect x="13.5" y="19.5" width="1" height="1" rx="0.2" />
      <rect x="15.5" y="19.5" width="1" height="1" rx="0.2" />
      <rect x="17.5" y="19.5" width="1" height="1" rx="0.2" />
      <rect x="5.5" y="21" width="1" height="1" rx="0.2" />
      <rect x="7.5" y="21" width="1" height="1" rx="0.2" />
      <rect x="9.5" y="21" width="1" height="1" rx="0.2" />
      <rect x="11.5" y="21" width="1" height="1" rx="0.2" />
      <rect x="13.5" y="21" width="1" height="1" rx="0.2" />
      <rect x="15.5" y="21" width="1" height="1" rx="0.2" />
      <rect x="17.5" y="21" width="1" height="1" rx="0.2" />
    </g>
    <rect x="16.5" y="19.5" width="2.5" height="2.5" rx="0.5" fill="url(#buttonGradient)" />
  </svg>
);