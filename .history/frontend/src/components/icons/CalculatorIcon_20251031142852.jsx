// You can save this as a component: src/components/icons/CalculatorIcon.jsx
export const CalculatorIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Background Circle */}
    <circle cx="12" cy="12" r="11" fill="#FCD34D" />
    
    {/* Calculator Body */}
    <rect x="4" y="6" width="16" height="14" rx="2" fill="white" />
    
    {/* Display Screen */}
    <rect x="6" y="8" width="12" height="3" rx="0.5" fill="#374151" />
    
    {/* Display Text */}
    <text x="12" y="10.5" textAnchor="middle" fontSize="2.5" fill="#9CA3AF" fontFamily="monospace">0123456789</text>
    
    {/* Function Buttons Row */}
    <circle cx="7" cy="13.5" r="1" fill="#9CA3AF" />
    <circle cx="10" cy="13.5" r="1" fill="#9CA3AF" />
    <circle cx="13" cy="13.5" r="1" fill="#9CA3AF" />
    <circle cx="16" cy="13.5" r="1" fill="#9CA3AF" />
    
    {/* Number Buttons */}
    <rect x="6" y="15.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="8.25" y="15.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="10.5" y="15.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="12.75" y="15.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="15" y="15.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    
    <rect x="6" y="17.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="8.25" y="17.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="10.5" y="17.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="12.75" y="17.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    <rect x="15" y="17.5" width="1.5" height="1.5" rx="0.25" fill="#E5E7EB" />
    
    {/* Orange Equals Button */}
    <rect x="16.5" y="16" width="2" height="3" rx="0.5" fill="#FB923C" />
  </svg>
);

export default CalculatorIcon;