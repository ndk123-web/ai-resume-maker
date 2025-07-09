import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";

import router from "./router/AppRouter.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/context.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/";

const localTheme = localStorage.getItem("theme");
if (localTheme === "dark") {
  document.getElementById("root").classList.add("dark");
} else {
  document.getElementById("root").classList.remove("dark");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
