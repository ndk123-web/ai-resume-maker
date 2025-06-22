import React, { useState, useContext } from "react";
import { FileText, Sparkles, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { themeContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const TemplateSelector = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

  // Mock template data - replace with your actual template data
  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description:
        "Clean and contemporary design perfect for tech and creative roles",
      preview: "/api/placeholder/300/400", // Replace with actual template image
      gradient: "from-blue-500 to-purple-600",
      icon: <FileText size={24} />,
      category: "Professional",
      popular: true,
    },
    {
      id: "classic",
      name: "Classic Executive",
      description:
        "Traditional layout ideal for corporate and executive positions",
      preview: "/api/placeholder/300/400", // Replace with actual template image
      gradient: "from-green-500 to-teal-600",
      icon: <Sparkles size={24} />,
      category: "Executive",
      popular: false,
    },
    {
      id: "creative",
      name: "Creative Designer",
      description:
        "Bold and artistic template for designers and creative professionals",
      preview: "/api/placeholder/300/400", // Replace with actual template image
      gradient: "from-pink-500 to-orange-600",
      icon: <Eye size={24} />,
      category: "Creative",
      popular: true,
    },
  ];

  const handleTemplateSelect = (template) => {
    // Store selected template in localStorage
    console.log("Selected Template:", template);
    navigate("/builder");
  };

  return (
    <>
      <div
        className={`min-h-screen pt-16 transition-colors duration-300 mt-5 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
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
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume Template
            </span>
          </h2>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Select from our AI-optimized templates designed to pass ATS systems
            and impress recruiters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className={`relative group cursor-pointer rounded-3xl border backdrop-blur-sm transition-all duration-300 overflow-hidden transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up ${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:shadow-2xl hover:shadow-purple-500/10"
                  : "bg-white/50 border-gray-200/50 hover:bg-white/80 hover:shadow-2xl hover:shadow-purple-500/10"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Popular Badge */}
              {template.popular && (
                <div className="absolute top-4 right-4 z-20 animate-bounce">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ⭐ Popular
                  </span>
                </div>
              )}

              {/* Template Preview */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-transform duration-300 ${
                    hoveredTemplate === template.id ? "scale-110" : "scale-100"
                  }`}
                >
                  {/* Template Preview Placeholder - Replace with actual image */}
                  <div
                    className={`w-40 h-52 bg-white rounded-lg shadow-xl border-2 flex flex-col p-4 ${
                      hoveredTemplate === template.id
                        ? "shadow-2xl border-purple-300"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`h-3 rounded mb-2 bg-gradient-to-r ${template.gradient}`}
                    ></div>
                    <div className="h-2 bg-gray-400 rounded mb-1"></div>
                    <div className="h-2 bg-gray-400 rounded mb-4 w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-1 bg-gray-300 rounded"></div>
                      <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="h-1 bg-gray-300 rounded"></div>
                      <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                      <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    <div className="mt-auto">
                      <div
                        className={`h-1 rounded bg-gradient-to-r ${template.gradient} opacity-50`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredTemplate === template.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: hoveredTemplate === template.id ? 1 : 0.8,
                      opacity: hoveredTemplate === template.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use Template <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${template.gradient} flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {template.icon}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-gray-700/50 text-gray-300 border-gray-600 group-hover:bg-gray-700 group-hover:border-purple-500"
                          : "bg-gray-100/50 text-gray-600 border-gray-200 group-hover:bg-purple-50 group-hover:border-purple-300"
                      }`}
                    >
                      {template.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300">
                  {template.name}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {template.description}
                </p>

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-purple-500/25"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-purple-500/25"
                  } group-hover:animate-pulse`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateSelect(template);
                  }}
                >
                  Get Started
                  <ArrowRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      hoveredTemplate === template.id ? "translate-x-1" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            All templates are ATS-friendly and optimized for modern hiring
            systems
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default TemplateSelector;
