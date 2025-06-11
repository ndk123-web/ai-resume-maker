import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App.jsx";

import { useContext } from "react";
import router from "./router/AppRouter.jsx";
import { RouterProvider } from "react-router-dom";
import { themeContext, ThemeProvider } from "./context/context.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </ThemeProvider>
);
