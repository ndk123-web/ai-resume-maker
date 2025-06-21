import React, { useContext, useEffect, useState } from "react";
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
  FileText,
  CheckCircle,
} from "lucide-react";
import { Loader } from "../";

const ChatMessage = ({ message, theme }) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [fileSize, setFileSize] = useState(null);
  const isUser = message.type === "user";
  const isLoading = message.isLoading;

  // For Showing file size before download
  // We r just using HEAD request , not the entire file so no need to worry about performance
  useEffect(() => {
    if (message.cloudFileUrl && !isUser) {
      const fetchFileSize = async () => {
        try {
          const response = await fetch(message.cloudFileUrl, {
            method: "HEAD", // Use HEAD to get headers without downloading the file
          });
          const contentLength = response.headers.get("content-length");
          if (contentLength) {
            setFileSize(parseInt(contentLength));
          } else {
            setFileSize(null); // If no content-length, set to null
          }
        } catch (error) {
          console.error("Failed to fetch file size:", error);
          setFileSize(null);
        }
      };
      fetchFileSize();
    }
  }, [message, isUser]);

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

  const handleDownload = async () => {
    if (isDownloading || downloadComplete) return;

    setIsDownloading(true);

    try {
      // Get the file from the cloud URL
      const response = await fetch(message.cloudFileUrl);

      // Get file size from response headers
      const contentLength = response.headers.get("content-length");
      if (contentLength) {
        setFileSize(parseInt(contentLength));
      }

      console.log("Content-Length:", contentLength);

      // convert the response to a Blob
      const blob = await response.blob();

      // If content-length wasn't available, get size from blob
      if (!contentLength) {
        setFileSize(blob.size);
      }

      // Create a temporary URL for the Blob and trigger download
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = message.fileName || "Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setIsDownloading(false);
      setDownloadComplete(true);

      // Reset download complete state after 3 seconds
      setTimeout(() => setDownloadComplete(false), 3000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
    }
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size";
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
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
            <div className="prose prose-sm max-w-none break-words whitespace-pre-wrap overflow-x-auto">
              {message.cloudFileUrl && !isUser ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className={`w-full max-w-sm sm:max-w-md p-4 rounded-xl border shadow-lg mt-2 relative overflow-hidden
                    ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 text-white"
                        : "bg-gradient-to-br from-white to-gray-50 border-gray-200 text-gray-800"
                    }`}
                >
                  {/* File Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{
                        rotate: downloadComplete ? 360 : 0,
                        scale: downloadComplete ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`p-2 rounded-lg ${
                        downloadComplete
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-purple-100 dark:bg-purple-900/30"
                      }`}
                    >
                      {downloadComplete ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {downloadComplete ? "Downloaded!" : "Resume Ready!"}
                      </p>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {downloadComplete
                          ? "File saved successfully"
                          : message.fileName || "Resume.pdf"}
                      </p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.button
                    onClick={handleDownload}
                    disabled={isDownloading || downloadComplete}
                    whileHover={
                      !isDownloading && !downloadComplete ? { scale: 1.02 } : {}
                    }
                    whileTap={
                      !isDownloading && !downloadComplete ? { scale: 0.98 } : {}
                    }
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 relative overflow-hidden
                      ${
                        downloadComplete
                          ? "bg-green-500 text-white cursor-default"
                          : isDownloading
                          ? "bg-purple-400 text-white cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-md hover:shadow-lg"
                      }`}
                  >
                    {/* Loading overlay */}
                    {isDownloading && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-purple-500 opacity-30"
                      />
                    )}

                    <div className="flex items-center justify-center gap-2 relative z-10">
                      {downloadComplete ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Downloaded</span>
                        </>
                      ) : isDownloading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span className="hidden xs:inline">
                            Download Resume
                          </span>
                          <span className="xs:hidden">Download</span>
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* File size indicator */}
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      PDF Document
                    </span>
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      {formatFileSize(fileSize) || "Calculating..."}
                    </span>
                  </div>

                  {/* Subtle animation background */}
                  <motion.div
                    animate={{
                      opacity: [0.1, 0.2, 0.1],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className={`absolute inset-0 rounded-xl pointer-events-none ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-900/10 to-blue-900/10"
                        : "bg-gradient-to-r from-purple-100/30 to-blue-100/30"
                    }`}
                  />
                </motion.div>
              ) : (
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap overflow-x-auto">
                  {message.content}
                </p>
              )}
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
