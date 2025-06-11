import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const TestiMonals = ({ theme, testimonials }) => {
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
                    <div
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {testimonial.name}
                    </div>
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
    </>
  );
};

export default TestiMonals;
