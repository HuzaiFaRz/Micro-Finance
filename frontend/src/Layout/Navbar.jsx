import React, { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3BottomRightIcon,
  CurrencyDollarIcon,
  UserIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { Tooltip } from "react-tooltip";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const Navbar = () => {
  const { isUser } = AuthUseContext();

  const [loading, setLoading] = useState(false);

  const { heroIconCSS, convertingMassege } = useContext(GlobalContextCreated);

  let [navbarButton, setNavbarButton] = useState(false);

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

  document.body.style.overflow = navbarButton ? "hidden" : "";

  const windowResizeing = () => {
    if (window.innerWidth < 830) {
      document.body.style.overflow = "";
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", windowResizeing);
    return () => window.removeEventListener("resize", windowResizeing);
  }, []);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      convertingMassege("Sign Out Success", 200, 200, 200);
    } catch (error) {
      setLoading(false);
      console.error(error?.message);
      convertingMassege(error?.code, 501, 501, 501);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <>
        <header className="z-100 w-full h-16 bg-layout text-main fixed top-0 right-0 flex visible tablet:invisible tablet:hidden justify-between items-center p-5">
          {navbarButton ? (
            <XMarkIcon
              className="size-10 cursor-pointer"
              onClick={() => navbarEvent()}
            />
          ) : (
            <Bars3BottomRightIcon
              className="size-10 cursor-pointer"
              onClick={() => navbarEvent()}
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
          className={`bg-layout fixed top-0 tablet:left-0 w-4/5 tablet:w-full h-full tablet:h-16 flex flex-col tablet:flex-row items-center justify-center tablet:justify-between p-4 -left-full z-50 transition-all text-main ${
            navbarButton && "left-0"
          }`}
        >
          <div className="nav-start absolute top-20 tablet:static">
            <NavLink to={"/"}>
              <CurrencyDollarIcon className="size-14 tablet:size-10" />
            </NavLink>
          </div>

          <div className="nav-center flex flex-col tablet:flex-row gap-6 tablet:gap-3 w-full tablet:w-auto font-elmssans-medium tablet:text-sm desktop:text-[16px] text-xl tracking-wide">
            {nav_Links.map((elem, index) => {
              const { linkName, linkURL } = elem;
              return (
                <React.Fragment key={index}>
                  <NavLink
                    to={linkURL}
                    className={`px-3 py-2 text-sm hover:underline underline-offset-2 ${
                      linkName === "Apply Now" &&
                      "bg-card hover:bg-hover rounded-lg w-fit tablet:w-auto"
                    }`}
                  >
                    {linkName}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-3 font-elmssans-medium mt-12 tablet:mt-0 absolute bottom-5 tablet:static">
            {isUser === null ? (
              authButton.map((elem, index) => {
                const { linkName, linkURL } = elem;
                return (
                  <React.Fragment key={index}>
                    <NavLink
                      className={
                        "px-3 py-2 text-sm flex gap-3 bg-green-600 rounded-lg hover:bg-hover"
                      }
                      to={linkURL}
                    >
                      {linkName}
                      {index === 0 ? (
                        <UserPlusIcon className={heroIconCSS} />
                      ) : (
                        <UserIcon className={heroIconCSS} />
                      )}
                    </NavLink>
                  </React.Fragment>
                );
              })
            ) : (
              <button
                className={
                  "px-3 py-2 text-sm flex gap-3 bg-red-600 rounded-lg hover:bg-hover"
                }
                onClick={logoutHandler}
                disabled={loading}
              >
                LogOut
                {loading ? (
                  <ArrowPathRoundedSquareIcon
                    className={`${heroIconCSS} animate-spin`}
                  />
                ) : (
                  <ArrowLeftEndOnRectangleIcon className={heroIconCSS} />
                )}
              </button>
            )}

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
                "profile-button w-10 h-10 bg-main rounded-full hidden tablet:flex tablet:justify-center tablet:items-center text-black text-xl font-elmssans-bold"
              }
            >
              {isUser?.Name?.toUpperCase()[0] || `Hi`}
            </NavLink>
          </div>
        </nav>
      </>
    </Fragment>
  );
};

export default Navbar;
