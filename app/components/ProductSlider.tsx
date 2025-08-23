"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type ItemType = {
  title: string;
  image: string;
};

export default function ProductSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categorylist");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const amount = 220;
      containerRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  // تصویر پیش‌فرض برای همه دسته‌ها (می‌تونی اختصاصی کنی)
  const defaultImage = "/lent.svg";

  return (
    <div className="relative flex flex-col items-center gap-4 w-full">
      <div className="hidden lg:block pointer-events-none absolute top-0 right-0 h-[180px] w-[80px] z-10 bg-gradient-to-l from-white to-transparent" />
      <div className="hidden lg:block pointer-events-none absolute top-0 left-0 h-[180px] w-[80px] z-10 bg-gradient-to-r from-white to-transparent" />

      <motion.div
        ref={containerRef}
        className="w-full flex gap-4 justify-center items-center overflow-x-hidden overflow-y-hidden scroll-smooth hide-scrollbar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="shrink-0 w-[140px] sm:w-[160px] md:w-[172px] h-[177px] rounded-[16px] border border-[#E0E1E6] flex flex-col gap-3 justify-center items-center hover:border-b-[5px] hover:border-b-[#004D7A] transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-[120px] sm:w-[140px] h-[100px]">
              <img
                src={defaultImage}
                alt={category.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-[14px] md:text-[16px] text-[#000000] font-yekanDemiBold">
              {category.name}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-row gap-3 mt-2 lg:mt-4">
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#004D7A] flex justify-center items-center"
        >
          <img
            src="/Arrow-rightW.svg"
            alt="right"
            className="w-5 h-5 object-contain"
          />
        </button>
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FCFCFD] border border-[#008BDF] flex justify-center items-center"
        >
          <img
            src="/Arrow-leftB.svg"
            alt="left"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </div>
  );
}
