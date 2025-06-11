import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "../pages";
import { Header, Footer } from "../components";

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
      <div className="w-full overflow-x-hidden">
        <Header />
        <div className="w-full overflow-x-hidden">
          {/* Add your home content here */}
        </div>
        <Footer />
      </div>
    ),
  },
]);

export default router;
