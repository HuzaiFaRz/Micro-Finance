import { useEffect } from "react";
import { Link, useRouteError } from "react-router";

const ErrorRoute = () => {
  useEffect(() => {
    document.title = `M - Finance - Error ❗`;
  }, []);

  return (
    <div className="w-full h-screen bg-black text-card flex flex-col justify-center items-center gap-4 text-center font-elmssans-medium px-2 text-lg tablet:text-2xl">
      <h1 className="text-4xl font-elmssans-bold">404: Oops! Page Not Found</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        You can return to the
        <Link to="/" className="underline">
          Home page
        </Link>
      </p>
    </div>
  );
};

export default ErrorRoute;
