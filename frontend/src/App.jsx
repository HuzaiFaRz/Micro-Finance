import { Route, Routes, useLocation } from "react-router";
import "swiper/css";
import 'tippy.js/dist/tippy.css';
import Home from "./Home/Home";
import Register from "./Auth/Register";
import SignIn from "./Auth/SignIn";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import LoanForm from "./Pages/LoanForm";
import LoanCategories from "./Pages/LoanCategories";
import Contact from "./Pages/Contact";
import { About } from "./Pages/About";
import { Fragment, useEffect } from "react";
import Layout from "./Layout/Layout";
import GlobalContextProvider from "./Contexts/GlobalContextProvider";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import LockRoute from "./Routes/LockRoute";

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
    <Fragment>
      <Routes>
        <Route element={<GlobalContextProvider />}>
          <Route element={<AuthContextProvider />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="loan-categories" element={<LoanCategories />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
            </Route>

            <Route element={<LockRoute />}>
              <Route element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="loan-form" element={<LoanForm />} />
              </Route>
            </Route>

            <Route path="register" element={<Register />} />
            <Route path="sign-in" element={<SignIn />} />
          </Route>
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
