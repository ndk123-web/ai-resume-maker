import React, { useState, useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  FileText,
  Crown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux";
import { themeContext } from "../../context/context";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useContext(themeContext); // Your context
  const isAuth = useSelector((state) => state.auth.status);
  const username = useSelector((state) => state.auth.userData.username);
  const email = useSelector((state) => state.auth.userData.email);
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  // Handle sign out
  const handleSignOut = () => {
    dispatch(logout());
    setIsProfileOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logic for Storing theme in local storage for user preference
  useEffect(() => {
    localStorage.getItem("theme") === "dark"
      ? setTheme("dark")
      : setTheme("light");
  }, []);

  const navItems = [
    { name: "Home", href: "/home", icon: <Sparkles className="w-4 h-4" /> },
    {
      name: "Templates",
      href: "/templates",
      icon: <FileText className="w-4 h-4" />,
    },
    { name: "AI Builder", href: "/builder", icon: <Zap className="w-4 h-4" /> },
    { name: "Pricing", href: "/pricing", icon: <Crown className="w-4 h-4" /> },
  ];

  const location = useLocation();
  const path = location.pathname;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 border-b backdrop-blur-xl ${
        theme === "dark"
          ? path === "/auth"
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-900/80 border-gray-700/50"
          : path === "/auth"
          ? "bg-white border-gray-200"
          : "bg-white/80 border-gray-200/50"
      }`}
    >
      {/* Main container with proper constraints */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-2 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>

            <div className="hidden sm:block">
              <h1
                className={`text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
              >
                ResumeAI
              </h1>
              <p className="text-xs text-gray-500">Powered by AI</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                theme === "dark"
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Profile Avatar Dropdown - Only show on desktop */}
            {isAuth && (
              <div className="hidden md:block relative" ref={profileRef}>
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center space-x-2 p-1 pr-3 rounded-full transition-all duration-200 ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Default Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  {/* Username */}
                  <span
                    className={`text-sm font-medium truncate max-w-20 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {username || email || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    } ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                  />
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="py-2">
                        <motion.button
                          onClick={handleSignOut}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200 ${
                            theme === "dark"
                              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Sign Out</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Fixed overflow issues */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden w-full"
            >
              <div
                className={`py-4 space-y-2 border-t w-full ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full" // Ensure full width
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium truncate">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Sign Out Option */}
                {isAuth && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="w-full border-t pt-2 mt-2"
                  >
                    <div
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                        theme === "dark"
                          ? "text-gray-300 border-gray-700"
                          : "text-gray-600 border-gray-200"
                      }`}
                    >
                      {/* User Info */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {username || email ||  "User"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          theme === "dark"
                            ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
