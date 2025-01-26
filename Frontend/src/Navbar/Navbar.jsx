import { useState } from "react";
import { Link } from "react-router-dom";
import navbarLogo from "../../public/system.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const navLinks = [
    { name: "Home", link: "home" },
    { name: "Loan Categories", link: "internships" },
    { name: "Contact", link: "about" },
  ];

  return (
    <nav className="fixed bg-black z-10 top-0 w-full border-gray-500 border-b-2 px-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <a className="flex items-center space-x-3 relative z-[5]">
          <img
            src={navbarLogo}
            className="h-12 rounded-full cursor-pointer bg-white p-1"
            alt="Logo"
          />
        </a>
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center z-[5] cursor-pointer w-10 h-6 justify-center text-sm text-white rounded-lg md:hidden"
          onClick={handleToggle}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <div className="w-full md:w-auto">
          <ul
            className={`font-medium flex flex-col justify-evenly p-2 md:p-0 text-white md:flex-row md:space-x-2 md:mt-0 ${
              toggle
                ? "h-[100dvh] w-full absolute top-0 left-0 bg-black flex items-start justify-center flex-col"
                : "hidden md:flex"
            }`}
          >
            {navLinks.map((page, index) => (
              <li key={index}>
                <Link
                  className="block py-2 md:px-3 text-white px-10 text-base md:p-0 cursor-pointer"
                  onClick={() => setToggle(false)}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
