import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const LockRoute = () => {
  const { isUser, loading } = AuthUseContext();
  const { errorToast } = useContext(GlobalContextCreated);
  useEffect(() => {
    if (!isUser) {
      errorToast("First Sign In or Register");
    }
  }, [errorToast, isUser]);

  if (loading) return <AuthLoading />;
  if (!isUser) {
    return <Navigate to={"/sign-in"} replace />;
  }

  return <Outlet />;
};

export default LockRoute;
