"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Pack {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  discount_percent: number;
}

const formatPersianTime = (diff: number) => {
  if (diff <= 0) return "پایان یافته";
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff - m * 60000) / 1000);
  return [d && `${d} روز`, `${h} ساعت`, `${m} دقیقه`, `${s} ثانیه`]
    .filter(Boolean)
    .join(" و ");
};

export default function PackSlider() {
  const router = useRouter();
  const [packs, setPacks] = useState<Pack[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(""); // تایمر کلی
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  // گرفتن پک‌ها
  useEffect(() => {
    axios.get("/api/pack").then((res) => {
      const now = Date.now();
      const active = (res.data || []).filter(
        (p: Pack) =>
          p.is_active &&
          new Date(p.start_time).getTime() <= now &&
          now <= new Date(p.end_time).getTime()
      );
      setPacks(active);
    });
  }, []);

  // تایمر کلی (بر اساس اولین پک)
  useEffect(() => {
    if (!packs.length) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const firstPackEnd = new Date(packs[0].end_time).getTime();
      const diff = firstPackEnd - now;
      setTimeLeft(formatPersianTime(diff));
    }, 1000);
    return () => clearInterval(interval);
  }, [packs]);

  // محاسبه عرض کانتینر و track
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setCw(containerRef.current.offsetWidth);
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [packs]);

  const maxTranslate = Math.max(trackWidth - cw, 0);
  const nextSlide = () => setIndex((i) => Math.min(i + 1, packs.length - 1));
  const prevSlide = () => setIndex((i) => Math.max(i - 1, 0));

  if (!packs.length) return null;

  return (
    <div className="container mx-auto p-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-[#008BDF] font-yekanExtraBold">
          پک‌های تخفیفی
        </h2>
        {/* تایمر کلی */}
        <div className="text-whi px-4 py-2 rounded-xl  font-yekanExtraBold ">
          {timeLeft}
        </div>
      </div>

      <section ref={containerRef} className="rounded-3xl p-3 bg-[#004D7A]">
        <div className="relative overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex  gap-6 cursor-grab"
            animate={{ x: -index * cw * 0.6 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            drag="x"
            dragConstraints={{ left: -maxTranslate, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) prevSlide();
              if (info.offset.x < -100) nextSlide();
            }}
          >
            {packs.map((p) => (
              <div
                key={p.id}
                onClick={() => router.push(`/pack/${p.id}`)}
                className="cursor-pointer relative min-w-[260px] bg-white rounded-3xl p-2 shadow-xl"
              >
                <div className="font-yekanExtraBold text-center text-[#004D7A]">
                  {p.title}
                </div>

                <Image
                  src="/car-blog.svg"
                  alt={p.title}
                  width={220}
                  height={150}
                  className="mx-auto my-4"
                />

                <div className="text-center w-10  font-yekanRegular rounded-3xl absolute top-10 left-5   text-white bg-red-500  mt-2">
                  {p.discount_percent}%
                </div>
              </div>
            ))}
          </motion.div>

          {/* کنترل‌ها */}
          <button
            onClick={prevSlide}
            disabled={index === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex justify-center items-center bg-white w-10 h-10 rounded-full shadow"
          >
            <Image src="/Arrow-leftB.svg" alt="" width={16} height={16} />
          </button>

          <button
            onClick={nextSlide}
            disabled={index >= packs.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center bg-white w-10 h-10 rounded-full shadow"
          >
            <Image src="/Arrow-rightB.svg" alt="" width={16} height={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
