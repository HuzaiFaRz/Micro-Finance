import { NavLink } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

const LoanDescription = () => {
  const { LOAN_CATEGORIES } = AuthUseContext();

  const formatingPKR = (amount) =>
    new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="bg-black min-h-screen p-5 flex flex-col justify-center items-center gap-10 text-main font-elmssans-light">
      <h1 className="text-card text-4xl font-elmssans-bold">
        M_Finance Loan Overview
      </h1>
      <div className="flex flex-wrap justify-evenly items-center gap-5">
        {Object.entries(LOAN_CATEGORIES).map(([key, value], idx) => {
          const {
            duration,
            initialPercent,
            maxLoan,
            minLoan,
            profitRate,
            description,
          } = value;

          return (
            <div
              key={idx}
              className="bg-layout text-main flex flex-col gap-4 w-full rounded-xl p-6 shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{}}
            >
              <h2 className="text-4xl font-elmssans-bold">{key}</h2>
              <p className="text-sm tablet:text-xl">{description}</p>
              <ul className="flex flex-col justify-center items-start gap-4 font-elmssans-bold">
                <li>
                  <span className="font-elmssans-medium">Min:</span>{" "}
                  {formatingPKR(minLoan)}
                </li>
                <li>
                  <span className="font-elmssans-medium">Max:</span>{" "}
                  {formatingPKR(maxLoan)}
                </li>
                <li>
                  <span className="font-elmssans-medium">Profit Rate:</span>{" "}
                  {profitRate}
                </li>
                <li>
                  <span className="font-elmssans-medium">Duration:</span>{" "}
                  {duration[1]} Years
                </li>
                <li>
                  <span className="font-elmssans-medium">Initial Payment:</span>{" "}
                  {initialPercent}% of Your Loan Amount
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      <NavLink
        to={"/loan-form"}
        className="bg-layout rounded-tl-2xl rounded-br-2xl px-5 py-2 tracking-wider"
      >
        Apply Now
      </NavLink>
    </div>
  );
};

export default LoanDescription;
