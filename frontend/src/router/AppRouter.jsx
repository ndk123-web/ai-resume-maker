import { createBrowserRouter } from "react-router-dom";
import { Home, Dashboard, AuthPages } from "../pages/";
import {
  PriciingSection,
  ProtectedRoute,
  MainLayout,
  Header,
} from "../components/";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Home />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/builder",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/pricing",
    element: (
      <MainLayout>
        <PriciingSection />
      </MainLayout>
    ),
  },
  {
    path: "/auth",
    element: (
      <div
        className={`w-full mt-5 overflow-x-hidden`}
      >
        <Header />
        <div className="w-full mt-10 overflow-x-hidden">
          <AuthPages />
        </div>
      </div>
    ),
  },
  {
    path: "/templates",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path : "/protected",
    element : (
      <ProtectedRoute>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </ProtectedRoute>
    )
  }
]);

export default router;
