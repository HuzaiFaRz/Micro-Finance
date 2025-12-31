import { Outlet } from "react-router";
import { AuthContextCreated } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

export const AuthUseContext = () => useContext(AuthContextCreated);

const AuthContextProvider = ({ children }) => {
  const [isUser, setIsuser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setIsuser(user);
      } else {
        setIsuser(null);
      }
    });
  });

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
