import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiCpu, FiTrendingUp, FiDollarSign, FiShield, FiActivity } from 'react-icons/fi';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [focusedInput, setFocusedInput] = useState('');
  const cardRef = useRef(null);
  const { login, register, isAuthenticated, error } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  // 3D tilt effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isLogin) {
      login({ email, password });
    } else {
      register({ name, email, password });
    }
  };

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(79, 70, 229, 0.5)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Generate random particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 animate-gradientShift" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20 animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-teal-500/10 animate-pulse" style={{ animationDelay: '4s', animationDuration: '10s' }} />
      </div>
      
      {/* Floating glowing particles */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Theme toggle button */}
      <motion.button
        className="fixed top-6 right-6 z-30 p-3 rounded-full bg-white/20 dark:bg-gray-800/50 backdrop-blur-md border border-white/30 dark:border-gray-700/50"
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </motion.button>
      
      {/* Main content container */}
      <motion.div 
        className="relative z-20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          ref={cardRef}
          className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-float"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          variants={itemVariants}
        >
          {/* Logo and title */}
          <motion.div 
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="p-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-full shadow-lg">
              <FiCpu className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 mb-2">
              Smart Finance Hub
            </h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {isLogin 
                ? 'AI-powered financial insights await' 
                : 'Begin your intelligent finance journey'}
            </p>
          </motion.div>

          {/* Form with animated transitions */}
          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'signup'}
              className="space-y-6" 
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {error && (
                <motion.div 
                  className={`${isDarkMode 
                    ? 'bg-red-500/20 border-red-500/30 text-red-200' 
                    : 'bg-red-100 border-red-300 text-red-700'} 
                    border px-4 py-3 rounded-lg`}
                  variants={itemVariants}
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-4">
                {!isLogin && (
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={onChange}
                        onFocus={() => setFocusedInput('name')}
                        onBlur={() => setFocusedInput('')}
                        className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${isDarkMode 
                          ? 'border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 focus:ring-indigo-400 focus:border-indigo-400' 
                          : 'border-gray-300 placeholder-gray-500 text-gray-900 bg-white/50 focus:ring-indigo-400 focus:border-indigo-400'} 
                          rounded-lg focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all`}
                        placeholder="Your name"
                      />
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={onChange}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput('')}
                      className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${isDarkMode 
                        ? 'border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 focus:ring-indigo-400 focus:border-indigo-400' 
                        : 'border-gray-300 placeholder-gray-500 text-gray-900 bg-white/50 focus:ring-indigo-400 focus:border-indigo-400'} 
                        rounded-lg focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all`}
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={onChange}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput('')}
                      className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${isDarkMode 
                        ? 'border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 focus:ring-indigo-400 focus:border-indigo-400' 
                        : 'border-gray-300 placeholder-gray-500 text-gray-900 bg-white/50 focus:ring-indigo-400 focus:border-indigo-400'} 
                        rounded-lg focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all`}
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:from-indigo-600 hover:via-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                  <FiTrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>

              <motion.div 
                className="text-center pt-4"
                variants={itemVariants}
              >
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className={`font-medium ${isDarkMode 
                    ? 'text-indigo-400 hover:text-indigo-300' 
                    : 'text-indigo-600 hover:text-indigo-700'} 
                    transition-colors`}
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className={`mt-6 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}
          variants={itemVariants}
        >
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </motion.div>
      </motion.div>
      
      {/* Floating financial icons */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-indigo-400/30"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiDollarSign className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-sky-400/30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiTrendingUp className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-40 text-emerald-400/30"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiShield className="h-11 w-11" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-cyan-400/30"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiActivity className="h-9 w-9" />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSignup;