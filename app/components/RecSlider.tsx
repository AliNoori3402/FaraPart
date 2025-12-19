"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  name: string;
}
interface Part {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
  cars?: Car[];
}
interface Pack {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  parts: Part[];
  final_discounted_price: number;
  total_original_price: number;
  discount_percent: number;
}
interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  parts: Part[];
}
type SliderItem = { type: "pack" | "offers"; data: Pack | SpecialOffer };

// تایمر فارسی
const formatPersianTime = (diff: number) => {
  if (diff <= 0) return "پایان یافته";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000);
  diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);

  return [
    days > 0 ? `${days} روز` : null,
    `${hours} ساعت`,
    `${minutes} دقیقه`,
    `${seconds} ثانیه`,
  ]
    .filter(Boolean)
    .join(" و ");
};

export default function CombinedSlider() {
  const router = useRouter();
  const [items, setItems] = useState<SliderItem[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeftMap, setTimeLeftMap] = useState<Record<number, string>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  // دریافت دیتا
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packsRes, offersRes] = await Promise.all([
          axios.get<Pack[]>("/api/pack"),
          axios.get<SpecialOffer[]>("/api/special-offers"),
        ]);

        const packsData = Array.isArray(packsRes.data) ? packsRes.data : [];
        const offersData = Array.isArray(offersRes.data)
          ? offersRes.data
          : offersRes.data.results
          ? offersRes.data.results
          : [offersRes.data];

        const now = Date.now();

        const packs: SliderItem[] = packsData
          .filter(
            (p) =>
              p.is_active &&
              new Date(p.start_time).getTime() <= now &&
              now <= new Date(p.end_time).getTime()
          )
          .map((p) => ({ type: "pack", data: p }));

        const offers: SliderItem[] = offersData
          .filter(
            (o) =>
              o.is_active &&
              new Date(o.start_time).getTime() <= now &&
              now <= new Date(o.end_time).getTime()
          )
          .flatMap((o) =>
            o.parts.map((p) => ({
              type: "offers",
              data: { ...o, parts: [p] },
            }))
          );

        setItems([...packs, ...offers]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // تایمر
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newTimeLeft: Record<number, string> = {};
      items.forEach((item, i) => {
        const diff = new Date(item.data.end_time).getTime() - now;
        newTimeLeft[i] = formatPersianTime(diff);
      });
      setTimeLeftMap(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  // محاسبه عرض کانتینر و track
  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
    };
    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, [items]);

  const maxTranslate = Math.max(trackWidth - containerWidth, 0);
  const isSliderActive = items.length > 1 && trackWidth > containerWidth - 20;

  const maxIndex = items.length - 1;
  const nextSlide = () => setIndex((p) => Math.min(p + 1, maxIndex));
  const prevSlide = () => setIndex((p) => Math.max(p - 1, 0));

  if (!items.length)
    return (
      <div className="w-full text-center py-10 font-bold text-white">
        موردی برای نمایش وجود ندارد
      </div>
    );

  return (
    <section
      className="w-full container mx-auto py-12 rounded-3xl"
      style={{ background: "#004D7A" }}
      ref={containerRef}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6 relative">
        <h2 className="text-white text-xl sm:text-3xl font-yekanExtraBold mb-6 text-center">
          پیشنهادهای ویژه و پک‌های تخفیفی
        </h2>

        <motion.div className="overflow-hidden px-4 relative">
          <motion.div
            ref={trackRef}
            className="flex gap-6"
            animate={{ x: isSliderActive ? index * containerWidth*0.6  : 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            drag={isSliderActive ? "x" : false}
            dragConstraints={{ left: 0, right: maxTranslate }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (!isSliderActive) return;
              if (info.offset.x > 100) nextSlide();
              if (info.offset.x < -100) prevSlide();
            }}
          >
            {items.map((item, idx) => {
              const timeLeft = timeLeftMap[idx];
              const handleClick = () => router.push(`/${item.type}/${item.data.id}`);
              const commonCardClasses =
                "cursor-pointer min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white rounded-3xl flex flex-col p-5 gap-3 shadow-xl hover:scale-105 transition-transform duration-300";

              if (item.type === "pack") {
                const pack = item.data as Pack;
                return (
                  <div
                    key={`pack-${pack.id}`}
                    onClick={handleClick}
                    className={commonCardClasses}
                  >
                    <div className="text-base sm:text-lg font-yekanExtraBold text-[#004D7A] text-center">
                      {pack.title}
                    </div>
                    <div className="relative w-full h-[160px] rounded-xl overflow-hidden border border-gray-200">
                      <Image src="/car-blog.svg" alt={pack.title} fill className="object-contain" />
                    </div>
                    <div className="text-xs font-yekanRegular text-gray-500 text-center">
                      زمان باقیمانده: {timeLeft}
                    </div>
                    <div className="text-xs font-yekanBold text-[#FFD700] mt-1 border-t border-gray-200 pt-1 text-center">
                      {pack.discount_percent}% تخفیف
                    </div>
                  </div>
                );
              } else {
                const offer = item.data as SpecialOffer;
                const part = offer.parts[0];
                return (
                  <div
                    key={`offer-${offer.id}-${part.id}`}
                    onClick={handleClick}
                    className={commonCardClasses}
                  >
                    <div className="text-base sm:text-lg font-yekanExtraBold text-[#004D7A] text-center">
                      {offer.title}
                    </div>
                    <div className="relative w-full h-[160px] rounded-xl overflow-hidden border border-gray-200">
                      <Image src="/car-blog.svg" alt={part.name} fill className="object-contain" />
                    </div>
                    <div className="text-xs font-yekanRegular text-gray-500 text-center mt-auto">
                      زمان باقیمانده: {timeLeft}
                    </div>
                  </div>
                );
              }
            })}
          </motion.div>

          {/* کنترل‌ها */}
          {items.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={index === 0}
                className="absolute top-1/2 -translate-y-1/2  left-0 sm:left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center disabled:opacity-40 shadow-lg"
              >
              
                  <Image src="/Arrow-leftB.svg" alt="" width={16} height={16} />
              </button>
              <button
                onClick={nextSlide}
                disabled={index >= maxIndex}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center disabled:opacity-40 shadow-lg"
              >
   <Image src="/Arrow-rightB.svg" alt="" width={16} height={16} />
              </button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
