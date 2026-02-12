import { useContext, useState } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

const ProfileGenerelInfo = () => {
  const { isUser } = AuthUseContext();
  const [loading, setLoading] = useState(false);
  const { regex, errorToast } = useContext(GlobalContextCreated);

  const { PhoneNumber, accountDetails, createdAt } = isUser;
  const { accountTittle, accountNumber } = accountDetails;

  let [userNewInfo, setUserNewInfo] = useState({
    Name: isUser?.Name,
    CNIC: isUser?.CNIC,
  });

  let [isUserInfoEdit, setIsUserInfoEdit] = useState(false);

  const editInfoHandler = async () => {
    const { Name, CNIC } = userNewInfo;
    if (!Name || !CNIC) {
      errorToast("Empty Field Detected");
      return;
    }

    if (
      regex.test(Name) ||
      /\s{2,}/.test(Name) ||
      Name.startsWith(" ") ||
      Name.endsWith(" ") ||
      regex.test(CNIC) ||
      /\s{2,}/.test(CNIC) ||
      CNIC.startsWith(" ") ||
      CNIC.endsWith(" ")
    ) {
      errorToast("Please Avoid Extra space or a Special Char");
      return;
    }

    if (Name.length > 25) {
      errorToast("To Long Name");
      return;
    }

    if (isNaN(CNIC)) {
      errorToast("Invalid Char in CNIC");
      return;
    }

    if (CNIC.length !== 13) {
      errorToast("Invalid Length of CNIC");
      return;
    }

    if (Name === isUser?.Name && CNIC === isUser?.CNIC) {
      errorToast("No Changes Detected");
      return;
    }

    try {
      setLoading(true);
      let query = doc(db, "Users", auth.currentUser.uid);
      await updateDoc(query, {
        Name: Name,
        CNIC: CNIC,
      });
      setLoading(false);
      setIsUserInfoEdit(false);
      errorToast("Info Updated", 200, 200, 200);
      location.reload();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="font-elmssans-bold text-2xl tablet:text-4xl w-full text-center pb-12">
        Your Amazing Info
      </h1>
      <div
        className={`w-full h-[400px] flex flex-col justify-evenly items-start gap-8 text-lg tablet:text-xl font-elmssans-medium tracking-wider relative`}
      >
        {[
          { id: "Name", value: isUser?.Name },
          { id: "CNIC", value: isUser?.CNIC },
        ].map((elem, index) => {
          const { id, value } = elem;
          return (
            <div
              className={`relative w-full flex flex-wrap justify-start items-center gap-3`}
              key={index}
            >
              {id}:{" "}
              {isUserInfoEdit ? (
                <input
                  className={`p-1 w-full tablet:w-[60%] ${isUserInfoEdit ? "border-b" : "border-none"}`}
                  onChange={(e) => {
                    setUserNewInfo((prev) => ({
                      ...prev,
                      [id]: e.target.value,
                    }));
                  }}
                  type={id === "CNIC" ? "tel" : "text"}
                  disabled={loading}
                  defaultValue={userNewInfo[id]}
                  maxLength={id === "CNIC" ? "13" : "25"}
                />
              ) : (
                value
              )}
            </div>
          );
        })}

        <div className="absolute -top-10 right-0 w-full cursor-pointer flex flex-col justify-end items-end gap-4">
          <PencilSquareIcon
            onClick={() => {
              setIsUserInfoEdit(!isUserInfoEdit);
            }}
            className={`size-6`}
          />

          {isUserInfoEdit && (
            <button
              className="px-4 bg-black py-1"
              type="button"
              onClick={editInfoHandler}
              disabled={loading}
            >
              {loading ? "Editing..." : "Edit now"}
            </button>
          )}
        </div>

        <div>Phone Number: {PhoneNumber}</div>
        <div>Join At: {createdAt}</div>
        <div className="bg-blue-800 p-3 w-full flex flex-wrap justify-evenly items-center gap-2">
          <p className="text-gray-400 text-xl tablet:text-2xl">
            Account Details
          </p>
          <div className="text-sm tablet:text-lg flex flex-wrap justify-center gap-2 tablet:gap-4">
            <p>{accountNumber}</p>
            <p>{accountTittle}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileGenerelInfo;
