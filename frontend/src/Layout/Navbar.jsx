import React, { Fragment } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const nav_Links = [
    { linkName: "Home", linkURL: "/" },
    { linkName: "Dashboard", linkURL: "dashboard" },
    { linkName: "Loan Categories", linkURL: "loancategories" },
    { linkName: "Contact Us", linkURL: "contact" },
    { linkName: "About Us", linkURL: "about" },
    { linkName: "Apply Now", linkURL: "loanform" },
  ];

  return (
    <Fragment>
      <>
        <nav className="fixed top-0 w-full h-16 bg-[#DFD0B8] flex justify-between items-center p-3">
          <div className="nav-start">
            <NavLink to={"/"} className={"text-2xl font-qurova-bold uppercase"}>
              Micro Finance
            </NavLink>
          </div>

          <div className="nav-center">
            {nav_Links.map((val, index) => {
              return (
                <React.Fragment key={index}>
                  <NavLink
                    to={val.linkURL}
                    className={`text-[#393E46] p-4 font-qurova-medium tracking-normal underline underline-offset-4 text-lg decoration-2 ${index === 5 && 'bg-amber-400 rounded-3xl'}`}
                  >
                    {val.linkName}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </div>

          <NavLink
            to={"profile"}
            className={"w-10 h-10 bg-[#393E46] rounded-full"}
          ></NavLink>
        </nav>
      </>
    </Fragment>
  );
};

export default Navbar;
