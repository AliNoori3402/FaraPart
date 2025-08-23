"use client";

import React from "react";
import PartsList from "../../components/PartList";

export default function Page() {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[1280px] flex flex-col items-center gap-[40px]">
        {/* مسیر ناوبری (Breadcrumb) */}
        <div className="flex flex-wrap gap-[4px] justify-center items-center text-[14px] text-[#1C2024] font-yekanDemiBold">
          <span>بررسی تخصصی</span>
          <img
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <span>بررسی تخصصی کیا</span>
          <img
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <span>بررسی تخصصی سراتو</span>
        </div>

        {/* تیتر و لیست قطعات */}
        <div className="w-full flex flex-col items-center gap-[20px]">
          <div className="flex flex-row gap-[12px] justify-center items-center">
            <span className="text-[28px] text-[#1C2024] font-yekanBold">
              قطعات
            </span>
            <span className="text-[28px] text-[#FCFCFD] font-yekanBold bg-[#005E95] rounded-full px-6 py-3">
              سراتو
            </span>
          </div>
          <PartsList />
        </div>
      </div>
    </div>
  );
}
