"use client";

import React from "react";

import PackImages from "../components/PackImages";
import PackDetails from "../components/PackDetails";
import TextDetails from "../components/TextDetails";
import Image from "next/image";

function Page() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[10px]">
      <div className="w-full max-w-[1280px] flex flex-col gap-[48px] justify-center items-center px-4 pb-[89px]">
        {/* مسیر نان‌بری */}
        <div className="w-full max-w-[454px] flex flex-wrap gap-[4px] justify-center md:justify-start">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی
          </div>
          <Image
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی کیا
          </div>
          <Image
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی سراتو
          </div>
          <Image
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            پوسته سپر جلو سراتو قدیم
          </div>
        </div>

        {/* بخش اصلی محصول */}
        <div className="w-full flex flex-col lg:flex-row gap-[32px] lg:gap-[56px] items-center lg:items-start">
          <PackImages />

          <div className="w-full max-w-[638px] flex flex-col gap-[24px]">
            {/* عنوان و زیرعنوان */}
            <div className="w-full md:w-[230px] flex flex-col gap-[24px] md:gap-[39px] mx-auto md:mx-0 text-center md:text-right">
              <div className="text-[28px] text-[#1C2024] font-yekanBold">
                پک لنت + لنت + لنت
              </div>
              <div className="text-[14px] text-[#8B8D98] font-yekanBold">
                جزئیات پک
              </div>
            </div>

            {/* جزئیات و قیمت */}
            <div className="w-full flex flex-col gap-[32px]">
              <PackDetails />

              <div className="w-full flex flex-col gap-[24px]">
                {/* قیمت و تخفیف */}
                <div className="w-full md:w-[266px] flex flex-row gap-[18px] items-center justify-center md:justify-start">
                  <div className="flex flex-row gap-[4px] items-center">
                    <p className="text-[16px] text-[#B9BBC6] font-yekanDemiBold line-through">
                      3٬000٬000
                    </p>
                    <div className="flex flex-row gap-[4px] items-center">
                      <div className="text-[20px] text-[#004D7A] font-yekanDemiBold">
                        2،250،000
                      </div>
                      <div className="text-[12px] text-[#004D7A] font-yekanDemiBold">
                        تومان
                      </div>
                    </div>
                  </div>
                  <div className="w-[45px] h-[29px] rounded-full bg-[#D93629] text-[16px] text-[#FCFCFD] font-yekanRegular flex justify-center items-center">
                    20%-
                  </div>
                </div>

                {/* دکمه‌ها */}
                <div className="flex flex-col sm:flex-row gap-[16px] items-center">
                  <div className="flex flex-row gap-[16px] justify-center items-center">
                    <div className="w-[48px] h-[48px] rounded-[20px] bg-[#006FB4] flex justify-center items-center">
                      <Image
                        src="/Add.svg"
                        alt=""
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                    <div className="text-[20px] text-[#000000] font-yekanDemiBold">
                      1
                    </div>
                    <div className="w-[48px] h-[48px] rounded-[20px] bg-[#FCFCFD] border border-[#E0E1E6] flex justify-center items-center">
                      <Image
                        src="/negative.svg"
                        alt=""
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-[450px] h-[48px] rounded-[16px] flex justify-center items-center bg-[#004D7A] gap-[8px]">
                    <Image
                      src="/addbasket.svg"
                      alt=""
                      className="w-[24px] h-[24px]"
                    />
                    <div className="text-[14px] text-[#FCFCFD] font-yekanRegular">
                      خرید تکی
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TextDetails />
      </div>
    </div>
  );
}

export default Page;
