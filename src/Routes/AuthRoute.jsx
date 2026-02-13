import { Navigate, Outlet } from "react-router";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import AuthLoadingPage from "../Components/AuthLoadingPage";

const AuthRoute = () => {
  const { isUser, authLoading, isRegistering } = AuthUseContext();
  if (authLoading) return <AuthLoadingPage />;
  return isUser && !isRegistering ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRoute;
