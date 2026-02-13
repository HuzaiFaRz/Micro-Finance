import { useContext, useState } from "react";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowPathRoundedSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { useNavigate } from "react-router";

const ProfileDangerZone = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { errorToast } = useContext(GlobalContextCreated);

  const { isUser, loan } = AuthUseContext();

  const [whoWarnClick, setWhoWarnClick] = useState();

  const [passwordValue, setPasswordValue] = useState();
  const [passwordEye, setPasswordEye] = useState();

  const deleteAccountHandler = async () => {
    event.preventDefault();
    if (!passwordValue) {
      errorToast("Empty Field Detected");
      return;
    }
    if (passwordValue !== isUser?.Password) {
      errorToast("Kindly Enter Correct Password");
      return;
    }

    if (loan) {
      errorToast("Your Loans Are Pending");
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
      await deleteDoc(doc(db, "Users", user?.uid));
      await deleteUser(user);
      errorToast("Account Deleted SuccessFully", 200, 200, 200);
    } catch (error) {
      setLoading(false);
      console.error(error?.message);
      errorToast(error?.code, null, null, null);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    event.preventDefault();
    try {
      setLoading(true);
      await signOut(auth);
      errorToast("Sign Out SuccessFully", 200, 200, 200);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      console.error(error?.message);
      errorToast(error?.code, null, null, null);
    } finally {
      setLoading(false);
    }
  };

  const whoWarnClickHandler = (event) => {
    event.preventDefault();
    setWhoWarnClick(event.target.name);
  };

  return (
    <div className="w-full h-full font-elmssans-light flex flex-col justify-start gap-10">
      {/* Header */}

      {whoWarnClick === "DeleteAccount" && (
        <div className="fixed inset-0 w-full h-svh bg-black/85 backdrop-blur-lg z-100 flex justify-center items-center p-4">
          <div className="w-full tablet:w-[500px] h-[300px] bg-black flex flex-col justify-evenly items-center">
            <form className="flex relative flex-wrap justify-between items-center gap-1 text-[16px] tablet:text-lg p-1">
              <label htmlFor={"Password"}>Enter Your Password</label>
              <input
                placeholder={"Password"}
                type={passwordEye ? "text" : "password"}
                id={"Password"}
                disabled={loading}
                className="p-3 bg-layout w-full tracking-wider"
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                }}
              />
              <button
                type="button"
                className={`absolute top-[55%] right-4 size-5`}
                onClick={() => setPasswordEye(!passwordEye)}
                disabled={loading}
              >
                {passwordEye ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </form>

            <div className="text-white flex flex-wrap justify-center items-center gap-5">
              <button
                className={"px-4 py-2 text-lg bg-green-600"}
                onClick={() => {
                  setWhoWarnClick(false);
                }}
                disabled={loading}
              >
                Cancle
              </button>
              <button
                className={
                  "px-4 py-2 text-lg flex gap-3 items-center bg-red-600"
                }
                onClick={deleteAccountHandler}
                disabled={loading}
              >
                Delete Account
                {loading ? (
                  <ArrowPathRoundedSquareIcon
                    className={`tablet:size-4 size-5 animate-spin`}
                  />
                ) : (
                  <TrashIcon className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-between items-center gap-4 w-full">
        <h1 className="text-5xl text-red-600">Hello</h1>
        <p className="text-lg text-gray-200">
          Actions below are irreversible.{" "}
          <strong>Please proceed with caution.</strong>
        </p>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 bg-black/50 p-5">
        <div className="flex flex-col justify-between items-start gap-3">
          <h3 className="text-gray-200 text-lg tablet:text-2xl font-elmssans-bold">
            Delete Account
          </h3>
          <p className="text-lg text-gray-300">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white text-lg px-5 py-2 rounded-xl transition duration-200 
        mt-3 flex items-center gap-2"
          name="DeleteAccount"
          onClick={whoWarnClickHandler}
          disabled={loading}
        >
          Delete Account <TrashIcon className="size-5" />
        </button>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 bg-black/50 p-5">
        <div className="flex flex-col justify-between items-start gap-3">
          <h3 className="text-gray-200 text-lg tablet:text-2xl font-elmssans-bold">
            Logout from All Devices
          </h3>
          <p className="text-lg text-gray-300">
            This will sign you out from all active sessions.
          </p>
        </div>

        <button
          className="bg-red-600 hover:bg-red-700 text-white text-lg px-5 py-2 rounded-xl transition duration-200 flex items-center gap-2"
          onClick={logoutHandler}
          name="LogoutAll"
          disabled={loading}
        >
          Logout All{" "}
          {loading ? (
            <ArrowPathRoundedSquareIcon
              className={`tablet:size-4 size-5 animate-spin`}
            />
          ) : (
            <ArrowLeftEndOnRectangleIcon className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileDangerZone;
