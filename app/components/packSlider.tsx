"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

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
  name: string;
  price: number;
  image_urls?: string[];
  cars: Car[];
  start_time: string;
  end_time: string;
  is_active: boolean;
}

type SliderItem = {
  type: "pack" | "offer";
  data: Pack | SpecialOffer;
};

export default function CombinedSlider() {
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
          axios.get<Pack[]>("/api/pack"),
          axios.get<SpecialOffer[]>("/api/special-offers"),
        ]);

        const now = Date.now();

        const packs: SliderItem[] = (packsRes.data || [])
          .filter(
            (p) =>
              p.is_active &&
              new Date(p.start_time).getTime() <= now &&
              now <= new Date(p.end_time).getTime()
          )
          .map((p) => ({ type: "pack", data: p }));

        const offers: SliderItem[] = (offersRes.data || [])
          .filter(
            (o) =>
              o.is_active &&
              new Date(o.start_time).getTime() <= now &&
              now <= new Date(o.end_time).getTime()
          )
          .map((o) => ({ type: "offer", data: o }));

        setItems([...packs, ...offers]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // تایمرها
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newTimeLeft: Record<number, string> = {};
      items.forEach((item, i) => {
        const endTime = new Date(
          "type" in item.data && item.type === "pack"
            ? (item.data as Pack).end_time
            : (item.data as SpecialOffer).end_time
        ).getTime();
        const diff = endTime - now;
        if (diff <= 0) {
          newTimeLeft[i] = "00:00:00";
        } else {
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

  // اندازه کارت
  useEffect(() => {
    if (cardRef.current) {
      const style = getComputedStyle(cardRef.current);
      const width = cardRef.current.offsetWidth + parseInt(style.marginRight);
      setCardWidth(width);
    }
  }, [items]);

  const maxIndex = Math.max(items.length - visibleCards, 0);
  const nextSlide = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setIndex((prev) => Math.max(prev - 1, 0));

  if (!items.length) {
    return (
      <div className="w-full text-center py-10 font-bold">
        موردی برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-6">
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-4"
          animate={{ x: -index * cardWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item, idx) => {
            const timeLeft = timeLeftMap[idx] || "00:00:00";

            if (item.type === "pack") {
              const pack = item.data as Pack;
              return (
                <div
                  ref={idx === 0 ? cardRef : null}
                  key={pack.id}
                  className="w-[300px] h-[400px] bg-white rounded-[20px] flex-shrink-0 flex flex-col p-4 gap-2 shadow-lg"
                >
                  <div className="text-lg font-bold">{pack.title}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {pack.description}
                  </div>
                  <div className="text-xs text-gray-500">تایمر: {timeLeft}</div>
                  <div className="mt-2 flex-1 flex flex-col gap-1 overflow-y-auto">
                    {pack.parts.map((p) => (
                      <div key={p.id} className="flex items-center gap-2">
                        <div className="w-10 h-10 relative">
                          <Image
                            src={p.image_urls?.[0] || "/no-image.svg"}
                            alt={p.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="text-xs line-clamp-1">{p.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-bold text-[#004D7A]">
                    {pack.final_discounted_price.toLocaleString()} تومان
                  </div>
                  <div className="text-xs line-through text-gray-400">
                    {pack.total_original_price.toLocaleString()} تومان
                  </div>
                  <div className="text-xs text-[#FFD700] font-bold">
                    {pack.discount_percent}% تخفیف
                  </div>
                </div>
              );
            } else {
              const offer = item.data as SpecialOffer;
              return (
                <div
                  ref={idx === 0 ? cardRef : null}
                  key={offer.id}
                  className="w-[250px] h-[360px] bg-white rounded-[20px] flex-shrink-0 flex flex-col p-3 gap-2 shadow-lg"
                >
                  <div className="relative w-full h-[150px]">
                    <Image
                      src={offer.image_urls?.[0] || "/no-image.svg"}
                      alt={offer.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="font-bold text-sm text-center line-clamp-2">
                    {offer.name}
                  </p>
                  <p className="text-[#004D7A] font-bold text-lg">
                    {offer.price.toLocaleString()}{" "}
                    <span className="text-xs">تومان</span>
                  </p>
                  <div className="text-xs text-gray-500 mt-auto">
                    خودروها: {offer.cars.map((c) => c.name).join(", ")}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
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
              index >= maxIndex ? "bg-gray-400 cursor-not-allowed" : "bg-white"
            }`}
          >
            <Image src="/Arrow-leftB.svg" alt="" width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
