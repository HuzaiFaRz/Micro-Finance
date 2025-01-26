import React, { useState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Ali Khan",
      city: "Karachi",
      type: "Business",
      status: "Pending",
    },
    {
      id: 2,
      name: "Aisha Ahmed",
      city: "Lahore",
      type: "Home",
      status: "Approved",
    },
    {
      id: 3,
      name: "Ahmed Raza",
      city: "Islamabad",
      type: "Education",
      status: "Pending",
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Ali Khan", status: "Active" },
    { id: 2, name: "Aisha Ahmed", status: "Suspended" },
  ]);

  const handleLoanStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <ul>
          {["dashboard", "applications", "approve-reject", "users"].map(
            (tab) => (
              <li
                key={tab}
                className={`p-3 cursor-pointer hover:bg-gray-700 rounded ${
                  activeTab === tab ? "bg-blue-600" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-gray-400">
              Welcome, Admin! Manage loan applications and users.
            </p>
          </>
        )}

        {activeTab === "applications" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Loan Applications</h1>
            <div className="flex gap-4 mb-4">
              <select className="bg-gray-700 p-2 rounded text-white">
                <option>Filter by City</option>
                <option>Karachi</option>
                <option>Lahore</option>
                <option>Islamabad</option>
              </select>
              <select className="bg-gray-700 p-2 rounded text-white">
                <option>Filter by Loan Type</option>
                <option>Business</option>
                <option>Home</option>
                <option>Education</option>
              </select>
            </div>
            <table className="w-full bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3">Applicant</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Loan Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-600">
                    <td className="p-3">{app.name}</td>
                    <td className="p-3">{app.city}</td>
                    <td className="p-3">{app.type}</td>
                    <td
                      className={`p-3 ${
                        app.status === "Pending"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {app.status}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleLoanStatus(app.id, "Approved")}
                        className="bg-green-600 px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleLoanStatus(app.id, "Rejected")}
                        className="bg-red-600 px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "approve-reject" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Review Loan Application</h1>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Applicant: Ahmed Raza</h2>
              <p>City: Islamabad</p>
              <p>Loan Type: Education</p>
              <p>Loan Amount: 500,000 PKR</p>
              <div className="flex gap-4 mt-4">
                <button className="bg-green-600 px-4 py-2 rounded">
                  Approve
                </button>
                <button className="bg-red-600 px-4 py-2 rounded">Reject</button>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <>
            <h1 className="text-3xl font-bold mb-4">User Management</h1>
            <table className="w-full bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3">User</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-600">
                    <td className="p-3">{user.name}</td>
                    <td
                      className={`p-3 ${
                        user.status === "Active"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="bg-yellow-600 px-3 py-1 rounded"
                      >
                        {user.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
