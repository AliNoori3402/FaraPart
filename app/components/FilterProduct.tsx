"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Car = {
  id: number;
  code: string;
  name: string;
};

type Brand = {
  id: number;
  name: string;
  display_name: string;
  cars: Car[];
};

type ProductType = "spare" | "consumable";

export default function FilterProduct() {
  const router = useRouter();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [productTypes] = useState<ProductType[]>(["spare", "consumable"]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStock, setSelectedStock] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("/api/brand");

        // ✅ داده واقعی داخل results قرار دارد
        const brandList: Brand[] = res.data.results || [];

        setBrands(brandList);

        // استخراج تمام مدل‌ها از همه برندها
        const allCars = brandList.flatMap((b) => b.cars || []);
        setCars(allCars);
      } catch (err) {
        console.error("خطا در دریافت برندها:", err);
      }
    };

    fetchBrands();
  }, []);

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (selectedBrand) params.append("brand", selectedBrand);
    if (selectedCar) params.append("car", selectedCar);
    if (selectedType) params.append("type", selectedType);
    if (selectedStock) params.append("stock", selectedStock);

    router.push(`/product?${params.toString()}`);
  };

  return (
    <div
      className="
        md:w-[1280px] md:h-[232px]
        sm:w-[770px] sm:h-[316px]
        w-[377px] h-[484px]
        flex flex-col justify-center items-center gap-[32px]
        border border-[#E0E1E6] bg-[#F9F9FB] rounded-[32px]
        p-4
      "
    >
      <div className="text-[20px] md:text-[24px] text-[#000000] font-yekanDemiBold text-center">
        فیلتر محصولات ما
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="w-full flex flex-wrap justify-center gap-[20px]">
          <FilterBox
            icon="/car.svg"
            title="برند خودرو"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            options={brands.map((b) => b.display_name)}
          />

          <FilterBox
            icon="/car.svg"
            title="مدل خودرو"
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            options={cars.map((c) => c.name)}
          />

          <FilterBox
            icon="/product.svg"
            title="نوع کالا"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={productTypes.map((t) =>
              t === "spare" ? "قطعات یدکی" : "مصرفی"
            )}
          />
        </div>

        {/* دکمه فیلتر */}
        <button
          onClick={handleFilter}
          className="w-[138px] h-[48px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[#fff] font-yekanDemiBold rounded-[16px] mt-4 lg:mt-0"
        >
          نتیجه فیلتر
        </button>
      </div>
    </div>
  );
}

function FilterBox({
  icon,
  title,
  value,
  onChange,
  options,
}: {
  icon: string;
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div className="w-[238px] h-[76px] flex flex-col gap-[8px]">
      <div className="flex flex-row gap-[8px] pr-[5px] items-center">
        <Image width={20} height={20} src={icon} alt={title} />
        <div className="text-[14px] text-[#000000] font-yekanDemiBold">
          {title}
        </div>
      </div>

      <div className="relative w-full h-[48px]">
        <select
          value={value}
          onChange={onChange}
          className="
            appearance-none w-full h-full bg-[#E8E8EC]
            rounded-[20px] text-[14px] text-[#1C2024]
            font-yekanDemiBold px-4 pr-6
            focus:outline-none cursor-pointer
          "
        >
          <option value="">انتخاب کنید</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Image width={16} height={16} src="/Arrow-downG.svg" alt="dropdown" />
        </div>
      </div>
    </div>
  );
}
