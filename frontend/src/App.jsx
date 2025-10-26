import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home/Home";
import Register from "./Auth/Register";
import SignIn from "./Auth/SignIn";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="register" element={<Register />}></Route>
      <Route path="signin" element={<SignIn />}></Route>
    </Routes>
  );
};

export default App;
