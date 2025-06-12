import React, { useContext } from "react";
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
import { themeContext } from "../../context/context";

import {
  HeroSection,
  FeatureSection,
  BenefitSection,
  TestiMonals,
  PriciingSection,
  CTASection,
} from "../../components/";

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



  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Container wrapper to prevent overflow */}
      <div className="w-full max-w-full">
        {/* Hero Section */}
        <div className="w-full overflow-x-hidden">
          <HeroSection theme={theme} stats={stats} />
        </div>

        {/* Features Section */}
        <div className="w-full overflow-x-hidden">
          <FeatureSection theme={theme} features={features} />
        </div>

        {/* Benefits Section */}
        <div className="w-full overflow-x-hidden">
          <BenefitSection theme={theme} benefits={benefits} />
        </div>

        {/* Testimonials Section */}
        <div className="w-full overflow-x-hidden">
          <TestiMonals theme={theme} testimonials={testimonials} />
        </div>

        {/* Pricing Section */}
        <div className="w-full overflow-x-hidden">
          <PriciingSection theme={theme} />
        </div>

        {/* CTA Section */}
        <div className="w-full overflow-x-hidden">
          <CTASection theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Home;
