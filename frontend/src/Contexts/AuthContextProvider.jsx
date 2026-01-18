import { AuthContextCreated } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import AuthLoadingPage from "../Components/AuthLoadingPage";

export const AuthUseContext = () => useContext(AuthContextCreated);

const AuthContextProvider = ({ children }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isUser, setIsuser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const authSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const dataSubcribe = onSnapshot(doc(db, "Users", user.uid), (doc) => {
          if (doc.exists()) {
            setIsuser({
              userCredential: user,
              ...doc.data(),
            });
          }
          setAuthLoading(false);
        });
        return () => dataSubcribe();
      } else {
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
      }}
    >
      {authLoading ? <AuthLoadingPage /> : children}
    </AuthContextCreated.Provider>
  );
};
export default AuthContextProvider;
