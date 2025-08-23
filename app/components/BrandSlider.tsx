"use client";

import { useRef } from "react";

type Brand = {
  name: string;
  image: string;
};

const brands: Brand[] = [
  { name: "سایپا", image: "/car-logo.svg" },
  { name: "کیا", image: "/car-logo.svg" },
  { name: "هیوندای", image: "/car-logo.svg" },
  { name: "تویوتا", image: "/car-logo.svg" },
  { name: "بنز", image: "/car-logo.svg" },
  { name: "بی‌ام‌و", image: "/car-logo.svg" },
  { name: "سایپا", image: "/car-logo.svg" },
  { name: "کیا", image: "/car-logo.svg" },
  { name: "هوندا", image: "/car-logo.svg" },
  { name: "بی‌ام‌و", image: "/car-logo.svg" },
  { name: "سایپا", image: "/car-logo.svg" },
  { name: "کیا", image: "/car-logo.svg" },
  { name: "هوندا", image: "/car-logo.svg" },
  { name: "بی‌ام‌و", image: "/car-logo.svg" },
  { name: "سایپا", image: "/car-logo.svg" },
  { name: "کیا", image: "/car-logo.svg" },
  { name: "هوندا", image: "/car-logo.svg" },
];

export default function CarBrandSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-[1280px] flex flex-col gap-[32px] justify-center items-center bg-[#004D7A] rounded-[32px] overflow-hidden px-4 py-6">
      {/* عنوان */}
      <div className="text-[14px] text-white font-yekanDemiBold">
        برند خودرو را انتخاب کنید
      </div>

      {/* لیست برندها */}
      <div
        ref={sliderRef}
        className="w-full flex flex-row gap-[16px] md:overflow-x-hidden overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            className="w-[99px] h-[138px] flex flex-col justify-center items-center gap-[24px] rounded-[24px] shrink-0 transition duration-300 hover:bg-[#FE7D11] cursor-pointer"
          >
            <div className="w-[59px] h-[64px]">
              <img
                src={brand.image}
                className="w-full h-full object-contain"
                alt={brand.name}
              />
            </div>
            <div className="h-[26px] text-[20px] text-white font-yekanDemiBold text-center">
              {brand.name}
            </div>
          </div>
        ))}
      </div>

      {/* دکمه‌های اسکرول - فقط در md به بالا */}
      <div className="hidden md:flex flex-row gap-[12px] mt-2">
        <button
          onClick={() => scroll("right")}
          className="w-[48px] h-[48px] rounded-full bg-[#FCFCFD] flex justify-center items-center"
        >
          <img
            src="/Arrow-rightB.svg"
            alt="right"
            className="w-[24px] h-[24px] object-contain"
          />
        </button>
        <button
          onClick={() => scroll("left")}
          className="w-[48px] h-[48px] rounded-full bg-[#FCFCFD] flex justify-center items-center"
        >
          <img
            src="/Arrow-leftB.svg"
            alt="left"
            className="w-[24px] h-[24px] object-contain"
          />
        </button>
      </div>
    </div>
  );
}
