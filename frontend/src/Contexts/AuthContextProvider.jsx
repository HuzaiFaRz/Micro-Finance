import { Outlet, useLocation } from "react-router";
import { AuthContextCreated } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import AuthLoading from "../Components/AuthLoading";
import { GlobalContextCreated } from "./GlobalContext";

export const AuthUseContext = () => useContext(AuthContextCreated);

const AuthContextProvider = ({ children }) => {
  const [isUser, setIsuser] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        onSnapshot(doc(db, "Users", user.uid), (doc) => {
          if (doc.exists()) {
            setIsuser({
              userCredential: user,
              ...doc.data(),
            });
            return;
          }
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
      {loading ? (
        <AuthLoading />
      ) : (
        <>
          {children}
          <Outlet />
        </>
      )}
    </AuthContextCreated.Provider>
  );
};

export default AuthContextProvider;
