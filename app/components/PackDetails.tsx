"use client";

import React from "react";

type Car = {
  name: string;
  brand: { display_name: string };
};

type Part = {
  name: string;
  price: number;
  currency?: string;
  cars: Car[];
  category_title: string;
  warranty_name?: string | null;
};

type Props = {
  parts: Part[];
};

export default function PackDetails({ parts }: Props): React.ReactElement {
  return (
    <div className="w-full justify-center items-center flex flex-col gap-[32px]">
      {parts.map((part, index) => (
        <div
          key={index}
          className="w-full flex  justify-center items-center flex-col gap-[16px]"
        >
          {/* عنوان */}
          <div className="text-[20px] sm:text-[24px] md:text-[28px] text-[#1C2024] font-yekanBold text-center ">
            {part.name}
          </div>

          {/* ردیف مشخصات */}
          <div className="w-full rounded-[24px] bg-[#FCFCFD] border border-[#E8E8EC] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8EC]">
            <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
              <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                دسته‌بندی
              </div>
              <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                {part.category_title}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
              <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                ماشین‌ها
              </div>
              <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                {part.cars
                  .map((car) => `${car.brand.display_name} ${car.name}`)
                  .join(", ")}
              </div>
            </div>
            {part.warranty_name && (
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  گارانتی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {part.warranty_name}
                </div>
              </div>
            )}
          </div>

          {/* قیمت */}
          <div className="flex gap-[4px] items-center justify-center md:justify-start">
            <div className="text-[20px] md:text-[24px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
              {part.price.toLocaleString()}
            </div>
            <div className="text-[12px] md:text-[14px] text-[#004D7A] font-yekanDemiBold leading-[16px]">
              تومان
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
