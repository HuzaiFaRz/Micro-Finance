import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="w-full h-svh bg-main">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
