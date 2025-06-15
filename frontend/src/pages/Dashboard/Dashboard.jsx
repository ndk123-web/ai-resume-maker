import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { ChatHistory, ChatInput, ChatMessage, Loader } from "../../components/";

import { themeContext } from "../../context/context";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  unsetloading,
  setChatLoading,
  unsetChatLoading,
  setCurrentSessionId,
  setPageLoading,
  unsetPageLoading,
  fetchUserChatHistory,
  setUserChatHistory,
} from "../../redux";

import { createNewChatSession } from "../../api/createChatSession.js";

import { v4 as uuid } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase/firebase";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { sessionId } = useParams();

  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const auth = getAuth(app);
  const pageLoading = useSelector((state) => state.loading.pageLoading);
  const userHistory = useSelector((state) => state.user_chat_history);

  // Need to fetch from API and need to store in redux
  const [chatHistory, setChatHistory] = useState([]);

  // context
  const { theme, setTheme } = useContext(themeContext);
  // Redux State and Actions

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.loading);
  // console.log("isLoading:", isLoading);

  // console.log("currentSessionId:", currentSessionId);
  useEffect(() => {
    sessionId
      ? console.log("Session Id: ", sessionId)
      : console.log("No Session Id");

    dispatch(setCurrentSessionId({ sessionId }));
  }, []);

  useEffect(() => {
    localStorage.getItem("theme") === "dark"
      ? setTheme("dark")
      : setTheme("light");
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log("User token:", token);

        const response = await dispatch(fetchUserChatHistory({ token })); // pass token if needed

        dispatch(setUserChatHistory({ data: response.payload.data }));
        console.log("Response:", response);

        // setting chat history in state
        setChatHistory(response.payload.data);
      } else {
        console.log("No user is signed in");
        // Redirect to login or handle anonymous state
      }
    });

    return () => unsubscribe(); // clean up the listener on unmount
  }, []);

  const handleSendMessage = async (message) => {
    console.log("Loading State should start: ", isLoading);

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    
    dispatch(setLoading());

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content:
          "I'll help you create an amazing resume! Let me gather some information about your experience and skills to craft the perfect resume for you.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      dispatch(unsetloading());
      console.log("Loading State should end: ", isLoading);
    }, 1500);
  };

  const handleNewChat = async () => {
    dispatch(setPageLoading());

    const newSessionId = uuid();
    console.log("New Session ID: ", newSessionId);

    try {
      dispatch(setCurrentSessionId({ currentSessionId: newSessionId }));

      const idToken = await auth.currentUser.getIdToken();

      console.log("Current User ID Token: ", idToken);

      const backendResponse = await createNewChatSession(newSessionId, idToken);
      console.log("Backend Response: ", backendResponse);

      if (backendResponse.status !== 200 && backendResponse.status !== 201) {
        console.log(
          "Error creating new chat session: ",
          backendResponse.message
        );
        return;
      }

      setMessages([]);
      setCurrentChat(null);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(unsetPageLoading());
    }
  };

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    // In real app, load chat messages from API
    setMessages([]);
  };

  return (
    <div
      className={`min-h-screen pt-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Chat History */}
        <ChatHistory
          chatHistory={chatHistory}
          currentChat={currentChat}
          onChatSelect={handleChatSelect}
          onNewChat={handleNewChat}
          theme={theme}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6"
                >
                  <span className="text-2xl">✨</span>
                </motion.div>

                <h2
                  className={`text-2xl lg:text-3xl font-bold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  AI Resume Builder
                </h2>

                <p
                  className={`text-lg mb-8 leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Tell me about your experience, skills, and the job you're
                  targeting. I'll create a professional resume tailored just for
                  you!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                  {[
                    "Create a software engineer resume",
                    "Build a marketing manager CV",
                    "Generate a data scientist resume",
                    "Make a creative designer portfolio",
                  ].map((suggestion, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendMessage(suggestion)}
                      className={`p-4 rounded-xl text-left transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
                          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <span className="text-sm font-medium">{suggestion}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    theme={theme}
                  />
                ))}
                {isLoading && (
                  <ChatMessage
                    message={{
                      id: "loading",
                      type: "ai",
                      content: "typing...",
                      timestamp: "now",
                      isLoading: true,
                    }}
                    theme={theme}
                  />
                )}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
