"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ اضافه شد

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

export default function CombinedSlider() {
  const router = useRouter(); // ✅ اضافه شد
  const [items, setItems] = useState<SliderItem[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeftMap, setTimeLeftMap] = useState<Record<number, string>>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const visibleCards = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packsRes, offersRes] = await Promise.all([
          axios.get<Pack[]>(
            "http://194.5.175.107:8000/api/admin/discount-pack/"
          ),
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
        const endTime = new Date(item.data.end_time).getTime();
        const diff = endTime - now;
        if (diff <= 0) newTimeLeft[i] = "00:00:00";
        else {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[i] = `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }
      });
      setTimeLeftMap(newTimeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [items]);

  useEffect(() => {
    if (cardRef.current) {
      const style = getComputedStyle(cardRef.current);
      const width =
        cardRef.current.offsetWidth + parseInt(style.marginRight || "0");
      setCardWidth(width);
    }
  }, [items]);

  const maxIndex = Math.max(items.length - visibleCards, 0);
  const nextSlide = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setIndex((prev) => Math.max(prev - 1, 0));

  if (!items.length)
    return (
      <div className="w-full text-center py-10 font-bold text-white">
        موردی برای نمایش وجود ندارد
      </div>
    );

  return (
    <section
      className="w-full py-12 rounded-3xl"
      style={{ background: "#004D7A" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        <h2 className="text-white text-3xl font-yekanExtraBold mb-6 text-center">
          پیشنهادهای ویژه و پک‌های تخفیفی
        </h2>

        <motion.div className="overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: -index * cardWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {items.map((item, idx) => {
              const timeLeft = timeLeftMap[idx] || "00:00:00";

              const handleClick = () => {
                const id = item.data.id;
                router.push(`/${item.type}/${id}`); // ✅ هدایت به مسیر مناسب
              };

              if (item.type === "pack") {
                const pack = item.data as Pack;
                return (
                  <div
                    onClick={handleClick}
                    ref={idx === 0 ? cardRef : null}
                    key={`pack-${pack.id}`}
                    className="cursor-pointer w-[300px] h-[440px] bg-white rounded-3xl flex-shrink-0 flex flex-col p-5 gap-3 shadow-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-lg font-yekanExtraBold text-[#004D7A]">
                      {pack.title}
                    </div>
                    <div className="text-sm font-yekanRegular text-gray-700 line-clamp-2">
                      {pack.description}
                    </div>
                    <div className="text-xs font-yekanRegular text-gray-500">
                      تایمر: {timeLeft}
                    </div>
                    <div className="mt-2 flex-1 flex flex-col gap-2 overflow-y-auto">
                      {pack.parts.map((p) => (
                        <div key={p.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={p.image_urls?.[0] || "/no-image.svg"}
                              alt={p.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-xs font-yekanRegular line-clamp-1">
                            {p.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm font-yekanExtraBold text-[#004D7A]">
                        {pack.final_discounted_price.toLocaleString()} تومان
                      </div>
                      <div className="text-xs font-yekanRegular line-through text-gray-400">
                        {pack.total_original_price.toLocaleString()} تومان
                      </div>
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
                    onClick={handleClick}
                    ref={idx === 0 ? cardRef : null}
                    key={`offer-${offer.id}-${part.id}`}
                    className="cursor-pointer w-[300px]  bg-white rounded-3xl flex-shrink-0 flex flex-col p-5 gap-4 shadow-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-lg font-yekanExtraBold text-[#004D7A] text-center">
                      {offer.title}
                    </div>
                    <p className="text-sm font-yekanRegular text-gray-700 text-center line-clamp-2">
                      {part.name}
                    </p>
                    <div className="relative w-full h-[160px] rounded-xl overflow-hidden border border-gray-200">
                      <Image
                        src={part.image_urls?.[0] || "/no-image.svg"}
                        alt={part.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-[#004D7A] font-yekanExtraBold text-lg text-center">
                      {part.price.toLocaleString()}{" "}
                      <span className="text-xs font-yekanRegular">تومان</span>
                    </p>
                    <div className="text-xs font-yekanRegular text-gray-500 text-center mt-auto">
                      تایمر: {timeLeft}
                    </div>
                  </div>
                );
              }
            })}
          </motion.div>

          {/* کنترل‌ها */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-2 flex gap-2">
            <button
              onClick={prevSlide}
              disabled={index === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                index === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-white"
              }`}
            >
              <Image src="/Arrow-rightB.svg" alt="" width={16} height={16} />
            </button>
            <button
              onClick={nextSlide}
              disabled={index >= maxIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                index >= maxIndex
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-white"
              }`}
            >
              <Image src="/Arrow-leftB.svg" alt="" width={16} height={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
