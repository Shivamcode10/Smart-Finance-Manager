import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Target,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Transactions", icon: <CreditCard size={20} />, path: "/transactions" },
    { name: "Goals", icon: <Target size={20} />, path: "/goals" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col justify-between transition-all duration-300">
      {/* Logo Section */}
      <div>
        <div className="flex items-center justify-center py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wide">
            Smart<span className="text-gray-800 dark:text-white">Finance</span>
          </h1>
        </div>

        {/* Menu Section */}
        <nav className="mt-6 space-y-2 px-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow"
                }`
              }
            >
              <span className="group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-6">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
          <PlusCircle size={20} />
          Add Transaction
        </button>

        <button className="w-full flex items-center justify-center gap-2 mt-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
