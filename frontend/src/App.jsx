import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "swiper/css";

import "react-tooltip/dist/react-tooltip.css";

import Home from "./Home/Home";
import Register from "./Auth/Register";
import SignIn from "./Auth/SignIn";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import LoanForm from "./Pages/LoanForm";
import LoanCategories from "./Pages/LoanCategories";
import Contact from "./Pages/Contact";
import { About } from "./Pages/About";
import React, { Fragment, useEffect } from "react";
import Layout from "./Layout/Layout";
import GlobalContextProvider from "./Contexts/GlobalContextProvider";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import LockRoute from "./Routes/LockRoute";
import MassegeToast from "./Components/MassegeToast";

const App = () => {
  const pageLocation = useLocation();
  useEffect(() => {
    if (pageLocation.pathname !== "/") {
      const currentPageURL = pageLocation.pathname
        .slice(1)
        .split("-")
        .map((e) => {
          return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
        })
        .join(" ");
      document.title = `M - Finance - ${currentPageURL}`;
      return;
    }
    document.title = `M - Finance - Home`;
  }, [pageLocation]);

  return (
    <React.Fragment>
      <MassegeToast />
      <Routes>
        <Route element={<GlobalContextProvider />}>
          <Route element={<AuthContextProvider />}>
            <Route path="register" element={<Register />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="loan-categories" element={<LoanCategories />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route element={<LockRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="loan-form" element={<LoanForm />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
