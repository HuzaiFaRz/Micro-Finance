import { Fragment, useContext, useState } from "react";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

import { Bars3BottomRightIcon, TrashIcon } from "@heroicons/react/16/solid";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { useNavigate } from "react-router";

const Profile = () => {
  const { isUser } = AuthUseContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast } = useContext(GlobalContextCreated);

  const {
    Name,
    Email,
    Password,
    CNIC,
    PhoneNumber,
    accountDetails,
    createdAt,
    contactMesseges,
  } = isUser;

  const { accountTittle, accountNumber } = accountDetails;

  const [aside, setAside] = useState(false);

  const asideHandler = () => {
    setAside(!aside);
  };

  const deleteAccountHandler = async () => {
    event.preventDefault();
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
      navigate("sign-in");
    } catch (error) {
      setLoading(false);
      console.error(error?.message);
      errorToast(error?.code, null, null, null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="w-full h-full font-elmssans-light bg-black">
        <div className="w-full h-[400px] relative">
          <img
            src="https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="w-[200px] h-[200px] bg-card rounded-full flex justify-center items-center text-9xl absolute -bottom-20 left-1/2 -translate-x-1/2 border-black border-4">
            {Name?.toUpperCase()[0]}
          </div>
        </div>

        <div className="flex flex-col justify-start items-start mt-22 tablet:mt-7 text-main py-5">
          <div className="flex flex-wrap justify-between items-center gap-2 w-full border-b px-2 tablet:px-5 py-3">
            <h1 className="text-3xl tablet:text-6xl">{Name}!</h1>
            <h6 className="text-sm tablet:text-xl text-gray-400">{Email}</h6>
          </div>
          <Bars3BottomRightIcon
            className="size-10 m-3 flex tablet:hidden cursor-pointer"
            onClick={asideHandler}
          />

          <div className="flex flex-row w-full p-4 justify-center items-center gap-5 relative">
            <aside
              className={`h-[300px] w-full tablet:w-[30%] absolute tablet:sticky ${aside ? "left-0" : "-left-full"} bg-card flex flex-col justify-evenly items-start px-3 tablet:text-2xl text-lg text-main cursor-pointer transition-all`}
            >
              <span className="bg-green-500 py-2 px-3 w-full hover:bg-black/60">
                Generel Info
              </span>
              <span className="bg-yellow-500 py-2 px-3 w-full hover:bg-black/60">
                Security
              </span>
              <span className="bg-red-500 py-2 px-3 w-full hover:bg-black/60">
                Danger Zone
              </span>
            </aside>
            <div
              className={`h-[300px] w-full tablet:w-[70%] bg-card flex flex-col justify-evenly items-start px-3 text-2xl text-main cursor-pointer `}
            >
              <button
                className={
                  "px-3 desktop:px-4 py-2 tablet:text-xs desktop:text-sm text-[17px] flex gap-3 items-center bg-red-600 rounded-lg hover:bg-hover"
                }
                disabled={loading}
              >
                Delete Account <TrashIcon className={`tablet:size-4 size-5`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
