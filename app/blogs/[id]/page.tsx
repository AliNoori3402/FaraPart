"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/blog/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg py-10">در حال بارگذاری...</p>;
  }

  if (!data) {
    return <p className="text-center text-lg py-10">خبر مورد نظر یافت نشد.</p>;
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[40px] lg:px-0">
      <div className="w-full max-w-[1280px] flex flex-col gap-[48px] justify-center items-center mx-auto">
        <div className="w-full flex flex-wrap gap-[4px] justify-center items-center">
          <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            اخبار و مقالات
          </span>
          <Image
            width={16}
            height={16}
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px] object-contain"
          />
          <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {data.title}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[65px] w-full">
          <div className=" relative w-full lg:w-[642px] h-auto">
            <Image
              fill
              src={data.image || "/car-blog.svg"}
              alt={data.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-full lg:w-[591px] flex flex-col gap-[40px]">
            <h1 className="text-[24px] md:text-[28px] text-[#1C2024] font-yekanBold leading-[1.4]">
              {data.title}
            </h1>

            <div className="flex flex-col gap-[12px]">
              <span className="text-[14px] text-[#8B8D98] font-yekanDemiBold">
                تاریخ
              </span>
              <div className="flex flex-row gap-[12px] items-center">
                <div className="w-[48px] h-[48px] rounded-full bg-[#E8E8EC] flex items-center justify-center">
                  <Image
                    width={28}
                    height={28}
                    src="/calender.svg"
                    alt="calendar"
                    className="w-[28px] h-[28px] object-contain"
                  />
                </div>
                <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
                  {data.date || "بدون تاریخ"}
                </span>
              </div>
            </div>

            <p className="text-[14px] text-[#1C2024] font-yekanRegular leading-[2]">
              {data.short_description || "بدون توضیح"}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[40px]">
          <p className="text-[14px] text-[#1C2024] font-yekanRegular leading-[2]">
            {data.content || "محتوای کامل خبر در دسترس نیست."}
          </p>
        </div>
      </div>
    </div>
  );
}
