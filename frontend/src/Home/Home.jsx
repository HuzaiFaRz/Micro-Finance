import { Fragment } from "react";
import { NavLink } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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

  swiperContent.map((e) => {
    return Object.freeze(e);
  });

  cardContent.map((e) => {
    return Object.freeze(e);
  });

  return (
    <Fragment>
      <div className="w-full h-full">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            stopOnLastSlide: false,
          }}
          className="w-full h-dvh"
        >
          {swiperContent.map((elem, index) => {
            const { heading, paragraph, background } = elem;
            return (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-full text-main font-elmssans-medium flex justify-start items-center"
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex flex-col items-start justify-center gap-5 px-6 tablet:px-10 backdrop-blur-xs bg-black/50 p-5">
                    <h1 className="text-6xl tablet:text-7xl desktop:text-8xl font-elmssans-bold">
                      {heading}
                    </h1>
                    <p className="text-2xl">{paragraph}</p>
                    <NavLink
                      to={"/loan-form"}
                      className="bg-card text-main rounded-tl-2xl rounded-br-2xl px-5 py-2 tracking-wider mt-5"
                    >
                      Apply Now
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="w-full h-[600px] flex flex-col justify-evenly items-centent bg-black px-4">
          <h1 className="w-full text-layout font-elmssans-bold text-end tablet:text-6xl text-4xl">
            Loan Categories
          </h1>
          <Swiper
            modules={[Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1 },
              800: { slidesPerView: 2 },
            }}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2000,
              stopOnLastSlide: false,
              pauseOnMouseEnter: true,
            }}
            allowTouchMove={true}
            className="w-full cursor-grab"
          >
            {cardContent.map((elem, index) => {
              const { heading, paragraph, background } = elem;
              return (
                <SwiperSlide key={index}>
                  <div
                    className="w-full h-[300px] text-main font-elmssans-light flex justify-start items-center"
                    style={{
                      backgroundImage: `url(${background})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="w-full h-full bg-black/70 flex flex-col justify-evenly items-start px-5 text-white">
                      <h1 className="text-3xl font-elmssans-bold">{heading}</h1>
                      <p className="text-xl">{paragraph}</p>
                      <NavLink
                        className={
                          "text-xl bg-layout px-5 py-2 text-main rounded-tr-2xl rounded-bl-2xl"
                        }
                        to={"loan-form"}
                      >
                        Apply Now
                      </NavLink>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
