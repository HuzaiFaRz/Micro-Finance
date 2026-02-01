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
      }}
    >
      {authLoading ? <AuthLoadingPage /> : children}
    </AuthContextCreated.Provider>
  );
};
export default AuthContextProvider;
