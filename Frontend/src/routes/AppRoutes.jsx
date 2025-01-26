import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import LoanCalculator from "../pages/LoanCalculator";
import LoanApplicationPage from "../pages/LoanApplicationPage";
import UserDashboard from "../pages/UserDashboard";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/loan-calculator"
          element={
            <>
              <Navbar />
              <LoanCalculator />
            </>
          }
        />
        <Route
          path="/loan-application"
          element={
            <>
              <Navbar />
              <LoanApplicationPage />
            </>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <>
              <Navbar />
              <UserDashboard />
            </>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <>
              <Navbar />
              <AdminPanel />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
