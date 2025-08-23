"use client";

import { useRef } from "react";

export default function NewsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // عرض هر کارت - باید همون مقدار کلاس Tailwind باشه (مثلاً 385px کارت + 28px فاصله)
  const cardWidth = 385;
  const gap = 28;
  const scrollAmount = (cardWidth + gap) * 1; // 3 کارت با فاصله کنار هم

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // نمونه داده: فرض کن 6 کارت داریم (یا بیشتر)
  const cards = new Array(6).fill(null);

  return (
    <div className="md:w-full md:h-auto sm:w-[770px] sm:h-[600px]  w-[406px] flex flex-col   gap-[35px]   px-2.5 sm:px-4">
      {/* تیتر */}
      <div className="text-[20px] text-[#1C2024] font-yekanDemiBold">
        اخبار و مقالات
      </div>

      {/* اسلایدر کارت‌ها */}
      <div
        ref={sliderRef}
        className="flex gap-[28px]  md:h-[421px] sm:h-[834px]  h-[421px] overflow-hidden "
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cards.map((_, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 md:w-[385px] sm:w-[365px]   w-[365px] flex flex-col gap-[20px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="w-full h-[257px] rounded-[16px]">
              <img
                src="/car-blog.svg"
                alt="Pro Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="text-[20px] text-[#1C2024] font-yekanDemiBold">
                تحلیل بازار خودروهای برقی در سال 2024
              </div>
              <div className="text-[16px] text-[#8B8D98] font-yekanDemiBold">
                افزایش تقاضا برای خودروهای دوستدار محیط زیست، خودروسازان را
                وادار به نوآوری بیشتر کرده است.
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-[8px] items-center">
                  <img
                    src="/calender.svg"
                    alt="calendar"
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-[14px] text-[#8B8D98] font-yekanDemiBold">
                    20 اردیبهشت 1404
                  </span>
                </div>
                <div className="flex gap-[4px] items-center">
                  <span className="text-[14px] text-[#006FB4] font-yekanDemiBold">
                    بیشتر بخوانید
                  </span>
                  <img
                    src="/Arrow-leftB.svg"
                    alt="arrow"
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه‌ها */}
      <div className="w-[245px] h-[48px] flex gap-[14px] mx-auto">
        <button
          onClick={scrollRight}
          className="w-[48px] h-[48px] rounded-[24px] bg-[#FCFCFD] border border-[#008BDF] flex justify-center items-center"
        >
          <img
            src="/Arrow-rightB.svg"
            alt="Arrow Left"
            className="w-[24px] h-[24px]"
          />
        </button>
        <button
          onClick={scrollLeft}
          className="w-[48px] h-[48px] rounded-[24px] bg-[#004D7A] flex justify-center items-center"
        >
          <img
            src="/Arrow-leftW.svg"
            alt="Arrow Right"
            className="w-[24px] h-[24px]"
          />
        </button>

        <button className="w-[113px] h-[42px] rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[14px] text-[#FCFCFD] font-yekanRegular">
          مشاهده همه
        </button>
      </div>
    </div>
  );
}
