import {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import LoanFormReducer from "../Reducers/LoanFormReducer";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const LoanForm = () => {
  const labelCssL_form =
    "flex flex-col justify-center items-start gap-2 w-full tablet:w-[350px] relative text-sm font-elmssans-light";

  const errorParaRef = useRef([]);

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

  const settingErrorMsg = (msg, id) => {
    const errorP = errorParaRef.current.find((e) => e.id === id);
    if (errorP) {
      errorP.textContent = msg;
    } else {
      errorParaRef.current.forEach((e) => {
        e.textContent = msg;
      });
    }
  };

  // useEffect(() => {
  //   Object.entries(loanFormValues).map(([key, value]) => {
  //     if (key === "Loan_Duration") {
  //       if (value === "Loan_Duration") {
  //         settingErrorMsg(`First Select ${key.replace("Loan_", "")}`, "llll");
  //       }
  //     }

  //     if (key === "Loan_Category") {
  //       if (value === "Loan_Category") {
  //         (setIsLoanSelectPass(false),
  //           settingErrorMsg(
  //             `First Select ${key.replace("Loan_", "")}`,
  //             "llll",
  //           ));
  //       }
  //     }
  //     // console.log(this);
  //     // settingErrorMsg(``, ``);
  //     // setIsLoanSelectPass(true);
  //   });
  // }, [loanFormValues]);

  const loanFormInputHandler = (event) => {
    let id = event.target.id;
    let value = event.target.value;

    loanFormDispatch({
      type: "INPUT_CHANGE",
      inputID: id,
      inputValue: value,
    });

    const categoryGetting = Object.entries(LOAN_CATEGORIES).filter(([key]) =>
      value.includes(key),
    );

    if (id === "Loan_Duration" && value === "Loan_Duration") {
      settingErrorMsg(`Select Duration`, id);
      errorToast("Please Select Duration");
      return;
    }

    if (id === "Loan_Category") {
      if (value === "Loan_Category") {
        settingErrorMsg(`Select Category`, id);
        errorToast("Please Select Category");
        setLoanDurationRange([1, 5]);
        setWhatCategorySelected(null);
        // localStorage.removeItem("SelectedCategory");
        return;
      }
      settingErrorMsg(``, id);
      setWhatCategorySelected(categoryGetting);
      setLoanDurationRange(categoryGetting[0][1].duration);
      // localStorage.setItem("SelectedCategory", JSON.stringify(categoryGetting));
      return;
    }

    // const gettingSavedCategory = JSON.parse(
    //   localStorage.getItem("SelectedCategory"),
    // );

    if (id === "Loan_Amount" || id === "Initial_Amount") {
      // if (!isLoanSelectPass) {
      //   console.log(isLoanSelectPass);
      //   return (
      //     // settingErrorMsg(`First Select Category or Duration`, id),
      //     (event.target.value = "")
      //   );
      // }

      // settingErrorMsg(`First Select Category or Duration`, id);
      // event.target.value = "";

      if (!whatCategorySelected) {
        settingErrorMsg(`Select Category`, id);
        event.target.removeAttribute("max");
        event.target.removeAttribute("min");
        return;
      }

      if (
        loanFormValues.Loan_Duration === "Loan_Duration" ||
        loanFormValues.Loan_Duration === ""
      ) {
        settingErrorMsg(`Select Duration`, id);
        event.target.removeAttribute("max");
        event.target.removeAttribute("min");
        return;
      }

      const { maxLoan, minLoan, initialPercent } = whatCategorySelected[0][1];

      const formatingPKR = (amount) =>
        new Intl.NumberFormat("en-PK", {
          style: "currency",
          currency: "PKR",
          minimumFractionDigits: 2,
        }).format(amount.toFixed(2));

      if (!value) {
        settingErrorMsg(`Enter ${id}`, id);
        return;
      }

      if (id === "Loan_Amount") {
        event.target.setAttribute("max", maxLoan);
        event.target.setAttribute("min", minLoan);
        if (+value > maxLoan) {
          return settingErrorMsg(
            `Maximum loan for this category is ${formatingPKR(maxLoan)}`,
            id,
          );
        }
        if (+value < minLoan) {
          return settingErrorMsg(
            `Minimum loan amount is ${formatingPKR(minLoan)}`,
            id,
          );
        }
        return settingErrorMsg(``, id);
      }

      if (id === "Initial_Amount") {
        const initialAmount =
          (+loanFormValues.Loan_Amount * initialPercent) / 100;
        event.target.setAttribute("max", initialAmount);
        event.target.setAttribute("min", initialAmount);

        if (value < initialAmount) {
          console.log(this);
          return settingErrorMsg(
            `Initial payment must be at least ${initialPercent}% of the loan amount Your Initial Amount is ${formatingPKR(initialAmount)}`,
            id,
          );
        }

        if (value > initialAmount) {
          return settingErrorMsg(
            `Initial amount cannot be equal to or greater than the loan amount`,
            id,
          );
        }

        return settingErrorMsg(``, id);
      }

      return;
    }
  };

  return (
    <Fragment>
      <div className="w-full h-dvh bg-black flex flex-col justify-evenly items-center p-2">
        <form
          className="w-full tablet:w-[800px] h-[600px] tablet:h-[500px] flex flex-wrap justify-evenly items-center gap-1 p-3 bg-layout rounded-br-4xl rounded-tr-4xl"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          {loanFormSelect.map((mainElem, MainIndex) => {
            const { Loan_Category, Loan_Duration } = mainElem;
            const uniqueName = Object.keys(mainElem);
            return (
              <label
                htmlFor={uniqueName}
                className={labelCssL_form}
                key={MainIndex}
              >
                <span className="text-main text-sm tablet:text-lg">
                  Select {uniqueName}
                </span>
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
                <span className="text-main text-sm tablet:text-lg">
                  Insert {e}
                </span>
                <input
                  type="number"
                  id={e}
                  className="bg-main text-layout w-full full p-3 text-lg font-elmssans-medium"
                  placeholder={e}
                  onChange={loanFormInputHandler}
                />
                <p
                  className={`text-sm tablet:text-lg tracking-wider text-red-500 w-full h-max`}
                  id={e}
                  ref={(el) => (errorParaRef.current[i] = el)}
                ></p>
              </label>
            );
          })}

          <div className="w-full flex flex-col justify-center items-center gap-5 text-main">
            <h1 className="text-2xl tracking-wider text-center">
              Monthly Installment is:{" "}
            </h1>
            <button
              type="submit"
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
