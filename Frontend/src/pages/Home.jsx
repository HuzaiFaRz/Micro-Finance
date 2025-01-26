import { Link } from "react-router";

const Home = () => {
  return (
    <div className="h-[100dvh] w-full relative flex items-center justify-center bg-slate-900">
      <div className=" w-full h-full absolute top-0 flex items-start justify-center gap-24 md:gap-32  flex-col max-w-[1000px] ">
        <div className=" flex flex-col justify-between items-start gap-5 lg:w-[75%] w-full px-4 lg:px-0">
          <h1 className="text-white xl:text-5xl md:text-4xl text-3xl font-bold ">
            Get Hassle-Free Qarze Hasana Loans
          </h1>
          <h2 className="text-neutral-400 xl:text-xl font-semibold">
            Saylani Welfare International is a leading NGO in Pakistan, focused
            on improving lives through education, healthcare, and employment
            opportunities.
          </h2>
          <Link
            to="/loan-calculator"
            className="text-xl font-semibold text-white bg-slate-800 border-black border p-2 rounded-lg"
          >
            Apply for loan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
