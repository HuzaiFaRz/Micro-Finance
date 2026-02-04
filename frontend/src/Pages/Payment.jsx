import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { auth } from "../Firebase/firebase";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import {
  BanknotesIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const Payment = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useState(false);
  const [passwordEye, setPasswordEye] = useState(false);
  const { loanID } = useParams();
  const [targetLoan, setTargetLoan] = useState(null);

  const { errorToast, passwordEyeCSS } = useContext(GlobalContextCreated);
  const [payFormInputsValues, setPayFormInputsValues] = useState({
    Initial_Amount: targetLoan?.loanData.Initial_Amount,
    CNIC: "",
    Password: "",
    SelectPurpose: "",
  });

  const { loan, isUser } = AuthUseContext();

  useEffect(() => {
    if (!auth.currentUser) {
      return navigate("/sign-in");
    }
    const checkingLoanID = loan.find((e) => {
      return e.loanID === loanID;
    });
    if (checkingLoanID) {
      setTargetLoan(checkingLoanID);
    } else {
      setTargetLoan(null);
      console.error("Invalid Data Entered");
      return navigate("/dashboard");
    }
  }, []);

  const payFormInputHandler = (event) => {
    const { value, id } = event.target;
    setPayFormInputsValues((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (!value) {
      return errorToast("Fill Form");
    }
    if (id === "Initial_Amount") {
      if (
        value > targetLoan?.loanData.Initial_Amount ||
        value < targetLoan?.loanData.Initial_Amount
      ) {
        return errorToast(
          `Enter Correct Initial Amount ${targetLoan?.loanData.Initial_Amount}`,
        );
      }
      return;
    }
    if (id === "CNIC") {
      if (value !== isUser?.CNIC) {
        return errorToast(`Enter Correct CNIC Number`);
      }
      return;
    }
    if (id === "Password") {
      if (value !== isUser?.Password) {
        return errorToast(`Enter Correct Password`);
      }
      return;
    }

    if (id === "SelectPurpose") {
      if (value === "Select Purpose") {
        return errorToast("Kindly Select Purpose");
      }
      if (!targetLoan.approved && !targetLoan.isInitialAmountPaid) {
        if (value === "Monthly Payment") {
          return errorToast("Kindly Select Initial Amount");
        }
      } else {
        if (value === "Initial Amount") {
          return errorToast("Your Initial Amount is Paid");
        }
      }
    }
  };

  const passwordEyeHandler = () => {
    setPasswordEye(!passwordEye);
  };

  const paymentHandler = (event) => {
    event.preventDefault();
    const { Initial_Amount, CNIC, Password, SelectPurpose } =
      payFormInputsValues;
    if (
      !Initial_Amount ||
      !CNIC ||
      !Password ||
      SelectPurpose === "Select Purpose"
    ) {
      return errorToast("Fill Form");
    }
    if (!targetLoan.approved && !targetLoan.isInitialAmountPaid) {
      if (SelectPurpose === "Monthly Payment") {
        return errorToast("Kindly Select Initial Amount");
      }
    } else {
      if (SelectPurpose === "Initial Amount") {
        return errorToast("Your Initial Amount is Paid");
      }
    }
  };

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center bg-black px-2">
        <form className="paymentCard w-full tablet:w-[400px] h-[600px] bg-card p-3 flex flex-col justify-evenly items-center">
          {["Initial_Amount", "CNIC", "Password"].map((e, i) => {
            return (
              <label
                className={`flex flex-wrap justify-start items-center gap-2 relative text-sm font-elmssans-light w-full`}
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
                    e === "Initial_Amount"
                      ? targetLoan?.loanData.Initial_Amount
                      : ""
                  }
                  min={
                    e === "Initial_Amount"
                      ? targetLoan?.loanData.Initial_Amount
                      : ""
                  }
                  defaultValue={
                    e === "Initial_Amount"
                      ? targetLoan?.loanData.Initial_Amount
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
