import React from "react";
import CarBrandSlider from "../components/BrandSlider";
import ProductCards from "../components/CardCategory";
import InvestigateCar from "../components/InvestigateCar";

function Page() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[40px] lg:px-0">
      <div className="w-full max-w-[1280px] flex flex-col justify-center items-center gap-[40px] pr-0  mx-auto">
        {/* عنوان مسیر */}
        <div className="w-full flex flex-wrap gap-[4px] justify-center  items-center">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            بررسی تخصصی
          </div>
          <div className="w-[16px] h-[16px]">
            <img
              src="/Arrow-leftG.svg"
              className="w-full h-full object-contain"
              alt="arrow"
            />
          </div>
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            بررسی تخصصی کیا
          </div>
        </div>

        {/* اسلایدر برندها */}
        <CarBrandSlider />

        {/* بررسی تخصصی خودرو */}
        <InvestigateCar />
      </div>
    </div>
  );
}

export default Page;
