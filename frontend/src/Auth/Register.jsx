import React, { useContext, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  ArrowLongRightIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/16/solid";
import AuthHead from "./AuthHead";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import AuthImage from "./AuthImage";

const Register = () => {
  const [passwordEye, setPasswordEye] = useState({
    password: false,
    repeatPassword: false,
  });

  const passwordEyeHandler = (elem) => {
    event.preventDefault();
    setPasswordEye((prev) => ({
      ...prev,
      [elem]: !prev[elem],
    }));
  };

  const registerInputs = [
    "Name",
    "Email",
    "CNIC",
    "Password",
    "Repeat Password",
  ];

  const initialValues = registerInputs.reduce((loop, currentValue) => {
    loop[currentValue] = "";
    return loop;
  }, {});

  const {
    windowMode,
    passwordEyeCSS,
    mainColor,
    inputCSS,
    labelCSS,
    inputsError,
    regex,
    gmailRegex,
  } = useContext(GlobalContextCreated);

  const errorParaRef = useRef([]);
  const gettingErrorPara = (id) => {
    if (!errorParaRef.current) return [];
    return errorParaRef.current.filter((e) => e?.id === id);
  };

  const lableRef = useRef([]);
  const gettingLable = (id) => {
    if (!lableRef.current) return [];
    return lableRef.current.filter((e) => e?.id === id);
  };

  const registerInputHandler = (input) => {
    const { value, id } = input.target;
    const errorPara = gettingErrorPara(`Error-Para${id}`);
    const lable = gettingLable(`Label-${id}`);

    const gettingError = (type) => {
      const gettingMSG = inputsError.filter((e) => {
        return e.type === type;
      });
      errorPara[0].textContent = gettingMSG[0].message;
      errorPara[0].style.color =
        gettingMSG[0].type === "ok" ? "#4CAF50" : "red";
      if (gettingMSG[0].type === "ok") {
        input.target.style.borderColor = "green";
        lable[0].style.textDecorationColor = "green";
      } else {
        input.target.style.borderColor = "red";
        lable[0].style.textDecorationColor = "red";
      }
    };

    if (id === "Name") {
      if (value === "") {
        gettingError("required");
      } else if (/\s{2,}/.test(value) || value.startsWith(" ")) {
        gettingError("leading_space");
      } else if (regex.test(value)) {
        gettingError("invalid_chars");
      } else {
        gettingError("ok");
      }
    } else if (id === "Email") {
      if (value === "") {
        gettingError("required");
      } else if (/\s{2,}/.test(value) || value.startsWith(" ")) {
        gettingError("leading_space");
      } else if (!gmailRegex.test(value)) {
        gettingError("invalid_format");
      } else {
        gettingError("ok");
      }
    } else if (id === "CNIC") {
      let digit = value.replace(/[^0-9]/g, "");
      let format = "";
      if (digit.length <= 5) {
        format = digit;
      } else if (digit.length <= 12) {
        format = `${digit.slice(0, 5)}-${digit.slice(5)}`;
      } else {
        format = `${digit.slice(0, 5)}-${digit.slice(5, 12)}-${digit.slice(
          12,
          13
        )}`;
      }
      input.target.value = format;
      if (digit.length === 13) {
        gettingError("ok");
      } else {
        gettingError("required");
      }
    } else if (id === "Password" || id === "Repeat Password") {
      if (value === "") {
        gettingError("required");
      } else if (/\s+/g.test(value)) {
        gettingError("no_space");
      } else if (value.length <= 9) {
        gettingError("too_short");
      } else {
        gettingError("ok");
      }
    }

    // if (id === "Name") {
    //   if (true) {
    //     gettingError("Warning", "Remove Space");
    //   } else if (value.match(regex)) {
    //     gettingError("Warning", "Special Character are not Allowed");
    //   } else {
    //     gettingError("Success", "OK");
    //   }
    // } else if (id === "Password" || id === "Repeat Password") {
    //   if (/\s/.test(value)) {
    //     gettingError("Warning", "Remove Space");
    //   } else if (value.length <= 9) {
    //     gettingError("Warning", "Password is too short (min: 9)");
    //   } else if (value !== value) {
    //     console.log(this);
    //   }
    // } else if (id === "Email") {
    //   if (/\s/.test(value)) {
    //     gettingError("Warning", "Remove Space");
    //   } else if (value.match(regex)) {
    //     gettingError("Warning", "Special Character are not Allowed");
    //   } else {
    //     gettingError("Success", "OK");
    //   }
    // }
  };

  const registerFormHandler = () => {
    // event.preventDefault();
    console.log(this);
  };

  return (
    <>
      <div className="w-full h-full tablet:h-dvh flex flex-col tablet:flex-row justify-center items-center">
        <AuthImage />
        <div
          className={`flex flex-col justify-evenly items-center tablet:w-[50%] w-full h-full tablet:h-dvh px-4 ${mainColor}`}
        >
          <AuthHead />
          <form
            className={`flex flex-col justify-start items-start w-full x-10 py-5 gap-5 text-sm tablet:text-[16px] font-elmssans-light tracking-wider ${mainColor}`}
          >
            {registerInputs.map((elem, index) => {
              return (
                <React.Fragment key={index}>
                  <label
                    htmlFor={elem}
                    id={`Label-${elem}`}
                    className={`${labelCSS} `}
                    ref={(el) => (lableRef.current[index] = el)}
                  >
                    {`Insert ${elem === "Repeat Password" ? "Password" : elem}`}
                    <input
                      className={`${inputCSS}`}
                      autoComplete="off"
                      id={elem}
                      type={
                        elem === "Password" || elem === "Repeat Password"
                          ? passwordEye[elem]
                            ? "text"
                            : "text"
                          : elem === "CNIC"
                          ? "tel"
                          : "text"
                      }
                      placeholder={`${elem}...`}
                      maxLength={elem === "CNIC" ? "15" : ""}
                      onChange={registerInputHandler}
                    />

                    {(elem === "Password" || elem === "Repeat Password") && (
                      <button
                        type="button"
                        className={`${passwordEyeCSS} pointer-events-none`}
                        onClick={() => passwordEyeHandler(elem)}
                      >
                        {passwordEye[elem] ? <EyeIcon /> : <EyeSlashIcon />}
                      </button>
                    )}

                    <p
                      className={`absolute text-sm pointer-events-none top-4 right-2 flex items-center gap-2 cursor-pointer`}
                      id={`Error-Para${elem}`}
                      ref={(el) => (errorParaRef.current[index] = el)}
                    ></p>
                  </label>
                </React.Fragment>
              );
            })}
          </form>

          <div className="font-elmssans-medium tablet:text-lg text-sm text-main w-full flex flex-wrap justify-center items-center gap-6 cursor-pointer mb-5">
            <button
              className="bg-card px-18 py-2 rounded-3xl cursor-pointer"
              type="submit"
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
