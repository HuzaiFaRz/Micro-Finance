import { Fragment, useContext, useEffect, useState } from "react";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

import {
  Bars3BottomRightIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { useNavigate } from "react-router";
import AuthLoadingPage from "../Components/AuthLoadingPage";

const Profile = () => {
  const { isUser } = AuthUseContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { regex, errorToast } = useContext(GlobalContextCreated);

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

  let asideButtons = [
    {
      button_COLOR: "yellow",
      button_ID: "GenerelInfo",
    },
    {
      button_COLOR: "green",
      button_ID: "Security",
    },
    {
      button_COLOR: "red",
      button_ID: "DangerZone",
    },
  ];

  const [whatAsideContentOpen, setWhatAsideContentOpen] = useState([
    true,
    false,
    false,
  ]);

  let asideContent = [
    {
      content: "normal info",
      content_ID: "GenerelInfo",
    },
    {
      content: "password hear",
      content_ID: "Security",
    },
    {
      content: "delete account now",
      content_ID: "DangerZone",
    },
  ];

  whatAsideContentOpen.map((e, i) => {
    asideContent[i].contentOPEN = e;
  });

  const asideButtonHandler = (event) => {
    event.preventDefault();
    let a = asideContent.map(
      (e, i) => (event.target.id || asideButtons[i].button_ID) === e.content_ID,
    );
    setAside(false);
    setWhatAsideContentOpen(a);
  };

  let [userNewName, setUserNewName] = useState("");
  let [isUserNameEdit, setIsUserNameEdit] = useState(false);
  const editNameHandler = async () => {
    if (
      regex.test(userNewName) ||
      userNewName.startsWith(" ") ||
      /\s{2,}/.test(userNewName) ||
      !userNewName
    ) {
      errorToast(
        "Please Avoid Extra space or a Empty Message or a Special Chars",
      );
      return;
    }

    if (userNewName === Name) {
      setUserNewName(Name);
      errorToast("No Changes Detected");
      return;
    }

    if (userNewName.length > 25) {
      errorToast("To Long Name");
      return;
    }

    try {
      setLoading(true);
      let query = doc(db, "Users", auth.currentUser.uid);
      await updateDoc(query, {
        Name: userNewName,
      });
      setLoading(false);
      setIsUserNameEdit(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) {
    return <AuthLoadingPage />;
  }

  return (
    <Fragment>
      <div className="w-full h-full font-elmssans-light bg-black">
        <div className="w-full h-[400px] relative">
          <img
            src="https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="w-[200px] h-[200px] bg-card rounded-full flex justify-center items-center text-9xl absolute -bottom-20 left-1/2 -translate-x-1/2  border-4 border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {Name?.toUpperCase()[0]}
          </div>
        </div>

        <div className="flex flex-col justify-start items-start mt-22 tablet:mt-7 text-main py-5">
          <div className="flex flex-wrap justify-between items-center gap-2 w-full border-b px-2 tablet:px-5 py-3 mt-5">
            <h1 className="text-3xl tablet:text-6xl">{Name}!</h1>
            <h6 className="text-sm tablet:text-xl text-gray-400">{Email}</h6>
          </div>

          {aside ? (
            <LockOpenIcon
              className="size-10 m-3 flex tablet:hidden cursor-pointer"
              onClick={asideHandler}
            />
          ) : (
            <LockClosedIcon
              className="size-10 m-3 flex tablet:hidden cursor-pointer"
              onClick={asideHandler}
            />
          )}

          <div className="flex flex-row w-full p-4 justify-center items-center gap-5 relative">
            <aside
              className={`h-[300px] w-full tablet:w-[30%] absolute tablet:sticky ${aside ? "left-0" : "-left-full"} bg-card flex flex-col justify-evenly items-start px-3 tablet:text-2xl text-lg text-main cursor-pointer transition-all z-100`}
            >
              {asideButtons.map((elem, index) => {
                return (
                  <button
                    className={`${whatAsideContentOpen[index] ? "bg-black/60" : `bg-${elem.button_COLOR}-500`} py-2 px-3 w-full hover:bg-black/60 text-start font-elmssans-medium rounded-tr-2xl`}
                    id={elem.button_ID}
                    key={index}
                    onClick={asideButtonHandler}
                    type="button"
                  >
                    {elem.button_ID.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </button>
                );
              })}
            </aside>

            {asideContent.map((elem, index) => {
              return (
                <div
                  className={`h-full p-5 w-full tablet:w-[70%] bg-card flex flex-col justify-evenly items-start text-2xl text-main ${whatAsideContentOpen[index] ? "flex" : "hidden"}`}
                  key={index}
                  id={elem.content_ID}
                >
                  {elem.content_ID == "GenerelInfo" && (
                    <>
                      <h1 className="font-elmssans-bold text-2xl tablet:text-4xl w-full text-center pb-12">
                        Your Amazing Info
                      </h1>
                      <div
                        className={`w-full h-full flex flex-col justify-evenly items-start gap-8 text-lg tablet:text-xl font-elmssans-medium tracking-wider`}
                      >
                        <div
                          className={`relative w-full flex flex-wrap justify-start items-center gap-3`}
                        >
                          Name:{" "}
                          {isUserNameEdit ? (
                            <input
                              className={`p-1 px-3 w-auto tablet:w-[300px] ${isUserNameEdit ? "border" : "border-none"}`}
                              onChange={(e) => {
                                setUserNewName(e.target.value);
                              }}
                              disabled={loading}
                              defaultValue={Name}
                            />
                          ) : (
                            Name
                          )}
                          <PencilSquareIcon
                            onClick={() => {
                              setIsUserNameEdit(!isUserNameEdit);
                            }}
                            className={`absolute size-5 cursor-pointer right-0 -top-6`}
                          />
                          {isUserNameEdit && (
                            <button
                              className="px-4 bg-black py-1 ml-3"
                              type="button"
                              onClick={editNameHandler}
                              disabled={loading}
                            >
                              {loading ? "Editing..." : "Edit now"}
                            </button>
                          )}
                        </div>
                        <div>CNIC: {CNIC}</div>
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
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
