import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Mic, Square } from "lucide-react";
import { themeContext } from "../../context/context";

const ChatInput = ({ onSendMessage, isLoading, theme }) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real app, implement voice recording
  };

  const handleFileUpload = () => {
    // In real app, implement file upload
    console.log("File upload clicked");
  };

  return (
    <div
      className={`border-t p-4 ${
        theme === "dark"
          ? "border-gray-700 bg-gray-900"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`flex items-end space-x-2 p-3 rounded-2xl border transition-all duration-200 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 focus-within:border-purple-500"
                : "bg-gray-50 border-gray-300 focus-within:border-purple-500"
            }`}
          >
            {/* File Upload Button */}
            <motion.button
              type="button"
              onClick={handleFileUpload}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Paperclip className="w-5 h-5" />
            </motion.button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your experience, skills, and target job..."
                rows={1}
                className={`w-full resize-none border-none outline-none bg-transparent text-sm placeholder-gray-500 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
                style={{ maxHeight: "120px" }}
                disabled={isLoading}
              />
            </div>

            {/* Voice Recording Button */}
            <motion.button
              type="button"
              onClick={toggleRecording}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isRecording
                  ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                  : theme === "dark"
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
            >
              <motion.div
                animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
              >
                {isRecording ? (
                  <Square className="w-5 h-5 fill-current" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>

            {/* Send Button */}
            <motion.button
              type="submit"
              disabled={!message.trim() || isLoading}
              whileHover={{ scale: message.trim() && !isLoading ? 1.05 : 1 }}
              whileTap={{ scale: message.trim() && !isLoading ? 0.95 : 1 }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                message.trim() && !isLoading
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Character count and tips */}
          <div className="flex justify-between items-center mt-2 px-2">
            <div className="flex space-x-4 text-xs">
              <span
                className={`${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Press Enter to send, Shift+Enter for new line
              </span>
            </div>

            <span
              className={`text-xs ${
                message.length > 1000
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              {message.length}/2000
            </span>
          </div>
        </form>

        {/* Quick Suggestions */}
        {!message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-3"
          >
            {[
              "I'm a software engineer with 5 years experience",
              "Help me create a marketing resume",
              "I need a CV for data science role",
            ].map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => setMessage(suggestion)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
