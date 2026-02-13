import {
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { auth, db } from "../Firebase/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

const ProfileSecurity = () => {
  const { isUser } = AuthUseContext();
  const [loading, setLoading] = useState(false);
  const { heroIconCSS, errorToast } = useContext(GlobalContextCreated);
  let securityInputs = ["OldPassword", "NewPassword", "RepeatPassword"];
  const [passwordEye, setPasswordEye] = useState({});

  const passwordEyeHandler = (elem) => {
    setPasswordEye((prev) => ({
      ...prev,
      [elem]: !prev[elem],
    }));
  };

  const [settingPasswordChangeTime, setSettingPasswordChangeTime] =
    useState(null);

  useEffect(() => {
    if (isUser?.LastPasswordChangeTime) {
      const timestampInMilliseconds =
        isUser?.LastPasswordChangeTime?.seconds * 1000 +
        isUser?.LastPasswordChangeTime?.nanoseconds / 1000000;
      const date = new Date(timestampInMilliseconds).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setSettingPasswordChangeTime(date);
      return;
    }
    setSettingPasswordChangeTime(null);
  }, [isUser?.LastPasswordChangeTime]);

  const [passwordValues, setPasswordValues] = useState({});

  const changePasswordHandler = async (event) => {
    event.preventDefault();
    const { OldPassword, NewPassword, RepeatPassword } = passwordValues;

    if (!OldPassword || !NewPassword || !RepeatPassword) {
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

    if (RepeatPassword !== NewPassword) {
      errorToast("Password Don't Match");
      return;
    }

    if (NewPassword === isUser?.Password) {
      errorToast("Your new password cannot be the same as your old password.");
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        isUser.Email,
        isUser.Password,
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, NewPassword);
      let query = doc(db, "Users", auth.currentUser.uid);
      await updateDoc(query, {
        Password: NewPassword,
        RepeatPassword: RepeatPassword,
        LastPasswordChangeTime: serverTimestamp(),
      });
      errorToast("Password Updated", 200, 200, 200);
      location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error.code, null, null, null);
      console.error(error);
    }
  };

  return (
    <div
      className={`w-full ${isUser?.LastPasswordChangeTime ? "h-[550px]" : "h-[490px]"} flex flex-col justify-between items-center`}
    >
      <h1 className="font-elmssans-bold text-2xl tablet:text-4xl w-full text-center">
        Your Password Here
      </h1>
      <form
        className="flex flex-col justify-between gap-6 w-full"
        onSubmit={changePasswordHandler}
      >
        {securityInputs.map((elem, index) => {
          return (
            <div
              className="relative flex flex-wrap justify-between items-center gap-1 text-[16px] tablet:text-lg p-1"
              key={index}
            >
              <label htmlFor={elem}>
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
                className={`absolute top-[55%] right-4 size-5`}
                onClick={() => passwordEyeHandler(elem)}
                disabled={loading}
              >
                {passwordEye[elem] ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
          );
        })}
        <button
          className="bg-black px-10 py-4 text-center disabled:opacity-50 flex items-center gap-4 text-lg tablet:text-2xl"
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
        {isUser?.LastPasswordChangeTime && (
          <span className="text-sm bg-black w-full text-center p-3 text-gray-400">
            Your password was last changed on {settingPasswordChangeTime}
          </span>
        )}
      </form>
    </div>
  );
};

export default ProfileSecurity;
