import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink } from "react-router";

import homeSlideImage1 from "../assets/Images/home-slide-img-1.jpg";
import homeSlideImage2 from "../assets/Images/home-slide-img-2.jpg";
import homeSlideImage3 from "../assets/Images/home-slide-img-3.jpg";

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

  swiperContent.map((e) => {
    return Object.freeze(e);
  });

  return (
    <React.Fragment>
      <Swiper spaceBetween={50} slidesPerView={1} className={`w-full h-full`}>
        {swiperContent.map((elem, index) => {
          const { heading, paragraph, background } = elem;
          return (
            <React.Fragment key={index}>
              <SwiperSlide className={`w-full h-full relative`} key={index}>
                <img
                  className="min-w-full h-full bg-no-repeat object-cover bg-fixed blur-xs brightness-50"
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
    </React.Fragment>
  );
};

export default Home;
