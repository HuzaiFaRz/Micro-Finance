import React, { Fragment } from "react";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

const Profile = () => {
  const { isUser, setIsuser } = AuthUseContext();

  console.log(isUser);
  return (
    <Fragment>
      <div className="w-full h-svh">

      <h1>Profile</h1>
      </div>
    </Fragment>
  );
};

export default Profile;
