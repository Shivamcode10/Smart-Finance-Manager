// frontend/src/components/VoiceCommands.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff, FiVolume2, FiBook, FiX } from 'react-icons/fi';

// IMPORTANT: This list should match your backend's enum values.
const VALID_CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other'
];

const VoiceCommands = ({ addTransaction, stats, transactions }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          processCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setFeedback('Speech recognition error. Please try again.');
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [stats, transactions]); // Rerun if stats/transactions change

  const startListening = () => {
    if (!recognitionRef.current) {
      setFeedback('Speech recognition is not supported in your browser.');
      return;
    }
    setTranscript('');
    setFeedback('');
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setFeedback('Error starting speech recognition. Please check microphone permissions.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const processCommand = async (command) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log("Processing command:", lowerCommand);
    setIsProcessing(true);
    setFeedback('⏳ Processing...');

    // --- 1. QUERY COMMANDS (Checking information) ---
    if (lowerCommand.includes('balance') || lowerCommand.includes('how much money')) {
      const balance = stats.balance;
      const message = `Your current balance is $${balance.toLocaleString()}.`;
      setFeedback(`💰 ${message}`);
      speak(message);
      setIsProcessing(false);
      return;
    }

    if (lowerCommand.includes('spending') || lowerCommand.includes('expenses')) {
      const expenses = stats.expenses;
      const message = `You have spent $${expenses.toLocaleString()} this month.`;
      setFeedback(`💸 ${message}`);
      speak(message);
      setIsProcessing(false);
      return;
    }

    if (lowerCommand.includes('income') || lowerCommand.includes('earned')) {
      const income = stats.income;
      const message = `You have earned $${income.toLocaleString()} this month.`;
      setFeedback(`💵 ${message}`);
      speak(message);
      setIsProcessing(false);
      return;
    }

    // --- 2. TRANSACTION COMMANDS (Adding data) ---
    let matched = false;
    let amount = null;
    let description = '';
    let category = VALID_CATEGORIES[0]; // Default to 'Food'

    // More flexible patterns to find amount
    const amountMatch = lowerCommand.match(/(\d+(?:\.\d+)?)/);
    if (amountMatch) {
      amount = parseFloat(amountMatch[1]);
    }

    // More flexible patterns to find description
    const descPatterns = [
      /for (.+)/i,      // "add $50 for lunch"
      /on (.+)/i,       // "spent $50 on lunch"
      /from (.+)/i,     // "got $50 from salary"
    ];
    for (const pattern of descPatterns) {
      const match = lowerCommand.match(pattern);
      if (match) {
        description = match[1];
        break;
      }
    }
    
    // Determine transaction type
    const isIncome = lowerCommand.includes('income') || lowerCommand.includes('received') || lowerCommand.includes('got') || lowerCommand.includes('earned');

    if (amount !== null && description) {
      const transaction = {
        type: isIncome ? 'income' : 'expense',
        amount: amount,
        description: description,
        category: isIncome ? 'Other' : category,
        date: new Date().toISOString().split('T')[0],
        emotion: 'neutral',
        isPrivate: false
      };
      
      try {
        await addTransaction(transaction);
        const successMsg = `Successfully added ${isIncome ? 'income' : 'expense'} of $${amount} for ${description}.`;
        setFeedback(`✅ ${successMsg}`);
        speak(successMsg);
      } catch (error) {
        console.error("Error adding transaction:", error);
        const errorMsg = `Failed to add transaction. ${error.message}`;
        setFeedback(`❌ ${errorMsg}`);
        speak(errorMsg);
      } finally {
        setIsProcessing(false);
      }
      matched = true;
    }

    // --- 3. HELP COMMAND ---
    if (!matched && (lowerCommand.includes('help') || lowerCommand.includes('what can i say'))) {
      setShowGuide(true);
      setIsProcessing(false);
      return;
    }

    if (!matched) {
      setFeedback(`❌ I didn't understand that. Say "help" to see all commands.`);
      speak("I didn't understand that. Say help to see all commands.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <FiMic className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Voice Commands
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Command Guide"
          >
            <FiBook className="h-4 w-4" />
          </button>
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-md flex items-center transition-colors duration-200 ${
              isListening
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? <><FiMicOff className="mr-2 h-4 w-4" /> Stop</> : <><FiMic className="mr-2 h-4 w-4" /> Start</>}
          </button>
        </div>
      </div>

      {/* Status Display */}
      <div className="mb-4 space-y-2">
        {isListening && (
          <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="animate-pulse flex items-center">
              <div className="h-3 w-3 bg-red-500 rounded-full mr-3"></div>
              <span className="text-red-700 dark:text-red-300 text-sm">Listening...</span>
            </div>
          </div>
        )}
        {isProcessing && (
          <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="animate-pulse flex items-center">
              <div className="h-3 w-3 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-yellow-700 dark:text-yellow-300 text-sm">Processing...</span>
            </div>
          </div>
        )}
        {transcript && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 text-sm"><strong>You said:</strong> {transcript}</p>
          </div>
        )}
        {feedback && (
          <div className={`p-3 rounded-lg ${
            feedback.includes('❌') ? 'bg-red-50 dark:bg-red-900/20' : 
            feedback.includes('⏳') ? 'bg-yellow-50 dark:bg-yellow-900/20' : 
            'bg-green-50 dark:bg-green-900/20'
          }`}>
            <p className={`text-sm ${
              feedback.includes('❌') ? 'text-red-700 dark:text-red-300' : 
              feedback.includes('⏳') ? 'text-yellow-700 dark:text-yellow-300' : 
              'text-green-700 dark:text-green-300'
            }`}>{feedback}</p>
          </div>
        )}
      </div>

      {/* Command Guidebook */}
      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Voice Command Guide</h3>
              <button onClick={() => setShowGuide(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">💰 Check Your Finances</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li><em>"What's my balance?"</em></li>
                  <li><em>"How much did I spend this month?"</em></li>
                  <li><em>"What are my expenses?"</em></li>
                  <li><em>"How much income did I earn?"</em></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">➕ Add Expenses</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li><em>"Add 50 dollars for lunch"</em></li>
                  <li><em>"Spent 25 on coffee"</em></li>
                  <li><em>"Paid 100 for groceries"</em></li>
                  <li><em>"Bought a new book for 20 dollars"</em></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">💵 Add Income</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li><em>"Got 1000 from salary"</em></li>
                  <li><em>"Received 50 dollars from a friend"</em></li>
                  <li><em>"Earned 200 from a freelance project"</em></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">🗣️ Other Commands</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li><em>"Help"</em> or <em>"What can I say?"</em> to show this guide.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">⚠️ Speech recognition is not supported in your browser.</p>
        </div>
      )}
    </div>
  );
};

export default VoiceCommands;