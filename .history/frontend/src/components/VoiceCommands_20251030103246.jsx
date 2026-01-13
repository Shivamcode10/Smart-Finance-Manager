import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff, FiVolume2 } from 'react-icons/fi';

const VoiceCommands = ({ addTransaction }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
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
  }, []);

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

  const extractAmount = (text) => {
    // Remove currency symbols and convert to number
    const cleanText = text.replace(/[$,]/g, '');
    const amount = parseFloat(cleanText);
    return isNaN(amount) ? null : amount;
  };

  const processCommand = async (command) => {
    const lowerCommand = command.toLowerCase();
    console.log("Processing command:", lowerCommand);
    
    // Parse transaction commands - more flexible patterns
    const transactionPatterns = [
      // Pattern: "add transaction $50 for lunch"
      /add transaction (.+) for (.+)/i,
      // Pattern: "add $50 for lunch"
      /add (.+) for (.+)/i,
      // Pattern: "spent $50 on lunch"
      /spent (.+) on (.+)/i,
      // Pattern: "paid $50 for lunch"
      /paid (.+) for (.+)/i,
      // Pattern: "bought lunch for $50"
      /bought (.+) for (.+)/i,
      // Pattern: "transaction $50 lunch"
      /transaction (.+) (.+)/i
    ];

    let matched = false;

    for (const pattern of transactionPatterns) {
      const match = lowerCommand.match(pattern);
      if (match) {
        console.log("Matched pattern:", pattern, "with groups:", match);
        
        // Try to extract amount from first or second group
        let amount = extractAmount(match[1]);
        let description = match[2];
        let category = "Uncategorized"; // Default category
        
        // If amount not found in first group, try second group
        if (amount === null && match[2]) {
          amount = extractAmount(match[2]);
          description = match[1];
        }
        
        // If still no amount, try to find it in the entire command
        if (amount === null) {
          const amountMatch = lowerCommand.match(/(\d+(?:\.\d+)?)/);
          if (amountMatch) {
            amount = parseFloat(amountMatch[1]);
          }
        }
        
        console.log("Extracted amount:", amount, "description:", description);
        
        if (amount !== null && description) {
          const transaction = {
            type: 'expense',
            amount: amount,
            description: description,
            category: category,
            date: new Date().toISOString().split('T')[0],
            emotion: 'neutral',
            isPrivate: false
          };
          
          // Set processing state and try to add the transaction
          setIsProcessing(true);
          setFeedback('⏳ Adding transaction...');
          
          try {
            await addTransaction(transaction);
            setFeedback(`✅ Added transaction: $${amount} for ${description}`);
          } catch (error) {
            console.error("Error adding transaction:", error);
            setFeedback(`❌ Failed to add transaction: ${error.message || 'Unknown error'}`);
          } finally {
            setIsProcessing(false);
          }
          
          matched = true;
          break;
        }
      }
    }

    // Parse income commands
    if (!matched) {
      const incomePatterns = [
        // Pattern: "received $50 from salary"
        /received (.+) from (.+)/i,
        // Pattern: "got $50 from salary"
        /got (.+) from (.+)/i,
        // Pattern: "earned $50 from salary"
        /earned (.+) from (.+)/i
      ];

      for (const pattern of incomePatterns) {
        const match = lowerCommand.match(pattern);
        if (match) {
          console.log("Matched income pattern:", pattern, "with groups:", match);
          
          let amount = extractAmount(match[1]);
          const source = match[2];
          
          // If amount not found, try to find it in the entire command
          if (amount === null) {
            const amountMatch = lowerCommand.match(/(\d+(?:\.\d+)?)/);
            if (amountMatch) {
              amount = parseFloat(amountMatch[1]);
            }
          }
          
          console.log("Extracted income amount:", amount, "source:", source);
          
          if (amount !== null && source) {
            const transaction = {
              type: 'income',
              amount: amount,
              description: `Income from ${source}`,
              category: 'Other Income',
              date: new Date().toISOString().split('T')[0],
              emotion: 'happy',
              isPrivate: false
            };
            
            // Set processing state and try to add the transaction
            setIsProcessing(true);
            setFeedback('⏳ Adding income...');
            
            try {
              await addTransaction(transaction);
              setFeedback(`✅ Added income: $${amount} from ${source}`);
            } catch (error) {
              console.error("Error adding income:", error);
              setFeedback(`❌ Failed to add income: ${error.message || 'Unknown error'}`);
            } finally {
              setIsProcessing(false);
            }
            
            matched = true;
            break;
          }
        }
      }
    }

    if (!matched) {
      setFeedback(`❌ I didn't understand that command. Try saying "add transaction $50 for lunch"`);
      console.log("No pattern matched for command:", lowerCommand);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = window.speechSynthesis.getVoices()[0];
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
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
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-md flex items-center transition-colors duration-200 ${
              isListening
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? (
              <>
                <FiMicOff className="mr-2 h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <FiMic className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </button>
          <button
            onClick={() => speak('Voice commands are ready. Try saying: add transaction 50 dollars for lunch')}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiVolume2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4">
        {isListening && (
          <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="animate-pulse flex items-center">
              <div className="h-3 w-3 bg-red-500 rounded-full mr-3"></div>
              <span className="text-red-700 dark:text-red-300 text-sm">
                Listening... Say a command like "add transaction $50 for lunch"
              </span>
            </div>
          </div>
        )}
        
        {isProcessing && (
          <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="animate-pulse flex items-center">
              <div className="h-3 w-3 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-yellow-700 dark:text-yellow-300 text-sm">
                Processing your command...
              </span>
            </div>
          </div>
        )}
        
        {transcript && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>You said:</strong> {transcript}
            </p>
          </div>
        )}
        
        {feedback && (
          <div className={`p-3 rounded-lg ${
            feedback.includes('error') || feedback.includes('not supported') || feedback.includes('❌')
              ? 'bg-red-50 dark:bg-red-900/20'
              : feedback.includes('⏳')
              ? 'bg-yellow-50 dark:bg-yellow-900/20'
              : 'bg-green-50 dark:bg-green-900/20'
          }`}>
            <p className={`text-sm ${
              feedback.includes('error') || feedback.includes('not supported') || feedback.includes('❌')
                ? 'text-red-700 dark:text-red-300'
                : feedback.includes('⏳')
                ? 'text-yellow-700 dark:text-yellow-300'
                : 'text-green-700 dark:text-green-300'
            }`}>
              {feedback}
            </p>
          </div>
        )}
      </div>

      {/* Command Examples */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Example Commands:
        </h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Add Transaction:</strong> "Add transaction $50 for lunch"
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Add Income:</strong> "Received $1000 from salary"
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Simple Format:</strong> "Add $25 for coffee"
            </p>
          </div>
        </div>
      </div>

      {/* Browser Support Notice */}
      {(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            ⚠️ Speech recognition is not supported in your browser. Try using Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceCommands;