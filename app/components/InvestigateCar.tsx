"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Car {
  car_name_fa: string;
  car_name_en: string;
  brand_name_fa: string;
  car_image_base64: string | null;
}

interface Props {
  brand: string | null;
  id: string; // لیست دسته‌بندی / برند
}

const InvestigateCar: React.FC<Props> = ({ brand, id }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!brand) return;

    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/investigate/cars?brand=${brand}`);

        const data = await res.json();

        setCars(data.results);
        console.log(data);
      } catch (error) {
        console.error("خطا در گرفتن لیست ماشین‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [brand]);

  if (!brand) {
    return (
      <div className="text-center text-gray-500">لطفاً یک برند انتخاب کنید</div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[19px] mx-auto mb-[40px] px-4">
      {cars.map((car, index) => (
        <div
          key={index}
          onClick={() =>
            router.push(`/investigate/${encodeURIComponent(car.car_name_fa)}`)
          }
          className="relative w-full h-[295px] flex flex-col gap-[50px] 
            border border-[#E0E1E6] rounded-[24px] overflow-hidden 
            hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col gap-[8px]">
            <div className="mt-[24px] w-full flex flex-row justify-between items-center px-[24px]">
              <div className="text-[20px] text-[#000000] font-yekanDemiBold">
                {car.car_name_fa}
              </div>
              <div className="text-[16px] text-[#B9BBC6] font-yekanDemiBold">
                {car.brand_name_fa}
              </div>
            </div>
            <div className="text-[14px] text-[#8B8D98] font-yekanDemiBold pr-[24px]">
              لنت، اگزوز ، ...
            </div>
          </div>

          <div className="w-full h-[190px] px-[24px] flex items-center justify-center">
            {car.car_image_base64 ? (
              <img
                src={`data:image/png;base64,${car.car_image_base64}`}
                alt={car.car_name_fa}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={
                  car.car_image_base64
                    ? `data:image/png;base64,${car.car_image_base64}` // اضافه کردن MIME type
                    : "/car-logo.svg"
                }
                alt={car.car_name_fa}
                className="w-[120px] h-[120px] object-contain opacity-70"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestigateCar;
