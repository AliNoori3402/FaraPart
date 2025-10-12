"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface ApiResponse {
  results: any[];
  next: string | null;
  previous: string | null;
  count: number;
}

const Page = () => {
  const params = useParams<{ id: string; subid: string }>();
  const car_name = params.id ? decodeURIComponent(params.id) : "";
  const section_name = params.subid ? decodeURIComponent(params.subid) : "";

  const [data, setData] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const page_size = 3;
  const API_BASE = "https://isaco.liara.run/api/products/carlog-pics/";

  const fetchData = async (pageNumber: number) => {
    if (!car_name || !section_name) return;
    try {
      setLoading(true);
      setError(null);

      const url = `${API_BASE}?car_name=${encodeURIComponent(
        car_name
      )}&section_name=${encodeURIComponent(
        section_name
      )}&page_size=${page_size}&pagenumber=${pageNumber}`;

      const res = await fetch(url);
      const json: ApiResponse = await res.json();

      setData(json.results || []);
      setNextPage(json.next);
      setPrevPage(json.previous);
      setCurrentPage(pageNumber);
    } catch (err) {
      console.error("خطا در دریافت داده‌ها:", err);
      setError("خطا در دریافت داده‌ها از سرور.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [car_name, section_name]);

  return (
    <div className="w-full max-w-[1440px] flex flex-col gap-12 mx-auto px-4 pb-16">
      {/* عنوان صفحه */}
      <div className="text-[28px] text-[#1C2024] font-yekanBold text-center mt-8">
        قطعات {section_name} {car_name}
      </div>

      {/* وضعیت بارگذاری / خطا */}
      {loading && (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && data.length === 0 && (
        <p className="text-center text-gray-500">داده‌ای یافت نشد.</p>
      )}

      {/* لیست کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          !error &&
          data.map((item: any, index: number) => (
            <div
              key={item.id || index}
              className="bg-white rounded-2xl shadow-md border border-[#E8E8EC] p-4 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* تصویر */}
              {item.category_image_base64 ? (
                <Image
                  src={`data:image/png;base64,${item.category_image_base64}`}
                  alt={item.part_name || "تصویر قطعه"}
                  width={400}
                  height={250}
                  className="rounded-xl object-cover w-full h-[200px] md:h-[250px]"
                />
              ) : null}

              {/* جزئیات */}
              <div className="flex flex-col gap-2">
                {[
                  { key: "car_name_fa", label: "خودرو" },
                  { key: "brand_name_fa", label: "برند" },
                  { key: "section_name", label: "بخش" },
                  { key: "part_category", label: "دسته قطعه" },
                  { key: "part_name", label: "نام قطعه" },
                  { key: "part_code", label: "کد قطعه" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className="text-[#1C2024] font-yekanDemiBold text-base">
                      {item[key]?.toString() || "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* ناوبری صفحات */}
      <div className="flex justify-center gap-4 mt-6 items-center">
        {prevPage && (
          <button
            onClick={() => prevPage && fetchData(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
          >
            صفحه قبل
          </button>
        )}

        <span className="text-[#1C2024] font-yekanDemiBold">
          صفحه {currentPage}
        </span>

        {nextPage && (
          <button
            onClick={() => nextPage && fetchData(currentPage + 1)}
            className="px-4 py-2 bg-[#006FB4] text-white rounded-lg text-sm hover:bg-[#005a94]"
          >
            صفحه بعد
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
