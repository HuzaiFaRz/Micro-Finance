import { Fragment } from "react";
import { Tooltip } from "react-tooltip";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { NavLink } from "react-router";

const Dashboard = () => {
  const { loan, isUser } = AuthUseContext();

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-black font-elmssans-medium relative">
        <h1 className="text-xl tablet:text-4xl text-card font-elmssans-bold text-center pt-5 tracking-wider">
          Hello {isUser?.Name} <br /> Your Loans Here
        </h1>
        <>
          {loan ? (
            <>
              <div className="loanCards flex flex-col justify-center items-center p-2 mt-5 gap-6 pb-5">
                {loan?.map((data, index) => {
                  const { loanID, loanData } = data;
                  const formatingPKR = (amount) =>
                    new Intl.NumberFormat("en-PK", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(amount);

                  const {
                    Initial_Amount,
                    Loan_Amount,
                    Loan_Category,
                    Loan_Duration,
                    applyAt,
                    approved,
                    profitRate,
                    isInitialAmountPaid,
                    monthlyInstallment,
                    loanImageURL,
                  } = loanData;

                  const timestampInMilliseconds =
                    applyAt.seconds * 1000 + applyAt.nanoseconds / 1000000;

                  const date = new Date(timestampInMilliseconds).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      year: "numeric",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    },
                  );

                  const UI = {
                    "Loan Category": Loan_Category,
                    "Loan Duration": Loan_Duration,
                    "Monthly Installment": monthlyInstallment,
                    "Apply At": date,
                    "Profit Rate": profitRate,
                    Approve:
                      !approved && !isInitialAmountPaid
                        ? "Your Initial Amount Is Unpaid"
                        : "Approved",
                  };

                  if (!isInitialAmountPaid && !approved) {
                    UI["Initial Amount"] = formatingPKR(Initial_Amount);
                  }

                  return (
                    <>
                      <div
                        className={`loanCard w-full h-full py-3 tablet:py-4 bg-gray-200 text-card relative flex flex-col justify-between items-start gap-3 rounded-2xl shadow-xl ${!isInitialAmountPaid && !approved ? "shadow-red-500" : "shadow-layout"}`}
                        id={loanID}
                        key={index}
                      >
                        <Tooltip
                          id="my-tooltip"
                          variant="dark"
                          place="bottom-end"
                          content="First Pay Initial Amount"
                          anchorSelect=".status"
                        />

                        <span
                          className={`status ${isInitialAmountPaid ? "text-green-500" : "text-red-500"} absolute right-2 top-2 font-elmssans-medium text-[15px] tablet:text-lg`}
                        >
                          {isInitialAmountPaid ? "Approved" : "Pending"}
                        </span>

                        <h1 className="font-elmssans-bold text-xl tablet:text-2xl desktop:text-4xl px-3">
                          Rs {formatingPKR(Loan_Amount)} PKR
                        </h1>

                        <div className="mt-5 w-full flex flex-wrap justify-between items-center gap-5 tablet:gap-0 px-3">
                          <div className="text-layout text-[19px] tablet:text-2xl flex flex-col justify-between items-start gap-5 font-elmssans-light w-full tablet:w-1/2">
                            {Object.entries(UI).map(([key, value], i) => {
                              return (
                                <span key={i}>
                                  {key}: {""}
                                  <strong
                                    className={`tracking-wider leading-8 text-[17px] tablet:text-2xl ${key === "Approve" && !isInitialAmountPaid && !approved ? "text-red-500" : "text-layout"}`}
                                  >
                                    {value}
                                  </strong>{" "}
                                </span>
                              );
                            })}
                          </div>
                          <div className="w-full tablet:w-1/2">
                            <img
                              src={loanImageURL}
                              className="w-full h-[350px] object-cover brightness-50 rounded-4xl"
                            />
                          </div>
                        </div>

                        <div className="w-full flex flex-wrap justify-center tablet:justify-between items-center px-3 mt-5 gap-5">
                          <span className="text-xl tablet:text-2xl text-center">
                            Your dreams, funded responsibly.✨
                          </span>
                          {!isInitialAmountPaid && (
                            <NavLink
                              to={`payment/${loanID}`}
                              className="px-3 py-2 text-xl bg-card text-main"
                            >
                              Pay Initial Amount
                            </NavLink>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center gap-5  w-full absolute top-1/2 -translate-1/2 left-1/2 font-elmssans-medium text-card">
                <h1 className="text-4xl">No Loan Yet!</h1>
                <NavLink
                  to={"/loan-form"}
                  className="underline underline-offset-4  px-3 py-2 text-xl"
                >
                  Apply Now
                </NavLink>
              </div>
            </>
          )}
        </>
      </div>
    </Fragment>
  );
};

export default Dashboard;
