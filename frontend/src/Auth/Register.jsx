import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import AuthImage from "../assets/Images/auth-image.jpg";
import {
  ArrowLongRightIcon,
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";

const Register = () => {
  const [passwordEye, setPasswordEye] = useState({
    password: false,
    repeatPassword: false,
  });

  const passwordEyeCSS = `size-5 absolute right-0 top-1/2 -translate-x-1/2 cursor-pointer`;

  const registerInput = [
    "Name",
    "Email",
    "Password",
    "Repeat Password",
    "Number",
  ];
  const passwordEyeHandler = (elem) => {
    setPasswordEye((prev) => ({
      ...prev,
      [elem]: !prev[elem],
    }));
    console.log(passwordEye);
  };

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center">
        <div className="w-[60%] h-full relative">
          <img src={AuthImage} className="w-full h-full object-cover" />
          <div className="absolute top-0 right-0 bg-card opacity-25 z-40 w-full h-full"></div>
        </div>
        <form className="flex flex-col justify-evenly items-center w-[40%] h-full px-7">
          <div className="w-full text-start font-elmssans-bold text-5xl text-black tracking-tighter">
            Register
          </div>
          <div className="flex flex-col justify-start items-start w-full x-10 py-5 gap-5 text-md font-elmssans-medium">
            {registerInput.map((elem, index) => {
              return (
                <React.Fragment key={index}>
                  <label htmlFor={elem} className="w-full relative">
                    Insert {elem}
                    <input
                      className={`w-full text-card mt-1 border-2 shadow-xl/20 shadow-card px-3 py-3  border-e outline-0 placeholder:text-black placeholder:opacity-45`}
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
                        {passwordEye[elem] ? <EyeSlashIcon /> : <EyeIcon />}
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
              className={`flex items-center gap-3 px-12 py-2 shadow-xl/70 shadow-card text-black`}
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
