import React, { Fragment } from "react";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

const Profile = () => {
  const { isUser, setIsuser } = AuthUseContext();

  console.log(isUser);
  return (
    <Fragment>
      <h1>Profile</h1>
    </Fragment>
  );
};

export default Profile;
