import { Outlet, useLocation } from "react-router";
import { AuthContextCreated } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const AuthUseContext = () => useContext(AuthContextCreated);

const AuthContextProvider = ({ children }) => {
  const [isUser, setIsuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        onSnapshot(doc(db, "Users", user?.uid), (doc) => {
          setIsuser((prev) => ({
            ...prev,
            userCredential: user,
            ...doc.data(),
          }));
        });
      } else {
        setIsuser(null);
      }
    });
  }, []);

  return (
    <AuthContextCreated.Provider
      value={{ isUser, setIsuser, loading, setLoading }}
    >
      {children}
      <Outlet />
    </AuthContextCreated.Provider>
  );
};

export default AuthContextProvider;
