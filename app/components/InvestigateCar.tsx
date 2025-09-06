"use client";

import React, { useEffect, useState } from "react";

interface Car {
  car_name_fa: string;
  car_name_en: string;
  brand_name_fa: string;
  brand_logo_base64: string | null;
}

interface Props {
  brand: string | null;
}

const InvestigateCar: React.FC<Props> = ({ brand }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!brand) return;

    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/investigate/cars?brand=${brand}`);
        const data = await res.json();
        setCars(data);
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

  if (loading) {
    return <div className="text-center py-10">در حال بارگذاری...</div>;
  }

  return (
    <div className="w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[19px] mx-auto mb-[40px] px-4">
      {cars.map((car, index) => (
        <div
          key={index}
          className="relative w-full h-[295px] flex flex-col gap-[50px] 
            border border-[#E0E1E6] rounded-[24px] overflow-hidden 
            hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300"
        >
          {/* عنوان */}
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

          {/* لوگو */}
          <div className="w-full h-[190px] px-[24px] flex items-center justify-center">
            {car.brand_logo_base64 ? (
              <img
                src={`data:image/png;base64,${car.brand_logo_base64}`}
                alt={car.car_name_fa}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src="/category.svg"
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
