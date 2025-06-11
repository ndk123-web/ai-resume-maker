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

const Home = () => {
  const { theme, setTheme } = useContext(themeContext);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Generation",
      description:
        "Advanced AI analyzes your input and creates tailored, professional resume content in seconds.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Smart Templates",
      description:
        "Choose from industry-specific templates that automatically adapt to your profession and experience level.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Preview",
      description:
        "See your resume come to life instantly as you make changes, with live preview and instant feedback.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

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

  const benefits = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "ATS-Optimized Templates",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Professional Formatting",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Industry-Specific Content",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Real-time Collaboration",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Multiple Export Formats",
    },
    { icon: <CheckCircle className="w-5 h-5" />, text: "24/7 AI Assistant" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=64&h=64&fit=crop&crop=face",
      content:
        "ResumeAI helped me land my dream job at Google. The AI suggestions were spot-on!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Meta",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      content:
        "The templates are beautiful and the AI writing assistance is incredibly helpful.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "Tesla",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content:
        "I got 3x more interview calls after using ResumeAI. Highly recommended!",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1 Resume",
        "3 Templates",
        "PDF Export",
        "Basic AI Assistance",
      ],
      popular: false,
      gradient: "from-gray-500 to-gray-600",
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      features: [
        "Unlimited Resumes",
        "50+ Templates",
        "All Export Formats",
        "Advanced AI",
        "Priority Support",
      ],
      popular: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Team",
      price: "$19.99",
      period: "month",
      features: [
        "Everything in Pro",
        "Team Collaboration",
        "Custom Branding",
        "Analytics Dashboard",
        "API Access",
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
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
                <h3 className={`text-xl font-bold mb-4 block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent `}>{feature.title}</h3>
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

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-3xl md:text-5xl font-bold mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Everything You Need to
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Land Your Dream Job
                </span>
              </h2>
              <p
                className={`text-lg mb-8 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Our comprehensive platform provides all the tools and features
                you need to create professional, ATS-optimized resumes that get
                results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="text-green-500">{benefit.icon}</div>
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`p-8 rounded-3xl border backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/50 border-gray-200/50"
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <div>
                      <div className="h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded w-32 mb-2"></div>
                      <div
                        className={`h-3 rounded w-24 ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div
                      className={`h-3 rounded w-full ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`h-3 rounded w-3/4 ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`h-3 rounded w-1/2 ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Loved by
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                50,000+ Users
              </span>
            </h2>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              See what our users are saying about their experience with
              ResumeAI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-8 rounded-3xl border backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/50 border-gray-200/50"
                }`}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p
                  className={`mb-6 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className={`font-semibold ${theme === 'dark' ? "text-gray-300" : "text-gray-600"}`}>{testimonial.name}</div>
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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

      {/* CTA Section */}
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
    </div>
  );
};

export default Home;
