import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { themeContext } from "../../context/context";

const Home = () => {

  const { theme , setTheme } = useContext(themeContext);
  // console.log("Current Theme: ", theme);

  return <div>Home</div>;
};

export default Home;
