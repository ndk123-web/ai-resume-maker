import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
} from "lucide-react";
import { themeContext } from "../../context/context";

const Footer = () => {
  const { theme } = useContext(themeContext);

  const footerLinks = {
    Product: [
      { name: "Features", href: "/features" },
      { name: "Templates", href: "/templates" },
      { name: "Pricing", href: "/pricing" },
      { name: "AI Assistant", href: "/ai-assistant" },
      { name: "Integrations", href: "/integrations" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/help" },
      { name: "Guides", href: "/guides" },
      { name: "Resume Examples", href: "/examples" },
      { name: "Career Tips", href: "/tips" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "navnath.kadam@vit.edu.in" },
    { icon: <Phone className="w-4 h-4" />, text: "9757382736" },
    { icon: <MapPin className="w-4 h-4" />, text: "Mumbai" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`border-t transition-all duration-300 w-full overflow-x-hidden ${
        theme === "dark"
          ? "bg-gray-900/98 border-gray-700/50"
          : "bg-white/80 border-gray-200/50"
      } backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-4 lg:mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="/" className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-8 lg:w-10 h-8 lg:h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                >
                  <Sparkles className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 lg:w-4 h-3 lg:h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </a>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ResumeAI
                </h1>
                <p className="text-xs lg:text-sm text-gray-500">
                  Powered by AI
                </p>
              </div>
            </motion.div>

            <p
              className={`mb-4 lg:mb-6 max-w-sm text-sm lg:text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Transform your career story into a professional, ATS-friendly
              resume using the power of artificial intelligence.
            </p>

            {/* Contact Info - Mobile: 2 columns, Desktop: 1 column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3 mb-4 lg:mb-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 lg:space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`p-1.5 lg:p-2 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-gray-800 text-purple-400"
                        : "bg-gray-100 text-purple-600"
                    }`}
                  >
                    {info.icon}
                  </div>
                  <span
                    className={`text-xs lg:text-sm truncate ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {info.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`p-1.5 lg:p-2 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={social.label}
                >
                  <div className="w-4 h-4 lg:w-5 lg:h-5">{social.icon}</div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links - Mobile: 2x2 grid, Desktop: 4 columns */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {Object.entries(footerLinks).map(
                ([category, links], categoryIndex) => (
                  <div key={category} className="min-w-0">
                    <motion.h3
                      className={`font-semibold mb-3 lg:mb-4 text-sm lg:text-base bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                    >
                      {category}
                    </motion.h3>
                    <ul className="space-y-2 lg:space-y-3">
                      {links.map((link, linkIndex) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: categoryIndex * 0.1 + linkIndex * 0.05,
                          }}
                        >
                          <a
                            href={link.href}
                            className={`text-xs lg:text-sm transition-all duration-200 hover:translate-x-1 block truncate ${
                              theme === "dark"
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {link.name}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`pt-6 lg:pt-8 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <motion.div
            className={`flex items-center justify-center sm:justify-start space-x-2 text-xs lg:text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-3 lg:w-4 h-3 lg:h-4 text-red-500 fill-current" />
            </motion.div>
            <span>by the ResumeAI team</span>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
            <motion.p
              className={`text-xs lg:text-sm text-center sm:text-left ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              © 2025 ResumeAI. All rights reserved.
            </motion.p>

            <motion.button
              onClick={scrollToTop}
              className={`flex items-center justify-center space-x-2 px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 self-center sm:self-auto ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <ArrowUp className="w-3 lg:w-4 h-3 lg:h-4" />
              <span>Back to top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
