import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import AuthLoadingPage from "../Components/AuthLoadingPage";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const LockRoute = () => {
  const { isUser, authLoading } = AuthUseContext();
  const { errorToast } = useContext(GlobalContextCreated);

  useEffect(() => {
    if (!isUser) {
      return errorToast("First Sign In or Register");
    }
  }, [errorToast, isUser]);

  if (authLoading) {
    return <AuthLoadingPage />;
  }

  if (isUser === null) {
    return <Navigate to={"/sign-in"} replace />;
  }

  return <Outlet />;
};

export default LockRoute;
