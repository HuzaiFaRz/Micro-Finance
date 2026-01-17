import React, { Fragment, useContext, useTransition } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const LoanForm = () => {
  const [isPending, startTransition] = useTransition();
  const { labelCSS, inputCSS } = useContext(GlobalContextCreated);
  const loanCategoriesOption = [
    "Select Category",
    "Home Loan",
    "Education Loan",
    "Business Loan",
    "Personal Loan",
    "Vehicle Loan",
    "Emergency Loan",
  ];
  const loanDurationOption = ["Select Duration"];

  for (let index = 1; index <= 5; index++) {
    loanDurationOption.push(`${index} Years`);
  }

  const loanFormInput = ["LoanAmount", "InitialAmount"];

  const applyLoanHandler = () => {
    console.log(isPending);
    startTransition(() => {
      console.log(this);
    });
  };

  return (
    <Fragment>
      <div className="w-full h-[700px] bg-main flex justify-center items-center p-2">
        <form className="w-full tablet:w-[800px] h-[600px] tablet:h-[500px] flex flex-wrap justify-evenly items-center gap-1 p-3 bg-layout rounded-br-4xl rounded-tr-4xl font-elmssans-light">
          <label
            htmlFor="SelectCategory"
            className={`flex flex-col justify-center items-start gap-2 w-full tablet:w-[350px] `}
          >
            <span className="text-main text-lg">Select Category</span>
            <select
              name="SelectCategory"
              id="SelectCategory"
              className="bg-main text-layout w-full full p-3 text-lg"
            >
              {loanCategoriesOption.map((elem, i) => {
                return (
                  <option key={i} value={elem}>
                    {elem}
                  </option>
                );
              })}
            </select>
          </label>

          {loanFormInput.map((e, i) => {
            return (
              <label
                htmlFor={e}
                className={`flex flex-col justify-center items-start gap-2 w-full tablet:w-[350px] font-elmssans-light`}
                key={i}
              >
                <span className="text-main text-lg">
                  Insert {e.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </span>
                <input
                  type="number"
                  id={e}
                  className="bg-main text-layout w-full full p-3 text-lg"
                  placeholder={e.replace(/([a-z])([A-Z])/g, "$1 $2")}
                />
              </label>
            );
          })}

          <label
            htmlFor="SelectDuration"
            className={`flex flex-col justify-center items-start gap-2 w-full tablet:w-[350px] font-elmssans-light`}
          >
            <span className="text-main text-lg">Select Duration</span>
            <select
              name="SelectDuration"
              id="SelectDuration"
              className="bg-main text-layout w-full full p-3 text-lg"
            >
              {loanDurationOption.map((elem, i) => {
                return (
                  <option key={i} value={elem}>
                    {elem}
                  </option>
                );
              })}
            </select>
          </label>

          <div className="w-full flex flex-col justify-center items-center gap-5 text-main">
            <h1 className="text-2xl tracking-wider text-center">
              Monthly Installment is:{" "}
            </h1>
            <button
              type="submit"
              className="px-10 py-2 bg-card text-lg"
              onClick={applyLoanHandler}
              disabled={isPending}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoanForm;
