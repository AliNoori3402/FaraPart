"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Section {
  section_name: string;
  image_base64?: string | null;
}

export default function CarSectionsPage() {
  const { id } = useParams();

  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [partsData, setPartsData] = useState<Record<string, string[]> | null>(
    null
  );
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // گرفتن دسته‌بندی‌ها برای خودرو
  useEffect(() => {
    if (!id) return;
    const fetchSections = async () => {
      try {
        const res = await fetch(
          `/api/investigate/category/${decodeURIComponent(String(id))}`
        );
        const data = await res.json();
        setSections(data.results || []);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, [id]);

  // گرفتن لیست قطعات
  useEffect(() => {
    if (!selectedSection) return;
    const fetchParts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://130.185.74.137:8000/api/products/parts-by-section/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sections: [selectedSection.section_name.trim()],
            }),
          }
        );

        const data = await res.json();
        setPartsData(data || {});
        const initialCounts: Record<string, number> = {};
        Object.keys(data).forEach((key) => (initialCounts[key] = 4));
        setVisibleCounts(initialCounts);
      } catch (error) {
        console.error("Error fetching parts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchParts();
  }, [selectedSection]);

  const handleShowMore = (key: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [key]: (prev[key] || 4) + 4,
    }));
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-[40px] py-[20px]">
      {/* عنوان صفحه */}
      <h1 className="text-center text-[22px] md:text-[26px] font-yekanDemiBold text-[#004D7A] mb-[30px]">
        بررسی قطعات خودرو {decodeURIComponent(String(id))}
      </h1>

      {/* اسلایدر دسته‌بندی‌ها */}
      <div className="flex gap-4 bg-[#005E95]  rounded-3xl overflow-x-auto scrollbar-hide p-6">
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={() => setSelectedSection(section)}
            className={`flex flex-col justify-center items-center min-w-[120px] h-[130px] rounded-[20px] cursor-pointer border transition-all duration-300 hover:shadow-lg ${
              selectedSection?.section_name === section.section_name
                ? "bg-[#FE7D11] border-[#FE7D11] text-white"
                : "bg-white border-gray-200 text-[#004D7A] hover:bg-[#F6F6F6]"
            }`}
          >
            <div className="w-[50px] h-[50px] mb-2 flex items-center justify-center">
              <Image
                src={
                  section.image_base64
                    ? `data:image/png;base64,${section.image_base64}`
                    : "/car-logo.svg"
                }
                alt={section.section_name}
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="text-[14px] font-yekanDemiBold text-center leading-tight px-2">
              {section.section_name}
            </div>
          </div>
        ))}
      </div>

      {/* تصویر دسته انتخاب‌شده */}
      {selectedSection && (
        <div className="flex justify-center mt-[32px]">
          <div className="relative bg-gradient-to-b from-[#E7F3FF] to-white rounded-[24px] p-6 shadow-inner border">
            <Image
              src={
                selectedSection.image_base64
                  ? `data:image/png;base64,${selectedSection.image_base64}`
                  : "/car-logo.svg"
              }
              alt={selectedSection.section_name}
              width={200}
              height={200}
              className="rounded-[16px] object-contain mx-auto"
            />
            <h2 className="text-center text-[#004D7A] font-yekanDemiBold mt-3 text-[18px]">
              {selectedSection.section_name}
            </h2>
          </div>
        </div>
      )}

      {/* نمایش نتایج */}
      <div className="mt-[40px]">
        {!selectedSection && (
          <div className="text-center text-gray-500 text-[15px]">
            لطفاً یک دسته‌بندی را انتخاب کنید
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <div className="text-[#1C2024] font-yekanRegular mt-2">
              در حال بارگذاری ...
            </div>
          </div>
        )}

        {!loading && partsData && Object.keys(partsData).length > 0 && (
          <div className="space-y-8">
            {Object.entries(partsData).map(([key, items]) => {
              const visible = visibleCounts[key] || 4;
              const hasMore = items.length > visible;

              return (
                <div
                  key={key}
                  className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-[18px] font-yekanDemiBold text-[#004D7A] border-b border-gray-100 pb-2 mb-3">
                    {key}
                  </div>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 text-[14px] text-[#1C2024]">
                    {items.slice(0, visible).map((item, i) => (
                      <li
                        key={i}
                        onClick={() =>
                          router.push(
                            `/investigate/${decodeURIComponent(
                              String(id)
                            )}/${item}`
                          )
                        }
                        className="border border-gray-100 hover:border-[#FE7D11] hover:text-[#FE7D11] transition-all duration-200 rounded-[8px] px-3 py-2 bg-gray-50 hover:bg-orange-50"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {hasMore && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => handleShowMore(key)}
                        className="text-[#FE7D11] font-yekanDemiBold hover:underline hover:scale-105 transition-transform"
                      >
                        مشاهده بیشتر
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && selectedSection && !partsData && (
          <div className="text-center text-gray-500 mt-4">
            هیچ داده‌ای یافت نشد
          </div>
        )}
      </div>
    </div>
  );
}
