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
  const [timeLeft, setTimeLeft] = useState<Record<number, string>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const [tw, setTw] = useState(0);

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

  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now();
      const map: Record<number, string> = {};
      packs.forEach((p, i) => {
        map[i] = formatPersianTime(new Date(p.end_time).getTime() - now);
      });
      setTimeLeft(map);
    }, 1000);
    return () => clearInterval(t);
  }, [packs]);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setCw(containerRef.current.offsetWidth);
      if (trackRef.current) setTw(trackRef.current.scrollWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [packs]);

  if (!packs.length) return null;

  return (
    <section
      ref={containerRef}
      className="container mx-auto py-12 rounded-3xl bg-[#004D7A]"
    >
      <h2 className="text-white text-2xl text-center font-yekanExtraBold mb-6">
        پک‌های تخفیفی
      </h2>

      <div className="relative overflow-hidden px-4">
        <motion.div
          ref={trackRef}
          className="flex gap-6"
          animate={{ x: -index * cw * 0.6 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          {packs.map((p, i) => (
            <div
              key={p.id}
              onClick={() => router.push(`/pack/${p.id}`)}
              className="cursor-pointer min-w-[260px] bg-white rounded-3xl p-5 shadow-xl"
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

              <div className="text-xs text-center text-gray-500">
                زمان باقیمانده: {timeLeft[i]}
              </div>

              <div className="text-center text-yellow-500 font-bold mt-2">
                {p.discount_percent}% تخفیف
              </div>
            </div>
          ))}
        </motion.div>

        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow"
        >
          ‹
        </button>

        <button
          onClick={() => setIndex((i) => Math.min(i + 1, packs.length - 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow"
        >
          ›
        </button>
      </div>
    </section>
  );
}
