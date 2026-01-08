import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  const [cardPreview, setCardPreview] = useState();

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

  cardContent.map((e) => {
    return Object.freeze(e);
  });

  const windowResizeing = () => {
    if (window.innerWidth < 800) {
      setCardPreview(true);
    } else {
      setCardPreview(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", windowResizeing);
    return () => window.removeEventListener("resize", windowResizeing);
  }, []);

  return (
    <Fragment>
      <div className="w-full h-dvh">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
          className="w-full h-full"
        >
          {swiperContent.map((elem, index) => {
            const { heading, paragraph, background } = elem;
            return (
              <React.Fragment key={index}>
                <SwiperSlide key={index}>
                  <div className="w-full h-full text-main">
                    {/* <img
                      src={background}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover -z-10"
                    /> */}
                    <div className="w-full h-full bg-black/70 flex flex-col items-start justify-center gap-5 px-6 tablet:px-10">
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
                  </div>
                </SwiperSlide>
              </React.Fragment>
            );
          })}
        </Swiper>
      </div>

      <div className="w-full h-dvh bg-black flex flex-col justify-evenly items-center px-10">
        <h1 className="w-full text-main font-elmssans-bold text-center tablet:text-6xl text-4xl">
          Loan Categories
        </h1>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={cardPreview ? 1 : 2}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 1000,
            stopOnLastSlide: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={true}
          className="w-full cursor-grab"
        >
          {cardContent.map((elem, index) => {
            const { heading, paragraph, background } = elem;
            return (
              <React.Fragment key={index}>
                <SwiperSlide key={index}>
                  <div
                    className={`w-full h-[300px] rounded-md relative shadow-lg`}
                  >
                    {/* <img
                      src={background}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover -z-10"
                    /> */}
                    <div className="bg-black/70 flex flex-col justify-evenly items-start px-5 text-white w-full h-full">
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
                </SwiperSlide>
              </React.Fragment>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default Home;
