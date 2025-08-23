"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  discount: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "رم دسکتاپ مدل SPECTRIX D60G DDR4 RGB ظرفیت 8 گیگابایت",
    image: "/Light.svg",
    price: "2٬250٬000",
    discount: "20%-",
  },
  {
    id: 2,
    title: "رم CORSAIR Vengeance LPX ظرفیت 16 گیگ",
    image: "/Light.svg",
    price: "3٬450٬000",
    discount: "15%-",
  },
  {
    id: 3,
    title: "رم ADATA XPG Spectrix ظرفیت 8 گیگ",
    image: "/Light.svg",
    price: "1٬950٬000",
    discount: "10%-",
  },
  {
    id: 4,
    title: "رم KINGSTON Fury Beast 8GB",
    image: "/Light.svg",
    price: "2٬100٬000",
    discount: "18%-",
  },
  {
    id: 5,
    title: "رم G.SKILL Trident Z RGB ظرفیت 16 گیگ",
    image: "/Light.svg",
    price: "4٬000٬000",
    discount: "22%-",
  },
  {
    id: 6,
    title: "رم Corsair Dominator Platinum ظرفیت 32 گیگ",
    image: "/Light.svg",
    price: "6٬300٬000",
    discount: "17%-",
  },
];

export default function AmazingSlider() {
  const [index, setIndex] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);

  const visibleCards = 5;
  const maxIndex = products.length - visibleCards;

  const nextSlide = () => {
    // در RTL دکمه "بعدی" کارت‌ها را به راست می‌برد
    if (index < maxIndex) setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    // در RTL دکمه "قبلی" کارت‌ها را به چپ می‌آورد
    if (index > 0) setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (cardRef.current) {
      const style = getComputedStyle(cardRef.current);
      const width = cardRef.current.offsetWidth + parseInt(style.marginRight);
      setCardWidth(width);
    }
  }, []);

  return (
    <div
      dir="rtl"
      className="w-full max-w-[1280px] bg-[#004D7A] rounded-[32px] flex flex-col pt-8 pr-8 gap-8 overflow-hidden mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
        <h2 className="text-white text-xl sm:text-2xl font-yekanDemiBold text-center sm:text-right">
          پیشنهاد های شگفت انگیز ما
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[#D9D9E0] text-sm sm:text-base font-yekanDemiBold">
          <div className="flex items-center gap-2">
            <span>فقط</span>
            <div className="flex items-center gap-1 text-white text-xl sm:text-2xl">
              <span>00</span>:<span>05</span>:<span>10</span>
            </div>
          </div>
          <span>مونده تا آخر تخفیفات ما</span>
        </div>
      </div>

      {/* اسلایدر موبایل */}
      <div className="sm:hidden overflow-hidden px-4">
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{
            left: 0,
            right: (products.length - 1) * (145 + 16), // تعداد کارت × (عرض + gap)
          }}
          style={{ width: "max-content", touchAction: "pan-y" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[145px] h-[212px] bg-white rounded-[20px] flex-shrink-0 flex flex-col items-center justify-center gap-4"
            >
              <div className="relative w-[136px] h-[109px]">
                <span className="absolute top-2 right-2 bg-[#D93629] text-white text-sm w-[45px] h-[29px] flex items-center justify-center rounded-full z-10">
                  {product.discount}
                </span>
                <img
                  src={product.image}
                  className="w-full h-full object-contain"
                  alt={product.title}
                />
              </div>
              <div className="w-[125px] text-center text-xs flex flex-col gap-1">
                <p className="font-yekanDemiBold text-[#1C2024] line-clamp-2">
                  {product.title}
                </p>
                <div className="line-through text-[#B9BBC6] text-[10px]">
                  3٬000٬000
                </div>
                <div className="text-[#004D7A] font-yekanDemiBold">
                  {product.price} <span className="text-[8px]">تومان</span>
                </div>
                <div className="text-[#006FB4] text-[10px] flex justify-center items-center gap-1">
                  مشاهده جزئیات و خرید
                  <img src="/Arrow-leftB.svg" className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* اسلایدر دسکتاپ/تبلت */}
      {/* اسلایدر دسکتاپ/تبلت */}
      <div className="hidden sm:block relative px-4">
        <motion.div
          className="flex gap-4"
          style={{ direction: "ltr" }} // ✅ جهت داخلی LTR
          animate={{ x: -index * cardWidth }} // ✅ جهت حرکت منفی
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {products.map((product, idx) => (
            <div
              ref={idx === 0 ? cardRef : null}
              key={product.id}
              className="w-[236px] h-[344px] bg-white rounded-[20px] flex-shrink-0 flex flex-col items-center justify-center gap-4"
            >
              <div className="relative w-[221px] h-[178px]">
                <span className="absolute top-2 right-2 bg-[#D93629] text-white text-base w-[45px] h-[29px] flex items-center justify-center rounded-full z-10">
                  {product.discount}
                </span>
                <img
                  src={product.image}
                  className="w-full h-full object-contain"
                  alt={product.title}
                />
              </div>
              <div className="w-[218px] text-center flex flex-col gap-2">
                <p className="text-[#1C2024] font-yekanDemiBold text-base line-clamp-2">
                  {product.title}
                </p>
                <div className="line-through text-[#B9BBC6] text-sm">
                  3٬000٬000
                </div>
                <div className="text-[#004D7A] font-yekanDemiBold text-lg">
                  {product.price} <span className="text-sm">تومان</span>
                </div>
                <div className="text-[#006FB4] text-sm flex justify-center items-center gap-1">
                  مشاهده جزئیات و خرید
                  <img src="/Arrow-leftB.svg" className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* سایه چپ */}
        <div className="absolute top-0 left-0 w-[80px] h-full bg-gradient-to-r from-[#004D7A] to-transparent z-10 pointer-events-none rounded-r-[32px]" />
      </div>

      {/* کنترل‌ها */}
      <div className="w-full flex justify-center items-center gap-6 pb-4">
        <div className="hidden sm:flex gap-4">
          <button
            onClick={prevSlide}
            disabled={index === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center border ${
              index === 0 ? "bg-[#d9d9d980] cursor-not-allowed" : "bg-white"
            }`}
          >
            <img src="/Arrow-rightB.svg" className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={index >= maxIndex}
            className={`w-12 h-12 rounded-full flex items-center justify-center border ${
              index >= maxIndex
                ? "bg-[#d9d9d980] cursor-not-allowed"
                : "bg-[#004D7A]"
            }`}
          >
            <img src="/Arrow-leftW.svg" className="w-5 h-5" />
          </button>
        </div>
        <button className="bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-white rounded-[16px] px-6 py-2 font-yekanDemiBold text-sm sm:text-base">
          مشاهده همه تخفیفات
        </button>
      </div>
    </div>
  );
}
