import React, { useState } from "react";

const LoanApplicationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cnic: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    loanType: "Home Loan",
    loanAmount: "50000",
    loanPeriod: "1 Year",
    guarantorName: "",
    guarantorCnic: "",
    guarantorLocation: "",
    salarySlip: null,
    bankStatement: null,
    cnicCopy: null,
  });

  const [applicationID, setApplicationID] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitApplication = () => {
    setApplicationID(`LOAN-${Math.floor(Math.random() * 100000)}`);
    setAppointmentDate(new Date().toLocaleDateString());
    setStep(4);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Loan Application Process</h1>

      <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-[350px] md:w-[450px]">
        {/* Step 1: User Details */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Step 1: User Details</h2>
            <input
              type="text"
              name="cnic"
              placeholder="CNIC"
              value={formData.cnic}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />
            <button
              className="w-full bg-blue-600 p-2 rounded hover:bg-blue-500 transition"
              onClick={nextStep}
            >
              Next Step
            </button>
          </>
        )}

        {/* Step 2: Loan Details */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Step 2: Loan Details</h2>
            <p>
              📌 Loan Type: <strong>{formData.loanType}</strong>
            </p>
            <p>
              💰 Loan Amount: <strong>${formData.loanAmount}</strong>
            </p>
            <p>
              📆 Loan Period: <strong>{formData.loanPeriod}</strong>
            </p>

            <h3 className="mt-4 text-lg font-semibold">
              Guarantor Information
            </h3>
            <input
              type="text"
              name="guarantorName"
              placeholder="Guarantor Name"
              value={formData.guarantorName}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />
            <input
              type="text"
              name="guarantorCnic"
              placeholder="Guarantor CNIC"
              value={formData.guarantorCnic}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />
            <input
              type="text"
              name="guarantorLocation"
              placeholder="Guarantor Location"
              value={formData.guarantorLocation}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 bg-slate-700 rounded text-white"
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-600 p-2 rounded hover:bg-gray-500 transition"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-blue-600 p-2 rounded hover:bg-blue-500 transition"
                onClick={nextStep}
              >
                Next Step
              </button>
            </div>
          </>
        )}

        {/* Step 3: Upload Documents */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Step 3: Upload Documents
            </h2>
            <label className="block mb-2">Upload Salary Slip:</label>
            <input
              type="file"
              name="salarySlip"
              onChange={handleFileChange}
              className="mb-4"
            />

            <label className="block mb-2">Upload Bank Statement:</label>
            <input
              type="file"
              name="bankStatement"
              onChange={handleFileChange}
              className="mb-4"
            />

            <label className="block mb-2">Upload CNIC Copy:</label>
            <input
              type="file"
              name="cnicCopy"
              onChange={handleFileChange}
              className="mb-4"
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-600 p-2 rounded hover:bg-gray-500 transition"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-green-600 p-2 rounded hover:bg-green-500 transition"
                onClick={submitApplication}
              >
                Submit Application
              </button>
            </div>
          </>
        )}

        {/* Step 4: Application Confirmation */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              Application Submitted
            </h2>
            <p>
              ✅ Loan Application ID: <strong>{applicationID}</strong>
            </p>
            <p>
              ⏳ Status: <strong>Pending</strong>
            </p>
            <p>
              📅 Appointment Date: <strong>{appointmentDate}</strong>
            </p>

            <button
              className="w-full mt-4 bg-blue-700 p-2 rounded text-white hover:bg-blue-500 transition"
              onClick={() => alert("Downloading QR Slip...")}
            >
              Download QR Slip
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoanApplicationPage;
