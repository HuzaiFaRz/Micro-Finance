import { Fragment } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <main className={`w-full h-full pt-16`}>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
