import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { NavLink, useNavigate } from "react-router";
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
import AuthFormReducer from "../Reducers/AuthFormReducer";
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [passwordEye, setPasswordEye] = useState(false);

  const passwordEyeHandler = () => {
    setPasswordEye(!passwordEye);
  };

  const sigInInputs = useMemo(() => ["Email", "Password"], []);

  const initialValues = useMemo(
    () =>
      sigInInputs.reduce((loop, currentValue) => {
        loop[currentValue] = "";
        return loop;
      }, {}),
    [sigInInputs],
  );

  const {
    windowMode,
    passwordEyeCSS,
    mainColor,
    inputCSS,
    labelCSS,
    inputsErrors,
    gmailRegex,
    errorToast,
    heroIconCSS,
    isButtonClick,
    setIsButtonClick,
  } = useContext(GlobalContextCreated);

  const [formValues, formDispatch] = useReducer(AuthFormReducer, initialValues);

  useEffect(() => {
    const { Email, Password } = formValues;
    if (!Email || !Password) {
      errorToast("Kindly Complete Form", errorParaRef, lableRef, inputRef);
      return;
    }
  }, [isButtonClick]);

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

  let isValid = true;

  const signInInputHandler = (elem) => {
    let { value, id, name } = elem.target;
    const errorPara = gettingErrorPara(`Error-Para-${name}`);
    const lable = gettingLable(`Label-${name}`);
    const input = gettingInput(`${name}`);
    inputsErrors("ok", errorPara, lable, input);
    formDispatch({ type: "INPUT_CHANGE", inputID: id, inputValue: value });

    if (id === "Email" || id === "Password") {
      if (!value) {
        inputsErrors("required", errorPara, lable, input);
        return;
      }
      if (id === "Email" && !gmailRegex.test(value)) {
        inputsErrors("invalid_format", errorPara, lable, input);
        return;
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
      return ((e.value = ""), (e.style.borderColor = "white"));
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

  const signInFormHandler = async () => {
    event.preventDefault();
    setIsButtonClick(!isButtonClick);
    const errorStatuses = errorParaRef.current.map((e) => e.innerText);
    Object.entries(formValues).forEach(([, value], i) => {
      if (
        !value ||
        value === undefined ||
        value === null ||
        errorStatuses[i] !== "OK" ||
        Object.values(formValues).every(
          (value) => !value && value === null && value === undefined,
        )
      ) {
        const errorPara = errorParaRef.current[i];
        const label = lableRef.current[i];
        const input = inputRef.current[i];
        inputsErrors("required", [errorPara], [label], [input]);
        inputsErrors("required", [errorPara], [label], [input]);
        isValid = false;
      }
    });

    if (isValid) {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(
          auth,
          formValues.Email,
          formValues.Password,
        );
        errorToast("Welcome To M_Finance", 200, 200, 200);
        resetForm();
        navigate("/");
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
        className={`w-full h-svh flex flex-col tablet:flex-row justify-between items-start ${mainColor}`}
      >
        <AuthImage />
        <div
          className={`flex flex-col justify-between items-center tablet:w-[50%] w-full h-full px-4`}
        >
          <AuthHead />

          <form
            className={`flex flex-col justify-start items-start w-full x-10 py-5 gap-5 text-sm tablet:text-[16px] font-elmssans-light tracking-wider ${mainColor}`}
          >
            {sigInInputs.map((elem, index) => {
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
                      className={`${inputCSS}`}
                      ref={(el) => (inputRef.current[index] = el)}
                      autoComplete="off"
                      id={`${elem}`}
                      name={elem}
                      disabled={loading}
                      type={
                        elem === "Password"
                          ? passwordEye
                            ? "text"
                            : "password"
                          : "text"
                      }
                      placeholder={`${elem}...`}
                      onChange={signInInputHandler}
                    />

                    {elem === "Password" && (
                      <button
                        type="button"
                        className={`${passwordEyeCSS}`}
                        onClick={() => passwordEyeHandler()}
                        disabled={loading}
                      >
                        {passwordEye ? <EyeIcon /> : <EyeSlashIcon />}
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
              onClick={signInFormHandler}
              disabled={loading}
            >
              Sign In
              {loading ? (
                <ArrowPathRoundedSquareIcon
                  className={`${heroIconCSS} animate-spin`}
                />
              ) : (
                <IdentificationIcon className={heroIconCSS} />
              )}
            </button>
            <NavLink
              to={loading || `/register`}
              className={`flex items-center px-10 py-2 shadow-xl/70 shadow-card gap-4 ${
                windowMode === "dark" && "shadow-none border-b border-r"
              } ${mainColor}`}
              disabled={loading}
            >
              Register
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

export default SignIn;
