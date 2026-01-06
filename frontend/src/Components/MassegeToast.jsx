import { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { Outlet } from "react-router";

const MassegeToast = () => {
  const { toastMsg, setToastMsg, toastMsgColor } =
    useContext(GlobalContextCreated);
  const [errorShowing, setErrorShowing] = useState(true);
  useEffect(() => {
    if (toastMsg) {
      setErrorShowing(true);
      const timer = setTimeout(() => {
        setErrorShowing(false);
        setToastMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg, setToastMsg]);
  if (toastMsg && errorShowing) {
    return (
      <Fragment>
        <>
          <div
            className={`fixed transition-all bg-black w-full py-4 px-4 font-elmssans-light text-lg ${toastMsgColor} z-100 text-center capitalize`}
          >
            <span>{toastMsg}</span>
            <Outlet />
          </div>
        </>
      </Fragment>
    );
  }
};

export default MassegeToast;
