import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { auth } from "../Firebase/firebase";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

import { GlobalContextCreated } from "../Contexts/GlobalContext";
import jsPDF from "jspdf";

const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center gap-5">
    <span className="text-gray-400 text-xs tablet:text-sm tracking-wider">
      {label}
    </span>
    <span className="text-right break-all text-xs tablet:text-sm tracking-wide">
      {value}
    </span>
  </div>
);

const PaymentShedule = () => {
  const navigate = useNavigate();
  const { loanID } = useParams();
  const [targetLoan, setTargetLoan] = useState(null);

  const { loan, isUser } = AuthUseContext();

  useEffect(() => {
    if (!auth.currentUser) {
      return navigate("/sign-in", { replace: true });
    }
    const checkingLoanID = loan.find((e) => {
      return e.loanID === loanID;
    });
    if (checkingLoanID) {
      setTargetLoan(checkingLoanID);
    } else {
      setTargetLoan(null);
      console.error("Invalid Data Entered");
      return navigate("/dashboard", { replace: true });
    }
  }, [loan, loanID, navigate]);

  const paymentReciptGenerator = () => {
    const {
      transaction_PAID_FROM,
      transaction_PAID_TO,
      transaction_PAYMENT_METHOD,
      transaction_STATUS,
      transaction_AMOUNT,
      transaction_ID,
      transaction_PURPOSE,
      transaction_TIME,
    } = targetLoan.loanData.initialAmountPaidDetails;
    const docPDF = new jsPDF();
    docPDF.setFont("helvetica", "bold");
    docPDF.setFontSize(22);
    docPDF.text("MicroFinance", 105, 20, { align: "center" });

    docPDF.setFontSize(16);
    docPDF.text("Payment Receipt", 105, 30, { align: "center" });

    docPDF.setFontSize(12);
    docPDF.setFont("helvetica", "normal");

    const startY = 45;
    let y = startY;

    docPDF.text(`Transaction ID: ${transaction_ID}`, 15, y);
    y += 7;
    docPDF.text(`Transaction Date: ${transaction_TIME}`, 15, y);
    y += 7;
    docPDF.text(`Payment Status: ${transaction_STATUS}`, 15, y);
    y += 10;

    docPDF.setFont("helvetica", "bold");
    docPDF.text("Paid By:", 15, y);
    docPDF.setFont("helvetica", "normal");
    y += 7;
    docPDF.text(`Account Tittle: ${transaction_PAID_FROM[0]}`, 15, y);
    y += 7;
    docPDF.text(`Account no: ${transaction_PAID_FROM[1]}`, 15, y);
    y += 7;
    docPDF.text(`CNIC: ${isUser?.CNIC}`, 15, y);
    y += 10;

    docPDF.setFont("helvetica", "bold");
    docPDF.text("Paid To:", 15, y);
    docPDF.setFont("helvetica", "normal");
    y += 7;
    docPDF.text(`Organization:${transaction_PAID_TO[0]}`, 15, y);
    y += 7;
    docPDF.text(`Account Number: ${transaction_PAID_TO[1]}`, 15, y);
    y += 10;

    docPDF.setFont("helvetica", "bold");
    docPDF.text("Payment Details:", 15, y);
    docPDF.setFont("helvetica", "normal");
    y += 7;
    docPDF.text(`Amount Paid: PKR ${transaction_AMOUNT}`, 15, y);
    y += 7;
    docPDF.text(`Payment Method: ${transaction_PAYMENT_METHOD}`, 15, y);
    y += 7;
    docPDF.text(`Purpose: ${transaction_PURPOSE}`, 15, y);
    y += 15;

    docPDF.setFont("helvetica", "italic");
    docPDF.setFontSize(10);
    docPDF.text(
      "This is a system-generated receipt. No signature required.",
      15,
      y,
    );
    docPDF.save(`Receipt_${transaction_ID}${loanID}.pdf`);
  };

  let calculatedDuration = parseInt(targetLoan?.loanData?.Loan_Duration) * 12;

  const calculatedLoanApplyTime = new Date(
    targetLoan?.loanData.applyAt?.seconds * 1000 +
      targetLoan?.loanData.applyAt?.nanoseconds / 1000000,
  );

  let paymentDate = [];
  let balance = [];

  for (let index = 1; index <= calculatedDuration; index++) {
    let futureDate = new Date(calculatedLoanApplyTime);
    futureDate.setMonth(calculatedLoanApplyTime.getMonth() + index);

    paymentDate.push(futureDate);
  }

  for (let index = calculatedDuration; index >= 1; index--) {
    balance.push(
      parseInt(targetLoan?.loanData?.monthlyInstallment.replaceAll(/,/g, "")) *
        index,
    );
  }

  const formatingPKR = (amount) =>
    new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="w-full min-h-screen flex flex-col justify-evenly items-center gap-10 bg-black px-3 font-elmssans-light p-3">
      {targetLoan?.loanData?.isInitialAmountPaid &&
      targetLoan?.loanData?.approved ? (
        <>
          <div className="w-full max-w-lg border border-gray-400 text-main shadow-lg p-6 space-y-4">
            <div className="text-center border-b border-gray-700 pb-3">
              <h1 className="text-xl font-semibold">Initial Payment Details</h1>
              <span className="text-green-500 text-sm font-medium">
                {
                  targetLoan?.loanData?.initialAmountPaidDetails
                    .transaction_STATUS
                }
              </span>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Amount Paid</p>
              <h2 className="text-xl tablet:text-3xl font-bold">
                PKR{" "}
                {Number(
                  targetLoan?.loanData?.initialAmountPaidDetails
                    .transaction_AMOUNT,
                ).toLocaleString()}
              </h2>
            </div>
            <div className="space-y-2 text-sm">
              <Detail
                label="Purpose"
                value={
                  targetLoan?.loanData?.initialAmountPaidDetails
                    .transaction_PURPOSE
                }
              />
              <Detail
                label="Payment Method"
                value={
                  targetLoan?.loanData?.initialAmountPaidDetails
                    .transaction_PAYMENT_METHOD
                }
              />
              <Detail
                label="Transaction ID"
                value={
                  targetLoan?.loanData?.initialAmountPaidDetails.transaction_ID
                }
              />
              <Detail
                label="Date & Time"
                value={
                  targetLoan?.loanData?.initialAmountPaidDetails
                    .transaction_TIME
                }
              />
            </div>
            <div className="flex flex-wrap justify-between items-center gap-5">
              <div className="bg-blue-800 p-3 w-full tablet:w-auto">
                <p className="text-gray-400">Paid From</p>
                <p className="font-medium">
                  {
                    targetLoan?.loanData?.initialAmountPaidDetails
                      ?.transaction_PAID_FROM[0]
                  }
                </p>
                <p className="text-xs break-all">
                  {
                    targetLoan?.loanData?.initialAmountPaidDetails
                      ?.transaction_PAID_FROM[1]
                  }
                </p>
              </div>

              <div className="bg-blue-800 p-3 w-full tablet:w-auto">
                <p className="text-gray-400">Paid To</p>
                <p className="font-medium">
                  {
                    targetLoan?.loanData?.initialAmountPaidDetails
                      .transaction_PAID_TO[0]
                  }
                </p>
                <p className="text-xs break-all">
                  {
                    targetLoan?.loanData?.initialAmountPaidDetails
                      .transaction_PAID_TO[1]
                  }
                </p>
              </div>
            </div>
            <h1
              className="text-blue-300 underline w-full text-center text-lg cursor-pointer"
              onClick={paymentReciptGenerator}
            >
              Download Recipt
            </h1>
          </div>
          <h1 className="text-layout font-elmssans-bold text-xl tablet:text-4xl w-full text-center">
            See Your Next Installment Shedule are As Follow
          </h1>
          <div className="w-full h-full flex flex-wrap justify-evenly items-center gap-4 p-3">
            {paymentDate.map((elem, index) => {
              let date = elem.toLocaleString("en-US", {
                month: "short",
                year: "numeric",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
              console.log();
              return (
                <div
                  className="w-full h-[200px] border border-gray-400 text-main flex flex-col justify-between items-start p-5 relative "
                  key={index}
                >
                  <span
                    className={`absolute right-2 top-2 ${elem > calculatedLoanApplyTime ? "text-[#FBED00]" : "text-red-500"}`}
                  >
                    {elem > calculatedLoanApplyTime ? "Upcoming" : "Overdue"}
                  </span>
                  <span
                    className={`absolute right-2 bottom-2 text-gray-400 text-lg`}
                  >
                    Instalment #{index + 1} of {calculatedDuration}
                  </span>
                  <span className="flex flex-row justify-center items-start gap-2 tablet:gap-3 text-lg tablet:text-2xl tracking-wider text-gray-400">
                    <span>Time</span>{" "}
                    <strong className="text-card">{date}</strong>
                  </span>
                  <span className="flex gap-2 tablet:gap-3 text-lg tablet:text-2xl tracking-wider text-gray-400">
                    <span>Amount</span>
                    <strong className="text-card">
                      {targetLoan?.loanData?.monthlyInstallment}
                    </strong>
                  </span>
                  <span className="flex flex-row justify-center items-start gap-2 tablet:gap-3 text-lg tablet:text-2xl tracking-wider text-gray-400">
                    <span>Remaining Amount</span>
                    <strong className="text-card">
                      {formatingPKR(balance[index])}
                    </strong>
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-card flex flex-col justify-center items-center gap-3">
          Kindly First Pay Initial Ammount to see Next Shedule{" "}
          <NavLink
            className={"underline"}
            to={`/dashboard/loan-payment/${targetLoan?.loanID}`}
          >
            Pay Now
          </NavLink>{" "}
        </h1>
      )}
    </div>
  );
};

export default PaymentShedule;
