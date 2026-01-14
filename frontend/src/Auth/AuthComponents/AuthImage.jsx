const AuthImage = () => {
  return (
    <div className="tablet:w-[60%] flex items-end w-full h-full relative order-last tablet:order-first">
      <img
        src={
          "https://images.unsplash.com/photo-1640197618317-dc379a226fbe?q=80&w=437&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        className="w-full h-[400px] tablet:h-full object-cover"
      />
      <div
        className={`absolute top-0 right-0 opacity-50 z-40 w-full h-full bg-black`}
      ></div>
    </div>
  );
};

export default AuthImage;
