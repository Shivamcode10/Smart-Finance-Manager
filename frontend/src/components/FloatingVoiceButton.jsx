
import React, { useState } from 'react';
import { FiMic, FiX } from 'react-icons/fi';
import VoiceCommands from './VoiceCommands';

const FloatingVoiceButton = ({ addTransaction, stats, transactions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Floating Microphone Button */}
      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 z-50 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300"
        title="Open Voice Commands"
      >
        <FiMic className="h-6 w-6" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal} 
        >
          {/* Modal Content */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <FiMic className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Voice Commands
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            {/* Modal Body with VoiceCommands Component */}
            <div className="p-4">
              <VoiceCommands 
                addTransaction={addTransaction} 
                stats={stats} 
                transactions={transactions} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingVoiceButton;