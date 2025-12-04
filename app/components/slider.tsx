"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// عکس‌های جدا برای موبایل، تبلت و دسکتاپ
const slidesMobile = [
  {
    src: "/banner/mobile/mobile-banner1.jpg",
    alt: "موبایل 1",
    link: "/",
  },
  {
    src: "/banner/mobile/mobile-banner2.jpg",
    alt: "موبایل 2",
    link: "/offers",
  },
  {
    src: "/banner/mobile/mobile-banner-3.jpg",
    alt: "موبایل 3",
    link: "/blogs",
  },
  {
    src: "/banner/mobile/mobile-banner4.jpg",
    alt: "موبایل 4",
    link: "/investigate",
  },
];

const slidesTablet = [
  {
    src: "/banner/tablet/tablet-banner1.jpg",
    alt: "تبلت 1",
    link: "/",
  },
  {
    src: "/banner/tablet/tablet-banner2.jpg",
    alt: "تبلت 2",
    link: "/offers",
  },
  {
    src: "/banner/tablet/tablet-banner3.jpg",
    alt: "تبلت 3",
    link: "/blogs",
  },
  {
    src: "/banner/tablet/tablet-banner4.jpg",
    alt: "تبلت 4",
    link: "/investigate",
  },
];

const slidesDesktop = [
  { src: "/banner/banner4.jpeg", alt: "دسکتاپ 1", link: "/" },
  { src: "/banner/banner3.jpeg", alt: "دسکتاپ 2", link: "/offers" },
  { src: "/banner/banner2.jpeg", alt: "دسکتاپ 3", link: "/blogs" },
  { src: "/banner/banner.jpeg", alt: "دسکتاپ 4", link: "/investigate" },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState(slidesDesktop);
  const autoplayRef = useRef(null);

  // انتخاب عکس‌ها بر اساس اندازه صفحه
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setSlides(slidesMobile);
      } else if (width < 1024) {
        setSlides(slidesTablet);
      } else {
        setSlides(slidesDesktop);
      }
      setCurrent(0);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const slidesCount = slides.length;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slidesCount - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slidesCount);

  // Auto-play
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slidesCount);
      }, 5000);
    }
    return () => autoplayRef.current && clearInterval(autoplayRef.current);
  }, [isPaused, slidesCount]);

  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if (offsetX < -80 || velocityX < -800) nextSlide();
    else if (offsetX > 80 || velocityX > 800) prevSlide();

    setIsPaused(false);
  };

  return (
    <div
      className="w-full h-[380px] sm:h-[440px] md:h-[440px] container mx-auto rounded-[32px] overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="absolute inset-0"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragStart={() => setIsPaused(true)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <Link href={slides[current].link}>
              <Image
                src={slides[current].src}
                alt={slides[current].alt}
                fill
                className="object-cover select-none"
                priority
                draggable={false}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center px-6 pointer-events-none">
        <ul className="flex gap-2 items-center pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all rounded-full focus:outline-none ${
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
