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

const formReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return {
      ...state,
      [action.inputID]: action.inputValue,
    };
  } else if (action.type === "RESET_FORM") {
    return {
      ...state,
      [action.inputID]: "",
    };
  }
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
    gettingError,
    regex,
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

  const [formValues, formDispatch] = useReducer(formReducer, initialValues);

  const registerInputHandler = (elem) => {
    let { value, id, name } = elem.target;
    const errorPara = gettingErrorPara(`Error-Para-${name}`);
    const lable = gettingLable(`Label-${name}`);
    const input = gettingInput(`${name}`);
    if (
      id === "Name" ||
      id === "Email" ||
      id === "CNIC" ||
      id === "Password" ||
      id === "Repeat Password"
    ) {
      if (!value) {
        gettingError("required", errorPara, lable, input);
        if (id === "Password") {
          setPassword("");
        }
        return;
      }
    }
    if (id === "Name" || id === "Email") {
      if (id === "Email") {
        if (!gmailRegex.test(value))
          return gettingError("invalid_format", errorPara, lable, input);
        gettingError("ok", errorPara, lable, input);
      } else {
        if (regex.test(value))
          return gettingError("invalid_chars", errorPara, lable, input);
        if (/\s{2,}/.test(value) || value.startsWith(" "))
          return gettingError("leading_space", errorPara, lable, input);
        gettingError("ok", errorPara, lable, input);
      }
    }
    if (id === "Password" || id === "Repeat Password") {
      if (id === "Password") {
        if (/\s+/g.test(value))
          return gettingError("no_space", errorPara, lable, input);
        if (value.length <= 8)
          return gettingError("too_short", errorPara, lable, input);
        gettingError("ok", errorPara, lable, input);
        setPassword(value);
      } else {
        if (!password.trim()) {
          gettingError("password_empty_when_repeat", errorPara, lable, input);
          elem.target.value = "";
          return;
        }
        if (value !== password)
          return gettingError("password_mismatch", errorPara, lable, input);
        gettingError("ok", errorPara, lable, input);
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
      elem.target.value = format;
      if (!digit.length)
        return gettingError("required", errorPara, lable, input);
      if (digit.length !== 13)
        return gettingError("invalid_length", errorPara, lable, input);
      gettingError("ok", errorPara, lable, input);
    }

    if (errorParaRef.current.some((e) => e.innerText !== "OK").valueOf()) {
      formDispatch({ type: "INPUT_CHANGE", inputID: id, inputValue: value });
      return;
    }
  };

  const registerFormHandler = () => {
    event.preventDefault();
    // fields.forEach((field, index) => {
    //    if(field.value empty OR errorPara[index].innerText !== "OK"){
    //        gettingError("required", errorPara[index], label[index], input[index])
    //    } else {
    //        gettingError("ok", errorPara[index], label[index], input[index])
    //    }
    // })

    if (
      Object.values(formValues).some(
        (e) => e === "" || e === undefined || e === null
      ) &&
      errorParaRef.current.some((e) => e.innerText !== "OK")
    ) {
      gettingError(
        "required",
        errorParaRef.current,
        lableRef.current,
        inputRef.current
      );
      return;
    }
    gettingError(
      "ok",
      errorParaRef.current,
      lableRef.current,
      inputRef.current
    );
    console.log(formValues);
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
                      ref={(el) => (inputRef.current[index] = el)}
                      autoComplete="off"
                      id={`${elem}`}
                      name={elem}
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
                        className={`${passwordEyeCSS}`}
                        onClick={() => passwordEyeHandler(elem)}
                      >
                        {passwordEye[elem] ? <EyeIcon /> : <EyeSlashIcon />}
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
              title="dd"
              type="submit"
              // disabled
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
