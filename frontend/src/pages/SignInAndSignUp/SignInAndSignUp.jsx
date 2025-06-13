import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
} from "lucide-react";
import { themeContext } from "../../context/context";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux";

import app from "../../firebase/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";

const AuthPages = () => {
  const { theme, setTheme } = useContext(themeContext);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.status);

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);

  // Form states
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    localStorage.getItem("theme") === "dark"
      ? setTheme("dark")
      : setTheme("light");
  }, []);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", signUpData);
    console.log("isAuth: ", isAuth);

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );

      const user = response.user;

      // Dispatch login with user info
      dispatch(
        login({
          username: user.displayName || signUpData.fullName || signInData.email,
          email: user.email,
        })
      );

      // Navigate after login state is updated
      navigate("/builder");
    } catch (err) {
      alert(err.message);
      navigate("/auth"); // Only on error
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  const handleSignInChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUpChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign In Data:", signInData);
    // Handle sign in logic here

    if (!signInData.email || !signInData.password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      console.log("Sign In Response:", response);

      const user = response.user;

      dispatch(
        login({
          username: user.displayName || signInData.email ,
          email: user.email,
        })
      );

      navigate("/builder");
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  const handleSignUpWithGoogle = () => {
    // Handle sign up with Google logic here
  };

  const handleSignInWithGoogle = () => {
    // Handle sign in with Google logic here
  };

  const handleSignInWithGithub = () => {
    // Handle sign in with Github logic here
  };

  const handleSignInWithChrome = () => {
    // Handle sign in with Chrome logic here
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full z-10 transition-all duration-200 ${
          theme === "dark"
            ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-lg shadow-gray-900/50"
            : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg shadow-gray-200/50"
        }`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo Section */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ResumeAI
                </h1>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Powered by AI
                </p>
              </div>
            </div>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            className={`rounded-2xl p-8 shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800/80 border-gray-700/50 shadow-gray-900/50"
                : "bg-white/80 border-gray-200/50 shadow-gray-200/50"
            }`}
            layout
          >
            {/* Toggle Buttons */}
            <div
              className={`flex rounded-xl p-1 mb-6 ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
              }`}
            >
              <motion.button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !isSignUp
                    ? theme === "dark"
                      ? "bg-white text-gray-900 shadow-md"
                      : "bg-white text-gray-900 shadow-md"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isSignUp
                    ? theme === "dark"
                      ? "bg-white text-gray-900 shadow-md"
                      : "bg-white text-gray-900 shadow-md"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {!isSignUp ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2
                    className={`text-2xl font-bold mb-6 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Welcome back!
                  </h2>

                  <form onSubmit={handleSignInSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="email"
                          name="email"
                          value={signInData.email}
                          onChange={handleSignInChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            theme === "dark"
                              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={signInData.password}
                          onChange={handleSignInChange}
                          className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            theme === "dark"
                              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-gray-200"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={signInData.rememberMe}
                          onChange={handleSignInChange}
                          className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span
                          className={`ml-2 text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Remember me
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-purple-600 hover:text-purple-500 font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Sign In Button */}
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2
                    className={`text-2xl font-bold mb-6 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Create your account
                  </h2>

                  <form onSubmit={handleSignUpSubmit} className="space-y-4">
                    {/* Full Name Field */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="text"
                          name="fullName"
                          value={signUpData.fullName}
                          onChange={handleSignUpChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            theme === "dark"
                              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="email"
                          name="email"
                          value={signUpData.email}
                          onChange={handleSignUpChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            theme === "dark"
                              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={signUpData.password}
                          onChange={handleSignUpChange}
                          className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            theme === "dark"
                              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Create a password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-gray-200"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={signUpData.confirmPassword}
                          onChange={handleSignUpChange}
                          className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            theme === "dark"
                              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-gray-200"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={signUpData.agreeToTerms}
                        onChange={handleSignUpChange}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 mt-1"
                        required
                      />
                      <span
                        className={`ml-2 text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        I agree to the{" "}
                        <button
                          type="button"
                          className="text-purple-600 hover:text-purple-500 font-medium"
                        >
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="text-purple-600 hover:text-purple-500 font-medium"
                        >
                          Privacy Policy
                        </button>
                      </span>
                    </div>

                    {/* Sign Up Button */}
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className={`px-2 ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-400"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  className={`w-full inline-flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                      : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-5 h-5" />
                  <span className="ml-2">GitHub</span>
                </motion.button>

                <motion.button
                  type="button"
                  className={`w-full inline-flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                      : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Chrome className="w-5 h-5" />
                  <span className="ml-2">Google</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPages;
