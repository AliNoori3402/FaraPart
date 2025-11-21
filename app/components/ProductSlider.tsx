"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  category_image_base64: string;
};

type ProductSliderProps = {
  onCategoryClick: (categoryId: number) => void; // اضافه شد
};

export default function ProductSlider({ onCategoryClick }: ProductSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categorylist");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: any[] = await res.json();

        // استخراج فقط فرزندان از تمام والدها
        const childCategories = data
          .flatMap((cat) => cat.child || []) // همه child ها را یکی می‌کنیم
          .filter((child) => child !== null); // حذف موارد null

        setCategories(childCategories);
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
      const amount = 260;
      containerRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div className="text-[#1C2024] font-yekanRegular mt-2">
          در حال بارگذاری دسته بندی...
        </div>
      </div>
    );

  const defaultImage = "/lent.svg";

  return (
    <div className="relative flex flex-col items-center px-4 gap-4 w-full">
      <motion.div
        ref={containerRef}
        className="w-full flex gap-4 justify-center items-center overflow-x-hidden overflow-y-hidden scroll-smooth hide-scrollbar"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDrag={(e, info) => {
          if (containerRef.current) {
            containerRef.current.scrollLeft -= info.delta.x; // حرکت طبیعی اسکرول
          }
        }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            onClick={() => onCategoryClick(category.id)} // فراخوانی callback والد با category_id
            className="shrink-0 w-[140px] sm:w-[160px] md:w-[172px] h-[177px] rounded-[16px] border border-[#E0E1E6] flex flex-col gap-3 justify-center items-center hover:border-b-[5px] hover:border-b-[#004D7A] transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-[120px] sm:w-[140px] h-[100px]">
              <Image
                width={140}
                height={100}
                src={
                  category.category_image_base64
                    ? `data:image/png;base64,${category.category_image_base64}` // اضافه کردن MIME type
                    : "/car-logo.svg"
                }
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
          <Image
            width={20}
            height={20}
            src="/Arrow-rightW.svg"
            alt="right"
            className="w-5 h-5 object-contain"
          />
        </button>
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FCFCFD] border border-[#008BDF] flex justify-center items-center"
        >
          <Image
            width={20}
            height={20}
            src="/Arrow-leftB.svg"
            alt="left"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </div>
  );
}
