import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  ArrowLongRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import AuthHead from "./AuthHead";
import { ThemeContextCreated } from "./Contexts/ThemeContext";
import AuthImage from "./AuthImage";

const Register = () => {
  const { windowMode, passwordEyeCSS, mainColor } =
    useContext(ThemeContextCreated);

  const [passwordEye, setPasswordEye] = useState({
    password: false,
    repeatPassword: false,
  });

  const registerInput = [
    "Name",
    "Email",
    "Password",
    "Repeat Password",
    "Number",
  ];
  const passwordEyeHandler = (elem) => {
    event.preventDefault();
    setPasswordEye((prev) => ({
      ...prev,
      [elem]: !prev[elem],
    }));
  };

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center">
        <AuthImage />

        <form
          className={`flex flex-col justify-between items-center w-[50%] h-full px-7 py-5 ${mainColor}`}
        >
          <AuthHead />
          <div
            className={`flex flex-col justify-start items-start w-full x-10 py-5 gap-5 text-md font-elmssans-light tracking-wider ${mainColor}`}
          >
            {registerInput.map((elem, index) => {
              return (
                <React.Fragment key={index}>
                  <label
                    htmlFor={elem}
                    className={`w-full relative mb-1 underline underline-offset-11 ${
                      windowMode === "light" && "font-elmssans-medium"
                    } text-card `}
                  >
                    {elem === "Repeat Password"
                      ? elem
                      : `Insert ${elem === "Number" ? `CNIC` : `${elem}`}`}
                    <input
                      className={`w-full px-3 py-3 border-l border-b mt-1 placeholder:opacity-50 ${
                        windowMode === "dark"
                          ? "placeholder:text-card text-main border-card shadow-none"
                          : "placeholder:text-black text-black border-black shadow-xl/40 shadow-card"
                      }`}
                      id={elem}
                      type={
                        passwordEye[elem]
                          ? "text"
                          : elem === "Repeat Password"
                          ? "password"
                          : elem.toLowerCase()
                      }
                      placeholder={`${elem === "Number" ? "CNIC" : elem}...`}
                    />
                    {(elem === "Password" || elem === "Repeat Password") && (
                      <button
                        type="button"
                        className={passwordEyeCSS}
                        onClick={() => passwordEyeHandler(elem)}
                      >
                        {passwordEye[elem] ? <EyeIcon /> : <EyeSlashIcon />}
                      </button>
                    )}
                  </label>
                </React.Fragment>
              );
            })}
          </div>
          <div className="font-elmssans-medium text-lg text-main w-full flex flex-wrap justify-center items-center gap-6 cursor-pointer py-5 px-5">
            <button className="bg-card px-18 py-2 rounded-3xl cursor-pointer">
              Register
            </button>
            <NavLink
              to={"/sign-in"}
              className={`flex items-center gap-3 px-12 py-2 shadow-xl/70 shadow-card ${mainColor}`}
            >
              <span>Sign In</span> <ArrowLongRightIcon className="size-6" />{" "}
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
