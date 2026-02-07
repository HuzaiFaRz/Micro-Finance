import { AuthContextCreated } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import AuthLoadingPage from "../Components/AuthLoadingPage";

export const AuthUseContext = () => useContext(AuthContextCreated);

const AuthContextProvider = ({ children }) => {
  const LOAN_CATEGORIES = {
    Home: {
      minLoan: 100000,
      maxLoan: 5000000,
      profitRate: 2,
      duration: [1, 5],
      initialPercent: 10,
      description:
        "Financial support to buy, construct, or renovate a residential property with flexible repayment options.",
    },
    Education: {
      minLoan: 10000,
      maxLoan: 500000,
      profitRate: 0,
      duration: [1, 2],
      initialPercent: 5,
      description:
        "Covers tuition fees, books, and accommodation expenses to support your educational needs.",
    },
    Business: {
      minLoan: 100000,
      maxLoan: 10000000,
      profitRate: 5,
      duration: [1, 2],
      initialPercent: 10,
      description:
        "Designed to help startups and SMEs expand operations, manage inventory, or cover operational costs.",
    },
    Personal: {
      minLoan: 5000,
      maxLoan: 300000,
      profitRate: 2,
      duration: [1, 2],
      initialPercent: 2,
      description:
        "Short-term financial support for personal needs such as household expenses or emergency requirements.",
    },
    Vehicle: {
      minLoan: 50000,
      maxLoan: 2000000,
      profitRate: 2,
      duration: [1, 3],
      initialPercent: 15,
      description:
        "Helps you purchase new or used vehicles including cars and motorcycles.",
    },
    Emergency: {
      minLoan: 10000,
      maxLoan: 100000,
      profitRate: 0,
      duration: [1, 5],
      initialPercent: 2,
      description:
        "Quick financial assistance for medical emergencies or unexpected urgent expenses.",
    },
  };

  const [isRegistering, setIsRegistering] = useState(false);
  const [isUser, setIsuser] = useState(null);
  const [loan, setLoan] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const authSubcribe = onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser) {
        try {
          onSnapshot(doc(db, "Users", user.uid), (doc) => {
            if (doc.exists()) {
              setIsuser({
                userCredential: user,
                ...doc.data(),
              });
            } else {
              setIsuser(null);
              setLoan(null);
            }
            setAuthLoading(false);
          });

          onSnapshot(
            query(
              collection(db, "Users", auth.currentUser.uid, "Loans"),
              orderBy("applyAt", "desc"),
            ),
            (realTimeLoan) => {
              if (!realTimeLoan.empty) {
                const a = realTimeLoan.docs.map((data) => {
                  return { loanID: data.id, loanData: data.data() };
                });
                setLoan(a);
              } else {
                setLoan(null);
              }
              setAuthLoading(false);
            },
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        setLoan(null);
        setAuthLoading(false);
        setIsuser(null);
      }
    });
    return () => authSubcribe();
  }, []);

  return (
    <AuthContextCreated.Provider
      value={{
        isUser,
        setIsuser,
        authLoading,
        setAuthLoading,
        isRegistering,
        setIsRegistering,
        loan,
        setLoan,
        LOAN_CATEGORIES,
      }}
    >
      {authLoading ? <AuthLoadingPage /> : children}
    </AuthContextCreated.Provider>
  );
};
export default AuthContextProvider;
