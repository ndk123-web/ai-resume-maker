import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const BrainThinkingLoader = ({ theme }) => (
  <div className="flex items-center space-x-3">
    <motion.div
      className="relative w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
      animate={{
        scale: [1, 1.1, 1],
        boxShadow: [
          "0 0 10px rgba(168, 85, 247, 0.3)",
          "0 0 20px rgba(168, 85, 247, 0.6)",
          "0 0 10px rgba(168, 85, 247, 0.3)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Brain className="w-4 h-4 text-white" />
      </motion.div>
    </motion.div>

    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className={`w-1.5 h-1.5 rounded-full ${
              theme === "dark" ? "bg-purple-400" : "bg-purple-500"
            }`}
          />
        ))}
      </div>
      <span
        className={`text-sm font-medium ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        AI is thinking...
      </span>
    </div>
  </div>
);

export default BrainThinkingLoader;
