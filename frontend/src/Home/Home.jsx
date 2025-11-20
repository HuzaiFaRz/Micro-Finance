import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import  bgone  from "../assets/Images/1.jpg";
import  bgtwo  from "../assets/Images/2.jpg";
import  bgthree from "../assets/Images/3.jpg";

const Home = () => {
  const swiperContent = [
    {
      heading: "Smart Micro-Finance Solutions",
      paragraph:
        "Manage your loans and payments easily — fast, secure, and hassle-free.",
      backgroud: bgone,
    },
    {
      heading: "Manage Loans in Seconds",
      paragraph:
        "Create, track, and manage installments automatically. Save time and avoid errors.",
      backgroud: bgtwo,
    },
    {
      heading: "Safe, Anywhere Access",
      paragraph:
        "Encrypted cloud storage and a mobile-friendly interface. Manage your finances anytime, anywhere.",
      backgroud: bgthree,
    },
  ];

  console.log(swiperContent);

  return (
    <React.Fragment>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className={`w-full h-full`}
      >
        {swiperContent.map((elem, index) => {
          return (
            <React.Fragment key={index}>
              <SwiperSlide
                className={`text-4xl font-elmssans-bold bg-${elem.backgroud}`}
              >
                <h1>{elem.heading}</h1>
                <p>{elem.paragraph}</p>
                <button className="bg-card text-main rounded-2xl px-5 py-2">
                  Apply Now
                </button>
              </SwiperSlide>
            </React.Fragment>
          );
        })}
      </Swiper>
    </React.Fragment>
  );
};

export default Home;
