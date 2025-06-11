import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "../pages";
import { Header, Footer } from "../components";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <Header />

        <Footer />
      </>
    ),
  },
]);

export default router;
