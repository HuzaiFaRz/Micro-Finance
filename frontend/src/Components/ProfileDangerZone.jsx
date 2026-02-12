import { useContext, useState } from "react";

import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { TrashIcon } from "@heroicons/react/16/solid";

const ProfileDangerZone = () => {
  const [loading, setLoading] = useState(false);

  const { errorToast } = useContext(GlobalContextCreated);
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
    <form className="w-full h-[485px]">
      <h1 className="font-elmssans-bold text-2xl tablet:text-4xl w-full text-center pb-12">
        Hello
      </h1>
      <button
        className={
          "px-3 desktop:px-4 py-2 tablet:text-xs desktop:text-sm text-[17px] flex gap-3 items-center bg-red-600 rounded-lg hover:bg-hover"
        }
        disabled={loading}
      >
        Delete Account
        <TrashIcon className={`tablet:size-4 size-5`} />
      </button>
    </form>
  );
};

export default ProfileDangerZone;
