import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../Firebase/firebase";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import {
  ArrowPathRoundedSquareIcon,
  BanknotesIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { doc, updateDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";

const Payment = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [passwordEye, setPasswordEye] = useState(false);

  const { loanID } = useParams();

  const [targetLoan, setTargetLoan] = useState(null);

  const { errorToast, passwordEyeCSS } = useContext(GlobalContextCreated);

  const [payFormInputsValues, setPayFormInputsValues] = useState({
    Amount: "",
    CNIC: "",
    Password: "",
    SelectPurpose: "",
  });

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

  let amountPurposeChecking =
    targetLoan?.loanData?.approved && targetLoan?.loanData?.isInitialAmountPaid;

  let monthlyInstallMent =
    amountPurposeChecking &&
    parseInt(targetLoan?.loanData?.monthlyInstallment.replaceAll(/,/g, ""));

  useEffect(() => {
    setPayFormInputsValues((prev) => ({
      ...prev,
      Amount: amountPurposeChecking
        ? monthlyInstallMent
        : targetLoan?.loanData.Initial_Amount,
    }));
  }, [amountPurposeChecking, monthlyInstallMent, targetLoan]);

  const payFormInputHandler = (event) => {
    const { value, id } = event.target;

    setPayFormInputsValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "Amount") {
      if (!value) {
        setPayFormInputsValues((prev) => ({
          ...prev,
          Amount: "",
        }));
        return;
      }
      if (amountPurposeChecking) {
        if (value > monthlyInstallMent || value < monthlyInstallMent) {
          console.log(this);
          return;
        }
      } else {
        if (
          value > targetLoan?.loanData.Initial_Amount ||
          value < targetLoan?.loanData.Initial_Amount
        ) {
          return;
        }
      }
      return;
    }

    if (!value) {
      return errorToast("Fill Form");
    }

    if (id === "CNIC") {
      if (value !== isUser?.CNIC) {
        return;
      }
      return;
    }

    if (id === "Password") {
      if (value !== isUser?.Password) {
        return;
      }
      return;
    }

    if (id === "SelectPurpose") {
      if (value === "Select Purpose") {
        return errorToast("Kindly Select Purpose");
      }
      if (
        targetLoan.loanData.approved &&
        targetLoan.loanData.isInitialAmountPaid
      ) {
        if (value === "Initial Payment") {
          return errorToast("Your Initial Amount is Paid", 200, 200, 200);
        }
      } else {
        if (value === "Monthly Payment") {
          return errorToast("Kindly Select Initial Amount");
        }
      }
    }
  };

  const passwordEyeHandler = () => {
    setPasswordEye(!passwordEye);
  };

  const paymenting = async (amount, purpose) => {
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const docPDF = new jsPDF();
    const txid =
      `MF- ${loanID}` +
      Math.random().toString(36).substring(2, 10).toUpperCase();

    docPDF.setFont("helvetica", "bold");
    docPDF.setFontSize(22);
    docPDF.text("MicroFinance", 105, 20, { align: "center" });

    docPDF.setFontSize(16);
    docPDF.text("Payment Receipt", 105, 30, { align: "center" });

    docPDF.setFontSize(12);
    docPDF.setFont("helvetica", "normal");

    const startY = 45;
    let y = startY;

    docPDF.text(`Transaction ID: ${txid}`, 15, y);
    y += 7;
    docPDF.text(`Transaction Date: ${date}`, 15, y);
    y += 7;
    docPDF.text(`Payment Status: PAID`, 15, y);
    y += 10;

    docPDF.setFont("helvetica", "bold");
    docPDF.text("Paid By:", 15, y);
    docPDF.setFont("helvetica", "normal");
    y += 7;
    docPDF.text(
      `Account Tittle: ${isUser?.accountDetails.accountTittle}`,
      15,
      y,
    );
    y += 7;
    docPDF.text(`Account no: ${isUser?.accountDetails.accountNumber}`, 15, y);
    y += 7;
    docPDF.text(`CNIC: ${isUser?.CNIC}`, 15, y);
    y += 10;

    docPDF.setFont("helvetica", "bold");
    docPDF.text("Paid To:", 15, y);
    docPDF.setFont("helvetica", "normal");
    y += 7;
    docPDF.text(`Organization: M_Finance`, 15, y);
    y += 7;
    docPDF.text(`Account Number: VCXBVCN-43543VCXVX23-5858`, 15, y);
    y += 10;

    docPDF.setFont("helvetica", "bold");
    docPDF.text("Payment Details:", 15, y);
    docPDF.setFont("helvetica", "normal");
    y += 7;
    docPDF.text(`Amount Paid: PKR ${amount}`, 15, y);
    y += 7;
    docPDF.text(`Payment Method: M_Finance`, 15, y);
    y += 7;
    docPDF.text(`Purpose: ${purpose}`, 15, y);
    y += 15;

    docPDF.setFont("helvetica", "italic");
    docPDF.setFontSize(10);
    docPDF.text(
      "This is a system-generated receipt. No signature required.",
      15,
      y,
    );

    const details = {
      transaction_ID: txid,
      transaction_TIME: date,
      transaction_PURPOSE: purpose,
      transaction_AMOUNT: amount,
      transaction_STATUS: "PAID",
      transaction_PAID_FROM: [
        isUser?.accountDetails.accountTittle,
        isUser?.accountDetails.accountNumber,
      ],
      transaction_PAID_TO: ["M_Finance", "VCXBVCN-43543VCXVX23-5858"],
      transaction_PAYMENT_METHOD: "M_Finance",
    };

    try {
      setLoading(true);
      let query = doc(
        db,
        "Users",
        auth.currentUser.uid,
        "Loans",
        targetLoan.loanID,
      );
      await updateDoc(query, {
        isInitialAmountPaid: true,
        approved: true,
        initialAmountPaidDetails: { ...details },
      });
      errorToast("Your Initial Amount Is Paid Save PDF", 200, 200, 200);
      setLoading(false);
      docPDF.save(`Receipt_${txid}${loanID}.pdf`);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const paymentHandler = (event) => {
    event.preventDefault();

    const { Amount, CNIC, Password, SelectPurpose } = payFormInputsValues;

    if (
      !Amount ||
      !CNIC ||
      !Password ||
      !SelectPurpose ||
      SelectPurpose === "Select Purpose"
    ) {
      return errorToast("Kindly Complete Form");
    }

    if (amountPurposeChecking) {
      if (Amount > monthlyInstallMent || Amount < monthlyInstallMent) {
        return errorToast(
          `Enter Correct Installment Amount ${monthlyInstallMent}`,
        );
      }
    } else {
      if (
        Amount > targetLoan?.loanData.Initial_Amount ||
        Amount < targetLoan?.loanData.Initial_Amount
      ) {
        return errorToast(
          `Enter Correct Initial Amount ${targetLoan?.loanData.Initial_Amount}`,
        );
      }
    }

    if (CNIC !== isUser?.CNIC) {
      return errorToast(`Enter Correct CNIC Number`);
    }

    if (Password !== isUser?.Password) {
      return errorToast(`Enter Correct Password`);
    }

    if (
      targetLoan.loanData.approved &&
      targetLoan.loanData.isInitialAmountPaid
    ) {
      if (SelectPurpose === "Initial Payment") {
        return errorToast("Your Initial Amount is Paid", 200, 200, 200);
      }
    } else {
      if (SelectPurpose === "Monthly Payment") {
        return errorToast("Kindly Select Initial Amount");
      }
    }

    if (!amountPurposeChecking) {
      paymenting(Amount, SelectPurpose);
      return;
    }
  };

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center bg-black px-2">
        <form className="paymentCard w-full tablet:w-[400px] h-[600px] bg-card p-3 flex flex-col justify-evenly items-center">
          {["Amount", "CNIC", "Password"].map((e, i) => {
            return (
              <label
                className={`flex flex-wrap justify-start items-center gap-2 relative text-sm font-elmssans-medium w-full`}
                key={i}
              >
                <span className="text-main text-xl">
                  Insert {e.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </span>
                <input
                  type={
                    e === "Password"
                      ? passwordEye
                        ? "text"
                        : "password"
                      : e === "CNIC" || e === "Initial_Amount"
                        ? "number"
                        : "text"
                  }
                  disabled={loading}
                  id={e}
                  onChange={payFormInputHandler}
                  className="bg-main text-layout w-full full p-3 text-xl font-elmssans-medium"
                  placeholder={e.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  max={
                    e === "Amount"
                      ? amountPurposeChecking
                        ? monthlyInstallMent
                        : targetLoan?.loanData.Initial_Amount
                      : ""
                  }
                  min={
                    e === "Amount"
                      ? amountPurposeChecking
                        ? monthlyInstallMent
                        : targetLoan?.loanData.Initial_Amount
                      : ""
                  }
                  defaultValue={
                    e === "Amount"
                      ? amountPurposeChecking
                        ? monthlyInstallMent
                        : targetLoan?.loanData.Initial_Amount
                      : ""
                  }
                />
                {e === "Password" && (
                  <button
                    type="button"
                    className={`${passwordEyeCSS}`}
                    onClick={passwordEyeHandler}
                    disabled={loading}
                  >
                    {passwordEye ? <EyeIcon /> : <EyeSlashIcon />}
                  </button>
                )}
              </label>
            );
          })}

          <label
            htmlFor={"SelectPurpose"}
            className={`flex flex-wrap justify-start items-center gap-2 relative text-sm font-elmssans-light w-full`}
          >
            <span className="text-main text-xl">Select Purpose</span>
            <select
              name={"SelectPurpose"}
              id={"SelectPurpose"}
              className="bg-main text-layout w-full full text-xl"
              defaultChecked={"Select Purpose"}
              onChange={payFormInputHandler}
              disabled={loading}
            >
              {["Select Purpose", "Initial Payment", "Monthly Payment"].map(
                (elem, i) => {
                  return (
                    <option key={i} value={elem}>
                      {elem}
                    </option>
                  );
                },
              )}
            </select>
          </label>

          <button
            className="px-3 py-2 text-xl bg-layout text-main flex justify-center items-center gap-2"
            type="submit"
            disabled={loading}
            onClick={paymentHandler}
          >
            Pay Now{" "}
            {loading ? (
              <ArrowPathRoundedSquareIcon className={`size-5 animate-spin`} />
            ) : (
              <BanknotesIcon className="size-5" />
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
