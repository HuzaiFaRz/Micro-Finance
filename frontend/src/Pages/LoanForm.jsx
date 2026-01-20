import { Fragment, useState } from "react";

const LoanForm = () => {
  const [loading, setLoading] = useState(false);

  const labelCssL_form =
    "flex flex-col justify-center items-start gap-2 w-full tablet:w-[350px]";

  const loanFormSelect = [
    {
      Loan_Category: [
        "Home Loan",
        "Education Loan",
        "Business Loan",
        "Personal Loan",
        "Vehicle Loan",
        "Emergency Loan",
      ],
    },
    {
      Loan_Duration: [],
    },
  ];

  for (let index = 1; index <= 5; index++) {
    loanFormSelect[1].Loan_Duration.push(`${index} Years`);
  }

  // const loanCategories = {
  //   home: {
  //     minLoan: 500000,
  //     maxLoan: 5000000,
  //     interest: 1.5,
  //     duration: [1, 5],
  //     initialPercent: 10,
  //   },
  //   education: {
  //     minLoan: 100000,
  //     maxLoan: 500000,
  //     interest: 1.2,
  //     duration: [1, 2],
  //     initialPercent: 5,
  //   },
  //   business: {
  //     minLoan: 200000,
  //     maxLoan: 1000000,
  //     interest: 2.5,
  //     duration: [1, 2],
  //     initialPercent: 10,
  //   },
  //   personal: {
  //     minLoan: 50000,
  //     maxLoan: 300000,
  //     interest: 3,
  //     duration: [1, 2],
  //     initialPercent: 0,
  //   },
  //   vehicle: {
  //     minLoan: 200000,
  //     maxLoan: 2000000,
  //     interest: 2,
  //     duration: [1, 3],
  //     initialPercent: 15,
  //   },
  //   emergency: {
  //     minLoan: 10000,
  //     maxLoan: 100000,
  //     interest: 4,
  //     duration: [1, 5],
  //     initialPercent: 0,
  //   },
  // };

  const loanFormInput = ["Loan_Amount", "Initial_Amount"];

  const loanFormInputHandler = () => {
    event.preventDefault();
    const { value, id } = event.target;
    console.log(value, id);
    setLoading(false);
  };

  return (
    <Fragment>
      <div className="w-full h-[600px] bg-main flex flex-col justify-evenly items-center p-2">
        <form className="w-full tablet:w-[800px] h-[600px] tablet:h-[500px] flex flex-wrap justify-evenly items-center gap-1 p-3 bg-layout rounded-br-4xl rounded-tr-4xl">
          {loanFormSelect.map((mainElem, MainIndex) => {
            const { Loan_Category: Select_Category, Loan_Duration } = mainElem;
            const uniqueName = Object.keys(mainElem);
            return (
              <label
                htmlFor={uniqueName}
                className={labelCssL_form}
                key={MainIndex}
              >
                <span className="text-main text-lg">Select_{uniqueName}</span>
                <select
                  name={uniqueName}
                  id={uniqueName}
                  className="bg-main text-layout w-full full p-3 text-lg"
                  onChange={loanFormInputHandler}
                  defaultValue={uniqueName}
                >
                  <option value={uniqueName}>{uniqueName}</option>
                  {Loan_Duration &&
                    Loan_Duration.map((elem, i) => {
                      return (
                        <option key={i} value={elem}>
                          {elem}
                        </option>
                      );
                    })}
                  {Select_Category &&
                    Select_Category.map((elem, i) => {
                      return (
                        <option key={i} value={elem}>
                          {elem}
                        </option>
                      );
                    })}
                </select>
              </label>
            );
          })}

          {loanFormInput.map((e, i) => {
            return (
              <label htmlFor={e} className={labelCssL_form} key={i}>
                <span className="text-main text-lg">Insert_{e}</span>
                <input
                  type="number"
                  id={e}
                  className="bg-main text-layout w-full full p-3 text-lg font-elmssans-medium"
                  placeholder={e}
                  onChange={loanFormInputHandler}
                />
              </label>
            );
          })}

          <div className="w-full flex flex-col justify-center items-center gap-5 text-main">
            <h1 className="text-2xl tracking-wider text-center">
              Monthly Installment is:{" "}
            </h1>
            <button
              type="button"
              className="px-10 py-2 bg-card text-lg"
              disabled={loading}
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
