import React, { useContext, useReducer, useRef, useState } from "react";
import { NavLink } from "react-router";
import {
  ArrowLongRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";

import { GlobalContextCreated } from "../Contexts/GlobalContext";
import AuthImage from "./AuthComponents/AuthImage";
import AuthHead from "./AuthComponents/AuthHead";
import FormReducer from "./AuthReducers/FormReducer";

const SignIn = () => {
  const [passwordEye, setPasswordEye] = useState(false);
  const passwordEyeHandler = () => {
    setPasswordEye(!passwordEye);
  };
  const signInInputs = ["Email", "Password"];
  const initialValues = signInInputs.reduce((loop, currentValue) => {
    loop[currentValue] = "";
    return loop;
  }, {});

  const {
    windowMode,
    passwordEyeCSS,
    mainColor,
    inputCSS,
    labelCSS,
    gettingError,
    gmailRegex,
  } = useContext(GlobalContextCreated);

  const inputRef = useRef([]);
  const gettingInput = (id) => {
    if (!inputRef.current) return [];
    return inputRef?.current.filter((e) => e?.id === id);
  };

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

  const [formValues, formDispatch] = useReducer(FormReducer, initialValues);

  const signInInputHandler = (elem) => {
    let { value, id, name } = elem.target;
    const errorPara = gettingErrorPara(`Error-Para-${name}`);
    const lable = gettingLable(`Label-${name}`);
    const input = gettingInput(`${name}`);
    if (id === "Email" || id === "Password") {
      if (!value) {
        gettingError("required", errorPara, lable, input);
        return;
      }
    }
    if (id === "Email") {
      if (!gmailRegex.test(value))
        return gettingError("invalid_format", errorPara, lable, input);
      gettingError("ok", errorPara, lable, input);
    }

    if (id === "Password") {
      if (/\s+/g.test(value))
        return gettingError("no_space", errorPara, lable, input);
      if (value.length <= 8)
        return gettingError("too_short", errorPara, lable, input);
      gettingError("ok", errorPara, lable, input);
    }

    formDispatch({ type: "INPUT_CHANGE", inputID: id, inputValue: value });
  };

  const signInFormHandler = () => {
    event.preventDefault();
    let formValidation = false;
    Object.entries(formValues).forEach(([, value], i) => {
      if (
        value === "" ||
        value === undefined ||
        (value === null &&
          errorParaRef.current.some((e) => e.innerText !== "OK"))
      ) {
        gettingError(
          "required",
          errorParaRef.current.filter((_, index) => index === i),
          lableRef.current.filter((_, index) => index === i),
          inputRef.current.filter((_, index) => index === i)
        );
        formValidation = false;
        return;
      }
      formValidation = true;
    });

    if (formValidation) {
      console.log(this);
      return;
    }
  };

  return (
    <>
      <div className="w-full h-full tablet:h-dvh flex flex-col tablet:flex-row justify-center items-center">
        <AuthImage />
        <div
          className={`flex flex-col justify-between items-center tablet:w-[50%] w-full h-full tablet:h-dvh py-4 px-4 ${mainColor}`}
        >
          <AuthHead />
          <form
            className={`flex flex-col justify-start items-start w-full x-10 py-5 gap-5 text-sm tablet:text-[16px] font-elmssans-light tracking-wider ${mainColor}`}
          >
            {signInInputs.map((elem, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="w-full flex flex-col justify-center items-start relative">
                    <label
                      htmlFor={elem}
                      id={`Label-${elem}`}
                      className={`${labelCSS}`}
                      ref={(el) => (lableRef.current[index] = el)}
                    >
                      {`Insert ${elem}`}
                    </label>
                    <input
                      className={`${inputCSS} pointer-events-auto`}
                      ref={(el) => (inputRef.current[index] = el)}
                      autoComplete="off"
                      id={`${elem}`}
                      name={elem}
                      type={
                        elem === "Password"
                          ? passwordEye
                            ? "text"
                            : "password"
                          : "email"
                      }
                      placeholder={`${elem}...`}
                      onChange={signInInputHandler}
                    />

                    {elem === "Password" && (
                      <button
                        type="button"
                        className={`${passwordEyeCSS}`}
                        onClick={() => passwordEyeHandler(elem)}
                      >
                        {passwordEye ? <EyeIcon /> : <EyeSlashIcon />}
                      </button>
                    )}

                    <p
                      className={`absolute text-sm top-2 right-2 flex items-center gap-2 tracking-widest text-red-500`}
                      id={`Error-Para-${elem}`}
                      ref={(el) => (errorParaRef.current[index] = el)}
                    ></p>
                  </div>
                </React.Fragment>
              );
            })}
          </form>

          <div className="font-elmssans-medium tablet:text-lg text-sm text-main w-full flex flex-wrap justify-center items-center gap-6 cursor-pointer mb-5">
            <button
              className="bg-card px-18 py-2 rounded-3xl cursor-pointer disabled:opacity-50"
              type="submit"
              onClick={signInFormHandler}
            >
              Sign In
            </button>
            <NavLink
              to={"/register"}
              className={`flex items-center gap-3 px-12 py-2 shadow-xl/70 shadow-card ${
                windowMode === "dark" && "shadow-none border-b border-r"
              } ${mainColor}`}
            >
              <span>Register</span>
              <ArrowLongRightIcon className="tablet:size-6 size-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
