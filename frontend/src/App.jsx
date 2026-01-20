import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Auth/Register";
import SignIn from "./Auth/SignIn";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import LoanForm from "./Pages/LoanForm";
import Contact from "./Pages/Contact";
import { About } from "./Pages/About";
import Layout from "./Layout/Layout";
import GlobalContextProvider from "./Contexts/GlobalContextProvider";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import LockRoute from "./Routes/LockRoute";
import MassegeToast from "./Components/MassegeToast";
import AuthRoute from "./Routes/AuthRoute";
import ErrorRoute from "./Components/ErrorRoute";

const App = () => {
  return (
    <Fragment>
      <GlobalContextProvider>
        <MassegeToast />
        <AuthContextProvider>
          <Routes>
            <Route path="*" element={<ErrorRoute />}  />
            <Route element={<AuthRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<SignIn />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} index />
              <Route path="contact-us" element={<Contact />} />
              <Route path="about-us" element={<About />} />
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
