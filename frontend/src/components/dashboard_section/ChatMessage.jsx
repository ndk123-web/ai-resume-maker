import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bot,
  Copy,
  Check,
  Download,
  Edit,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Loader } from "../";

const ChatMessage = ({ message, theme }) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const isUser = message.type === "user";
  const isLoading = message.isLoading;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    // In real app, send feedback to API
    console.log("Feedback:", type, "for message:", message.id);
  };

  const handleEdit = () => {
    // In real app, allow editing of user messages
    console.log("Edit message:", message.id);
  };

  const handleDownload = () => {
    // In real app, download resume/content
    console.log("Download content");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-4 ${
        isUser ? "flex-row-reverse space-x-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-purple-600"
            : theme === "dark"
            ? "bg-gray-700"
            : "bg-gray-200"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot
            className={`w-4 h-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          />
        )}
      </motion.div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? "text-right" : ""}`}>
        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`inline-block p-4 rounded-2xl max-w-full ${
            isUser
              ? "bg-purple-600 text-white rounded-br-md"
              : theme === "dark"
              ? "bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700"
              : "bg-white text-gray-900 rounded-bl-md border border-gray-200 shadow-sm"
          }`}
        >
          {/* Chat Loader */}
          {isLoading ? (
            <Loader theme={theme} />
          ) : (
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>
          )}
        </motion.div>

        {/* Message Actions */}
        {!isLoading && (
          <div
            className={`flex items-center mt-2 space-x-2 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {message.timestamp}
            </span>

            <div className="flex items-center space-x-1">
              {/* Copy Button */}
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-1 rounded transition-colors ${
                  theme === "dark"
                    ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
                title="Copy message"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </motion.button>

              {/* Edit Button (for user messages) */}
              {isUser && (
                <motion.button
                  onClick={handleEdit}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 rounded transition-colors ${
                    theme === "dark"
                      ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Edit message"
                >
                  <Edit className="w-3 h-3" />
                </motion.button>
              )}

              {/* Download Button (for AI messages with resume content) */}
              {!isUser && message?.content?.length > 200 && (
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 rounded transition-colors ${
                    theme === "dark"
                      ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Download resume"
                >
                  <Download className="w-3 h-3" />
                </motion.button>
              )}

              {/* Feedback Buttons (for AI messages) */}
              {!isUser && (
                <div className="flex items-center space-x-1 ml-2">
                  <motion.button
                    onClick={() => handleFeedback("up")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-1 rounded transition-colors ${
                      feedback === "up"
                        ? "text-green-500 bg-green-50 dark:bg-green-900/20"
                        : theme === "dark"
                        ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Good response"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </motion.button>

                  <motion.button
                    onClick={() => handleFeedback("down")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-1 rounded transition-colors ${
                      feedback === "down"
                        ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                        : theme === "dark"
                        ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Poor response"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
