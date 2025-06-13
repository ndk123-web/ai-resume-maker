import React, { useState, createContext, useContext , useEffect} from "react";
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
import { HeroSection } from "../../components/";

const FeatureSection = ({ theme, features }) => {
  const { setTheme } = useContext(themeContext);

  useEffect(() => {
    localStorage.getItem("theme") === "dark"
      ? setTheme("dark")
      : setTheme("light");
  }, []);

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={
                theme === "dark"
                  ? "text-gray-300 text-3xl md:text-5xl font-bold mb-6"
                  : "text-gray-600 text-3xl md:text-5xl font-bold mb-6"
              }
            >
              Powered by Advanced
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Technology
              </span>
            </h2>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our cutting-edge AI understands what employers want and helps you
              create resumes that get noticed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80"
                    : "bg-white/50 border-gray-200/50 hover:bg-white/80"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 text-white`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-4 block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent `}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
