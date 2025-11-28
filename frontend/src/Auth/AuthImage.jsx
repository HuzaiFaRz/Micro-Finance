import image from "../assets/Images/auth-image.jpg";
const AuthImage = () => {
  return (
    <div className="w-[60%] h-full relative">
      <img src={image} className="w-full h-full object-cover" />
      <div
        className={`absolute top-0 right-0 opacity-50 z-40 w-full h-full bg-black`}
      ></div>
    </div>
  );
};

export default AuthImage;
