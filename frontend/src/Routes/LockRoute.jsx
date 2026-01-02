import React from "react";
import { Navigate, Outlet } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import AuthLoading from "../Components/AuthLoading";

const LockRoute = () => {
  const { isUser, loading } = AuthUseContext();

  if (loading) {
    return <AuthLoading />;
  }

  if (isUser?.userCredential === null) {
    return <Navigate to={"/sign-in"} replace />;
  }

  return <Outlet />;
};

export default LockRoute;
