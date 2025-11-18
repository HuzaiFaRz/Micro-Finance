import React, { Fragment } from "react";
import { NavLink } from "react-router";
import logo from "../assets/Images/logo.png";
const Footer = () => {
  const footer_Links = [
    { linkName: "Home", linkURL: "/" },
    { linkName: "Contact Us", linkURL: "contact" },
    { linkName: "About Us", linkURL: "about" },
    { linkName: "Projects", linkURL:'https://github.com/HuzaiFaRz?tab=repositories' },
  ];

  return (
    <Fragment>
      <>
        <footer className="w-full flex flex-col justify-center items-center bg-layout text-main">
          <div className="flex flex-col tablet:flex-row w-full h-40 tablet:h-24 text-[15px]">
            <div className="w-full tablet:w-[50%] desktop:w-[40%] h-full flex flex-row justify-evenly tablet:justify-evenly px-10 py-3 tablet:py-0 tablet:px-0 gap-10 items-center marker:text-3xl tablet:border-r border-b border-main font-elmssans-medium tracking-wider">
              <li>
                Plot # 999 <br /> UnDefined PK
              </li>
              <li className="">
                Plot # 852 <br /> Corner Shop PK
              </li>
            </div>
            <div className="w-full tablet:w-[50%] desktop:w-[60%] h-full flex justify-evenly tablet:justify-end items-center px-2 tablet:pr-10 tablet:gap-6 border-b border-main">
              {footer_Links.map((val, index) => {
                return (
                  <React.Fragment key={index}>
                    <NavLink
                      to={val.linkURL}
                      className={`text-main px-2 py-2 font-elmssans-medium tracking-wide tablet:text-md text-sm`}
                    >
                      {val.linkName}
                    </NavLink>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="w-full tablet:h-72 h-48 text-main flex flex-wrap">
            <div className="w-full tablet:w-[50%] desktop:w-[60%] flex flex-row tablet:flex-col justify-center tablet:justify-end tablet:items-center items-end gap-6 order-2 tablet:order-1 pb-4 tablet:pb-0">
              <div className="text-xl tablet:text-3xl font-elmssans-medium flex flex-col items-center text-center">
                <span>Making Money</span>
                <span>Accessible & Durable.</span>
              </div>
              <img
                src={logo}
                className="w-40 tablet:w-52 object-contain bg-main"
              />
            </div>
            <div className="w-full tablet:w-[50%] desktop:w-[40%] flex justify-center tablet:justify-end items-center tablet:items-end border-b tablet:border-l tablet:border-b-0 tablet:pb-10 order-1">
              <p className="px-5 text-sm font-elmssans-medium">
                © 2025 MicroFinance. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </>
    </Fragment>
  );
};

export default Footer;
