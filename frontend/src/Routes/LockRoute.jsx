import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import AuthLoading from "../Components/AuthLoading";
import MassegeToast from "../Components/MassegeToast";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const LockRoute = () => {
  const { isUser, loading } = AuthUseContext();

  const { convertingMassege } = useContext(GlobalContextCreated);

  if (loading) {
    return <AuthLoading />;
  }

  if (isUser === null) {
    convertingMassege("First Sign In", 501, 501, 501);
    return (
      <>
        {/* <MassegeToast /> */}
        <Navigate to={"/sign-in"} replace />;
      </>
    );
  }

  return <Outlet />;
};

export default LockRoute;
