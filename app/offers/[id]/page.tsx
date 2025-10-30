"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import OfferList from "../../components/OfferList";
import Image from "next/image";

async function getOffers() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await axios.get(`${baseURL}/api/offers`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    return res.data;
  } catch (error: any) {
    console.error("خطا در دریافت داده‌ها:", error.message);
    return [];
  }
}

function formatTime(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };

  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export default function Page() {
  const [offers, setOffers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    async function fetchData() {
      const data = await getOffers();
      setOffers(data);

      if (data.length > 0) {
        // پیدا کردن اولین پیشنهاد فعال
        const activeOffer = data.find((offer: any) => offer.is_active);
        if (activeOffer) {
          const end = new Date(activeOffer.end_time).getTime();

          // آپدیت تایمر هر ثانیه
          const updateTimer = () => {
            const now = Date.now();
            const diff = end - now;
            setTimeLeft(formatTime(diff));
          };

          updateTimer(); // اولین بار فوراً آپدیت کن
          const interval = setInterval(updateTimer, 1000);

          return () => clearInterval(interval);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full  max-w-[1440px] mx-auto px-4 md:px-8">
      <div className="w-full max-w-[1280px] flex flex-col gap-[40px] justify-center items-center px-4">
        {/* breadcrumb */}
        <div className="flex flex-wrap gap-[4px] w-full justify-center">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی
          </div>
          <Image
            src="/Arrow-leftG.svg"
            width={16}
            height={16}
            alt=""
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی کیا
          </div>
          <Image
            src="/Arrow-leftG.svg"
            width={16}
            height={16}
            alt=""
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی سراتو
          </div>
        </div>

        {/* عنوان و تایمر */}
        <div className="w-full sm:w-[377px] flex flex-col gap-[24px] justify-center items-center">
          <div className="w-full text-center text-[24px] sm:text-[32px] text-[#006FB4] font-yekanBold">
            پیشنهاد های شگفت انگیز ما
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-[8px]">
            <div className="flex flex-row gap-[12px] items-center justify-center">
              <div className="text-[#80838D] text-[14px] font-yekanDemiBold">
                فقط
              </div>
              <div className="flex flex-row gap-[8px] " dir="ltr">
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  {timeLeft.h}
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  :
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  {timeLeft.m}
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  :
                </div>
                <div className="text-[24px] sm:text-[28px] text-[#1C2024] font-yekanDemiBold">
                  {timeLeft.s}
                </div>
              </div>
            </div>
            <div className="text-[14px] text-[#80838D] font-yekanDemiBold text-center">
              مونده تا آخر تخفیفات ما
            </div>
          </div>
        </div>

        {/* لیست محصولات */}
        <OfferList offers={offers} />
      </div>
    </div>
  );
}
