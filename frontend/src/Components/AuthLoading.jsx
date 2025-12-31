import React from "react";

const AuthLoading = () => {
  return (
    <>
      <div className="bg-card w-full h-dvh text-6xl flex justify-center items-center font-elmssans-bold">
        <span className="mr-5">Please Wait</span>
        {[1, 2, 3].map((e, i) => {
          console.log(e);
          return (
            <React.Fragment key={i}>
              <span className="loading-dot"></span>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default AuthLoading;
