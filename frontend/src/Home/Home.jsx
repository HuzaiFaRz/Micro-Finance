import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink } from "react-router";

import homeSlideImage1 from "../assets/Images/home-slide-img-1.jpg";
import homeSlideImage2 from "../assets/Images/home-slide-img-2.jpg";
import homeSlideImage3 from "../assets/Images/home-slide-img-3.jpg";
import homeLoanImg from "../assets/Images/homeLoanImg.jpg";
import educationLoanImg from "../assets/Images/educationLoanImg.jpg";
import businessLoanImg from "../assets/Images/businessLoanImg.jpg";
import personalLoanImg from "../assets/Images/personalLoanImg.jpg";
import vehicleLoanImg from "../assets/Images/vehicleLoanImg.jpg";
import emergencyLoanImg from "../assets/Images/emergencyLoanImg.jpg";

const Home = () => {
  const swiperContent = [
    {
      heading: "Smart Micro - Finance Solutions",
      paragraph:
        "Manage your loans and payments easily — fast, secure, and hassle-free.",
      background: homeSlideImage1,
    },
    {
      heading: "Manage Loans in Seconds",
      paragraph:
        "Create, track, and manage installments automatically. Save time and avoid errors.",
      background: homeSlideImage2,
    },
    {
      heading: "Safe, Anywhere Access",
      paragraph:
        "Encrypted cloud storage and a mobile-friendly interface. Manage your finances anytime, anywhere.",
      background: homeSlideImage3,
    },
  ];
  const cardContent = [
    {
      heading: "Home Loan",
      paragraph:
        "Get financial support to buy, build, or renovate your home with easy installments and flexible repayment plans.",
      background: homeLoanImg,
    },
    {
      heading: "Education Loan",
      paragraph:
        "Invest in your future with affordable loans designed to cover tuition fees, books, and educational expenses.",
      background: educationLoanImg,
    },
    {
      heading: "Business Loan",
      paragraph:
        "Grow your business with quick-access funding to manage operations, expand services, or invest in new opportunities.",
      background: businessLoanImg,
    },
    {
      heading: "Personal Loan",
      paragraph:
        "Handle personal expenses with flexible loan options and simple repayment plans tailored to your needs.",
      background: personalLoanImg,
    },
    {
      heading: "Vehicle Loan",
      paragraph:
        "Buy your car or bike with affordable financing, quick approval, and convenient monthly installments.",
      background: vehicleLoanImg,
    },
    {
      heading: "Emergency Loan",
      paragraph:
        "Get instant financial help during emergencies with fast processing and minimal documentation.",
      background: emergencyLoanImg,
    },
  ];

  swiperContent.map((e) => {
    return Object.freeze(e);
  });

  return (
    <React.Fragment>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className={`w-full h-full`}
        // loop
        // centeredSlides={true}
      >
        {swiperContent.map((elem, index) => {
          const { heading, paragraph, background } = elem;
          return (
            <React.Fragment key={index}>
              <SwiperSlide className={`w-full h-full relative`} key={index}>
                <img
                  className="min-w-full h-svh bg-no-repeat object-cover brightness-50"
                  loading="lazy"
                  src={background}
                />
                <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-start gap-5 px-6 tablet:px-10 text-main">
                  <h1 className="text-6xl tablet:text-7xl desktop:text-8xl  w-full desktop:w-full font-elmssans-bold">
                    {heading}
                  </h1>
                  <p className="text-2xl font-elmssans-medium w-full desktop:w-full">
                    {paragraph}
                  </p>
                  <NavLink
                    to={"/loan-form"}
                    className="bg-card text-main rounded-2xl px-5 py-2 font-elmssans-medium tracking-wider mt-5"
                  >
                    Apply Now
                  </NavLink>
                </div>
              </SwiperSlide>
            </React.Fragment>
          );
        })}
      </Swiper>
      <div className="w-full h-full flex flex-wrap justify-evenly items-center px-3 pb-5 pt-5 gap-6 bg-black">
        <h1 className="w-full text-main font-elmssans-bold text-center text-6xl">
          Loan Categories
        </h1>
        {cardContent.map((elem, i) => {
          const { heading, paragraph, background } = elem;
          return (
            <React.Fragment key={i}>
              <div
                className={`w-[400px] h-[300px]   rounded-md relative overflow-hidden shadow-lg`}
                style={{
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                loading="lazy"
              >
                <div className="absolute inset-0 bg-black/70 backdop-blur-sm flex flex-col justify-evenly items-start px-5 text-white">
                  <h1 className="text-3xl font-elmssans-bold">{heading}</h1>
                  <p className="text-xl font-elmssans-light">{paragraph}</p>
                  <NavLink
                    className={
                      "text-xl font-elmssans-light bg-layout px-5 py-2 text-main"
                    }
                    to={"loan-form"}
                  >
                    Apply Now
                  </NavLink>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Home;
