import React, { Fragment, memo } from "react";
import { NavLink } from "react-router";

import Slider from "react-slick";

import homeSlideImage1 from "/src/assets/Images/home-slide-img-1.webp";
import homeSlideImage2 from "/src/assets/Images/home-slide-img-2.webp";
import homeSlideImage3 from "/src/assets/Images/home-slide-img-3.webp";
import homeLoanImg from "/src/assets/Images/homeLoanImg.webp";
import educationLoanImg from "/src/assets/Images/educationLoanImg.webp";
import businessLoanImg from "/src/assets/Images/businessLoanImg.webp";
import personalLoanImg from "/src/assets/Images/personalLoanImg.webp";
import vehicleLoanImg from "/src/assets/Images/vehicleLoanImg.webp";
import emergencyLoanImg from "/src/assets/Images/emergencyLoanImg.webp";

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

  const heroSliderSetting = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    swipe: true,
    touchMove: true,
    draggable: true,
  };

  const cardSliderSetting = {
    mobileFirst: true,
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    lazyLoad: true,
    autoplaySpeed: 0,
    speed: 3000,

    swipe: true,
    touchMove: true,
    draggable: true,

    slidesToShow: 3,
    slidesToScroll: 1,

    pauseOnHover: true,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <div className="w-full min-h-screen text-main font-elmssans-medium bg-black">
        <Slider {...heroSliderSetting}>
          {swiperContent.map((elem, index) => {
            const { heading, paragraph, background } = elem;
            return (
              <div className="relative w-full h-screen cursor-grap" key={index}>
                <img
                  src={background}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
                <div className="w-full h-full absolute inset-0 flex flex-col items-start justify-center gap-5 px-6 tablet:px-10 bg-black/75">
                  <h1 className="text-6xl tablet:text-7xl desktop:text-8xl font-elmssans-bold">
                    {heading}
                  </h1>
                  <p className="text-2xl">{paragraph}</p>
                  <NavLink
                    to={"/loan-form"}
                    className="bg-card rounded-tl-2xl rounded-br-2xl px-5 py-2 tracking-wider mt-5"
                  >
                    Apply Now
                  </NavLink>
                </div>
              </div>
            );
          })}
        </Slider>

        <h1 className="text-5xl tablet:text-7xl text-card font-elmssans-bold p-10 w-full text-center">
          Loan Catogries
        </h1>
        <Slider {...cardSliderSetting}>
          {cardContent.map((elem, index) => {
            const { heading, paragraph, background } = elem;
            return (
              <div className="relative w-full h-[800px] mb-10" key={index}>
                <img
                  src={background}
                  alt="Hero"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="w-full h-full absolute inset-0 flex flex-col items-start justify-center gap-5 px-6 tablet:px-10 bg-black/75">
                  <h1 className="text-5xl tablet:text-6xl font-elmssans-bold">
                    {heading}
                  </h1>
                  <p className="text-sm tablet:text-xl">{paragraph}</p>
                  <NavLink
                    to={"/loan-form"}
                    className="bg-card rounded-tl-2xl rounded-br-2xl px-5 py-2 tracking-wider mt-5"
                  >
                    Apply Now
                  </NavLink>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </Fragment>
  );
};

export default memo(Home);
