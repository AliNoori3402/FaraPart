"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "ارسال سریع به سراسر ایران",
    desc: "ارسال رایگان برای خرید های بالای 2 میلیون تومان!",
  },
  {
    title: "ضمانت بازگشت وجه",
    desc: "۷ روز ضمانت بی‌قید و شرط محصولات",
  },
  {
    title: "پرداخت در محل",
    desc: "در تمام شهرهای بزرگ ایران",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  // Auto-play every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="
        w-full
        h-[529px] sm:h-[440px] md:h-[440px]
        rounded-[32px]
        bg-gradient-to-r from-[#FF9F40] to-[#FE7D11]
        flex items-start justify-start
        px-6 sm:px-[56px] pt-8 sm:pt-[48px]
      "
    >
      <div className="flex flex-col justify-between h-full max-w-[400px] w-full">
        {/* 👇 Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-white text-[30px] font-yekanExtraBold leading-[47px]">
              {slides[current].title}
            </h2>
            <p className="text-white text-[16px] font-yekanRegular leading-[21px]">
              {slides[current].desc}
            </p>
            <button className="w-[142px] h-[42px] bg-gradient-to-r from-[#EF6207] to-[#C64808] rounded-[16px] text-white text-[14px] font-yekanRegular">
              همین حالا خرید کن
            </button>
          </motion.div>
        </AnimatePresence>

        {/* 👇 Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mt-auto">
          {/* Arrow Buttons */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-[48px] h-[48px] bg-[#FCFCFD] rounded-full flex items-center justify-center"
            >
              <img src="/right.svg" alt="prev" className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-[48px] h-[48px] bg-[#FCFCFD] rounded-full flex items-center justify-center"
            >
              <img src="/left.svg" alt="next" className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <ul className="flex gap-1 items-center">
            {slides.map((_, index) => (
              <li
                key={index}
                className={`transition-all rounded-full ${
                  index === current
                    ? "w-[32px] h-[8px] bg-[#FCFCFD]"
                    : "w-[8px] h-[8px] bg-[#FCFCFD]"
                }`}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
