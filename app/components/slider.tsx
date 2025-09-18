"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "/banner/banner.jpeg", alt: "اسلاید ۱" },
  { src: "/banner/banner2.jpeg", alt: "اسلاید ۲" },
  { src: "/banner/banner3.jpeg", alt: "اسلاید ۳" },
  { src: "/banner/banner4.jpeg", alt: "اسلاید ۴" },
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
    <div className="w-full h-[529px] sm:h-[440px] md:h-[440px] rounded-[32px] overflow-hidden relative">
      {/* 👇 Slide Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* 👇 Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col sm:flex-row items-center justify-between px-6">
        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-[48px] h-[48px] bg-[#FCFCFD] rounded-full flex items-center justify-center shadow-md"
          >
            <img src="/right.svg" alt="prev" className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-[48px] h-[48px] bg-[#FCFCFD] rounded-full flex items-center justify-center shadow-md"
          >
            <img src="/left.svg" alt="next" className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <ul className="flex gap-2 items-center mt-4 sm:mt-0">
          {slides.map((_, index) => (
            <li
              key={index}
              className={`transition-all rounded-full ${
                index === current
                  ? "w-[32px] h-[8px] bg-white"
                  : "w-[8px] h-[8px] bg-white/60"
              }`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
