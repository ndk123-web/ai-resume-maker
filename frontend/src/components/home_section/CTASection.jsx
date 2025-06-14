import React, { useState, createContext, useContext , useEffect } from "react";
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

const CTASection = ({ theme }) => {
  const { setTheme } = useContext(themeContext);

  // useEffect(() => {
  //   localStorage.getItem("theme") === "dark"
  //     ? setTheme("dark")
  //     : setTheme("light");
  // }, []);
  
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-12 rounded-3xl border backdrop-blur-sm ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50"
                : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
            }`}
          >
            <h2
              className={`text-3xl md:text-5xl font-bold mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Ready to Transform
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Career?
              </span>
            </h2>
            <p
              className={`text-lg md:text-xl mb-8 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join thousands of professionals who have already boosted their
              careers with ResumeAI.
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Start Building Your Resume</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
