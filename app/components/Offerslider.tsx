"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Offer {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  parts: { id: number; name: string }[];
}

const formatPersianTime = (diff: number) => {
  if (diff <= 0) return "پایان یافته";
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff - m * 60000) / 1000);
  return `${h} ساعت و ${m} دقیقه و ${s} ثانیه`;
};

export default function OfferSlider() {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<Record<number, string>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const [tw, setTw] = useState(0);

  useEffect(() => {
    axios.get("/api/special-offers").then((res) => {
      const now = Date.now();
      const data = res.data.results || res.data || [];
      const active = data.filter(
        (o: Offer) =>
          o.is_active &&
          new Date(o.start_time).getTime() <= now &&
          now <= new Date(o.end_time).getTime()
      );
      setOffers(active);
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now();
      const map: Record<number, string> = {};
      offers.forEach((o, i) => {
        map[i] = formatPersianTime(new Date(o.end_time).getTime() - now);
      });
      setTimeLeft(map);
    }, 1000);
    return () => clearInterval(t);
  }, [offers]);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setCw(containerRef.current.offsetWidth);
      if (trackRef.current) setTw(trackRef.current.scrollWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [offers]);

  if (!offers.length) return null;

  return (
    <section
      ref={containerRef}
      className="container mx-auto py-12 rounded-3xl bg-[#0A3D62]"
    >
      <h2 className="text-white text-2xl text-center font-yekanExtraBold mb-6">
        پیشنهادهای ویژه
      </h2>

      <div className="relative overflow-hidden px-4">
        <motion.div
          ref={trackRef}
          className="flex gap-6"
          animate={{ x: -index * cw * 0.6 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          {offers.flatMap((o, i) =>
            o.parts.map((p) => (
              <div
                key={`${o.id}-${p.id}`}
                onClick={() => router.push(`/offers/${o.id}`)}
                className="cursor-pointer min-w-[260px] bg-white rounded-3xl p-5 shadow-xl"
              >
                <div className="font-yekanExtraBold text-center text-[#004D7A]">
                  {o.title}
                </div>

                <Image
                  src="/car-blog.svg"
                  alt={p.name}
                  width={220}
                  height={150}
                  className="mx-auto my-4"
                />

                <div className="text-xs text-center text-gray-500">
                  زمان باقیمانده: {timeLeft[i]}
                </div>
              </div>
            ))
          )}
        </motion.div>

        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow"
        >
          ‹
        </button>

        <button
          onClick={() => setIndex((i) => Math.min(i + 1, offers.length - 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow"
        >
          ›
        </button>
      </div>
    </section>
  );
}
