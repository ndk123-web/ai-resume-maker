import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { themeContext } from "../../context/context";

const ResponsiveLayout = ({ children, sidebar, className = "" }) => {
  const { theme } = useContext(themeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } ${className}`}
    >
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        {sidebar && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{
              x: isMobile ? (sidebarOpen ? 0 : -300) : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] w-80 z-50 flex-shrink-0 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            } border-r ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {React.cloneElement(sidebar, {
              onToggle: () => setSidebarOpen(!sidebarOpen),
              isOpen: sidebarOpen,
            })}
          </motion.aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {React.cloneElement(children, {
            onSidebarToggle: () => setSidebarOpen(!sidebarOpen),
            isSidebarOpen: sidebarOpen,
            isMobile,
          })}
        </main>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
