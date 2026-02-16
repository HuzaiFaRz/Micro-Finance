import { useContext } from "react";
import { GlobalContextCreated } from "../../Contexts/GlobalContext";

const AuthImage = () => {
  const { windowMode } = useContext(GlobalContextCreated);
  return (
    <img
      src={
        "https://images.unsplash.com/photo-1640197618317-dc379a226fbe?q=80&w=437&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
      className={`w-full h-full object-cover fixed ${
        windowMode === "dark" ? "brightness-20" : "brightness-30"
      }`}
    />
  );
};

export default AuthImage;
