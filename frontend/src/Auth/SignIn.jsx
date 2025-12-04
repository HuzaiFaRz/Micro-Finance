import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import {
  ArrowLongRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import AuthHead from "./AuthHead";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import AuthImage from "./AuthImage";

const SignIn = () => {
  const { windowMode, passwordEyeCSS, mainColor, inputCSS, labelCSS } =
    useContext(GlobalContextCreated);
  const [passwordEye, setPasswordEye] = useState(false);
  const registerInput = ["Email", "Password"];
  const passwordEyeHandler = () => {
    setPasswordEye(!passwordEye);
  };

  return (
    <>
      <div className="w-full tablet:h-dvh h-full flex flex-col tablet:flex-row justify-center items-center">
        <form
          className={`flex flex-col justify-between items-center tablet:w-[50%] w-full h-full px-4 py-4 ${mainColor}`}
        >
          <AuthHead />
          <div
            className={`flex flex-col justify-start items-start w-full x-10 py-5 gap-5 text-sm tablet:text-[16px] ${mainColor}`}
          >
            {registerInput.map((elem, index) => {
              return (
                <React.Fragment key={index}>
                  <label htmlFor={elem} className={labelCSS}>
                    {`Insert ${elem}`}
                    <input
                      className={inputCSS}
                      id={elem}
                      type={
                        elem === "Password"
                          ? passwordEye
                            ? "text"
                            : "password"
                          : "email"
                      }
                      placeholder={`${elem}...`}
                    />
                    {elem === "Password" && (
                      <button
                        type="button"
                        className={passwordEyeCSS}
                        onClick={() => passwordEyeHandler()}
                      >
                        {passwordEye ? <EyeIcon /> : <EyeSlashIcon />}
                      </button>
                    )}
                  </label>
                </React.Fragment>
              );
            })}
          </div>
          <div className="font-elmssans-medium tablet:text-lg text-sm text-main w-full flex flex-wrap justify-center items-center gap-6 cursor-pointer">
            <button className="bg-card px-18 py-2 rounded-3xl">Sign In</button>
            <NavLink
              to={"/register"}
              className={`flex items-center gap-3 px-12 py-2 shadow-xl/70 shadow-card ${
                windowMode === "dark" && "shadow-none border-b border-r"
              } ${mainColor}`}
            >
              <span>Register</span>
              <ArrowLongRightIcon className="size-6" />
            </NavLink>
          </div>
        </form>
        <AuthImage />
      </div>
    </>
  );
};

export default SignIn;
