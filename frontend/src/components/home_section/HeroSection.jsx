import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Brain,
  ArrowRight,
  Play,
  Star,
  Users,
  Download,
  Palette,
  CheckCircle,
  Trophy,
  Clock,
  Shield,
  Rocket,
  FileText,
  Eye,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { themeContext } from "../../context/context";

const HeroSection = () => {
  const { theme, setTheme } = useContext(themeContext);
    const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "50K+",
      label: "Happy Users",
    },
    {
      icon: <Download className="w-6 h-6" />,
      value: "100K+",
      label: "Resumes Created",
    },
    { icon: <Star className="w-6 h-6" />, value: "4.9", label: "Rating" },
  ];

  return (
    <>
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span
              className={`text-sm font-medium ${
                theme === "dark" ? "text-purple-300" : "text-purple-700"
              }`}
            >
              AI-Powered Resume Builder
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ">
            <span
              className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
            >
              Create Your
            </span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Dream Resume
            </span>
            <span
              className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
            >
              in Minutes
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Transform your career story into a professional, ATS-friendly resume
            using the power of artificial intelligence. No design skills
            required.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Start Building Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            className={`group flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 ${
              theme === "dark"
                ? "border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400"
                : "border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`p-6 rounded-2xl border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-700/50"
                  : "bg-gray-300/50 border-gray-200/50"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div
                className={
                  theme === "dark"
                    ? "flex items-center text-white justify-center mb-2"
                    : "flex items-center justify-center mb-2"
                }
              >
                {stat.icon}
              </div>
              <div
                className={`text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {stat.value}
              </div>
              <div
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>;
    </>
  )

};

export default HeroSection;