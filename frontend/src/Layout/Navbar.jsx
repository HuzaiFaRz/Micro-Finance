import React, { Fragment, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowPathRoundedSquareIcon,
  Bars3BottomRightIcon,
  CurrencyDollarIcon,
  TrashIcon,
  UserIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { Tooltip } from "react-tooltip";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Navbar = () => {
  const navigate = useNavigate();
  const { isUser } = AuthUseContext();
  const [warn, setWarn] = useState(false);

  const [loading, setLoading] = useState(false);

  const { errorToast } = useContext(GlobalContextCreated);

  let [navbarButton, setNavbarButton] = useState(false);

  const [whoButton, setWhoButton] = useState(null);

  const authButton = [
    { linkName: "Register", linkURL: "register" },
    { linkName: "Sign In", linkURL: "sign-in" },
  ];

  const nav_Links = [
    { linkName: "Home", linkURL: "/" },
    { linkName: "Contact Us", linkURL: "contact" },
    { linkName: "About Us", linkURL: "about" },
    { linkName: "Dashboard", linkURL: "dashboard" },
    { linkName: "Apply Now", linkURL: "loan-form" },
  ];

  nav_Links.map((e) => {
    return Object.freeze(e);
  });

  const navbarEvent = () => {
    setNavbarButton(!navbarButton);
  };

  const warnEvent = (e) => {
    setWhoButton(e);
    setNavbarButton(false);
    setWarn(!warn);
  };

  const windowResizeing = () => {
    if (window.innerWidth > 830) {
      if (navbarButton) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      document.body.style.overflow = "auto";
      return;
    }
  };

  useEffect(() => {
    document.body.style.overflow = navbarButton || warn ? "hidden" : "";
    window.addEventListener("resize", windowResizeing);
    return () => window.removeEventListener("resize", windowResizeing);
  });

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

  const deleteAccountHandler = async () => {
    event.preventDefault();
    try {
      setLoading(true);
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        isUser.Email,
        isUser.Password
      );
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      await deleteDoc(doc(db, "Users", user?.uid));
      errorToast("Account Deleted SuccessFully", 200, 200, 200);
      setNavbarButton(false);
      setWarn(false);
        navigate("/register");
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
      <>
        <header className="z-100 tablet:z-0 w-full h-16 bg-layout text-main fixed top-0 right-0 flex visible tablet:invisible tablet:hidden justify-between items-center p-5">
          {navbarButton ? (
            <XMarkIcon
              className="size-10 cursor-pointer"
              onClick={navbarEvent}
            />
          ) : (
            <Bars3BottomRightIcon
              className="size-10 cursor-pointer"
              onClick={navbarEvent}
            />
          )}

          <NavLink
            to={"profile"}
            className={
              "w-10 h-10 bg-main rounded-full flex justify-center items-center text-black text-xl font-elmssans-bold "
            }
          >
            {isUser?.Name?.toUpperCase()[0] || `Hi`}
          </NavLink>
        </header>

        <nav
          className={`bg-layout fixed top-0 tablet:left-0 w-full h-full tablet:h-16 flex flex-col tablet:flex-row items-center justify-center tablet:justify-between p-2 -left-full z-50 transition-all text-main ${
            navbarButton && "left-0"
          }`}
        >
          <div className="nav-start absolute top-20 tablet:static">
            <CurrencyDollarIcon className="size-12 tablet:size-10" />
          </div>

          <div className="nav-center flex flex-col tablet:flex-row justify-center items-start tablet:items-center w-full tablet:w-auto px-0 desktop:px-5 gap-8 tablet:gap-3 desktop:gap-6 font-elmssans-medium">
            {nav_Links.map((elem, index) => {
              const { linkName, linkURL } = elem;
              return (
                <React.Fragment key={index}>
                  <NavLink
                    to={linkURL}
                    className={`py-2 px-2 tablet:text-xs desktop:text-sm text-xl hover:underline underline-offset-2 ${
                      linkName === "Apply Now" &&
                      "px-4 bg-blue-600 rounded-lg hover:bg-hover"
                    }`}
                    onClick={() => {
                      setNavbarButton(false);
                    }}
                  >
                    {linkName}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex justify-evenly w-full tablet:w-auto items-center tablet:gap-3 desktop:gap-5 font-elmssans-medium mt-12 tablet:mt-0 absolute bottom-5 tablet:static">
            {isUser === null
              ? authButton.map((elem, index) => {
                  const { linkName, linkURL } = elem;
                  return (
                    <React.Fragment key={index}>
                      <NavLink
                        className={
                          "px-3 desktop:px-4 py-2 tablet:text-xs desktop:text-sm text-xl flex gap-1 items-center bg-green-600 rounded-lg hover:bg-hover"
                        }
                        to={linkURL}
                      >
                        {linkName}
                        {index === 0 ? (
                          <UserPlusIcon className={`tablet:size-4 size-5`} />
                        ) : (
                          <UserIcon className={`tablet:size-4 size-5`} />
                        )}
                      </NavLink>
                    </React.Fragment>
                  );
                })
              : ["Log Out", "Delete Account"].map((e, i) => {
                  return (
                    <React.Fragment key={i}>
                      <button
                        className={
                          "px-3 desktop:px-4 py-2 tablet:text-xs desktop:text-sm text-[17px] flex gap-3 items-center bg-red-600 rounded-lg hover:bg-hover"
                        }
                        onClick={() => {
                          warnEvent(e);
                        }}
                        disabled={loading}
                        key={`${i} Log Out`}
                      >
                        {e}

                        {i === 1 ? (
                          <TrashIcon className={`tablet:size-4 size-5`} />
                        ) : (
                          <ArrowLeftEndOnRectangleIcon
                            className={`tablet:size-4 size-5`}
                          />
                        )}
                      </button>
                    </React.Fragment>
                  );
                })}

            <Tooltip
              id="my-tooltip"
              variant="dark"
              place="bottom-end"
              content="Profile"
              anchorSelect=".profile-button"
            />

            <NavLink
              to={"profile"}
              className={
                "profile-button w-8 tablet::w-10 tablet::h-10 h-8 bg-main rounded-full hidden tablet:flex tablet:justify-center tablet:items-center text-black desktop:text-xl text-sm font-elmssans-bold"
              }
            >
              {isUser?.Name?.toUpperCase()[0] || `Hi`}
            </NavLink>
          </div>
        </nav>

        {warn && (
          <div
            className={`fixed top-0 w-full h-svh bg-black/85 backdrop-blur-lg z-100 ${
              warn ? "flex" : "hidden"
            } flex flex-col justify-center items-center gap-10 font-elmssans-medium text-card text-center px-5`}
          >
            <h1 className="text-xl">
              Are You Sure? This Action Cannot be UnDone{" "}
            </h1>
            <div className="text-white flex flex-wrap justify-center items-center gap-5">
              <button
                className={"px-4 py-2 text-lg bg-green-600"}
                onClick={() => {
                  setWarn(false);
                }}
                disabled={loading}
              >
                Cancle
              </button>
              <button
                className={
                  "px-4 py-2 text-lg flex gap-3 items-center bg-red-600"
                }
                onClick={
                  whoButton === "Log Out" ? logoutHandler : deleteAccountHandler
                }
                disabled={loading}
              >
                {whoButton}
                {loading ? (
                  <ArrowPathRoundedSquareIcon
                    className={`tablet:size-4 size-5 animate-spin`}
                  />
                ) : whoButton === "Log Out" ? (
                  <ArrowLeftEndOnRectangleIcon className={`size-5`} />
                ) : (
                  <TrashIcon className={`size-5`} />
                )}
              </button>
            </div>
          </div>
        )}
      </>
    </Fragment>
  );
};

export default Navbar;
