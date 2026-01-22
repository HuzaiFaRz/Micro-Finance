import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import LoanFormReducer from "../Reducers/LoanFormReducer";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const LoanForm = () => {
  const labelCssL_form =
    "flex flex-col justify-center items-start gap-2 w-full tablet:w-[350px]";

  const { inputsErrors, errorToast } = useContext(GlobalContextCreated);

  const [loading, setLoading] = useState(false);

  const [loanDurationRange, setLoanDurationRange] = useState([1, 5]);

  const [whatCategorySelected, setWhatCategorySelected] = useState(null);

  const loanFormInput = ["Loan_Amount", "Initial_Amount"];

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

  for (let year = loanDurationRange[0]; year <= loanDurationRange[1]; year++) {
    loanFormSelect[1].Loan_Duration.push(`${year} Years`);
  }

  const initialValue = {
    Loan_Category: "",
    Loan_Duration: "",
    Loan_Amount: "",
    Initial_Amount: "",
  };

  const [loanFormValues, loanFormDispatch] = useReducer(
    LoanFormReducer,
    initialValue,
  );

  const LOAN_CATEGORIES = {
    Home: {
      minLoan: 500000,
      maxLoan: 5000000,
      interest: 1.5,
      duration: [1, 5],
      initialPercent: 10,
    },
    Education: {
      minLoan: 100000,
      maxLoan: 500000,
      interest: 1.2,
      duration: [1, 2],
      initialPercent: 5,
    },
    Business: {
      minLoan: 200000,
      maxLoan: 1000000,
      interest: 2.5,
      duration: [1, 2],
      initialPercent: 10,
    },
    Personal: {
      minLoan: 50000,
      maxLoan: 300000,
      interest: 3,
      duration: [1, 2],
      initialPercent: 0,
    },
    Vehicle: {
      minLoan: 200000,
      maxLoan: 2000000,
      interest: 2,
      duration: [1, 3],
      initialPercent: 15,
    },
    Emergency: {
      minLoan: 10000,
      maxLoan: 100000,
      interest: 4,
      duration: [1, 5],
      initialPercent: 0,
    },
  };

  const loanFormInputHandler = (event) => {
    event.preventDefault();

    const { value, id } = event.target;

    loanFormDispatch({ type: "INPUT_CHANGE", inputID: id, inputValue: value });

    const categoryGetting = Object.entries(LOAN_CATEGORIES).filter(([key]) =>
      value.includes(key),
    );

    if (id === "Loan_Duration" && value === "Loan_Duration") {
      errorToast("Please Select Duration");
      return;
    }

    if (id === "Loan_Category") {
      if (value === "Loan_Category") {
        errorToast("Please Select Category");
        setLoanDurationRange([1, 5]);
        setWhatCategorySelected(null);
        // localStorage.removeItem("SelectedCategory");
        return;
      }
      setWhatCategorySelected(categoryGetting);
      setLoanDurationRange(categoryGetting[0][1].duration);
      // localStorage.setItem("SelectedCategory", JSON.stringify(categoryGetting));
    }

    // const gettingSavedCategory = JSON.parse(
    //   localStorage.getItem("SelectedCategory"),
    // );

    if (!whatCategorySelected) return;
    const { maxLoan, minLoan, initialPercent } = whatCategorySelected[0][1];
    const formatingPKR = (amount) =>
      new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        minimumFractionDigits: 2,
      }).format(amount.toFixed(2));

    if (id === "Loan_Amount") {
      if (+value > maxLoan) {
        errorToast(
          `Maximum loan for this category is ${formatingPKR(maxLoan)}`,
        );
        return;
      }
      if (+value < minLoan) {
        errorToast(`Minimum loan amount is ${formatingPKR(minLoan)}`);
        return;
      }
    }

    if (id === "Initial_Amount") {
      if (value < (+loanFormValues.Loan_Amount * initialPercent) / 100) {
        errorToast(
          `Initial payment must be at least ${initialPercent}% of the loan amount`,
        );
        return;
      }
      if (value > (+loanFormValues.Loan_Amount * initialPercent) / 100) {
        errorToast(
          `Initial amount cannot be equal to or greater than the loan amount`,
        );
        return;
      }
    }
  };

  return (
    <Fragment>
      <div className="w-full h-[600px] bg-black flex flex-col justify-evenly items-center p-2">
        <form className="w-full tablet:w-[800px] h-[600px] tablet:h-[500px] flex flex-wrap justify-evenly items-center gap-1 p-3 bg-layout rounded-br-4xl rounded-tr-4xl">
          {loanFormSelect.map((mainElem, MainIndex) => {
            const { Loan_Category, Loan_Duration } = mainElem;
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
                  // defaultValue={uniqueName}
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
                  {Loan_Category &&
                    Loan_Category.map((elem, i) => {
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
