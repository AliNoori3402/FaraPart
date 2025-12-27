"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string[];
}

interface Offer {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  parts: { id: number }[];
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

  return `${d} : ${h} : ${m} : ${s} `;
};

export default function OfferSlider() {
  const router = useRouter();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const [timeLeft, setTimeLeft] = useState("");

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------- دریافت پیشنهاد فعال ---------- */
  useEffect(() => {
    axios.get("/api/offers").then((res) => {
      const now = Date.now();
      const data: Offer[] = res.data || [];

      const activeOffer = data.find(
        (o) =>
          o.is_active &&
          new Date(o.start_time).getTime() <= now &&
          now <= new Date(o.end_time).getTime() &&
          o.parts.length > 0
      );

      if (activeOffer) {
        setOffer(activeOffer);
      }
    });
  }, []);

  /* ---------- دریافت جزئیات محصولات ---------- */
  useEffect(() => {
    if (!offer) return;

    Promise.all(
      offer.parts.map((p) =>
        fetch(`/api/AllProduct/${p.id}`).then((res) => res.json())
      )
    ).then((data: Product[]) => {
      setProducts(data);
    });
  }, [offer]);

  /* ---------- تایمر ---------- */
  useEffect(() => {
    if (!offer) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = new Date(offer.end_time).getTime() - now;
      setTimeLeft(formatPersianTime(diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [offer]);

  if (!offer || !products.length) return null;
  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto p-3">
      <h2 className="text-xl sm:text-2xl mb-6 text-[#008BDF] font-yekanExtraBold">
        پیشنهاد ویژه
      </h2>

      <section ref={containerRef} className="rounded-3xl  p-3 bg-[#004D7A]">
        {/* تایمر بیرون کارت */}
        <div
          className="text-center sm:text-left text-white font-yekanExtraBold mb-6"
          dir="ltr"
        >
          {timeLeft} :زمان باقیمانده
        </div>

        <div className="relative overflow-hidden px-4">
          <motion.div
            ref={trackRef}
            className="flex gap-6 overflow-x-hidden cursor-grab hide-scrollbar"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDrag={(e, info) => {
              if (trackRef.current) {
                trackRef.current.scrollLeft -= info.delta.x;
              }
            }}
          >
            {/* هر محصول = یک کارت */}
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[260px] bg-white rounded-3xl p-2 shadow-xl flex flex-col"
              >
                <Image
                  src={product.image_url?.[0] || "/placeholder.png"}
                  alt={product.name}
                  width={220}
                  height={160}
                  className="mx-auto object-contain"
                />

                <div className="mt-4 text-black font-yekanDemiBold text-sm line-clamp-2">
                  {product.name}
                </div>
                <div className="flex flex-row gap-[4px] items-center">
                  <p className="text-[16px] text-[#B9BBC6] font-yekanDemiBold line-through">
                    {(product.price * 1.1).toLocaleString()}
                  </p>
                  <div className="flex flex-row gap-[4px] items-center">
                    <div className="text-[20px] text-[#004D7A] font-yekanDemiBold">
                      {product.price.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-[#004D7A] font-yekanDemiBold">
                      تومان
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="mt-auto cursor-pointer  flex items-center  text-right text-[#008BDF] rounded-xl py-2 text-sm font-yekanExtraBold"
                >
                  مشاهده جزئیات و خرید
                  <Image src="/Arrow-leftB.svg" alt="" width={16} height={16} />
                </button>
              </div>
            ))}
          </motion.div>

          {/* دکمه‌ها */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center"
          >
            <Image src="/Arrow-leftB.svg" alt="" width={16} height={16} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center"
          >
            <Image src="/Arrow-rightB.svg" alt="" width={16} height={16} />
          </button>
        </div>
        <div className="flex justify-center sm:justify-end">
          <Link
            href={`/offers/${offer.id}`}
            className="w-[138px]  cursor-pointer h-[38px] bg-gradient-to-r  from-[#008BDF] to-[#006FB4] flex justify-center items-center text-[#fff] font-yekanDemiBold rounded-xl mt-4 lg:mt-0"
          >
            مشاهده همه
          </Link>
        </div>
      </section>
    </div>
  );
}
