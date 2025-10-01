"use client";

import Image from "next/image";
import React from "react";

type Offer = {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  parts: {
    id: number;
    name: string;
    price: number;
  }[];
};

export default function OfferList({ offers }: { offers: Offer[] }) {
  if (!offers || offers.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">پیشنهادی موجود نیست</div>
    );
  }

  return (
    <div
      className="
        w-full max-w-[1280px]
      
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-[19px] px-4 mx-auto mb-[40px] justify-center
      "
    >
      {offers.map((offer) =>
        offer.parts.map((part) => (
          <div
            key={part.id}
            className="w-[243px] h-[342px] rounded-[20px] bg-white flex flex-col justify-center items-center gap-[16px] border border-[#E0E1E6] hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300"
          >
            <div className="w-[221px] h-[178px] relative overflow-hidden">
              {/* فرض می‌کنیم 20٪ تخفیف */}
              <div className="w-[45px] h-[29px] rounded-full bg-[#D93629] text-white text-[16px] font-yekanRegular flex justify-center items-center absolute top-2 right-2 z-10">
                20%-
              </div>
              <Image
                src="/Light.svg"
                alt={part.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-[221px] h-[118px] flex flex-col  gap-[10px]">
              <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                {part.name}
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row gap-[4px] items-center">
                  <p className="text-[16px] text-[#B9BBC6] font-yekanDemiBold line-through">
                    {(part.price * 1.1).toLocaleString()}
                  </p>
                  <div className="flex flex-row gap-[4px] items-center">
                    <div className="text-[20px] text-[#004D7A] font-yekanDemiBold">
                      {part.price.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-[#004D7A] font-yekanDemiBold">
                      تومان
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-[4px]">
                  <div className="text-[14px] text-[#006FB4] font-yekanDemiBold">
                    مشاهده جزئیات و خرید
                  </div>
                  <Image
                    src="/Arrow-leftB.svg"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
