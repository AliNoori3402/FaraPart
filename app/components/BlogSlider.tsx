"use client";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image: string;
  slug: string;
}

export default function NewsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const cardWidth = 385;
  const gap = 28;
  const scrollAmount = (cardWidth + gap) * 1;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/blog");
        setPosts(res.data);
      } catch (error) {
        console.error("خطا در گرفتن پست‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="md:w-full md:h-auto sm:w-[770px] sm:h-[600px] w-[406px] flex flex-col gap-[35px] px-2.5 sm:px-4">
      {/* تیتر */}
      <div className="text-[20px] text-[#1C2024] font-yekanDemiBold">
        اخبار و مقالات
      </div>

      {/* اسلایدر */}
      <div
        ref={sliderRef}
        className="flex gap-[28px] md:h-[421px] sm:h-[834px] h-[421px] overflow-x-auto scroll-smooth no-scrollbar items-start justify-start"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {loading ? (
          // اسکلتون
          Array(3)
            .fill(null)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 md:w-[385px] sm:w-[365px] w-[365px] flex flex-col gap-[20px] animate-pulse"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="w-full h-[257px] bg-gray-200 rounded-[16px]" />
                <div className="flex flex-col gap-[12px]">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))
        ) : posts.length === 0 ? (
          // پیام خالی بودن دیتا
          <div className="w-full flex items-center justify-center h-[257px] text-gray-500 text-lg font-yekanDemiBold">
            اخباری برای نمایش وجود ندارد
          </div>
        ) : (
          // نمایش پست‌ها
          posts.map((post) => (
            <div
              key={post.id}
              className="flex-shrink-0 md:w-[385px] sm:w-[365px] w-[365px] flex flex-col gap-[20px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="w-full relative h-[257px] rounded-[16px] overflow-hidden">
                <Image
                  fill
                  src={post.image || "/car-blog.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[16px]">
                <div className="text-[20px] text-[#1C2024] font-yekanDemiBold line-clamp-2">
                  {post.title}
                </div>
                <div className="text-[16px] text-[#8B8D98] font-yekanDemiBold line-clamp-3">
                  {post.description}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-[8px] items-center">
                    <Image
                      src="/calender.svg"
                      alt="calendar"
                      className="w-[24px] h-[24px]"
                      width={24}
                      height={24}
                    />
                    <span className="text-[14px] text-[#8B8D98] font-yekanDemiBold">
                      {new Date(post.created_at).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                  <div className="flex gap-[4px] items-center cursor-pointer">
                    <span className="text-[14px] text-[#006FB4] font-yekanDemiBold">
                      بیشتر بخوانید
                    </span>
                    <Image
                      src="/Arrow-leftB.svg"
                      alt="arrow"
                      className="w-[20px] h-[20px]"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* دکمه‌ها فقط وقتی پست وجود دارد */}
      {!loading && posts.length > 0 && (
        <div className="w-[245px] h-[48px] flex gap-[14px] mx-auto">
          <button
            onClick={scrollRight}
            className="w-[48px] h-[48px] rounded-[24px] bg-[#FCFCFD] border border-[#008BDF] flex justify-center items-center"
          >
            <Image
              src="/Arrow-rightB.svg"
              alt="Arrow Left"
              className="w-[24px] h-[24px]"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={scrollLeft}
            className="w-[48px] h-[48px] rounded-[24px] bg-[#004D7A] flex justify-center items-center"
          >
            <Image
              src="/Arrow-leftW.svg"
              alt="Arrow Right"
              className="w-[24px] h-[24px]"
              width={24}
              height={24}
            />
          </button>

          <button className="w-[113px] h-[42px] rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[14px] text-[#FCFCFD] font-yekanRegular">
            مشاهده همه
          </button>
        </div>
      )}
    </div>
  );
}
