import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Dashboard, AuthPages } from "../pages";
import { Header, Footer, PriciingSection, ProtectedRoute } from "../components";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="w-full overflow-x-hidden">
        <Header />
        <div className="w-full overflow-x-hidden">
          <Home />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <div className="w-full overflow-x-hidden">
          <Header />
          <div className="w-full overflow-x-hidden">
            <Home />
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/builder",
    element: (
      <ProtectedRoute>
        <div className="w-full overflow-x-hidden">
          <Header />
          <div className="w-full overflow-x-hidden">
            <Dashboard />
          </div>
          {/* <Footer /> */}
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/pricing",
    element: (
      <div className="w-full overflow-x-hidden">
        <Header />
        <div className="w-full overflow-x-hidden">
          <PriciingSection />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/auth",
    element: (
      <div className="w-full mt-15 overflow-x-hidden">
        <Header />
        <div className="w-full m-top-10 overflow-x-hidden">
          <AuthPages />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/templates",
    element: (
      <ProtectedRoute>
        <div className="w-full overflow-x-hidden">
          <Header />
          <div className="w-full overflow-x-hidden">
            <Dashboard />
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
]);

export default router;
