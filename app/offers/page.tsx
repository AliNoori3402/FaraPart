"use client";

import React from "react";
import OfferList from "../components/OfferList";

function Page() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[10px]">
      <div className="w-full max-w-[1280px] flex flex-col gap-[40px] justify-center items-center px-4">
        {/* مسیر breadcrumb */}
        <div className="flex flex-wrap gap-[4px] w-full justify-center">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی
          </div>
          <img
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی کیا
          </div>
          <img
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی سراتو
          </div>
        </div>

        {/* عنوان و تایمر */}
        <div className="w-full sm:w-[377px] flex flex-col gap-[24px] justify-center items-center">
          <div className="w-full text-center text-[24px] sm:text-[32px] text-[#006FB4] font-yekanBold">
            پیشنهاد های شگفت انگیز ما
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-[8px]">
            <div className="flex flex-row gap-[12px] items-center justify-center">
              <div className="text-[#80838D] text-[14px] font-yekanDemiBold">
                فقط
              </div>
              <div className="flex flex-row gap-[8px]">
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  00
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  :
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  05
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  :
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  10
                </div>
              </div>
            </div>
            <div className="text-[14px] text-[#80838D] font-yekanDemiBold text-center">
              مونده تا آخر تخفیفات ما
            </div>
          </div>
        </div>

        {/* لیست محصولات */}
        <OfferList />
      </div>
    </div>
  );
}

export default Page;
