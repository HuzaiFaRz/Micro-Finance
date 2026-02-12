import { Fragment, useState } from "react";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/16/solid";
import ProfileGenerelInfo from "../Components/ProfileGenerelInfo";
import ProfileSecurity from "../Components/ProfileSecurity";
import ProfileDangerZone from "../Components/ProfileDangerZone";

const Profile = () => {
  const { isUser } = AuthUseContext();

  const { Email } = isUser;

  const [aside, setAside] = useState(false);

  const asideHandler = () => {
    setAside(!aside);
  };

  let asideButtons = [
    {
      button_COLOR: "gray",
      button_ID: "GenerelInfo",
    },
    {
      button_COLOR: "green",
      button_ID: "Security",
    },
    {
      button_COLOR: "red",
      button_ID: "DangerZone",
    },
  ];

  const [whatAsideContentOpen, setWhatAsideContentOpen] = useState([
    true,
    false,
    false,
  ]);

  let asideContent = [
    {
      content: "normal info",
      content_ID: "GenerelInfo",
    },
    {
      content: "password hear",
      content_ID: "Security",
    },
    {
      content: "delete account now",
      content_ID: "DangerZone",
    },
  ];

  whatAsideContentOpen.map((e, i) => {
    asideContent[i].contentOPEN = e;
  });

  const asideButtonHandler = (event) => {
    event.preventDefault();
    let a = asideContent.map(
      (e, i) => (event.target.id || asideButtons[i].button_ID) === e.content_ID,
    );
    setAside(false);
    setWhatAsideContentOpen(a);
  };

  return (
    <Fragment>
      <div className="w-full h-full font-elmssans-light bg-black">
        <div className="w-full h-[400px] relative">
          <img
            src="https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="w-[200px] h-[200px] bg-card rounded-full flex justify-center items-center text-9xl absolute -bottom-20 left-1/2 -translate-x-1/2  border-4 border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {isUser?.Name.toUpperCase()[0]}
          </div>
        </div>

        <div className="flex flex-col justify-start items-start mt-22 tablet:mt-7 text-main py-5">
          <div className="flex flex-wrap justify-between items-center gap-2 w-full border-b px-2 tablet:px-5 py-3 mt-5">
            <h1 className="text-3xl tablet:text-6xl">{isUser?.Name}!</h1>
            <h6 className="text-sm tablet:text-xl text-gray-400">{Email}</h6>
          </div>

          {aside ? (
            <LockOpenIcon
              className="size-10 m-3 flex tablet:hidden cursor-pointer"
              onClick={asideHandler}
            />
          ) : (
            <LockClosedIcon
              className="size-10 m-3 flex tablet:hidden cursor-pointer"
              onClick={asideHandler}
            />
          )}

          <div className="flex flex-row w-full p-4 justify-center items-center gap-5 relative">
            {aside && (
              <div
                className="w-full h-full absolute bg-black/50 backdrop-blur-md"
                onClick={() => {
                  setAside(false);
                }}
              ></div>
            )}

            <aside
              className={`h-[300px] w-full tablet:w-[30%] absolute tablet:sticky ${aside ? "left-0" : "-left-full"} bg-card flex flex-col justify-evenly items-start px-3 tablet:text-2xl text-lg text-main cursor-pointer transition-all z-100`}
            >
              {asideButtons.map((elem, index) => {
                return (
                  <button
                    className={`py-2 px-3 w-full hover:bg-black/60 text-start font-elmssans-medium rounded-tr-2xl`}
                    style={{
                      backgroundColor: whatAsideContentOpen[index]
                        ? "rgba(0,0,0,0.4)"
                        : elem.button_COLOR,
                    }}
                    id={elem.button_ID}
                    key={index}
                    onClick={asideButtonHandler}
                    type="button"
                  >
                    {elem.button_ID.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </button>
                );
              })}
            </aside>

            {asideContent.map((elem, index) => {
              if (whatAsideContentOpen[index]) {
                return (
                  <div
                    className={`h-full p-5 w-full tablet:w-[70%] bg-card flex flex-col justify-evenly items-start text-2xl text-main `}
                    key={index}
                    id={elem.content_ID}
                  >
                    {elem.content_ID == "GenerelInfo" && <ProfileGenerelInfo />}
                    {elem.content_ID == "Security" && <ProfileSecurity />}
                    {elem.content_ID == "DangerZone" && <ProfileDangerZone />}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
