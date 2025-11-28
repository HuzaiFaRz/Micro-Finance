import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { ThemeContextCreated } from "./ThemeContext";

const ThemeContextProvider = ({ children }) => {
  const pageLocation = useLocation();
  const [authHeadHeading, setAuthHeadHeading] = useState("");
  const checkingLS = localStorage.getItem("theme");
  const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  const [windowMode, setWindowMode] = useState(
    checkingLS ? checkingLS : matchMedia.matches ? "dark" : "light"
  );
  const passwordEyeCSS = `size-5 absolute right-0 top-1/2 -translate-x-1/2 cursor-pointer`;
  const mainColor =
    windowMode === "dark" ? "bg-black text-main" : "bg-main text-black";

  const whatModeOnWindow = () => {
    return matchMedia.matches ? setWindowMode("dark") : setWindowMode("light");
  };
  const whatURL = () => {
    return pageLocation.pathname === "/register"
      ? setAuthHeadHeading("Register")
      : setAuthHeadHeading("Sign In");
  };

  useEffect(() => {
    whatURL();
    if (!checkingLS) {
      whatModeOnWindow();
      matchMedia.addEventListener("change", whatModeOnWindow);
      return;
    }
    return () => matchMedia.removeEventListener("change", whatModeOnWindow);
  });

  return (
    <Fragment>
      <ThemeContextCreated.Provider
        value={{
          windowMode,
          setWindowMode,
          authHeadHeading,
          passwordEyeCSS,
          mainColor,
        }}
      >
        {children}
        <Outlet />
      </ThemeContextCreated.Provider>
    </Fragment>
  );
};

export default ThemeContextProvider;
