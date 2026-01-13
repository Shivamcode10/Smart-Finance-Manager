// frontend/src/components/AdvancedCalculator.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiCopy, FiChevronDown, FiChevronUp, FiMic, FiSun, FiMoon, FiHistory, FiDollarSign, FiPercent, FiTrendingUp, FiHome } from 'react-icons/fi';

const AdvancedCalculator = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [mode, setMode] = useState('standard'); // standard, scientific, financial
  const [darkMode, setDarkMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator'); // calculator, currency, tip, loan
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [currencyAmount, setCurrencyAmount] = useState('1');
  const [currencyResult, setCurrencyResult] = useState('0.85');
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [peopleCount, setPeopleCount] = useState('1');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [emiResult, setEmiResult] = useState(null);
  const resultRef = useRef(null);

  // Currency rates (simplified for demo)
  const currencyRates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15, INR: 74.5 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.8, INR: 87.8 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 151.2, INR: 102.1 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, INR: 0.68 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0098, JPY: 1.47 }
  };

  useEffect(() => {
    if (isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          processVoiceCommand(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.start();
      }
    }
  }, [isListening]);

  useEffect(() => {
    // Calculate currency conversion when inputs change
    if (currencyRates[currencyFrom] && currencyRates[currencyTo]) {
      const rate = currencyRates[currencyFrom][currencyTo];
      setCurrencyResult((parseFloat(currencyAmount) * rate).toFixed(2));
    }
  }, [currencyFrom, currencyTo, currencyAmount]);

  const processVoiceCommand = (command) => {
    // Simple voice command processing
    if (command.includes('calculate') || command.includes('equals')) {
      handleEquals();
    } else if (command.includes('clear')) {
      clear();
    } else if (command.includes('add') || command.includes('plus')) {
      setOperation('+');
      setWaitingForNewValue(true);
    } else if (command.includes('subtract') || command.includes('minus')) {
      setOperation('-');
      setWaitingForNewValue(true);
    } else if (command.includes('multiply') || command.includes('times')) {
      setOperation('*');
      setWaitingForNewValue(true);
    } else if (command.includes('divide')) {
      setOperation('/');
      setWaitingForNewValue(true);
    } else {
      // Try to extract a number from the command
      const numberMatch = command.match(/(\d+(\.\d+)?)/);
      if (numberMatch) {
        inputNumber(numberMatch[0]);
      }
    }
  };

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  // FIX: Renamed helper function to avoid conflict
  const performArithmetic = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      // FIX: Use the renamed helper function
      const newValue = performArithmetic(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  // FIX: Renamed function to handle the equals button press
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      // FIX: Use the renamed helper function
      const newValue = performArithmetic(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      
      // Add to history
      const historyEntry = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [historyEntry, ...prev].slice(0, 10));
      
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const calculatePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
    setWaitingForNewValue(true);
  };

  const calculateSquareRoot = () => {
    const value = parseFloat(display);
    setDisplay(String(Math.sqrt(value)));
    setWaitingForNewValue(true);
  };

  const plusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForNewValue(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    // Show a toast notification (simplified)
    if (resultRef.current) {
      const originalText = resultRef.current.innerText;
      resultRef.current.innerText = 'Copied!';
      setTimeout(() => {
        resultRef.current.innerText = originalText;
      }, 1000);
    }
  };

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = bill * (parseFloat(tipPercentage) / 100);
    const total = bill + tip;
    const perPerson = total / parseInt(peopleCount) || 0;
    
    return {
      tip: tip.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2)
    };
  };

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const time = parseFloat(loanTerm) * 12 || 0;
    
    if (principal > 0 && rate > 0 && time > 0) {
      const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      const totalPayment = emi * time;
      const totalInterest = totalPayment - principal;
      
      setEmiResult({
        emi: emi.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    }
  };

  const renderCalculatorButtons = () => {
    if (mode === 'standard') {
      return (
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clear} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">C</button>
          <button onClick={plusMinus} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">+/-</button>
          <button onClick={calculatePercentage} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">%</button>
          <button onClick={() => performOperation('/')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">÷</button>
          
          <button onClick={() => inputNumber(7)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">7</button>
          <button onClick={() => inputNumber(8)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">8</button>
          <button onClick={() => inputNumber(9)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">9</button>
          <button onClick={() => performOperation('*')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">×</button>
          
          <button onClick={() => inputNumber(4)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">4</button>
          <button onClick={() => inputNumber(5)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">5</button>
          <button onClick={() => inputNumber(6)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">6</button>
          <button onClick={() => performOperation('-')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">-</button>
          
          <button onClick={() => inputNumber(1)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">1</button>
          <button onClick={() => inputNumber(2)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">2</button>
          <button onClick={() => inputNumber(3)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">3</button>
          <button onClick={() => performOperation('+')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">+</button>
          
          <button onClick={() => inputNumber(0)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white col-span-2">0</button>
          <button onClick={inputDecimal} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">.</button>
          <button onClick={handleEquals} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">=</button>
        </div>
      );
    } else if (mode === 'scientific') {
      return (
        <div className="grid grid-cols-5 gap-2">
          <button onClick={clear} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">C</button>
          <button onClick={() => inputNumber('(')} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">(</button>
          <button onClick={() => inputNumber(')')} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">)</button>
          <button onClick={calculateSquareRoot} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">√</button>
          <button onClick={() => performOperation('/')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">÷</button>
          
          <button onClick={() => inputNumber(7)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">7</button>
          <button onClick={() => inputNumber(8)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">8</button>
          <button onClick={() => inputNumber(9)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">9</button>
          <button onClick={() => inputNumber('e')} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">e</button>
          <button onClick={() => performOperation('*')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">×</button>
          
          <button onClick={() => inputNumber(4)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">4</button>
          <button onClick={() => inputNumber(5)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">5</button>
          <button onClick={() => inputNumber(6)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">6</button>
          <button onClick={() => inputNumber('π')} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">π</button>
          <button onClick={() => performOperation('-')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">-</button>
          
          <button onClick={() => inputNumber(1)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">1</button>
          <button onClick={() => inputNumber(2)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">2</button>
          <button onClick={() => inputNumber(3)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">3</button>
          <button onClick={() => inputNumber('x')} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">x</button>
          <button onClick={() => performOperation('+')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">+</button>
          
          <button onClick={() => inputNumber(0)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">0</button>
          <button onClick={inputDecimal} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">.</button>
          <button onClick={() => inputNumber('^')} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">^</button>
          <button onClick={handleEquals} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">=</button>
        </div>
      );
    } else if (mode === 'financial') {
      return (
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clear} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">C</button>
          <button onClick={memoryRecall} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">MR</button>
          <button onClick={memoryAdd} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">M+</button>
          <button onClick={() => performOperation('/')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">÷</button>
          
          <button onClick={() => inputNumber(7)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">7</button>
          <button onClick={() => inputNumber(8)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">8</button>
          <button onClick={() => inputNumber(9)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">9</button>
          <button onClick={() => performOperation('*')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">×</button>
          
          <button onClick={() => inputNumber(4)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">4</button>
          <button onClick={() => inputNumber(5)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">5</button>
          <button onClick={() => inputNumber(6)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">6</button>
          <button onClick={() => performOperation('-')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">-</button>
          
          <button onClick={() => inputNumber(1)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">1</button>
          <button onClick={() => inputNumber(2)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">2</button>
          <button onClick={() => inputNumber(3)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">3</button>
          <button onClick={() => performOperation('+')} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">+</button>
          
          <button onClick={() => inputNumber(0)} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">0</button>
          <button onClick={inputDecimal} className="calc-btn bg-gray-700 hover:bg-gray-600 text-white">.</button>
          <button onClick={calculatePercentage} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white">%</button>
          <button onClick={handleEquals} className="calc-btn bg-indigo-600 hover:bg-indigo-700 text-white">=</button>
          
          <button onClick={memorySubtract} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white col-span-2">M-</button>
          <button onClick={memoryClear} className="calc-btn bg-gray-600 hover:bg-gray-700 text-white col-span-2">MC</button>
        </div>
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-xl shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <h2 className="text-xl font-bold">Advanced Calculator</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-600'} text-white`}
              title="Voice Input"
            >
              <FiMic className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
              title="Toggle Theme"
            >
              {darkMode ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
              title="History"
            >
              <FiHistory className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'calculator'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'currency'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Currency
          </button>
          <button
            onClick={() => setActiveTab('tip')}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'tip'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tip
          </button>
          <button
            onClick={() => setActiveTab('loan')}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'loan'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Loan
          </button>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-4">
            {activeTab === 'calculator' && (
              <>
                {/* Display */}
                <div className={`p-4 mb-4 rounded-lg text-right text-2xl font-mono ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-70">{operation ? `${previousValue} ${operation}` : ''}</span>
                    <div className="flex items-center">
                      <span ref={resultRef} className="mr-2">{display}</span>
                      <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-700">
                        <FiCopy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="flex mb-4 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setMode('standard')}
                    className={`flex-1 py-1 rounded ${mode === 'standard' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setMode('scientific')}
                    className={`flex-1 py-1 rounded ${mode === 'scientific' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
                  >
                    Scientific
                  </button>
                  <button
                    onClick={() => setMode('financial')}
                    className={`flex-1 py-1 rounded ${mode === 'financial' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
                  >
                    Financial
                  </button>
                </div>

                {/* Calculator Buttons */}
                {renderCalculatorButtons()}
              </>
            )}

            {activeTab === 'currency' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">From</label>
                  <select
                    value={currencyFrom}
                    onChange={(e) => setCurrencyFrom(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="INR">INR - Indian Rupee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    value={currencyAmount}
                    onChange={(e) => setCurrencyAmount(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      const temp = currencyFrom;
                      setCurrencyFrom(currencyTo);
                      setCurrencyTo(temp);
                    }}
                    className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Swap
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To</label>
                  <select
                    value={currencyTo}
                    onChange={(e) => setCurrencyTo(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="INR">INR - Indian Rupee</option>
                  </select>
                </div>
                <div className={`p-4 rounded-lg text-center text-2xl font-bold ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {currencyResult} {currencyTo}
                </div>
              </div>
            )}

            {activeTab === 'tip' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bill Amount</label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="0.00"
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tip Percentage: {tipPercentage}%</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={tipPercentage}
                    onChange={(e) => setTipPercentage(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Number of People</label>
                  <input
                    type="number"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    min="1"
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                  />
                </div>
                {billAmount && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex justify-between mb-2">
                      <span>Tip Amount:</span>
                      <span className="font-bold">${calculateTip().tip}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Total Amount:</span>
                      <span className="font