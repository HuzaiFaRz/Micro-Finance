import { Fragment, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Home from "./Home/Home";
import Register from "./Auth/Register";
import SignIn from "./Auth/SignIn";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import LoanForm from "./Pages/LoanForm";
import LoanCategories from "./Pages/LoanCategories";
import Contact from "./Pages/Contact";
import { About } from "./Pages/About";
import Layout from "./Layout/Layout";
import GlobalContextProvider from "./Contexts/GlobalContextProvider";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import LockRoute from "./Routes/LockRoute";
import MassegeToast from "./Components/MassegeToast";
import AuthRoute from "./Routes/AuthRoute";

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

  const lenis = new Lenis({
    autoRaf: true,
  });

  lenis.on("scroll");

  return (
    <Fragment>
      <GlobalContextProvider>
        <MassegeToast />
        <AuthContextProvider>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<SignIn />} />
            </Route>

            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} index />
              <Route path="loan-categories" element={<LoanCategories />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route element={<LockRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="loan-form" element={<LoanForm />} />
              </Route>
            </Route>
          </Routes>
        </AuthContextProvider>
      </GlobalContextProvider>
    </Fragment>
  );
};

export default App;
