"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Pack {
  id: number;
  title: string;
  description?: string;
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

/* ---------- کارت پک ---------- */
function PackCard({ pack }: { pack: Pack }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<string | string[]>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = new Date(pack.end_time).getTime() - now;
      setTimeLeft(formatPersianTime(diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [pack.end_time]);

  return (
    <div
      onClick={() => router.push(`/pack/${pack.id}`)}
      className="cursor-pointer bg-white rounded-3xl p-4 shadow hover:shadow-xl transition relative"
    >
      <div className="font-yekanExtraBold text-lg text-[#004D7A] text-center">
        {pack.title}
      </div>

      <Image
        src="/car-blog.svg"
        alt={pack.title}
        width={220}
        height={150}
        className="mx-auto my-4"
      />

      <div className="absolute top-4 left-4 w-12 text-center text-white bg-red-500 rounded-3xl text-sm font-yekanBold">
        {pack.discount_percent}%
      </div>

      <div className="flex justify-between text-xs text-[#004D7A] font-yekanExtraBold mt-3">
        <span>زمان باقیمانده</span>
        <span dir="ltr">{timeLeft}</span>
      </div>
    </div>
  );
}

/* ---------- صفحه لیست پک‌ها ---------- */
export default function PacksPage() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-10 text-center text-[#004D7A] font-yekanExtraBold">
        در حال بارگذاری...
      </div>
    );
  }

  if (!packs.length) {
    return (
      <div className="container mx-auto p-10 text-center text-[#004D7A] font-yekanExtraBold">
        هیچ پکی برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="container  mt-20 sm:mt-30 lg:mt-45  mx-auto p-4">
      <h1 className="text-2xl text-center sm:text-3xl mb-8 text-[#008BDF] font-yekanExtraBold">
        لیست پک‌های تخفیفی
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}
