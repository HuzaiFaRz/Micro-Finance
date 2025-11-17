import React, { Fragment } from "react";
import { NavLink } from "react-router";
import logo from "../assets/Images/logo.png";

import { CurrencyDollarIcon } from "@heroicons/react/16/solid";

const Footer = () => {
  const footer_Links = [
    { linkName: "Home", linkURL: "/" },
    { linkName: "Contact Us", linkURL: "contact" },
    { linkName: "About Us", linkURL: "about" },
    { linkName: "Projects" },
  ];

  return (
    <Fragment>
      <>
        <footer className="w-full flex flex-col justify-center items-center bg-layout text-main">
          <div className="flex justify-between items-center w-full h-24 text-[15px]">
            <div className="w-[30%] h-full flex flex-wrap justify-center items-center gap-10 marker:text-3xl border-r border-b border-main font-elmssans-medium tracking-wider">
              <li>
                Plot # 999 <br /> UnDefined PK
              </li>
              <li>
                Plot # 852 <br /> Corner Shop PK
              </li>
            </div>
            <div className="w-[70%] h-full flex justify-end items-center gap-3 pr-10 border-b border-main">
              {footer_Links.map((val, index) => {
                return (
                  <React.Fragment key={index}>
                    <NavLink
                      to={val.linkURL}
                      className={`text-main px-2 py-2 font-elmssans-medium tracking-wide text-md`}
                    >
                      {val.linkName}
                    </NavLink>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="w-full h-72 text-center text-main flex">
            <div className="w-[60%] h-full flex justify-start items-end gap-3 pb-10">
              <img src={logo} className="w-56 object-contain bg-min " />
              <CurrencyDollarIcon className="size-12 text-main" />
              <div className="text-3xl font-elmssans-medium flex flex-col justify-center items-start">
                <span>Making Money</span>
                <span>Accessible & Durable.</span>
              </div>
            </div>
            <div className="w-[40%] h-full flex justify-end items-end border-l pb-10">
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
