// frontend/src/components/FloatingCalculatorButton.jsx
import React, { useState } from 'react';
import { CalculatorIcon, CalculatorDarkIcon, CalculatorBlueIcon, CalculatorMiniIcon } from '../components/icons';
import AdvancedCalculator from './AdvancedCalculator';

const FloatingCalculatorButton = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const openCalculator = () => setIsCalculatorOpen(true);
  const closeCalculator = () => setIsCalculatorOpen(false);

  return (
    <>
      {/* Floating Calculator Button */}
      <button
        onClick={openCalculator}
        className="fixed bottom-24 right-8 z-40 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300"
        title="Open Calculator"
      >
        // Use the original yellow calculator
<CalculatorIcon className="h-6 w-6" />

// Use the dark mode version
<CalculatorDarkIcon className="h-6 w-6" />

// Use the blue accent version
<CalculatorBlueIcon className="h-6 w-6" />

// Use the mini version for smaller buttons
<CalculatorMiniIcon className="h-5 w-5" />
      </button>

      {/* Calculator Modal */}
      <AdvancedCalculator isOpen={isCalculatorOpen} onClose={closeCalculator} />
    </>
  );
};

export default FloatingCalculatorButton;