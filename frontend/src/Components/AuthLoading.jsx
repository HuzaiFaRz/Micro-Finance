import React from "react";

const AuthLoading = () => {
  return (
    <>
      <div className="bg-layout text-white w-full h-dvh text-4xl tablet:text-6xl flex justify-center items-center font-elmssans-bold">
        <span className="mr-5">Please Wait</span>
        {[1, 2, 3].map((e, i) => {
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
