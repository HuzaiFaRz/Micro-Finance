import { useContext } from "react";
import { GlobalContextCreated } from "../Contexts/GlobalContext";

const PagesHeading = () => {
  const { pageHeadingText } = useContext(GlobalContextCreated);
  return (
    <h1 className="text-4xl tablet:text-6xl font-elmssans-bold w-full text-center bg-layout text-main p-3">
      {pageHeadingText}
    </h1>
  );
};

export default PagesHeading;
