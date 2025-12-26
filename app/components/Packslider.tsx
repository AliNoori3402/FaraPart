"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Pack {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  discount_percent: number;
}

/* ---------- فرمت زمان ---------- */
const formatPersianTime = (diff: number) => {
  if (diff <= 0) return "پایان یافته";

  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff - m * 60000) / 1000);

  return [d && `${d} :`, `${h} :`, `${m} :`, `${s}`].filter(Boolean);
};

/* ---------- تایمر اختصاصی هر کارت ---------- */
function PackTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState<string | string[]>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = new Date(endTime).getTime() - now;
      setTimeLeft(formatPersianTime(diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="flex justify-between items-center mt-2">
      <span className="text-xs text-[#004D7A] font-yekanExtraBold">
        زمان باقیمانده
      </span>
      <span className="text-xs text-[#004D7A] font-yekanExtraBold" dir="ltr">
        {timeLeft}
      </span>
    </div>
  );
}

/* ---------- اسلایدر پک‌ها ---------- */
export default function PackSlider() {
  const router = useRouter();
  const [packs, setPacks] = useState<Pack[]>([]);
  const [index, setIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  /* ---------- گرفتن پک‌ها ---------- */
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

  /* ---------- محاسبه عرض‌ها ---------- */
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

  const nextSlide = () => setIndex((i) => Math.min(i + 1, packs.length));
  const prevSlide = () => setIndex((i) => Math.max(i - 1, 0));

  if (!packs.length) return null;

  return (
    <div className="container mx-auto p-3">
      <h2 className="text-xl sm:text-2xl mb-6 text-[#008BDF] font-yekanExtraBold">
        پک‌های تخفیفی
      </h2>

      <section ref={containerRef} className="rounded-3xl  p-3 bg-[#004D7A]">
        <div className="relative overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-6 cursor-grab"
            animate={{ x: index * cw * 0.9 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            drag="x"
            dragConstraints={{ left: -maxTranslate, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) prevSlide();
              if (info.offset.x < -100) nextSlide();
            }}
          >
            {/* کارت‌های پک */}
            {packs.map((p) => (
              <div
                key={p.id}
                onClick={() => router.push(`/pack/${p.id}`)}
                className="cursor-pointer relative min-w-[260px] bg-white rounded-3xl p-3 shadow-xl"
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

                <div className="absolute top-10 left-5 w-10 text-center text-white bg-red-500 rounded-3xl">
                  {p.discount_percent}%
                </div>

                <PackTimer endTime={p.end_time} />
              </div>
            ))}

            {/* کارت مشاهده همه */}
          </motion.div>

          {/* دکمه‌ها */}
          <button
            onClick={prevSlide}
            disabled={index === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center"
          >
            <Image src="/Arrow-leftB.svg" alt="" width={16} height={16} />
          </button>

          <button
            onClick={nextSlide}
            disabled={index >= packs.length}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center"
          >
            <Image src="/Arrow-rightB.svg" alt="" width={16} height={16} />
          </button>
        </div>
        <div className="flex justify-center sm:justify-end">
          <Link
            href={"/pack-list"}
            className="w-[138px]  cursor-pointer h-[38px] bg-gradient-to-r  from-[#008BDF] to-[#006FB4] flex justify-center items-center text-[#fff] font-yekanDemiBold rounded-xl mt-4 lg:mt-0"
          >
            مشاهده همه
          </Link>
        </div>
      </section>
    </div>
  );
}
