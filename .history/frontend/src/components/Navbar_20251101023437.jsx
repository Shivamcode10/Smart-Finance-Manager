// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { FiSun, FiMoon, FiBell, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = ({ onToggleTheme, theme = 'dark' }) => {
  const [query, setQuery] = useState('');

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-white/50 dark:bg-gray-800/60 rounded-full px-3 py-1 border border-gray-100 dark:border-gray-700 shadow-sm">
          <FiSearch className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions, goals..."
            className="ml-3 bg-transparent placeholder-slate-500 text-sm outline-none w-52"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <FiBell className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs bg-rose-500 text-white rounded-full">3</span>
        </button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 text-white shadow-md hover:brightness-105 transition"
        >
          {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;