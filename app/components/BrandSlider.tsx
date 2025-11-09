"use client";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type Brand = {
  brand_name_fa: string;
  logo: string | null;
};

interface CarBrandSliderProps {
  onSelectBrand: (brand: string) => void;
}

export default function CarBrandSlider({ onSelectBrand }: CarBrandSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("/api/investigate");
        setBrands(res.data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);

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
    <div className="w-full mb-4 max-w-[1280px] flex flex-col gap-[32px] justify-center items-center bg-[#004D7A] rounded-[32px] overflow-hidden px-4 py-6">
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
            onClick={() => onSelectBrand(brand.brand_name_fa)}
            className="w-[99px] h-[138px] flex flex-col justify-center items-center gap-[24px] rounded-[24px] shrink-0 transition duration-300 hover:bg-[#FE7D11] cursor-pointer"
          >
            <div className="w-[59px] h-[64px]">
              <Image
                width={59}
                height={64}
                src={
                  brand.logo
                    ? `data:image/png;base64,${brand.logo}` // اضافه کردن MIME type
                    : "/car-logo.svg"
                }
                className="w-full h-full object-contain"
                alt={brand.brand_name_fa}
              />
            </div>
            <div className="h-[26px] text-[20px] text-white font-yekanDemiBold text-center">
              {brand.brand_name_fa}
            </div>
          </div>
        ))}
      </div>

      {/* دکمه‌های اسکرول */}
      <div className="hidden md:flex flex-row gap-[12px] mt-2">
        <button
          onClick={() => scroll("right")}
          className="w-[48px] h-[48px] rounded-full bg-[#FCFCFD] flex justify-center items-center"
        >
          <Image
            width={24}
            height={24}
            src="/Arrow-rightB.svg"
            alt="right"
            className="w-[24px] h-[24px]"
          />
        </button>
        <button
          onClick={() => scroll("left")}
          className="w-[48px] h-[48px] rounded-full bg-[#FCFCFD] flex justify-center items-center"
        >
          <Image
            width={24}
            height={24}
            src="/Arrow-leftB.svg"
            alt="left"
            className="w-[24px] h-[24px]"
          />
        </button>
      </div>
    </div>
  );
}
