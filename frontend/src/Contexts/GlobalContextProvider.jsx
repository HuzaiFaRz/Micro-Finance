import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { GlobalContextCreated } from "./GlobalContext";

const GlobalContextProvider = ({ children }) => {
  const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  const checkingLS = localStorage.getItem("theme");
  const [windowMode, setWindowMode] = useState(
    checkingLS ? checkingLS : matchMedia.matches ? "dark" : "light"
  );
  const [authHeadHeading, setAuthHeadHeading] = useState();

  const inputsError = [
    { type: "required", message: "Required" },
    { type: "no_space", message: "No spaces" },
    { type: "leading_space", message: "No leading space" },
    { type: "invalid_chars", message: "Invalid characters" },
    { type: "invalid_format", message: "Invalid format" },
    { type: "too_short", message: "Too short" },
    { type: "numbers_only", message: "Numbers only" },
    { type: "letters_only", message: "Letters only" },
    { type: "ok", message: "OK" },
  ];
  const regex = /[!#$%^&@*()_+\-=\[\]{};':"\\|,.<>\/?~`]/;
  const gmailRegex = /^[a-zA-Z0-9._]+@gmail\.com$/;


  
  const pageLocation = useLocation();

  const passwordEyeCSS = `size-5 absolute right-2 top-[60%] cursor-pointer`;
  const mainColor =
    windowMode === "dark" ? "bg-black text-main" : "bg-main text-black";

  const inputCSS = `w-full px-3 py-3 border-l-1 border-b-1 placeholder:opacity-70 mt-3 ${
    windowMode === "dark"
      ? "placeholder:text-card text-main border-main"
      : "placeholder:text-black text-black border-black"
  }`;

  const labelCSS = `w-full relative underline underline-offset-19 ${
    windowMode === "dark" ? "text-main decoration-main" : "text-card font-elmssans-medium decoration-black"
  }`;

  const whatModeOnWindow = () => {
    return matchMedia.matches ? setWindowMode("dark") : setWindowMode("light");
  };

  const whatURL = () => {
    return pageLocation.pathname === "/register" ||
      pageLocation.pathname.toLocaleLowerCase().includes("register")
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
      <GlobalContextCreated.Provider
        value={{
          windowMode,
          setWindowMode,
          authHeadHeading,
          passwordEyeCSS,
          mainColor,
          inputCSS,
          labelCSS,
          inputsError,
          regex,
          gmailRegex,
        }}
      >
        {children}
        <Outlet />
      </GlobalContextCreated.Provider>
    </Fragment>
  );
};

export default GlobalContextProvider;
