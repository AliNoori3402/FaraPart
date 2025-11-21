"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "/banner/banner4.jpeg", alt: "اسلاید 1" },
  { src: "/banner/banner3.jpeg", alt: "اسلاید 2" },
  { src: "/banner/banner2.jpeg", alt: "اسلاید 3" },
  { src: "/banner/banner.jpeg", alt: "اسلاید 4" },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slidesCount - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slidesCount);
  };

  // Auto-play every 5s, but respects isPaused
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slidesCount);
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, slidesCount]);

  // Drag end handler: uses both offset and velocity for reliability
  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;
    const SWIPE_OFFSET_THRESHOLD = 80; // پیکسل
    const SWIPE_VELOCITY_THRESHOLD = 800; // سرعت

    // اگر کشیده به چپ (یعنی offset منفی) و کافی بزرگ یا سریع بود → بعدی
    if (
      offsetX < -SWIPE_OFFSET_THRESHOLD ||
      velocityX < -SWIPE_VELOCITY_THRESHOLD
    ) {
      nextSlide();
    } else if (
      offsetX > SWIPE_OFFSET_THRESHOLD ||
      velocityX > SWIPE_VELOCITY_THRESHOLD
    ) {
      prevSlide();
    }
    // بعد از اتمام درگ، autoplay را فعال می‌کنیم
    setIsPaused(false);
  };

  return (
    <div
      className="w-full h-[529px] sm:h-[440px] md:h-[440px] container mx-auto rounded-[32px] overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Wrapper که خودِ wrapper درگ می‌پذیرد و key ندارد (تا remount نشود) */}
      <motion.div
        className="absolute inset-0"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragStart={() => setIsPaused(true)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* این قسمت فقط برای انیمیت fade هنگام تغییر اسلاید است */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              className="object-cover select-none"
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controls (dots) */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col sm:flex-row items-center justify-between px-6 pointer-events-none">
        <ul className="flex gap-2 items-center mt-4 sm:mt-0 pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all rounded-full focus:outline-none ${
                index === current
                  ? "w-[32px] h-[8px] bg-white"
                  : "w-[8px] h-[8px] bg-white/60"
              }`}
              aria-label={`اسلاید ${index + 1}`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
