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

type ProductType = "175" | "2";

export default function FilterProduct() {
  const router = useRouter();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [productTypes] = useState<ProductType[]>(["175", "2"]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("/api/brand");
        const brandList: Brand[] = res.data.results || [];
        setBrands(brandList);
      } catch (err) {}
    };

    fetchBrands();
  }, []);

  // ماشین‌های برند انتخاب شده، یا همه ماشین‌ها اگر برندی انتخاب نشده باشد
  const filteredCars = selectedBrand
    ? brands.find((b) => b.id.toString() === selectedBrand)?.cars || []
    : brands.flatMap((b) => b.cars || []);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (selectedBrand) params.append("brand_id", selectedBrand);
    if (selectedCar) params.append("car_id", selectedCar);
    if (selectedType) params.append("category_id", selectedType);

    router.push(`/product?${params.toString()}`);
  };
useEffect(() => {
  if (!selectedCar) return;

  const foundBrand = brands.find((brand) =>
    brand.cars.some((car) => car.id.toString() === selectedCar)
  );

  if (foundBrand) {
    setSelectedBrand(foundBrand.id.toString());
  }
}, [selectedCar, brands]);

  return (
    <div
      className="
        md:w-[1280px] md:h-[232px]
        sm:w-[770px] sm:h-[316px]
        w-[377px] h-[484px]
        flex flex-col justify-center items-center gap-[32px]
        border border-[#E0E1E6]  rounded-[32px]
        p-4
      "
    >
      <div className="text-[20px] md:text-[24px] text-[#000000] font-yekanDemiBold text-center">
        فیلتر محصولات ما
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="w-full flex flex-wrap justify-center gap-[20px]">
          {/* برند خودرو */}
          <FilterBox
            icon="/car.svg"
            title="برند خودرو"
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedCar(""); // ریست کردن مدل قبلی
            }}
            options={brands.map((b) => ({ id: b.id, label: b.display_name }))}
          />

          {/* مدل خودرو */}
          <FilterBox
            icon="/car.svg"
            title="مدل خودرو"
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            options={filteredCars.map((c) => ({ id: c.id, label: c.name }))}
          />

          {/* نوع کالا */}
          <FilterBox
            icon="/product.svg"
            title="نوع کالا"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={productTypes.map((t) => ({
              id: t,
              label: t === "175" ? "قطعات یدکی" : "مصرفی",
            }))}
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
  options: { id: string | number; label: string }[];
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
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
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
