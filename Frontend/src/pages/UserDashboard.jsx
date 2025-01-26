import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loanRequests, setLoanRequests] = useState([]);
  const { user, setUser } = useAuth();

  const userLoan = {
    amount: "200,000 PKR",
    startDate: "2025-02-10",
    status: "Pending",
  };
  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const profileResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/user/profile/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(profileResponse.data.user);
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/user/get-loan-requests`,
              { userId: profileResponse.data.user._id }
            );
            setLoanRequests(response.data.loanRequests);
          } catch (error) {
            console.error("Error fetching loan requests:", error);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    getProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 bg-gray-800 p-5">
        <h2 className="text-xl font-semibold mb-6">Loan Dashboard</h2>
        <ul>
          {["dashboard", "apply"].map((tab) => (
            <li
              key={tab}
              className={`p-3 cursor-pointer hover:bg-gray-700 rounded ${
                activeTab === tab ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">User Loan Details</h2>
              <p>
                💰 Loan Amount: <strong>{userLoan.amount}</strong>
              </p>
              <p>
                📅 Repayment Start Date: <strong>{userLoan.startDate}</strong>
              </p>
              <p>
                📌 Status:{" "}
                <strong
                  className={
                    userLoan.status === "Pending"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {userLoan.status}
                </strong>
              </p>
            </div>
          </>
        )}

        {activeTab === "apply" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Apply for Loan</h1>
            {loanRequests.length > 0 ? (
              loanRequests.map((loanRequest, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow mb-6 flex items-start justify-center flex-col gap-2"
                >
                  <h2 className="text-xl font-semibold ">Loan Request</h2>
                  <p>
                    💰 Loan Amount: <strong>{loanRequest.loanAmount}</strong>
                  </p>
                  <p>
                    📅 Loan Period:{" "}
                    <strong>{loanRequest.loanPeriod}Years</strong>
                  </p>
                  <p>
                    📌 Status:{" "}
                    <strong
                      className={
                        loanRequest.status === "Pending"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }
                    >
                      {loanRequest.status}
                    </strong>
                  </p>

                  <button
                    className="p-2 rounded-lg bg-blue-900 cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    {loanRequest.status === "Pending"
                      ? "Approve Loan Request"
                      : "Loan Request Approved"}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No Loan Requests Found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
