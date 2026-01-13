import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiDollarSign, FiTrendingUp, FiShield, FiZap, FiCode, FiCpu } from 'react-icons/fi';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [focusedInput, setFocusedInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { login, register, isAuthenticated, error } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, z: -100 },
    visible: {
      opacity: 1,
      z: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      z: -100,
      rotateY: 90,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      rotateZ: [0, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const tabVariants = {
    active: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#ffffff",
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(102, 126, 234, 0.4)",
    },
    inactive: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "rgba(255, 255, 255, 0.6)",
      scale: 1,
    },
  };

  // Particle effect
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated gradient background with multiple layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/30 via-transparent to-cyan-900/30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/20 via-transparent to-purple-900/20 animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />
      </div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 z-0 overflow-hidden">
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
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Animated geometric shapes */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 border-4 border-cyan-400/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 border-4 border-purple-400/20"
          animate={{ rotate: -360, scale: [1, 0.8, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 border-4 border-pink-400/20 rounded-lg"
          animate={{ rotate: 180, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Floating tech icons */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-32 left-32 text-cyan-300/30"
          animate={{ y: [0, -40, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        >
          <FiCpu className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute top-48 right-32 text-purple-300/30"
          animate={{ y: [0, -30, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        >
          <FiCode className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-48 text-pink-300/30"
          animate={{ y: [0, -35, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        >
          <FiZap className="h-11 w-11" />
        </motion.div>
      </div>
      
      {/* Main content */}
      <motion.div 
        className="relative z-20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 overflow-hidden animate-float"
          variants={itemVariants}
          whileHover={{ scale: 1.02, rotateX: 5 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Logo with animation */}
          <motion.div 
            className="flex justify-center mb-6 relative z-10"
            variants={itemVariants}
          >
            <motion.div 
              className="p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <FiDollarSign className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Futuristic title */}
          <motion.div 
            className="text-center mb-6 relative z-10"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              {isLogin ? 'NEXUS' : 'EVOLVE'}
            </h1>
            <p className="text-white/70 text-sm">
              {isLogin ? 'Quantum Finance Portal' : 'Initialize Your Journey'}
            </p>
          </motion.div>

          {/* Tab Toggle */}
          <motion.div 
            className="flex p-1 bg-white/5 rounded-2xl mb-6 relative z-10"
            variants={itemVariants}
          >
            <motion.button
              className="flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all"
              variants={tabVariants}
              animate={isLogin ? 'active' : 'inactive'}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(true)}
            >
              ACCESS
            </motion.button>
            <motion.button
              className="flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all"
              variants={tabVariants}
              animate={!isLogin ? 'active' : 'inactive'}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(false)}
            >
              CREATE
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'signup'}
              className="space-y-5 relative z-10" 
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {error && (
                <motion.div 
                  className="bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-200 px-4 py-3 rounded-xl"
                  variants={itemVariants}
                  animate={{ x: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-4">
                {!isLogin && (
                  <motion.div variants={itemVariants} className="relative group">
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
                      className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'name' || name ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/20 bg-white/5'} placeholder-transparent text-white backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all`}
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-4 transition-all ${focusedInput === 'name' || name ? 'text-xs top-2 text-cyan-400' : 'text-sm top-4 text-white/60'} pointer-events-none`}
                    >
                      IDENTITY
                    </label>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <FiUser className={`h-5 w-5 transition-colors ${focusedInput === 'name' || name ? 'text-cyan-400' : 'text-white/40'}`} />
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="relative group">
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
                    className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'email' || email ? 'border-purple-400 bg-purple-400/10' : 'border-white/20 bg-white/5'} placeholder-transparent text-white backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all`}
                    placeholder="Email address"
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 transition-all ${focusedInput === 'email' || email ? 'text-xs top-2 text-purple-400' : 'text-sm top-4 text-white/60'} pointer-events-none`}
                  >
                    NEXUS ID
                  </label>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <FiMail className={`h-5 w-5 transition-colors ${focusedInput === 'email' || email ? 'text-purple-400' : 'text-white/40'}`} />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="relative group">
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
                    className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'password' || password ? 'border-pink-400 bg-pink-400/10' : 'border-white/20 bg-white/5'} placeholder-transparent text-white backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all`}
                    placeholder="Password"
                  />
                  <label 
                    htmlFor="password" 
                    className={`absolute left-4 transition-all ${focusedInput === 'password' || password ? 'text-xs top-2 text-pink-400' : 'text-sm top-4 text-white/60'} pointer-events-none`}
                  >
                    SECURITY KEY
                  </label>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <FiLock className={`h-5 w-5 transition-colors ${focusedInput === 'password' || password ? 'text-pink-400' : 'text-white/40'}`} />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50 transition-all animate-glowPulse shadow-lg"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="mr-2">{isLogin ? 'INITIALIZE' : 'MANIFEST'}</span>
                  <FiArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>

              <motion.div 
                className="text-center pt-4 relative z-10"
                variants={itemVariants}
              >
                {isLogin && (
                  <motion.button
                    type="button"
                    className="block w-full text-sm text-white/60 hover:text-white/80 transition-colors mb-2"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← RECOVER ACCESS
                  </motion.button>
                )}
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin
                    ? "NEW TO NEXUS? → CREATE IDENTITY"
                    : 'EXISTING USER? → ACCESS PORTAL'}
                </motion.button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center text-white/60 text-xs"
          variants={itemVariants}
        >
          <p>QUANTUM ENCRYPTION PROTECTED • TERMS • PRIVACY</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;