import { AuthContextCreated } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Outlet } from "react-router";
import AuthLoading from "../Components/AuthLoading";

export const AuthUseContext = () => useContext(AuthContextCreated);

const AuthContextProvider = ({ children }) => {
  const [isUser, setIsuser] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "Users", user.uid), (doc) => {
          if (doc.exists()) {
            setIsuser({
              userCredential: user,
              ...doc.data(),
            });
            setLoading(false);
            return;
          }
        });
      } else {
        setLoading(false);
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
