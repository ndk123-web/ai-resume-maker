import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Footer } from "../pages";
import { Header } from "../components";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Footer />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
]);

export default router;
