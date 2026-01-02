import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router";
import {
  Bars3BottomRightIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

const Navbar = () => {
  const { isUser } = AuthUseContext();

  let [navbarButton, setNavbarButton] = useState(false);

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
            {" "}
            {isUser ? isUser?.Name[0].toUpperCase() : `Hi`}
          </NavLink>
        </header>

        <nav
          className={`bg-layout fixed top-0 tablet:left-0 w-4/5 tablet:w-full h-full tablet:h-16 flex flex-col tablet:flex-row items-center justify-center tablet:justify-between p-4 -left-full z-50 transition-all text-main ${
            navbarButton && "left-0"
          }`}
        >
          <div className="nav-start absolute bottom-8 tablet:static">
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
                    className={`px-3 py-2 hover:bg-hover rounded-lg ${
                      index === 4 &&
                      "bg-card rounded-lg ml-0 desktop:ml-8 tablet:ml-3px px-4 py-2"
                    }`}
                  >
                    {linkName}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </div>

          <NavLink
            to={"profile"}
            className={
              "w-10 h-10 bg-main rounded-full hidden tablet:flex tablet:justify-center tablet:items-center text-black text-xl font-elmssans-bold"
            }
          >
            {isUser ? isUser?.Name[0].toUpperCase() : `Hi`}
          </NavLink>
        </nav>
      </>
    </Fragment>
  );
};

export default Navbar;
