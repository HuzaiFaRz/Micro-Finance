import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { auth } from "../Firebase/firebase";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

const Payment = () => {
  const navigate = useNavigate();
  const { loan } = AuthUseContext();
  const { loanID } = useParams();
  const [targetLoan, setTargetLoan] = useState(null);

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

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center">
        <div className="paymentCard w-[400px] h-[600px] bg-card p-3">
          <label
            htmlFor={`Initial_Amount`}
            className={`${`"flex flex-wrap justify-start items-center gap-2 relative text-sm font-elmssans-light w-full"`}`}
          >
           <span className="text-main text-xl">Insert Initial Amount</span>
            <input
              type="number"
              // disabled={loading}
              id={`Initial Amount`}
              className="bg-main text-layout w-full full p-3 text-xl font-elmssans-medium"
              placeholder={`Initial_Amount`}
              // onChange={loanFormInputHandler}
              max={targetLoan?.loanData.Initial_Amount}
              min={targetLoan?.loanData.Initial_Amount}
            />
            {/* <p
              id={`Initial_Amount`}
              className="text-sm tablet:text-lg tracking-wider text-red-500 w-full h-max"
              ref={(el) => (errorParaRef.current[i] = el)}
            ></p> */}
          </label>
          <label
            htmlFor={`Initial Amount`}
            className={`${`"flex flex-wrap justify-start items-center gap-2 relative text-sm font-elmssans-light w-full"`}`}
          >
            <span className="text-main text-xl">Insert CNIC</span>
            <input
              type="tel"
              // disabled={loading}
              id={`CINC`}
              className="bg-main text-layout w-full full p-3 text-xl font-elmssans-medium"
              placeholder={`CINC`}

            />
            {/* <p
              id={`Initial_Amount`}
              className="text-sm tablet:text-lg tracking-wider text-red-500 w-full h-max"
              ref={(el) => (errorParaRef.current[i] = el)}
            ></p> */}
          </label>
        </div>
      </div>
    </>
  );
};

export default Payment;
