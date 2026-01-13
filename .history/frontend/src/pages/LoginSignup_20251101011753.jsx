import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiCreditCard, 
  FiPieChart, 
  FiLock, 
  FiMail, 
  FiUser, 
  FiArrowRight,
  FiShield,
  FiZap,
  FiActivity,
  FiDatabase,
  FiCpu,
  FiWifi,
  FiHexagon
} from 'react-icons/fi';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [focusedInput, setFocusedInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const { login, register, isAuthenticated, error } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        login({ email, password });
      } else {
        register({ name, email, password });
      }
      setIsLoading(false);
    }, 2000);
  };

  // Advanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateZ: 5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateZ: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -100, rotateY: -90 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      x: 100, 
      rotateY: 90,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      rotateZ: [0, -2, 2, 0],
      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    tap: { 
      scale: 0.95,
      rotateZ: -5
    },
    loading: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity
      }
    }
  };

  const floatingIcons = [
    { icon: FiDollarSign, color: 'text-cyan-400', size: 'h-8 w-8', delay: 0 },
    { icon: FiTrendingUp, color: 'text-magenta-400', size: 'h-10 w-10', delay: 0.5 },
    { icon: FiCreditCard, color: 'text-yellow-400', size: 'h-9 w-9', delay: 1 },
    { icon: FiPieChart, color: 'text-purple-400', size: 'h-7 w-7', delay: 1.5 },
    { icon: FiShield, color: 'text-pink-400', size: 'h-11 w-11', delay: 2 },
    { icon: FiZap, color: 'text-blue-400', size: 'h-6 w-6', delay: 2.5 },
    { icon: FiActivity, color: 'text-green-400', size: 'h-8 w-8', delay: 3 },
    { icon: FiDatabase, color: 'text-orange-400', size: 'h-10 w-10', delay: 3.5 },
    { icon: FiCpu, color: 'text-red-400', size: 'h-9 w-9', delay: 4 },
    { icon: FiWifi, color: 'text-indigo-400', size: 'h-7 w-7', delay: 4.5 },
    { icon: FiHexagon, color: 'text-teal-400', size: 'h-8 w-8', delay: 5 },
  ];

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Multi-layer animated background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-magenta-900 to-cyan-900 animate-pulse" />
        
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/20 via-transparent to-cyan-900/30 animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/30 via-transparent to-purple-900/20 animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/20 via-transparent to-green-900/20 animate-pulse" 
             style={{ animationDelay: '3s', animationDuration: '6s' }} />
      </div>
      
      {/* Particle system */}
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
              y: [0, -Math.random() * 200 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [1, Math.random() * 2 + 0.5, 1],
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
      
      {/* Animated geometric shapes */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 border-4 border-cyan-400/30 rounded-full"
          animate={{ 
            rotate: 360, 
            scale: [1, 1.3, 1],
            borderRadius: ['50%', '30%', '50%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-32 right-16 w-32 h-32 border-4 border-magenta-400/30"
          animate={{ 
            rotate: -360, 
            scale: [1, 0.7, 1],
            borderRadius: ['0%', '50%', '0%']
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-32 w-48 h-48 border-4 border-yellow-400/30"
          animate={{ 
            rotate: 180, 
            scale: [1, 1.2, 1],
            borderRadius: ['20%', '50%', '20%']
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-40 w-36 h-36 border-4 border-purple-400/30 rounded-full"
          animate={{ 
            rotate: -180, 
            scale: [1, 0.8, 1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Floating financial icons */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className={`absolute ${item.color} opacity-60`}
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, Math.random() * 360, 0],
                scale: [1, Math.random() * 0.5 + 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                delay: item.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Icon className={`${item.size}`} />
            </motion.div>
          );
        })}
      </div>
      
      {/* Main content container with 3D effect */}
      <motion.div 
        ref={containerRef}
        className="relative z-20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01}deg) rotateX(${-mousePosition.y * 0.01}deg)`,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div 
          className={`relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30 overflow-hidden ${isHovering ? 'animate-glowPulse' : ''}`}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)"
          }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Logo with advanced animation */}
          <motion.div 
            className="flex justify-center mb-6 relative z-10"
            variants={itemVariants}
          >
            <motion.div 
              className="p-4 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 rounded-full shadow-lg"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
                borderRadius: ['50%', '30%', '50%']
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear",
                borderRadius: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <FiDollarSign className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Futuristic title with glitch effect */}
          <motion.div 
            className="text-center mb-6 relative z-10"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-yellow-400 mb-2"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {isLogin ? 'NEXUS' : 'EVOLVE'}
            </motion.h1>
            <motion.p 
              className="text-white/80 text-sm"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isLogin ? 'Quantum Finance Portal' : 'Initialize Your Journey'}
            </motion.p>
          </motion.div>

          {/* Mode toggle with advanced animation */}
          <motion.div 
            className="flex p-1 bg-white/10 rounded-2xl mb-6 relative z-10 backdrop-blur-md"
            variants={itemVariants}
          >
            <motion.div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 rounded-xl"
              animate={{ 
                x: isLogin ? 0 : '50%',
                width: '50%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <motion.button
              className="flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative z-10"
              animate={{ color: isLogin ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(true)}
            >
              ACCESS
            </motion.button>
            <motion.button
              className="flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative z-10"
              animate={{ color: !isLogin ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' }}
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
                  animate={{ 
                    x: [0, -10, 10, 0],
                    backgroundColor: ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.2)']
                  }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-4">
                {!isLogin && (
                  <motion.div variants={itemVariants} className="relative group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                    />
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
                      className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'name' || name ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/20 bg-white/5'} placeholder-transparent text-white backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all z-10`}
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-4 transition-all ${focusedInput === 'name' || name ? 'text-xs top-2 text-cyan-400' : 'text-sm top-4 text-white/60'} pointer-events-none z-10`}
                    >
                      IDENTITY
                    </label>
                    <motion.div 
                      className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10"
                      animate={{ 
                        rotate: focusedInput === 'name' ? 360 : 0,
                        scale: focusedInput === 'name' ? 1.2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiUser className={`h-5 w-5 transition-colors ${focusedInput === 'name' || name ? 'text-cyan-400' : 'text-white/40'}`} />
                    </motion.div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="relative group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-magenta-500 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                  />
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
                    className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'email' || email ? 'border-magenta-400 bg-magenta-400/10' : 'border-white/20 bg-white/5'} placeholder-transparent text-white backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-magenta-400/50 focus:border-transparent transition-all z-10`}
                    placeholder="Email address"
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 transition-all ${focusedInput === 'email' || email ? 'text-xs top-2 text-magenta-400' : 'text-sm top-4 text-white/60'} pointer-events-none z-10`}
                  >
                    NEXUS ID
                  </label>
                  <motion.div 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10"
                    animate={{ 
                      rotate: focusedInput === 'email' ? 360 : 0,
                      scale: focusedInput === 'email' ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiMail className={`h-5 w-5 transition-colors ${focusedInput === 'email' || email ? 'text-magenta-400' : 'text-white/40'}`} />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="relative group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                  />
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
                    className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'password' || password ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/20 bg-white/5'} placeholder-transparent text-white backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all z-10`}
                    placeholder="Password"
                  />
                  <label 
                    htmlFor="password" 
                    className={`absolute left-4 transition-all ${focusedInput === 'password' || password ? 'text-xs top-2 text-yellow-400' : 'text-sm top-4 text-white/60'} pointer-events-none z-10`}
                  >
                    SECURITY KEY
                  </label>
                  <motion.div 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10"
                    animate={{ 
                      rotate: focusedInput === 'password' ? 360 : 0,
                      scale: focusedInput === 'password' ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiLock className={`h-5 w-5 transition-colors ${focusedInput === 'password' || password ? 'text-yellow-400' : 'text-white/40'}`} />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 hover:from-cyan-600 hover:via-magenta-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50 transition-all shadow-lg"
                  variants={buttonVariants}
                  animate={isLoading ? "loading" : "visible"}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FiCpu className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <span className="mr-2">{isLogin ? 'INITIALIZE' : 'MANIFEST'}</span>
                      <FiArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
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
                    whileHover={{ 
                      scale: 1.05, 
                      x: 10,
                      color: '#ffffff'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← RECOVER ACCESS
                  </motion.button>
                )}
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-white/80 hover:text-white transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    color: '#ffffff'
                  }}
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
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p>QUANTUM ENCRYPTION PROTECTED • TERMS • PRIVACY</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;