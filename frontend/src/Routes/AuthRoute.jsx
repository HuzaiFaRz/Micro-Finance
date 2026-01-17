import { Navigate, Outlet } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import AuthLoading from "../Components/AuthLoading";

const AuthRoute = () => {
  const { isUser, loading } = AuthUseContext();
  if (loading) {
    return <AuthLoading />;
  }

  if (isUser) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
