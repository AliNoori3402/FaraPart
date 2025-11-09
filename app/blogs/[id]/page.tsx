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
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div className="text-[#1C2024] font-yekanRegular mt-2">
          در حال بارگذاری ...
        </div>
      </div>
    );
  }

  if (!data) {
    return <p className="text-center text-lg py-10">خبر مورد نظر یافت نشد.</p>;
  }

  return (
    <div className="w-full bg-[#fcfcfc] max-w-[1440px] mx-auto px-4 md:px-[40px] lg:px-0">
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

        <div className="flex flex-col  lg:flex-row gap-[40px] lg:gap-[65px] w-full">
          <div className="  relative w-[242px] sm:w-[642px]   mx-auto xl:mx-0 h-50 xl:h-auto">
            <Image
              fill
              src={
                data.images_binary[0].content
                  ? `data:image/png;base64,${data.images_binary[0].content}` // اضافه کردن MIME type
                  : "/car-logo.svg"
              }
              alt={data.title}
              className="w-full h-full  object-contain"
            />
          </div>

          <div className="w-full lg:w-[591px]   flex flex-col gap-[40px]">
            <h1 className="text-[24px] text-center md:text-[28px] text-[#1C2024] font-yekanBold leading-[1.4]">
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
                  {new Date(data.publish).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>

            <p className="text-[14px] text-center text-[#1C2024] font-yekanRegular leading-[2]">
              {data.excerpt || "بدون توضیح"}
            </p>
          </div>
        </div>

        <div className="w-full flex text-center flex-col gap-[40px]">
          <p className="text-[14px] text-[#1C2024] font-yekanRegular leading-[2]">
            {data.body || "محتوای کامل خبر در دسترس نیست."}
          </p>
        </div>
      </div>
    </div>
  );
}
