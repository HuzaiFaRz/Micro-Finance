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
        className={`w-full max-w-6xl mx-auto flex justify-between items-center py-6 px-4 font-elmssans-bold ${mainColor} ${
          windowMode === "dark" ? "text-main" : "text-black"
        }`}
      >
        <h1 className="italic text-3xl tablet:text-5xl">{authHeadHeading}</h1>
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
