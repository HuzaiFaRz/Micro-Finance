import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth } from "../Firebase/firebase";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import {
  ArrowPathRoundedSquareIcon,
  BanknotesIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import jsPDF from "jspdf";

const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center gap-5">
    <span className="text-gray-400">{label}</span>
    <span className="text-right break-all">{value}</span>
  </div>
);

const PaymentShedule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loanID } = useParams();
  const [targetLoan, setTargetLoan] = useState(null);

  const { errorToast } = useContext(GlobalContextCreated);

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

  return (
    <div className="w-full min-h-dvh flex justify-center items-center bg-black px-3 font-elmssans-light">
      <div className="w-full max-w-lg border text-main shadow-lg p-6 space-y-4">
        <>
          <div className="text-center border-b border-gray-700 pb-3">
            <h1 className="text-xl font-semibold">Initial Payment Details</h1>
            <span className="text-green-500 text-sm font-medium">
              {
                targetLoan?.loanData?.initialAmountPaidDetails
                  .transaction_STATUS
              }
            </span>
          </div>

          {/* Amount */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">Amount Paid</p>
            <h2 className="text-3xl font-bold">
              PKR{" "}
              {Number(
                targetLoan?.loanData?.initialAmountPaidDetails
                  .transaction_AMOUNT,
              ).toLocaleString()}
            </h2>
          </div>

          {/* Details */}
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
                targetLoan?.loanData?.initialAmountPaidDetails.transaction_TIME
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
        </>
      </div>
    </div>
  );
};

export default PaymentShedule;
