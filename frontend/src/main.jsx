import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App.jsx";

import { useContext } from "react";
import router from "./router/AppRouter.jsx";
import { RouterProvider } from "react-router-dom";
import { themeContext, ThemeProvider } from "./context/context.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
