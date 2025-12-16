"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CardBlogs";

export default function CarCardList() {
  const [cardData, setCardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/blog"); // از route.ts خودت استفاده می‌کنیم
        setCardData(res.data || []);
      } catch (error) {
        setCardData([]); // در صورت خطا، آرایه خالی
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-[1287px] px-4 md:px-0 mx-auto">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <div className="text-[#1C2024] font-yekanRegular mt-2">
            در حال بارگذاری ...
          </div>
        </div>
      ) : cardData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-10">
          موردی وجود ندارد
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[66px]">
          {cardData.map((card, index) => (
            <CarCard
              logo_binary={card.images_binary[0].content}
              id={card.id}
              key={index}
              title={card.title}
              description={card.description}
              date={card.publish}
            />
          ))}
        </div>
      )}
    </div>
  );
}
