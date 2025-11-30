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

import { useFormStatus } from "react-dom";

const Register = () => {
  const { windowMode, passwordEyeCSS, mainColor, inputCSS, labelCSS } =
    useContext(ThemeContextCreated);
  const [passwordEye, setPasswordEye] = useState({
    password: false,
    repeatPassword: false,
  });
  const registerInputs = [
    "Name",
    "Email",
    "Number",
    "Password",
    "Repeat Password",
  ];
  const passwordEyeHandler = (elem) => {
    event.preventDefault();
    setPasswordEye((prev) => ({
      ...prev,
      [elem]: !prev[elem],
    }));
  };

  const initialValues = registerInputs.reduce((loop, currentValue) => {
    loop[currentValue] = "";
    return loop;
  }, {});

  console.log(initialValues);

  const registerInputHandler = (e) => {
    const { value } = e.target;
    if (e.target.id === "Number") {
      if (typeof e.target.value === "number") {
        if (value.length === 14) {
          console.log(value);
        }
      } else {
        // alert("type cniv");
      }
    }
  };

  const registerFormHandler = () => {
    event.preventDefault();
    console.log(this);
  };

  return (
    <>
      <div className="w-full h-full tablet:h-dvh flex flex-col tablet:flex-row justify-center items-center">
        <AuthImage />
        <div
          className={`flex flex-col justify-between items-center tablet:w-[50%] w-full h-full tablet:h-dvh px-4 py-4 ${mainColor}`}
        >
          <AuthHead />

          <form
            className={`flex flex-col justify-start items-start w-full x-10 py-5 gap-5 text-sm tablet:text-[16px] font-elmssans-light tracking-wider ${mainColor}`}
          >
            {registerInputs.map((elem, index) => {
              return (
                <React.Fragment key={index}>
                  <label htmlFor={elem} className={`${labelCSS}`}>
                    {elem === "Repeat Password"
                      ? elem
                      : `Insert ${elem === "Number" ? `CNIC` : `${elem}`}`}
                    <input
                      className={`${inputCSS}`}
                      id={elem}
                      type={
                        elem === "Password" || elem === "Repeat Password"
                          ? passwordEye[elem]
                            ? "text"
                            : "password"
                          : elem === "Email"
                          ? "email"
                          : "text"
                      }
                      placeholder={`${elem === "Number" ? "CNIC" : elem}...`}
                      maxLength={elem === "Number" ? "15" : ""}
                      onChange={registerInputHandler}
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
                    <p className="absolute text-xs text-red-500 font-elmssans-light top-4 right-2">
                      {elem === "Number"
                        ? "CNIC"
                        : elem === "Repeat Password"
                        ? "Password"
                        : elem}{" "}
                      Required
                    </p>
                  </label>
                </React.Fragment>
              );
            })}
          </form>

          <div className="font-elmssans-medium tablet:text-lg text-sm text-main w-full flex flex-wrap justify-center items-center gap-6 cursor-pointer">
            <button
              className="bg-card px-18 py-2 rounded-3xl"
              type="button"
              onClick={registerFormHandler}
            >
              Register
            </button>
            <NavLink
              to={"/sign-in"}
              className={`flex items-center gap-3 px-12 py-2 shadow-xl/70 shadow-card ${
                windowMode === "dark" && "shadow-none border-b border-r"
              } ${mainColor}`}
            >
              <span>Sign In</span>
              <ArrowLongRightIcon className="tablet:size-6 size-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
