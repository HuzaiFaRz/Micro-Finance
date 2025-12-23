import { Fragment, useContext, useState } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { XMarkIcon } from "@heroicons/react/16/solid";

const Error = () => {
  const { errorMsg } = useContext(GlobalContextCreated);
  const [errorShowing, setErrorShowing] = useState(true);

  if (errorMsg && errorShowing) {
    return (
      <Fragment>
        <>
          <div
            className={`fixed bg-black w-full py-4 px-4 font-elmssans-light text-xl text-red-500 z-100 text-center capitalize`}
          >
            <span>{errorMsg}</span>
          </div>
        </>
      </Fragment>
    );
  }
};

export default Error;
