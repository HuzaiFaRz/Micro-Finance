import { Fragment, useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const AuthHead = () => {
  const { windowMode, setWindowMode, authHeadHeading } =
    useContext(GlobalContextCreated);
  const [, setUserMode] = useState(localStorage.getItem("theme") || windowMode);
  const modeButtonHandler = () => {
    setUserMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    setWindowMode(localStorage.getItem("theme"));
  });

  return (
    <Fragment>
      <div
        className={`w-full flex justify-between items-center font-elmssans-bold text-3xl tablet:text-5xl tracking-tighter py-3 ${
          windowMode === "dark" ? "text-main" : "text-black"
        }`}
      >
        <span className="tablet:py-0 italic">{authHeadHeading}</span>
        <button
          className="modeButton cursor-pointer"
          type="button"
          onClick={modeButtonHandler}
        >
          {windowMode === "dark" ? (
            <SunIcon className="tablet:size-10 size-8" />
          ) : (
            <MoonIcon className="tablet:size-10 size-8" />
          )}
        </button>
      </div>
    </Fragment>
  );
};

export default AuthHead;
