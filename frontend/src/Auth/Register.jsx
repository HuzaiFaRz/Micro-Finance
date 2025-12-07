import React, { useContext, useReducer, useRef, useState } from "react";
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

const reducer = (state, action) => {
console.log(state, action)
};

const Register = () => {
  const [passwordEye, setPasswordEye] = useState({
    password: false,
    repeatPassword: false,
  });

  const [password, setPassword] = useState("");

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
    return errorParaRef?.current.filter((e) => e?.id === id);
  };

  const lableRef = useRef([]);
  const gettingLable = (id) => {
    if (!lableRef.current) return [];
    return lableRef?.current.filter((e) => e?.id === id);
  };

  const [values, dispatch] = useReducer(reducer, initialValues);

  const registerInputHandler = (input) => {
    let { value, id } = input.target;
    const errorPara = gettingErrorPara(`Error-Para${id}`);
    const lable = gettingLable(`Label-${id}`);
    const gettingError = (type) => {
      const gettingMSG = inputsError.filter((e) => {
        return e.type === type;
      });
      if (gettingMSG[0].type === "ok") {
        input.target.style.borderColor = "#22c55e";
        lable[0].style.textDecorationColor = "#22c55e";
        errorPara[0].style.color = "#22c55e";
        errorPara[0].innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-5 text-[#22c55e]"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> ${gettingMSG[0].message}`;
      } else {
        input.target.style.borderColor = "#dc2626";
        lable[0].style.textDecorationColor = "#dc2626";
        errorPara[0].style.color = "#dc2626";
        errorPara[0].innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-5 text-[#dc2626]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" /></svg>${gettingMSG[0].message}`;
      }
    };
    if (
      id === "Name" ||
      id === "Email" ||
      id === "CNIC" ||
      id === "Password" ||
      id === "Repeat Password"
    ) {
      if (!value) {
        gettingError("required");
        if (id === "Password") {
          setPassword("");
        }
        return;
      }
    }
    if (id === "Name" || id === "Email") {
      if (id === "Email") {
        if (!gmailRegex.test(value)) return gettingError("invalid_format");
        gettingError("ok");
      } else {
        if (regex.test(value)) return gettingError("invalid_chars");
        if (/\s{2,}/.test(value) || value.startsWith(" "))
          return gettingError("leading_space");
        gettingError("ok");
      }
    }
    if (id === "Password" || id === "Repeat Password") {
      if (id === "Password") {
        if (/\s+/g.test(value)) return gettingError("no_space");
        if (value.length <= 8) return gettingError("too_short");
        gettingError("ok");
        setPassword(value);
      } else {
        if (!password.trim()) {
          gettingError("password_empty_when_repeat");
          input.target.value = "";
          return;
        }
        if (value !== password) return gettingError("password_mismatch");
        gettingError("ok");
      }
    }
    if (id === "CNIC") {
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
      if (!digit.length) return gettingError("required");
      if (digit.length !== 13) return gettingError("invalid_length");
      gettingError("ok");
    }

    dispatch({ [id]: value });
  };
  console.log(values);

  const registerFormHandler = () => {
    event.preventDefault();
    console.log(event);
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
                  <div className="w-full flex flex-col justify-center items-start relative">
                    <label
                      htmlFor={elem}
                      id={`Label-${elem}`}
                      className={`${labelCSS}`}
                      ref={(el) => (lableRef.current[index] = el)}
                    >
                      {`Insert ${
                        elem === "Repeat Password" ? "Password" : elem
                      }`}
                    </label>

                    <input
                      className={`${inputCSS} pointer-events-auto`}
                      autoComplete="off"
                      id={elem}
                      type={
                        elem === "Password" || elem === "Repeat Password"
                          ? passwordEye[elem]
                            ? "text"
                            : "password"
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
                        className={`${passwordEyeCSS}`}
                        onClick={() => passwordEyeHandler(elem)}
                      >
                        {passwordEye[elem] ? <EyeIcon /> : <EyeSlashIcon />}
                      </button>
                    )}

                    <p
                      className={`absolute text-sm top-2 right-2 flex items-center gap-2 tracking-widest`}
                      id={`Error-Para${elem}`}
                      ref={(el) => (errorParaRef.current[index] = el)}
                    ></p>
                  </div>
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
