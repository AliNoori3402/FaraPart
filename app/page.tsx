"use client";
import Slider from "./components/slider";
import AmazingSlider from "./components/RecSlider";
import FilterProduct from "./components/FilterProduct";
import BrandGrid from "./components/BrandGrid";
import NewsSlider from "./components/BlogSlider";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-[96px] px-4 sm:px-6 lg:px-0 max-w-[1280px] mx-auto">
      {/* 🔹 اسلایدر اصلی */}
      <Slider />

      {/* 🔹 اسلایدر پیشنهاد شگفت‌انگیز */}
      <AmazingSlider />

      {/* 🔹 فیلتر محصولات */}
      <div className="w-full flex justify-center items-center">
        <FilterProduct />
      </div>

      {/* 🔹 گرید برندها */}
      <div className="w-full flex justify-center items-center">
        <BrandGrid />
      </div>

      {/* 🔹 باکس بررسی تخصصی قطعات */}
      <div className="relative w-full flex justify-center items-center">
        <div className="relative w-full max-w-[1280px] h-[352px] md:h-[205px] sm:h-[205px]">
          {/* پس‌زمینه منحنی */}
          <svg
            viewBox="0 0 1280 205"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full z-0"
          >
            <defs>
              <clipPath id="custom-shape" clipPathUnits="userSpaceOnUse">
                <path d="M1280 173C1280 190.673 1265.67 205 1248 205H492.851C475.177 205 460.851 190.673 460.851 173V133C460.851 115.327 446.524 101 428.851 101H32C14.3269 101 0 86.6731 0 69V32C0 14.3269 14.3269 0 32 0H1248C1265.67 0 1280 14.3269 1280 32V173Z" />
              </clipPath>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#008BDF" />
                <stop offset="100%" stopColor="#006FB4" />
              </linearGradient>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#gradient)"
              clipPath="url(#custom-shape)"
            />
          </svg>

          {/* محتوا */}
          <div className="absolute inset-0 z-10 pt-[36px] pr-[20px] sm:pr-[40px] flex items-start">
            <div className="w-[324px] md:w-[433px] flex flex-col gap-[16px]">
              <h2 className="text-[20px] sm:text-[32px] text-white font-yekanDemiBold">
                بررسی تخصصی قطعات خودرو ها
              </h2>
              <p className="text-[14px] sm:text-[16px] text-white font-yekanRegular leading-[24px]">
                بررسی با جزئیات دقیق قطعات براساس برند و مدل خودرو ها
              </p>
              <Link href={"/investigate"}>
                <button className="w-[151px] h-[42px] text-[16px] text-white font-yekanDemiBold bg-gradient-to-r from-[#005E95] to-[#004D7A] rounded-[16px]">
                  بررسی قطعات خودرو
                </button>
              </Link>
            </div>
          </div>

          {/* تصویر خودرو پایین چپ */}
          <div className="absolute bottom-[-10px] md:bottom-[-50px] left-[-10px] sm:left-0 w-[256px] h-[165px] sm:w-[269px] sm:h-[173px] md:w-[451px] md:h-[291px] z-20">
            <img
              src="/pro-logo.svg"
              alt="Pro Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* 🔹 اسلایدر اخبار و مقالات */}
      <div className="w-full">
        <NewsSlider />
      </div>
    </div>
  );
}
