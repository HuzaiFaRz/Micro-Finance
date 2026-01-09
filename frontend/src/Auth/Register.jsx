import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import {
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon,
} from "@heroicons/react/16/solid";

import { GlobalContextCreated } from "../Contexts/GlobalContext";
import AuthImage from "./AuthComponents/AuthImage";
import AuthHead from "./AuthComponents/AuthHead";
import FormReducer from "./AuthReducers/FormReducer";
import { auth, db } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import MassegeToast from "../Components/MassegeToast";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [passwordEye, setPasswordEye] = useState({
    password: false,
    repeatPassword: false,
  });

  const [password, setPassword] = useState("");

  const passwordEyeHandler = useCallback((elem) => {
    setPasswordEye((prev) => ({
      ...prev,
      [elem]: !prev[elem],
    }));
  }, [setPasswordEye]);

  const registerInputs = useMemo(
    () => ["Name", "Email", "CNIC", "Password", "Repeat Password"],
    []
  );

  const initialValues = useMemo(
    () =>
      registerInputs.reduce((loop, currentValue) => {
        loop[currentValue] = "";
        return loop;
      }, {}),
    [registerInputs]
  );

  const {
    windowMode,
    passwordEyeCSS,
    mainColor,
    inputCSS,
    labelCSS,
    inputsErrors,
    regex,
    gmailRegex,
    errorToast,
    heroIconCSS,
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
  let isValid = true;

  const registerInputHandler = (elem) => {
    let { value, id, name } = elem.target;
    const errorPara = gettingErrorPara(`Error-Para-${name}`);
    const lable = gettingLable(`Label-${name}`);
    const input = gettingInput(`${name}`);
    inputsErrors("ok", errorPara, lable, input);
    formDispatch({ type: "INPUT_CHANGE", inputID: id, inputValue: value });

    if (
      id === "Name" ||
      id === "Email" ||
      id === "CNIC" ||
      id === "Password" ||
      id === "Repeat Password"
    ) {
      if (!value) {
        inputsErrors("required", errorPara, lable, input);
        if (id === "Password") {
          setPassword("");
        }
        return;
      }
    }

    if (id === "Name") {
      if (regex.test(value)) {
        inputsErrors("invalid_chars", errorPara, lable, input);
      } else if (/\s{2,}/.test(value) || value.startsWith(" ")) {
        inputsErrors("leading_space", errorPara, lable, input);
      }
    }

    if (id === "Email") {
      if (!gmailRegex.test(value)) {
        inputsErrors("invalid_format", errorPara, lable, input);
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
      if (digit.length !== 13) {
        inputsErrors("invalid_length", errorPara, lable, input);
      }
    }

    if (id === "Password") {
      if (/\s+/g.test(value)) {
        setPassword("");
        inputsErrors("no_space", errorPara, lable, input);
      } else if (value.length <= 8) {
        setPassword("");
        inputsErrors("too_short", errorPara, lable, input);
      } else {
        setPassword(value);
      }
    }

    if (id === "Repeat Password") {
      if (!password.trim() && password.length <= 8) {
        inputsErrors("password_empty_when_repeat", errorPara, lable, input);
        elem.target.value = "";
      } else if (value !== password) {
        inputsErrors("password_mismatch", errorPara, lable, input);
      }
    }

    if (
      errorParaRef.current
        .map((e) => e.innerText === "OK")
        .every((e) => e === true)
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
  };

  const resetForm = () => {
    inputRef.current.map((e) => {
      return (e.value = ""), (e.style.borderColor = "white");
    });
    errorParaRef.current.map((e) => {
      e.innerHTML = "";
    });
    lableRef.current.map((e) => {
      e.style.textDecorationColor = "white";
    });
    formDispatch({ type: "RESET_FORM" });
    setLoading(false);
    isValid = false;
  };

  const registerFormHandler = async () => {
    event.preventDefault();
    const errorStatuses = errorParaRef.current.map((e) => e.innerText);
    Object.entries(formValues).forEach(([key, value], i) => {
      if (
        !value ||
        value === undefined ||
        value === null ||
        errorStatuses[i] !== "OK" ||
        Object.values(formValues).every(
          (value) => !value && value === null && value === undefined
        )
      ) {
        const errorPara = errorParaRef.current[i];
        const label = lableRef.current[i];
        const input = inputRef.current[i];
        inputsErrors("required", [errorPara], [label], [input]);
        inputsErrors("required", [errorPara], [label], [input]);

        isValid = false;
      }
      if (key === "Repeat Password") {
        if (value !== password) {
          inputsErrors(
            "password_mismatch",
            errorParaRef.current.filter(
              (e) => e.id == "Error-Para-Repeat Password"
            ),
            lableRef.current.filter((e) => e.id === "Label-Repeat Password"),
            inputRef.current.filter((e) => e.id === "Repeat Password")
          );
          isValid = false;
        }
      }
    });

    if (isValid) {
      try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formValues.Email,
          formValues.Password
        );
        if (userCredential.user) {
          await setDoc(
            doc(db, "Users", userCredential?.user?.uid),
            {
              ...formValues,
              createdAt: userCredential?.user.metadata.creationTime,
            },
            { merge: true }
          );
        }
        errorToast("Register SuccessFully", 200, 200, 200);
        resetForm();
        navigate("/sign-in");
      } catch (error) {
        setLoading(false);
        console.error(error?.message);
        errorToast(error?.code, errorParaRef, lableRef, inputRef);
      } finally {
        setLoading(false);
      }
      return;
    }
  };

  return (
    <>
      <div
        className={`w-full h-dvh flex flex-col tablet:flex-row justify-start items-start ${mainColor}`}
      >
        <AuthImage />
        <div
          className={`flex flex-col justify-evenly items-center tablet:w-[50%] w-full h-full px-4`}
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
                      className={`${inputCSS}`}
                      ref={(el) => (inputRef.current[index] = el)}
                      autoComplete="off"
                      id={`${elem}`}
                      name={elem}
                      disabled={loading}
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
                        disabled={loading}
                      >
                        {passwordEye[elem] ? <EyeIcon /> : <EyeSlashIcon />}
                      </button>
                    )}

                    <p
                      className={`absolute text-xs tablet:text-sm top-2 right-2 flex items-center gap-2 tracking-widest text-red-500`}
                      id={`Error-Para-${elem}`}
                      ref={(el) => (errorParaRef.current[index] = el)}
                    ></p>
                  </div>
                </React.Fragment>
              );
            })}
          </form>

          <div className="font-elmssans-medium tablet:text-lg text-sm text-main w-full flex flex-wrap gap-5 justify-center items-center pb-5">
            <button
              className="bg-card px-10 py-2 rounded-3xl disabled:opacity-50 flex items-center gap-4"
              type="submit"
              onClick={registerFormHandler}
              disabled={loading}
            >
              Register{" "}
              {loading ? (
                <ArrowPathRoundedSquareIcon
                  className={`${heroIconCSS} animate-spin`}
                />
              ) : (
                <IdentificationIcon className={heroIconCSS} />
              )}
            </button>
            <NavLink
              to={loading || `/sign-in`}
              className={`flex items-center px-10 py-2 shadow-xl/70 shadow-card gap-4 ${
                windowMode === "dark" && "shadow-none border-b border-r"
              } ${mainColor}`}
              disabled={loading}
            >
              Sign In
              {loading ? (
                <ArrowPathRoundedSquareIcon
                  className={`${heroIconCSS} animate-spin`}
                />
              ) : (
                <ArrowLongRightIcon className={heroIconCSS} />
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
