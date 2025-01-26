import React from "react";

const LoanCategories = () => {
  const categories = [
    {
      title: "Wedding",
      description:
        "Get the perfect loan to make your wedding day unforgettable.",
    },
    {
      title: "Home",
      description:
        "Make your dream home a reality with our affordable home loans.",
    },
    {
      title: "Business",
      description:
        "Boost your business with our flexible and easy loan options.",
    },
    {
      title: "Education",
      description:
        "Invest in your future with our hassle-free education loans.",
    },
  ];

  return (
    <div className="h-[100dvh] w-full relative flex items-center justify-center bg-slate-900">
      <div className="w-full h-full  flex items-start justify-center  gap-6 flex-col max-w-[1000px] px-4 lg:px-0">
        <h1 className="text-white text-4xl font-semibold">Loan Categories</h1>
        <div className="flex flex-wrap justify-start gap-8 w-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-800 w-[300px]  rounded-lg shadow-lg overflow-hidden"
            >
              {/* <img
                src={category.image}
                alt={category.title}
                className="w-full h-[200px] object-cover"
              /> */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {category.title}
                </h2>
                <p className="text-sm  mb-4 text-gray-200">
                  {category.description}
                </p>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanCategories;
