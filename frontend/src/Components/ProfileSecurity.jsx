import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon,
} from "@heroicons/react/16/solid";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { useContext, useState } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const ProfileSecurity = () => {
  const { isUser } = AuthUseContext();
  const [loading, setLoading] = useState(false);
  const { heroIconCSS, errorToast } = useContext(GlobalContextCreated);
  let securityInputs = ["OldPassword", "NewPassword"];
  const [passwordEye, setPasswordEye] = useState({
    password: true,
    repeatPassword: true,
  });

  const passwordEyeHandler = (elem) => {
    setPasswordEye((prev) => ({
      ...prev,
      [elem]: !prev[elem],
    }));
  };

  const [passwordValues, setPasswordValues] = useState({});

  const changePasswordHandler = (event) => {
    event.preventDefault();
    const { OldPassword, NewPassword } = passwordValues;

    if (!OldPassword || !NewPassword) {
      errorToast("Empty Field Detected");
      return;
    }

    if (OldPassword !== isUser?.Password) {
      errorToast("Kindly Enter Correct old Password");
      return;
    }

    if (/\s+/g.test(NewPassword)) {
      errorToast("Avoid Any Kind of Space");
      return;
    }

    if (NewPassword.length <= 8) {
      errorToast("Password is Too Short");
      return;
    }

    try {
      setLoading(true);
      console.log(OldPassword, NewPassword);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[485px] ">
      <h1 className="font-elmssans-bold text-2xl tablet:text-4xl w-full text-center pb-12">
        Your Password Here
      </h1>
      <form
        className="flex flex-col justify-between gap-10 w-full"
        onSubmit={changePasswordHandler}
      >
        {securityInputs.map((elem, index) => {
          return (
            <div
              className="relative flex flex-wrap justify-between items-center gap-4 text-[16px] tablet:text-lg p-1"
              key={index}
            >
              <label htmlFor={elem} key={index}>
                Enter {elem.replace(/([a-z])([A-Z])/g, "$1 $2")}:
              </label>
              <input
                placeholder={elem.replace(/([a-z])([A-Z])/g, "$1 $2")}
                type={!passwordEye[elem] ? "text" : "password"}
                id={elem}
                disabled={loading}
                className="p-3 bg-layout w-full tracking-wider"
                onChange={(e) => {
                  setPasswordValues((prev) => ({
                    ...prev,
                    [elem]: e.target.value,
                  }));
                }}
              />
              <button
                type="button"
                className={`absolute top-[60%] right-6 size-6`}
                onClick={() => passwordEyeHandler(elem)}
                disabled={loading}
              >
                {passwordEye[elem] ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
          );
        })}
        <button
          className="bg-black px-10 py-5 text-center disabled:opacity-50 flex items-center gap-4 text-lg tablet:text-2xl"
          type="submit"
          disabled={loading}
        >
          Change Password{" "}
          {loading ? (
            <ArrowPathRoundedSquareIcon
              className={`${heroIconCSS} animate-spin`}
            />
          ) : (
            <ArrowLongRightIcon className={`size-8`} />
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileSecurity;
