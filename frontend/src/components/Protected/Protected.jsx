import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../";
import { setLoading, unsetloading } from "../../redux/";
import { AuthPages } from "../../pages";
import { Footer, Header } from "../";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.loading.loading);

  // Only render children if authenticated
  // Problem of white screen thats why i am rendering actual component instead of navigate

  return isAuth ? (
    children
  ) : (
    <>
      {isLoading && <Loader />}
      <div className="w-full mt-15 overflow-x-hidden">
        <Header />
        <div className="w-full m-top-10 overflow-x-hidden">
          <AuthPages />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProtectedRoute;
