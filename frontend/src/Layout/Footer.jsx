import React, { Fragment } from "react";
import { NavLink } from "react-router";
import logo from "../assets/Images/logo.png";
const Footer = () => {
  const footer_Links = [
    { linkName: "Home", linkURL: "/" },
    { linkName: "Contact Us", linkURL: "contact" },
    { linkName: "About Us", linkURL: "about" },
    {
      linkName: "Projects",
      linkURL: "https://github.com/HuzaiFaRz?tab=repositories",
    },
  ];

  footer_Links.map((e) => {
    return Object.freeze(e);
  });
  const currentYear = new Date().getFullYear();

  return (
    <Fragment>
      <>
        <footer className="w-full flex flex-col justify-center items-center bg-layout text-main border-main font-elmssans-medium">
          <div className="flex flex-col tablet:flex-row w-full h-40 tablet:h-24 text-[15px] tracking-wide tablet:text-sm desktop:text-[16px] text-sm">
            <div className="w-full tablet:w-[50%] desktop:w-[40%] h-full flex flex-row justify-evenly tablet:justify-evenly px-10 py-3 tablet:py-0 tablet:px-0 gap-10 items-center marker:text-3xl tablet:border-r border-b">
              <li>
                Plot # 999 <br /> UnDefined PK
              </li>
              <li className="">
                Plot # 852 <br /> Corner Shop PK
              </li>
            </div>
            <div className="w-full tablet:w-[50%] desktop:w-[60%] h-full flex justify-evenly tablet:justify-end items-center px-2 tablet:pr-8 tablet:gap-4 border-b">
              {footer_Links.map((elem, index) => {
                const { linkName, linkURL } = elem;
                return (
                  <React.Fragment key={index}>
                    <NavLink
                      to={linkURL}
                      className={`px-2 py-2`}
                      target={index === 3 ? "_blank" : undefined}
                    >
                      {linkName}
                    </NavLink>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="w-full tablet:h-72 h-48 flex flex-wrap">
            <div className="w-full tablet:w-[50%] desktop:w-[60%] flex flex-row tablet:flex-col justify-center tablet:justify-end tablet:items-center items-end gap-6 order-2 tablet:order-1 pb-4 tablet:pb-0">
              <div className="text-xl tablet:text-3xl flex flex-col items-center text-center">
                <span>Making Money</span>
                <span>Accessible & Durable.</span>
              </div>
              <img src={logo} className="w-40 tablet:w-52" />
            </div>
            <div className="w-full tablet:w-[50%] desktop:w-[40%] flex justify-center tablet:justify-end items-center tablet:items-end border-b tablet:border-l tablet:border-b-0 tablet:pb-10 order-1">
              <p className="px-5 text-sm tablet:text-md">
                © {currentYear} MicroFinance. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </>
    </Fragment>
  );
};

export default Footer;
