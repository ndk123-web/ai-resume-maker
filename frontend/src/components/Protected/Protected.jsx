import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setLoading, unsetloading } from "../../redux/";
import { themeContext } from "../../context/context";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.loading.loading);
  const { theme, setTheme } = useContext(themeContext);
  const navigate = useNavigate()

  // useEffect(() => {
  //   localStorage.getItem("theme") === "dark"
  //     ? setTheme("dark")
  //     : setTheme("light");
  // }, []);

  // Optional: Show loader until auth status is known
  // if (loading) {
  //   return (
  //     <div
  //       className={`flex items-center bg-dark justify-center min-h-screen ${
  //         theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  //       }`}
  //     >
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6938EF]"></div>
  //     </div>
  //   );
  // }

  if (!status) {
    return <Navigate to={'/auth'} replace />
  }

  if (status) {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
