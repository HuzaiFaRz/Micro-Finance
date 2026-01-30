import { AuthContextCreated } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import AuthLoadingPage from "../Components/AuthLoadingPage";

export const AuthUseContext = () => useContext(AuthContextCreated);

const AuthContextProvider = ({ children }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isUser, setIsuser] = useState(null);
  const [loan, setLoan] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const authSubcribe = onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser) {
        try {
          const userQuery = doc(db, "Users", user.uid);
          const dataSubcribe = onSnapshot(userQuery, (doc) => {
            if (doc.exists()) {
              setIsuser({
                userCredential: user,
                ...doc.data(),
              });
            }
            // console.log(auth);
            setAuthLoading(false);
          });

          const a = async () => {
            try {
              const gettingLoans = await getDocs(
                collection(db, "Users", auth.currentUser.uid, "Loans"),
              );
              if (!gettingLoans.empty) {
                gettingLoans.docs.map((e) => {
                  return setLoan(...e.data());
                });
                return;
              }
              setLoan(null);
            } catch (error) {
              console.error(error);
            }
          };
          a();

          return () => dataSubcribe();
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
