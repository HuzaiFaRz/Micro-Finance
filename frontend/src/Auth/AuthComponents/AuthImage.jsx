import image from "../../assets/Images/auth-image.jpg";
const AuthImage = () => {
  return (
    <div className="tablet:w-[60%] flex items-end w-full h-full relative order-last tablet:order-first">
      <img
        src={image}
        className="w-full h-[400px] tablet:h-full object-cover"
      />
      <div
        className={`absolute top-0 right-0 opacity-50 z-40 w-full h-full bg-black`}
      ></div>
    </div>
  );
};

export default AuthImage;
