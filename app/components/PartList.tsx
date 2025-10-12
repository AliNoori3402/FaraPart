"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

type Section = string;

const PartsList = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const car_name = params.id ? decodeURIComponent(params.id) : "";

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!car_name) return;

    const fetchSections = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/investigate/category/${encodeURIComponent(car_name)}`
        );
        setSections(res.data.sections);
      } catch (error) {
        console.error("خطا در دریافت سکشن‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [car_name]);

  const goToDetail = (section: string) => {
    const sectionName = encodeURIComponent(section);
    const carName = encodeURIComponent(car_name);
    router.push(`/investigate/${carName}/${sectionName}`);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500">در حال دریافت داده...</div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="text-center text-gray-500">هیچ دسته‌بندی‌ای پیدا نشد</div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[19px]">
      {sections.map((section, index) => (
        <div
          key={index}
          onClick={() => goToDetail(section)}
          className="h-[295px] flex flex-col justify-center items-center border border-[#E0E1E6] rounded-[24px] hover:border-b-[4px] hover:border-b-[#005E95] cursor-pointer transition-all duration-300"
        >
          <div className="w-[200px] h-[26px] text-[20px] text-[#1C2024] font-yekanDemiBold text-center">
            {section}
          </div>
          <div className="w-[275px] h-[183px]">
            <Image
              width={275}
              height={183}
              src="/lent.svg"
              className="w-full h-full object-contain"
              alt={section}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartsList;
