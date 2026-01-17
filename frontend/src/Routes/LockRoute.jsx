import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const LockRoute = () => {
  const { isUser, loading } = AuthUseContext();
  const { errorToast } = useContext(GlobalContextCreated);

  if (loading) {
    return <AuthLoading />;
  }

  if (isUser === null) {
    errorToast("First Sign In or Register");
    return <Navigate to={"/sign-in"} replace />;
  }

  return <Outlet />;
};

export default LockRoute;
