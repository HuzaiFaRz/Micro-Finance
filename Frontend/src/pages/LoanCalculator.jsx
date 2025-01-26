import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoanCalculator = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const categories = {
    Wedding: ["Venue", "Jewelry", "Clothing"],
    Home: ["Construction", "Renovation", "Furniture"],
    Business: ["Startup", "Expansion", "Equipment"],
    Education: ["School", "College", "University"],
  };
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Wedding");
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    categories["Wedding"][0]
  );
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("1 Year");
  const [emi, setEmi] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const interestRate = 10;
  const processingFee = 2;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(categories[e.target.value][0]);
  };

  const calculateEMI = () => {
    if (!loanAmount || isNaN(loanAmount) || loanAmount <= 0) {
      toast.error("Please enter a valid loan amount.");
      return;
    }

    const principal = loanAmount - (downPayment || 0);
    const rate = interestRate / 100 / 12;
    const months = parseInt(loanPeriod) * 12;
    const emiValue =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);
    const totalAmount = emiValue * months;
    const totalProcessingFee = (processingFee / 100) * principal;

    setEmi({
      monthlyInstallment: emiValue.toFixed(2),
      totalRepayable: (totalAmount + totalProcessingFee).toFixed(2),
      processingFee: totalProcessingFee.toFixed(2),
    });
  };

  const handleSignupSubmit = async () => {
    if (!name || !email || !cnic) {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      const userData = {
        name,
        email,
        cnic,
      };

      const userResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/register`,
        userData
      );
      setUser(userResponse.data.newUser);
      if (userResponse.status === 200) {
        localStorage.setItem("token", userResponse.data.token);
        const loanRequestData = {
          userId: userResponse.data.newUser._id,
          category: selectedCategory,
          subcategory: selectedSubcategory,
          loanAmount,
          downPayment,
          loanPeriod,
          emi: emi.monthlyInstallment,
          processingFee: emi.processingFee,
          totalRepayable: emi.totalRepayable,
        };

        const loanRequestResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/loan-request`,
          loanRequestData
        );

        if (loanRequestResponse.status === 200) {
          toast.success("Loan request submitted successfully!");
          setShowPopup(false);
          navigate("/user-dashboard");
        } else {
          toast.error("Failed to submit loan request.");
        }
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to submit signup or loan request.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Loan Calculator</h1>

      {!emi && (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-[350px] md:w-[450px] transition-all duration-500">
          <label className="block mb-2">Loan Category:</label>
          <select
            className="w-full p-2 rounded bg-slate-700 text-white mb-4"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="block mb-2">Subcategory:</label>
          <select
            className="w-full p-2 rounded bg-slate-700 text-white mb-4"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            {categories[selectedCategory].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <label className="block mb-2">Loan Amount:</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-700 text-white mb-4"
            placeholder="Enter amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />

          <label className="block mb-2">Down Payment (Optional):</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-700 text-white mb-4"
            placeholder="Enter down payment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />

          <label className="block mb-2">Loan Period:</label>
          <select
            className="w-full p-2 rounded bg-slate-700 text-white mb-4"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
          >
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
          </select>

          <button
            className="w-full bg-blue-700 p-2 rounded hover:bg-blue-500 transition"
            onClick={calculateEMI}
          >
            Calculate EMI
          </button>
        </div>
      )}

      {emi && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-[350px] md:w-[450px] transition-all duration-500">
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Loan Breakdown
          </h2>
          <p>
            📌 Monthly Installment: <strong>${emi.monthlyInstallment}</strong>
          </p>
          <p>
            ⚡ Processing Fee: <strong>${emi.processingFee}</strong>
          </p>
          <p>
            💰 Total Repayable Amount: <strong>${emi.totalRepayable}</strong>
          </p>

          <button
            className="w-full mt-4 bg-green-600 p-2 rounded hover:bg-green-500 transition"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            Proceed to Apply
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-slate-800 p-6 rounded-lg w-[350px] flex items-center justify-center flex-col">
            <h2 className="text-xl font-semibold mb-4">Signup Form</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border-2 border-gray-600 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border-2 border-gray-600 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="CNIC"
              className="w-full p-2 mb-4 border-2 border-gray-600 rounded"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 p-2 rounded hover:bg-blue-500 transition cursor-pointer flex items-center justify-center"
              onClick={handleSignupSubmit}
              disabled={loading}
            >
              {loading ? <div className="loader"></div> : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
