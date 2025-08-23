"use client";

import React from "react";

const products = Array(12).fill({
  title: "سراتو",
  count: "20 بررسی",
  image: "/category.svg",
});

const InvestigateCar: React.FC = () => {
  return (
    <div className="w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[19px] pr-0  mx-auto mb-[40px] px-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="relative w-full h-[295px] flex flex-col gap-[50px] 
            border border-[#E0E1E6] rounded-[24px] overflow-hidden 
            hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300"
        >
          {/* عنوان و تعداد بررسی */}
          <div className="flex flex-col gap-[8px]">
            <div className="mt-[24px] w-full flex flex-row justify-between items-center px-[24px]">
              <div className="text-[20px] text-[#000000] font-yekanDemiBold">
                {product.title}
              </div>
              <div className="text-[16px] text-[#B9BBC6] font-yekanDemiBold">
                {product.count}
              </div>
            </div>
            <div className="text-[14px] text-[#8B8D98] font-yekanDemiBold pr-[24px]">
              لنت، اگزوز ، ...
            </div>
          </div>

          {/* تصویر */}
          <div className="w-full h-[190px] px-[24px]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestigateCar;
