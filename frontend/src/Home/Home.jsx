import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router";

import Slider from "react-slick";

const Home = () => {
  const whatWidthDevice = () => {
    if (window.innerWidth < 830) return 1;
    if (window.innerWidth > 830 && window.innerWidth < 1000) return 2;
    return 3;
  };

  const [deviceWidth, setDeviceWidth] = useState(whatWidthDevice());

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(whatWidthDevice());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const swiperContent = [
    {
      heading: "Smart Micro Finance Solutions",
      paragraph:
        "Manage your loans and payments easily — fast, secure, and hassle-free.",
      background:
        "https://plus.unsplash.com/premium_photo-1661369820491-6391c63ea2dd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Manage Loans in Seconds",
      paragraph:
        "Create, track, and manage installments automatically. Save time and avoid errors.",
      background:
        "https://images.unsplash.com/photo-1631511258193-252ab3da6b8b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Safe, Anywhere Access",
      paragraph:
        "Encrypted cloud storage and a mobile-friendly interface. Manage your finances anytime, anywhere.",
      background:
        "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const cardContent = [
    {
      heading: "Home Loan",
      paragraph:
        "Get financial support to buy, build, or renovate your home with easy installments and flexible repayment plans.",
      background:
        "https://images.unsplash.com/photo-1691941209466-e981f3a192a7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Education Loan",
      paragraph:
        "Invest in your future with affordable loans designed to cover tuition fees, books, and educational expenses.",
      background:
        "https://images.unsplash.com/photo-1672839414428-e3de65ce981c?q=80&w=424&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Business Loan",
      paragraph:
        "Grow your business with quick-access funding to manage operations, expand services, or invest in new opportunities.",
      background:
        "https://images.unsplash.com/photo-1506787497326-c2736dde1bef?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Personal Loan",
      paragraph:
        "Handle personal expenses with flexible loan options and simple repayment plans tailored to your needs.",
      background:
        "https://images.unsplash.com/photo-1764231467852-b609a742e082?q=80&w=421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Vehicle Loan",
      paragraph:
        "Buy your car or bike with affordable financing, quick approval, and convenient monthly installments.",
      background:
        "https://images.unsplash.com/photo-1684082018938-9c30f2a7045d?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Emergency Loan",
      paragraph:
        "Get instant financial help during emergencies with fast processing and minimal documentation.",
      background:
        "https://images.unsplash.com/photo-1758404958502-44f156617bae?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const heroSliderSetting = {
    vertical: true,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    draggable: true,
    arrows: true,
  };

  const cardSliderSetting = {
    slidesToShow: deviceWidth,
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: "progressive",
    autoplaySpeed: 800,
    speed: 1000,
    swipe: false,
    touchMove: false,
    draggable: false,
    pauseOnHover: true,
    pauseOnFocus: false,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <div className="w-full min-h-screen text-main font-elmssans-medium bg-black">
        <Slider {...heroSliderSetting}>
          {swiperContent.map((elem, index) => {
            const { heading, paragraph, background } = elem;
            return (
              <div
                className={`relative w-full h-screen bg-red-500`}
                key={index}
              >
                <img
                  src={background}
                  loading="lazy"
                  decoding="async"
                  alt="Hero"
                  className="object-cover object-center w-full min-h-full"
                />
                <div className="w-full h-full absolute inset-0  flex flex-col items-start justify-center gap-5 px-6 tablet:px-12 bg-black/60 scale-103">
                  <h1 className="text-5xl tablet:text-6xl desktop:text-8xl font-elmssans-bold w-full desktop:w-[1200px]">
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
          Loan Categories
        </h1>

        <Slider {...cardSliderSetting}>
          {cardContent.map((elem, index) => {
            const { heading, paragraph, background } = elem;
            return (
              <div className="relative w-full h-full" key={index}>
                <img
                  src={background}
                  alt="Hero"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="w-full h-full absolute inset-0 flex flex-col items-start justify-center gap-5 px-6 tablet:px-10 bg-black/60">
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

export default Home;
