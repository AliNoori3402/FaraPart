import React from "react";
import ProductCards from "../components/CardCategory";

const Page = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-[30px] justify-center items-center">
        {/* مسیر و عنوان */}
        <div className="flex flex-col gap-[32px] items-center">
          {/* مسیر */}
          <div className="flex flex-row justify-center items-center gap-[4px]">
            <div className="text-[14px] text-[#000000] font-yekanDemiBold">
              لوازم یدکی
            </div>
          </div>

          {/* عنوان */}
          <div className="flex flex-row flex-wrap gap-[12px] justify-center items-center text-center">
            <div className="text-[28px] text-[#1C2024] font-yekanBold">
              برند ها
            </div>
          </div>
        </div>

        {/* کارت‌ها */}
        <ProductCards />
      </div>
    </div>
  );
};

export default Page;
