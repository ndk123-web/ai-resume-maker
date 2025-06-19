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
  fetchCurrentSessionChats,
  addChats,
} from "../../redux";

import { createNewChatSession } from "../../api/createChatSession.js";
import { getChatResponse } from "../../api/getChatResponse.js";

import { v4 as uuid } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase/firebase";
import { useParams, useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { nav, u } from "framer-motion/client";

const Dashboard = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  // Redux State
  const currentSessionChats = useSelector(
    (state) => state.user_current_session_chats
  );
  const pageLoading = useSelector((state) => state.loading.pageLoading);
  const userHistory = useSelector((state) => state.user_chat_history);
  const isLoading = useSelector((state) => state.loading.loading);

  // console.log("Current Session Chats: ", currentSessionChats);
  // console.log("isArray : ?", Array.isArray(Object.values(currentSessionChats)));
  // console.log(
  //   "Current Session Chats Length: ",
  //   Object.values(currentSessionChats).length
  // );
  // console.log(
  //   "Current Session Chats Values: ",
  //   Object.values(currentSessionChats)
  // );

  // Actual Messages according to sessionId
  const [messages, setMessages] = useState([]);

  // To keep track of the current chat
  const [currentChat, setCurrentChat] = useState(null);

  // Need to fetch from API and need to store in redux
  const [chatHistory, setChatHistory] = useState([]);

  // context
  const { theme, setTheme } = useContext(themeContext);

  // // For setting the current sessionId
  // useEffect(() => {
  //   sessionId
  //     ? console.log("Session Id: ", sessionId)
  //     : console.log("No Session Id");

  //   dispatch(setCurrentSessionId({ sessionId }));
  // }, []);

  // For setting the theme
  // useEffect(() => {
  //   localStorage.getItem("theme") === "dark"
  //     ? setTheme("dark")
  //     : setTheme("light");
  // }, []);

  // For fetching the user chat history as well as the current session chats
  // useEffect(() => {

  //   // it means whenever any changes in auth then this will be executed
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const token = await user.getIdToken();
  //       console.log("User token:", token);

  //       const response = await dispatch(fetchUserChatHistory({ token })); // pass token if needed

  //       // fetch the user chat accorrding to sessionId and token
  //       if (sessionId) {
  //         setMessages([]); // clear the messages before fetching new session chats

  //         const response = await dispatch(
  //           fetchCurrentSessionChats({ token, sessionId })
  //         );
  //         console.log(
  //           "Response to fetchCurrentSessionChats:",
  //           response.payload.data
  //         );

  //         dispatch(
  //           addChats({
  //             chats: response.payload.data.map((item) =>
  //               typeof item === "string" ? JSON.parse(item) : item
  //             ),
  //           })
  //         );

  //         // this is the actual logic to show the messages according to sessionId to the ui
  //         response.payload.data.map((message) => {
  //           const userMessage = {
  //             id: message._id,
  //             type: "user",
  //             content: message.userPrompt,
  //             timestamp: new Date(message.createdAt).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //               hour12: true,
  //             }),
  //           };
  //           const aiMessage = {
  //             id: message.createdAt,
  //             type: "ai",
  //             content: message.userResponse,
  //             timestamp: new Date(message.updatedAt).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //               hour12: true,
  //             }),
  //           };
  //           setMessages((prev) => [...prev, userMessage, aiMessage]);
  //         });
  //       }

  //       dispatch(setUserChatHistory({ data: response.payload.data }));
  //       console.log("Response to fetchUserChatHistory:", response);

  //       // const backendResposne = await getChatResponse({ token });
  //       // console.log("Backend Response to verify-jwt:", backendResposne);

  //       // setting chat history in state
  //       setChatHistory(response.payload.data);
  //     } else {
  //       console.log("No user is signed in");
  //       // Redirect to login or handle anonymous state
  //     }
  //   });

  //   return () => unsubscribe(); // clean up the listener on unmount
  // }, [sessionId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        console.log("✅ Firebase Token: ", idToken);
        setToken(idToken); // Save token to local state
      } else {
        console.log("❌ No user is signed in");
        setToken(null);
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchHistory = async () => {
      try {
        const response = await dispatch(fetchUserChatHistory({ token }));
        console.log("✅ User Chat History Response:", response);
        dispatch(setUserChatHistory({ data: response.payload.data }));
        setChatHistory(response.payload.data); // for local state if needed
      } catch (error) {
        console.error("❌ Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, [token]);

  useEffect(() => {
    if (!token || !sessionId) return;

    const fetchSessionMessages = async () => {
      try {
        setMessages([]); // clear old messages first

        const response = await dispatch(
          fetchCurrentSessionChats({ token, sessionId })
        );
        const rawMessages = response.payload.data || [];

        console.log("✅ Session Messages: ", rawMessages);

        const parsedMessages = rawMessages.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );

        dispatch(addChats({ chats: parsedMessages }));

        // convert parsedMessages to frontend format
        const messageObjects = parsedMessages.flatMap((msg) => [
          {
            id: msg._id,
            type: "user",
            content: msg.userPrompt,
            timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          },
          {
            id: msg.createdAt,
            type: "ai",
            content: msg.userResponse,
            timestamp: new Date(msg.updatedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          },
        ]);

        setMessages(messageObjects);
      } catch (error) {
        console.error("❌ Error fetching session messages:", error);
      }
    };

    fetchSessionMessages();
  }, [token, sessionId]);

  // active chat even if reload the page
  useEffect(() => {
    if (sessionId) {
      setCurrentChat({ sessionId: sessionId });
    }
  }, [sessionId]);

  const handleSendMessage = async (message) => {
    dispatch(setLoading());

    const idToken = await auth.currentUser.getIdToken();
    if (!idToken) {
      alert("Can't get idToken");
      dispatch(unsetloading());
      return;
    }

    if (!sessionId) {
      const newSessionId = uuid();
      if (!newSessionId) {
        alert("Error creating new chat session");
        dispatch(unsetloading());
        return;
      }

      const backendResponse = await createNewChatSession(newSessionId, idToken);
      if (backendResponse.status !== 200 && backendResponse.status !== 201) {
        console.log("Error:", backendResponse.message);
        dispatch(unsetloading());
        return;
      }

      dispatch(setCurrentSessionId({ currentSessionId: newSessionId }));

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

      const backendAiResponse = await getChatResponse({
        token: idToken,
        prompt: message,
        sessionId: newSessionId,
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: backendAiResponse.data.data.cloudFileUrl
          ? `📄 PDF Link: ${backendAiResponse.data.data.cloudFileUrl}\n🧠 AI Response: ${backendAiResponse.data.data.response}`
          : backendAiResponse.data.data.response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);

      dispatch(unsetloading());
      navigate(`/c/${newSessionId}`);
    } else {
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

      const backendResponse = await getChatResponse({
        token: idToken,
        prompt: message,
        sessionId: sessionId,
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: backendResponse.data.data.cloudFileUrl
          ? `📄 PDF Link: ${backendResponse.data.data.cloudFileUrl}\n🧠 AI Response: ${backendResponse.data.data.response}`
          : backendResponse.data.data.response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      dispatch(unsetloading());
      setCurrentChat(null);
    }
  };

  const handleNewChat = async () => {
    dispatch(setPageLoading());
    setCurrentChat(null);

    // when creating new chat, clear messages
    setMessages([]);

    // if (messages.length > 0) {
    //   const newSessionId = uuid();
    //   console.log("New Session ID: ", newSessionId);

    //   try {
    //     if (!auth.currentUser) {
    //       alert("User not logged in. Please login first.");
    //       dispatch(unsetPageLoading());
    //       return;
    //     }

    //     dispatch(setCurrentSessionId({ currentSessionId: newSessionId }));

    //     const idToken = await auth.currentUser.getIdToken();
    //     console.log("Current User ID Token: ", idToken);

    //     const backendResponse = await createNewChatSession(
    //       newSessionId,
    //       idToken
    //     );
    //     console.log("Backend Response: ", backendResponse);

    //     if (backendResponse.status !== 200 && backendResponse.status !== 201) {
    //       console.log(
    //         "Error creating new chat session: ",
    //         backendResponse.message
    //       );
    //       return;
    //     }

    //     setCurrentChat({ sessionId: newSessionId });
    //     // navigate(`/new-chat`);
    //   } catch (err) {
    //     alert(err.message);
    //   } finally {
    //     dispatch(unsetPageLoading());
    //     // setMessages([]);
    //   }
    // }else{
    //   navigate(`/new-chat`);
    // }

    navigate(`/new-chat`);

    dispatch(unsetPageLoading());
  };

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);

    // that was the issue for messages disappear after chat selection
    // In real app, load chat messages from API
    // setMessages([]);
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
          theme={theme}
          setCurrentChat={setCurrentChat}
          onNewChat={handleNewChat}
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
