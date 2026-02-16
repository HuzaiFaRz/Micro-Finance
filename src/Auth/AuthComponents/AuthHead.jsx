import { Fragment, useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { GlobalContextCreated } from "../../Contexts/GlobalContext";

const AuthHead = () => {
  const { windowMode, setWindowMode, authHeadHeading, mainColor } =
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
    const gettingThemeFromL_S = localStorage.getItem("theme");
    if (gettingThemeFromL_S) {
      setWindowMode(gettingThemeFromL_S);
      return;
    }
  });

  return (
    <Fragment>
      <div
        className={`w-full flex justify-between items-center font-elmssans-bold text-3xl tablet:text-4xl tracking-tighter px-5 z-10 fixed top-0 h-[60px] ${mainColor} ${
          windowMode === "dark" ? "text-main" : "text-black"
        }`}
      >
        <h1 className="italic text-4xl tablet:text-6xl">{authHeadHeading}</h1>
        <button
          className="modeButton cursor-pointer"
          type="button"
          onClick={modeButtonHandler}
        >
          {windowMode === "dark" ? (
            <SunIcon className="tablet:size-9 size-8" />
          ) : (
            <MoonIcon className="tablet:size-9 size-8" />
          )}
        </button>
      </div>
    </Fragment>
  );
};

export default AuthHead;
