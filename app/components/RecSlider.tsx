"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Part {
  id: number;
  name: string;
  price: number;
  image_urls: string[];
}

interface Offer {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  parts: Part[];
}

export default function AmazingSlider() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);

  const visibleCards = 5;
  const maxIndex = offer ? offer.parts.length - visibleCards : 0;

  // دریافت پیشنهاد فعال
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get("/api/special-offers");
        const data: Offer[] = res.data || [];
        const now = new Date().getTime();

        const activeOffer = data.find(
          (o) =>
            o.is_active &&
            new Date(o.start_time).getTime() <= now &&
            now <= new Date(o.end_time).getTime()
        );

        setOffer(activeOffer || null);
      } catch (err) {
        console.error("Error fetching offer:", err);
        setOffer(null);
      }
    };
    fetchOffer();
  }, []);

  // تایمر
  useEffect(() => {
    if (!offer) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(offer.end_time).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        setOffer(null); // وقتی پیشنهاد تمام شد، حذف شود
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [offer]);

  // اندازه کارت
  useEffect(() => {
    if (cardRef.current) {
      const style = getComputedStyle(cardRef.current);
      const width = cardRef.current.offsetWidth + parseInt(style.marginRight);
      setCardWidth(width);
    }
  }, [offer]);

  const nextSlide = () => {
    if (index < maxIndex) setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  if (!offer) {
    return (
      <div className="w-full text-center py-10 text-lg font-yekanDemiBold">
        پیشنهادی وجود ندارد
      </div>
    );
  }

  const parts = offer.parts;

  return (
    <div
      dir="rtl"
      className="w-full max-w-[1280px] bg-[#004D7A] rounded-[32px] flex flex-col pt-8 pr-8 gap-8 overflow-hidden mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
        <h2 className="text-white text-xl sm:text-2xl font-yekanDemiBold text-center sm:text-right">
          {offer.title}
        </h2>
        <div className="text-[#D9D9E0] font-yekanDemiBold">
          {offer.description}
        </div>
        {/* تایمر */}
        <div className="text-white font-yekanDemiBold mt-2 sm:mt-0">
          {timeLeft} باقی مانده
        </div>
      </div>

      {/* اسلایدر موبایل */}
      <div className="sm:hidden overflow-hidden px-4">
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{
            left: 0,
            right: (parts.length - 1) * (145 + 16),
          }}
          style={{ width: "max-content", touchAction: "pan-y" }}
        >
          {parts.map((p) => (
            <div
              key={p.id}
              className="w-[145px] h-[212px] bg-white rounded-[20px] flex-shrink-0 flex flex-col items-center justify-center gap-4"
            >
              <div className="relative w-[136px] h-[109px]">
                <Image
                  width={136}
                  height={109}
                  src={p.image_urls[0] || "/no-image.svg"}
                  className="w-full h-full object-contain"
                  alt={p.name}
                />
              </div>
              <div className="w-[125px] text-center text-xs flex flex-col gap-1">
                <p className="font-yekanDemiBold text-[#1C2024] line-clamp-2">
                  {p.name}
                </p>
                <div className="text-[#004D7A] font-yekanDemiBold">
                  {p.price.toLocaleString()}{" "}
                  <span className="text-[8px]">تومان</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* اسلایدر دسکتاپ/تبلت */}
      <div className="hidden sm:block relative px-4">
        <motion.div
          className="flex gap-4"
          style={{ direction: "ltr" }}
          animate={{ x: -index * cardWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {parts.map((p, idx) => (
            <div
              ref={idx === 0 ? cardRef : null}
              key={p.id}
              className="w-[236px] h-[344px] bg-white rounded-[20px] flex-shrink-0 flex flex-col items-center justify-center gap-4"
            >
              <div className="relative w-[221px] h-[178px]">
                <Image
                  width={221}
                  height={178}
                  src={p.image_urls[0] || "/no-image.svg"}
                  className="w-full h-full object-contain"
                  alt={p.name}
                />
              </div>
              <div className="w-[218px] text-center flex flex-col gap-2">
                <p className="text-[#1C2024] font-yekanDemiBold text-base line-clamp-2">
                  {p.name}
                </p>
                <div className="text-[#004D7A] font-yekanDemiBold text-lg">
                  {p.price.toLocaleString()}{" "}
                  <span className="text-sm">تومان</span>
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
            <Image
              src="/Arrow-rightB.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
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
            <Image
              src="/Arrow-leftW.svg"
              width={20}
              height={20}
              alt=""
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
