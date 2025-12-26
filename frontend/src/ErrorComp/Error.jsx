import { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { XMarkIcon } from "@heroicons/react/16/solid";

const Error = () => {
  const { setErrorMsg, errorMsg } = useContext(GlobalContextCreated);
  const [errorShowing, setErrorShowing] = useState(true);
  useEffect(() => {
    if (errorMsg) {
      setErrorShowing(true);
      const timer = setTimeout(() => {
        setErrorShowing(false);
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg, setErrorMsg]);
  if (errorMsg && errorShowing) {
    return (
      <Fragment>
        <>
          <div
            className={`fixed transition-all bg-black w-full py-4 px-4 font-elmssans-light text-sm text-red-500 z-100 text-center capitalize`}
          >
            <span>{errorMsg}</span>
          </div>
        </>
      </Fragment>
    );
  }
};

export default Error;
