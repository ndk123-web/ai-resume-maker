import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  Trash2,
  MoreVertical,
  ChevronLeft,
  History,
} from "lucide-react";
import { themeContext } from "../../context/context";

const ChatHistory = ({
  chatHistory,
  currentChat,
  onChatSelect,
  onNewChat,
  theme,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    // In real app, call API to delete chat
    console.log("Delete chat:", chatId);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <motion.button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg ${
          theme === "dark"
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <History className="w-5 h-5" />
      </motion.button>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -300,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] w-80 z-50 flex flex-col border-r transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Chat History
            </h2>

            <button
              onClick={toggleSidebar}
              className={`lg:hidden p-1 rounded ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* New Chat Button */}
          <motion.button
            onClick={() => {
              onNewChat();
              setIsSidebarOpen(false);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </motion.button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistory.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare
                className={`w-12 h-12 mx-auto mb-4 ${
                  theme === "dark" ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No conversations yet
              </p>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="relative"
              >
                {/* Chat Item Container - Fixed to use div instead of nested buttons */}
                <div
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 group relative ${
                    currentChat?.id === chat.id
                      ? theme === "dark"
                        ? "bg-purple-900/50 border border-purple-700"
                        : "bg-purple-50 border border-purple-200"
                      : theme === "dark"
                      ? "hover:bg-gray-800 border border-transparent"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  {/* Main Chat Button - covers most of the area */}
                  <button
                    onClick={() => {
                      onChatSelect(chat);
                      setIsSidebarOpen(false);
                    }}
                    className="absolute inset-0 w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    style={{ zIndex: 1 }}
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium text-sm mb-1 truncate ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {chat.title}
                      </h3>
                      <p
                        className={`text-xs truncate ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {chat.preview}
                      </p>
                      <span
                        className={`text-xs mt-1 block ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {chat.timestamp}
                      </span>
                    </div>

                    {/* Dropdown Menu - positioned above the main button */}
                    <div className="relative" style={{ zIndex: 2 }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(
                            activeDropdown === chat.id ? null : chat.id
                          );
                        }}
                        className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 ${
                          theme === "dark"
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === chat.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className={`absolute right-0 top-8 w-32 py-1 rounded-lg shadow-lg border z-10 ${
                              theme === "dark"
                                ? "bg-gray-800 border-gray-700"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <button
                              onClick={(e) => handleDeleteChat(chat.id, e)}
                              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                                theme === "dark"
                                  ? "text-red-400 hover:bg-gray-700"
                                  : "text-red-600 hover:bg-gray-50"
                              }`}
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default ChatHistory;
