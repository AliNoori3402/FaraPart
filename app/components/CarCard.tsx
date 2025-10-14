"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Car {
  id: number;
  name: string;
  car_image_binary: string;
}

interface Brand {
  id: number;
  name: string;
  cars: Car[];
}

const BrandCarsPage: React.FC = () => {
  const params = useParams();
  const brandId = Number(params?.id);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/brand")
      .then((res) => {
        const allBrands: Brand[] = res.data;
        const selectedBrand = allBrands.find((b) => b.id === brandId) || null;
        setBrand(selectedBrand);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در گرفتن برندها:", err);
        setLoading(false);
      });
  }, [brandId]);

  if (loading) {
    return <div className="text-center mt-10">در حال بارگذاری...</div>;
  }

  if (!brand) {
    return <div className="text-center mt-10 text-red-500">برند پیدا نشد.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-[32px] items-center">
        {/* مسیر */}
        <div className="flex flex-row justify-center items-center gap-[4px]">
          <div className="text-[14px] text-[#000000] font-yekanDemiBold">
            لوازم یدکی
          </div>
          <div className="w-[16px] h-[16px]">
            <Image
              width={16}
              height={16}
              src="/Arrow-leftG.svg"
              className="w-full h-full object-contain"
              alt="arrow"
            />
          </div>
          <div className="text-[14px] text-[#000000] font-yekanDemiBold">
            لوازم یدکی {brand.name}
          </div>
        </div>

        {/* عنوان */}
        <div className="flex flex-row flex-wrap gap-[12px] justify-center items-center text-center">
          <div className="text-[28px] text-[#1C2024] font-yekanBold">
            خودروهای
          </div>
          <div className="text-[28px] text-[#FCFCFD] font-yekanBold rounded-full bg-[#005E95] w-auto px-6 h-[60px] flex justify-center items-center">
            {brand.name}
          </div>
        </div>
      </div>

      {/* ماشین‌های برند */}
      <div className="w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[19px] pr-0 mx-auto mb-[40px] px-4 mt-10">
        {brand.cars.map((car) => (
          <Link key={car.id} href={`/CarCategory/${brand.id}/${car.id}`}>
            <div
              className="cursor-pointer relative w-full h-[295px] flex flex-col gap-[50px] 
                border border-[#E0E1E6] rounded-[24px] overflow-hidden 
                hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300"
            >
              {/* عنوان و برند */}
              <div className="mt-[24px] w-full flex flex-row justify-between items-center px-[24px]">
                <div className="text-[20px] text-[#000000] font-yekanDemiBold">
                  {car.name}
                </div>
                <div className="text-[16px] text-[#B9BBC6] font-yekanDemiBold">
                  {brand.name}
                </div>
              </div>

              {/* تصویر */}
              <div className="w-full relative h-[190px] px-[24px]">
                <Image
                  fill
                  src={
                    car.car_image_binary
                      ? `data:image/png;base64,${car.car_image_binary}` // اضافه کردن MIME type
                      : "/car-logo.svg"
                  }
                  alt={car.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BrandCarsPage;
