import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { GlobalContextCreated } from "./GlobalContext";
import MassegeToast from "../Components/MassegeToast";

const GlobalContextProvider = ({ children }) => {
  const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  const checkingLS = localStorage.getItem("theme");
  const [windowMode, setWindowMode] = useState(
    checkingLS ? checkingLS : matchMedia.matches ? "dark" : "light"
  );
  const [authHeadHeading, setAuthHeadHeading] = useState();
  const [toastMsg, setToastMsg] = useState("");
  const pageLocation = useLocation();

  const [toastMsgColor, setToastMsgColor] = useState("");

  const inputsError = [
    { type: "required", message: "Required" },
    { type: "firebase", message: "Error" },
    { type: "no_space", message: "No spaces" },
    { type: "leading_space", message: "No leading space" },
    { type: "invalid_chars", message: "Invalid characters" },
    { type: "invalid_format", message: "Invalid format" },
    { type: "too_short", message: "Too short" },
    { type: "numbers_only", message: "Numbers only" },
    { type: "letters_only", message: "Letters only" },
    { type: "password_not_match", message: "Passwords do not match" },
    { type: "password_empty_when_repeat", message: "Enter password first" },
    { type: "invalid_length", message: "Invalid length" },
    { type: "password_mismatch", message: "Password don't match" },
    { type: "ok", message: "OK" },
  ];

  const regex = /[!#$%^&@*()_+\-=\[\]{};':"\\|,.<>\/?~`]/;
  const gmailRegex = /^[a-zA-Z0-9._]+@gmail\.com$/;
  const passwordEyeCSS = `size-5 absolute right-2 top-[60%] cursor-pointer`;
  const mainColor =
    windowMode === "dark" ? "bg-black text-main" : "bg-main text-black";

  const inputCSS = `w-full px-3 py-3 border-l-1 border-b-1 placeholder:opacity-70 mt-3 pointer-events-auto ${
    windowMode === "dark"
      ? `placeholder:text-card text-main border-main`
      : `placeholder:text-black text-black border-black`
  } `;

  const labelCSS = `w-full underline underline-offset-19 ${
    windowMode === "dark"
      ? "text-main decoration-main"
      : "text-card font-elmssans-medium decoration-black"
  }`;

  const heroIconCSS = `tablet:size-5 size-4`;

  const whatModeOnWindow = () => {
    return matchMedia.matches ? setWindowMode("dark") : setWindowMode("light");
  };

  const whatURL = () => {
    return pageLocation.pathname === "/register" ||
      pageLocation.pathname.toLocaleLowerCase().includes("register")
      ? setAuthHeadHeading("Register")
      : setAuthHeadHeading("Sign In");
  };

  const gettingError = (type, errorPara, lable, input) => {
    const msg = inputsError.find((e) => e.type === type);
    if (errorPara && lable && input) {
      if (msg.type === "ok") {
        input?.forEach((e) => {
          e.style.borderColor = "#22c55e";
        });
        lable?.forEach((e) => {
          e.style.textDecorationColor = "#22c55e";
        });
        errorPara?.forEach((e) => {
          e.style.color = "#22c55e";
          e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-4 tablet:size-5 text-[#22c55e]"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> ${msg.message}`;
        });
      } else {
        input?.forEach((e) => {
          e.style.borderColor = "#dc2626";
        });
        lable?.forEach((e) => {
          e.style.textDecorationColor = "#dc2626";
        });
        errorPara?.forEach((e) => {
          e.style.color = "#dc2626";
          e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-4 tablet:size-5 text-[#dc2626]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" /></svg>${msg.message}`;
        });
      }
      return;
    }
  };

  const convertingMassege = (code, errorParaRef, lableRef, inputRef) => {
    if (!errorParaRef && !lableRef && !inputRef) {
      setToastMsg(code);
      setToastMsgColor("text-green-500");
      return;
    }

    setToastMsgColor("text-red-500");

    if (code.includes("email")) {
      gettingError(
        "firebase",
        errorParaRef?.current.filter((e) => e.id === "Error-Para-Email"),
        lableRef?.current.filter((e) => e.id === "Label-Email"),
        inputRef?.current.filter((e) => e.id === "Email")
      );
      if (code.includes("email-already-in-use")) {
        setToastMsg("This email is already in use");
      } else if (code.includes("invalid-email")) {
        setToastMsg("Please enter a valid email address");
      }
      return;
    }

    if (
      code.includes("auth/invalid-credential") ||
      code.includes("auth/user-not-found")
    ) {
      gettingError(
        "firebase",
        errorParaRef?.current,
        lableRef?.current,
        inputRef?.current
      );
      setToastMsg("Invalid email or password");
      return;
    }

    if (code.includes("password")) {
      gettingError(
        "firebase",
        errorParaRef?.current.filter((e) => e.id === "Error-Para-Password"),
        lableRef?.current.filter((e) => e.id === "Label-Password"),
        inputRef?.current.filter((e) => e.id === "Password")
      );
      if (code.includes("auth/wrong-password")) {
        setToastMsg("Incorrect password");
      } else if (code.includes("auth/weak-password")) {
        setToastMsg("Password must be at least 6 characters");
      }
      return;
    }

    if (code.includes("too-many-requests")) {
      setToastMsg("Too many attempts. Please try again later");
    } else if (code.includes("network-request-failed")) {
      setToastMsg("Network error. Check your internet connection");
    } else if (code.includes("user-disabled")) {
      setToastMsg("Your account has been disabled");
    } else {
      setToastMsg("Something went wrong. Please try again later.");
    }
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
          gettingError,
          convertingMassege,
          toastMsg,
          setToastMsg,
          heroIconCSS,
          toastMsgColor,
        }}
      >
        {children}
        <MassegeToast />
        <Outlet />
      </GlobalContextCreated.Provider>
    </Fragment>
  );
};

export default GlobalContextProvider;
