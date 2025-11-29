import { Fragment, useContext, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { ThemeContextCreated } from "./Contexts/ThemeContext";

const AuthHead = () => {
  const { windowMode, setWindowMode, authHeadHeading } =
    useContext(ThemeContextCreated);
  const [, setUserMode] = useState(localStorage.getItem("theme") || windowMode);
  const modeButtonHandler = () => {
    setUserMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newMode);
      setWindowMode(newMode);
      return newMode;
    });
  };

  return (
    <Fragment>
      <div
        className={`w-full flex justify-between items-center font-elmssans-bold text-5xl tracking-tighter ${
          windowMode === "dark" ? "text-main" : "text-black"
        }`}
      >
        <span className="py-2 tablet:py-0 italic">{authHeadHeading}</span>
        <button
          className="modeButton cursor-pointer"
          type="button"
          onClick={modeButtonHandler}
        >
          {windowMode === "dark" ? (
            <SunIcon className="size-10" />
          ) : (
            <MoonIcon className="size-10" />
          )}
        </button>
      </div>
    </Fragment>
  );
};

export default AuthHead;
