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
import {
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import { auth, db } from "../Firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

const LoanForm = () => {
  const navigate = useNavigate();

  const labelCssL_form =
    "flex flex-wrap justify-start items-center gap-2 relative text-sm font-elmssans-light w-full desktop:w-[350px]";

  const loanApplyRules = [
    "Select a loan category to view available options",
    "Enter a loan amount within the allowed limit of the selected category",
    "Pay the minimum initial amount required for this loan",
    "Choose a loan duration from the available options",
    "Monthly installment is calculated automatically",
    "Review all details carefully before submitting",
    "Submitted loan applications cannot be edited",
  ];

  const [valid, setValid] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  const [profitRate, setProfitRate] = useState(null);

  const [m_Install, setM_Install] = useState(null);

  const loanCategoryImgURL = {
    "Home Loan":
      "https://images.unsplash.com/photo-1691941209466-e981f3a192a7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Education Loan":
      "https://images.unsplash.com/photo-1672839414428-e3de65ce981c?q=80&w=424&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Business Loan":
      "https://images.unsplash.com/photo-1506787497326-c2736dde1bef?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Personal Loan":
      "https://images.unsplash.com/photo-1764231467852-b609a742e082?q=80&w=421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Vehicle Loan":
      "https://images.unsplash.com/photo-1684082018938-9c30f2a7045d?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Emergency Loan":
      "https://images.unsplash.com/photo-1758404958502-44f156617bae?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const errorParaRef = useRef([]);

  const { errorToast } = useContext(GlobalContextCreated);

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
      minLoan: 100000,
      maxLoan: 5000000,
      profitRate: 2,
      duration: [1, 5],
      initialPercent: 10,
    },
    Education: {
      minLoan: 10000,
      maxLoan: 500000,
      profitRate: 0,
      duration: [1, 2],
      initialPercent: 5,
    },
    Business: {
      minLoan: 100000,
      maxLoan: 10000000,
      profitRate: 5,
      duration: [1, 2],
      initialPercent: 10,
    },
    Personal: {
      minLoan: 5000,
      maxLoan: 300000,
      profitRate: 2,
      duration: [1, 2],
      initialPercent: 2,
    },
    Vehicle: {
      minLoan: 50000,
      maxLoan: 2000000,
      profitRate: 2,
      duration: [1, 3],
      initialPercent: 15,
    },
    Emergency: {
      minLoan: 10000,
      maxLoan: 100000,
      profitRate: 0,
      duration: [1, 5],
      initialPercent: 2,
    },
  };

  const settingErrorMsg = (msg, id) => {
    setErrorMsg(msg);
    const errorP = errorParaRef.current.find((e) => e.id === id);
    if (errorP) {
      errorP.innerHTML = msg;
    } else {
      errorParaRef.current.forEach((e) => {
        e.innerHTML = msg;
      });
    }
  };

  const formatingPKR = (amount) =>
    new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  useEffect(() => {
    const { Loan_Category, Loan_Duration, Loan_Amount, Initial_Amount } =
      loanFormValues;

    if (!Loan_Category || Loan_Category === "Loan_Category") {
      return settingErrorMsg(`Select Loan Category`, [
        "Loan_Amount",
        "Initial_Amount",
      ]);
    }

    if (!Loan_Duration || Loan_Duration === "Loan_Duration") {
      return settingErrorMsg(`Select Loan Duration`, [
        "Loan_Amount",
        "Initial_Amount",
      ]);
    }

    const { maxLoan, minLoan, initialPercent, profitRate } =
      whatCategorySelected[0][1];

    const gettingInitialAmount =
      (+loanFormValues.Loan_Amount * initialPercent) / 100;

    if (!Loan_Amount) {
      return;
    }

    if (+Loan_Amount > maxLoan) {
      return settingErrorMsg(
        `Maximum loan for this category is ${formatingPKR(maxLoan)}`,
        "Loan_Amount",
      );
    }

    if (+Loan_Amount < minLoan) {
      return settingErrorMsg(
        `Minimum loan amount is ${formatingPKR(minLoan)}`,
        "Loan_Amount",
      );
    }

    if (!Initial_Amount) {
      return;
    }

    if (Initial_Amount < gettingInitialAmount) {
      return settingErrorMsg(
        `Initial payment must be at least ${initialPercent}% of the loan amount Your Initial Amount is ${formatingPKR(gettingInitialAmount)}`,
        "Initial_Amount",
      );
    }

    if (Initial_Amount > gettingInitialAmount) {
      return settingErrorMsg(
        `Initial amount cannot be equal to or greater than the loan amount`,
        "Initial_Amount",
      );
    }

    settingErrorMsg("", null);
    setM_Install(
      formatingPKR(
        (Loan_Amount -
          gettingInitialAmount +
          ((Loan_Amount - gettingInitialAmount) *
            profitRate *
            parseInt(Loan_Duration)) /
            100) /
          (parseInt(Loan_Duration) * 12),
      ),
    );
  }, [loanFormValues, whatCategorySelected]);

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
      settingErrorMsg("Select Duration", id);
      setM_Install(null);
      setValid(false);
      errorToast("Please Select Duration");
      return;
    }

    settingErrorMsg("", id);

    if (id === "Loan_Category") {
      if (value === "Loan_Category") {
        setValid(false);
        settingErrorMsg("Select Category", id);
        setM_Install(null);
        setProfitRate(null);
        errorToast("Please Select Category");
        setLoanDurationRange([1, 5]);
        setWhatCategorySelected(null);
        // localStorage.removeItem("SelectedCategory");
        return;
      }
      setProfitRate(`${categoryGetting[0][1].profitRate}%`);
      setWhatCategorySelected(categoryGetting);
      setLoanDurationRange(categoryGetting[0][1].duration);
      // localStorage.setItem("SelectedCategory", JSON.stringify(categoryGetting));
      return setValid(true);
    }

    // const gettingSavedCategory = JSON.parse(
    //   localStorage.getItem("SelectedCategory"),
    // );

    if (id === "Loan_Amount" || id === "Initial_Amount") {
      setValid(false);
      setM_Install(null);
      if (
        loanFormValues.Loan_Category === "Loan_Category" ||
        !loanFormValues.Loan_Category ||
        !whatCategorySelected
      ) {
        event.target.removeAttribute("max");
        event.target.removeAttribute("min");
        settingErrorMsg("Select Category", id);
        return;
      }

      if (
        loanFormValues.Loan_Duration === "Loan_Duration" ||
        !loanFormValues.Loan_Duration
      ) {
        return settingErrorMsg("Select Duration", id);
      }

      settingErrorMsg("", id);

      const { maxLoan, minLoan, initialPercent, profitRate } =
        whatCategorySelected[0][1];

      settingErrorMsg(``, id);

      if (id === "Loan_Amount") {
        if (!value) {
          return settingErrorMsg(`Enter ${id}`, id);
        }
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
        return (settingErrorMsg(``, id), setValid(true));
      }

      if (id === "Initial_Amount") {
        if (
          !loanFormValues.Loan_Amount ||
          loanFormValues.Loan_Amount > maxLoan ||
          loanFormValues.Loan_Amount < minLoan
        ) {
          return settingErrorMsg(`Enter Loan Amount`, id);
        }

        if (!value) {
          return settingErrorMsg(`Enter ${id}`, id);
        }

        const initialAmount =
          (+loanFormValues.Loan_Amount * initialPercent) / 100;
        event.target.setAttribute("max", initialAmount);
        event.target.setAttribute("min", initialAmount);
        if (value < initialAmount) {
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
        setM_Install(
          formatingPKR(
            (loanFormValues.Loan_Amount -
              value +
              ((loanFormValues.Loan_Amount - value) *
                profitRate *
                parseInt(loanFormValues.Loan_Duration)) /
                100) /
              (parseInt(loanFormValues.Loan_Duration) * 12),
          ),
        );
        return (settingErrorMsg(``, id), setValid(true));
      }
    }

    return setValid(true);
  };

  const applyLoanFormHandler = async () => {
    event.preventDefault();
    if (
      !valid ||
      loanFormValues.Loan_Category === "Loan_Category" ||
      !loanFormValues.Loan_Amount ||
      loanFormValues.Loan_Duration === "Loan_Duration" ||
      !loanFormValues.Loan_Duration ||
      !loanFormValues.Loan_Amount ||
      !loanFormValues.Initial_Amount ||
      errorMsg !== ""
    ) {
      errorToast("Kindly Complete Form");
      return;
    }

    const url = Object.entries(loanCategoryImgURL).find(
      ([key]) => key === loanFormValues.Loan_Category,
    );

    try {
      setLoading(true);
      if (!auth.currentUser) {
        return navigate("/sign-in");
      }
      await addDoc(collection(db, "Users", auth.currentUser.uid, "Loans"), {
        ...loanFormValues,
        isInitialAmountPaid: false,
        applyAt: serverTimestamp(),
        approved: false,
        profitRate: profitRate,
        monthlyInstallment: m_Install,
        loanImageURL: url[1],
      });
      errorToast("Loan Created SuccessFully", 200, 200, 200);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      errorToast(error?.code);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="w-full h-full bg-layout flex desktop:flex-row flex-col pb-10">
        <ol className="w-full desktop:w-[40%] h-full p-4 flex flex-col justify-start items-start font-elmssans-medium bg-black text-main">
          <h3 className="text-2xl font-elmssans-bold flex items-center gap-4">
            <InformationCircleIcon className="size-7" />
            Before You Apply – Please Note
          </h3>

          <ol className="list-disc list-outside text-xl p-6 space-y-5">
            {loanApplyRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
        </ol>

        <form
          className="w-full desktop:w-[60%] flex flex-wrap justify-evenly items-center gap-5 p-3 bg-layout"
          onSubmit={applyLoanFormHandler}
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
                <span className="text-main text-xl">Select {uniqueName}</span>
                <select
                  name={uniqueName}
                  id={uniqueName}
                  className="bg-main text-layout w-full full p-3 text-xl"
                  onChange={loanFormInputHandler}
                  // defaultValue={uniqueName}
                  disabled={loading}
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
              <label htmlFor={e} className={`${labelCssL_form}`} key={i}>
                <span className="text-main text-xl">Insert {e}</span>
                <input
                  type="number"
                  disabled={loading}
                  id={e}
                  className="bg-main text-layout w-full full p-3 text-xl font-elmssans-medium"
                  placeholder={e}
                  onChange={loanFormInputHandler}
                />
                <p
                  id={e}
                  className="text-sm tablet:text-lg tracking-wider text-red-500 w-full h-max"
                  ref={(el) => (errorParaRef.current[i] = el)}
                ></p>
              </label>
            );
          })}

          <div className="w-full flex flex-col items-center gap-6 font-elmssans-medium">
            {/* Apply Button */}
            <button
              type="submit"
              className="w-[300px] px-6 py-3 bg-blue-600 text-white text-2xl font-semibold rounded-xl shadow-md flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Apply
              {loading ? (
                <ArrowPathRoundedSquareIcon className="w-6 h-6 animate-spin" />
              ) : (
                <ArrowLongRightIcon className="w-6 h-6" />
              )}
            </button>

            {/* Loan Info */}
            <div className="w-[300px] flex flex-col gap-1 bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-200">
              <span className="text-gray-700 text-base tracking-wide">
                Profit Rate:{" "}
                <span className="font-semibold text-gray-900">
                  {profitRate}
                </span>
              </span>
              <span className="text-gray-700 text-base tracking-wide">
                Monthly Installment:{" "}
                <span className="font-semibold text-gray-900">{m_Install}</span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoanForm;
