import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home/Home";
import Register from "./Auth/Register";
import SignIn from "./Auth/SignIn";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import LoanForm from "./Pages/LoanForm";
import LoanCategories from "./Pages/LoanCategories";
import Contact from "./Pages/Contact";
import { About } from "./Pages/About";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="loanform" element={<LoanForm />} />
        <Route path="loancategories" element={<LoanCategories />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>

      <Route path="register" element={<Register />}></Route>
      <Route path="signin" element={<SignIn />}></Route>
    </Routes>
  );
};

export default App;
