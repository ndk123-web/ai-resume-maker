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
import { HeroSection } from "../../components/";

const PriciingSection = ( { theme , pricingPlans } ) => {

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
              className={`text-3xl md:text-5xl font-bold mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Simple, Transparent
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Choose the perfect plan for your needs. Start free, upgrade when
              you're ready.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 ${
                  plan.popular
                    ? theme === "dark"
                      ? "bg-gradient-to-b from-purple-900/50 to-gray-800/50 border-purple-500/50"
                      : "bg-gradient-to-b from-purple-50 to-white border-purple-200"
                    : theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/50 border-gray-200/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span
                      className={`text-4xl font-bold ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span
                        className={`${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105"
                      : theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PriciingSection;
