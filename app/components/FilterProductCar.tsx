"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";

type Brand = { id: number; name: string };
type ProductType = "spare" | "consumable";

type FilterProductPageProps = {
  onFilter: (brands: number[], productType: string) => void;
  currentPage: number;
  resetPage: () => void;
  initialSelectedBrands?: number[];
  initialSelectedProductType?: string;
};

export default function FilterProductCar({
  onFilter,
  currentPage,
  resetPage,
  initialSelectedBrands = [],
  initialSelectedProductType = "",
}: FilterProductPageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>(
    initialSelectedBrands
  );
  const [loadingBrands, setLoadingBrands] = useState(false);

  const productTypes: ProductType[] = ["spare", "consumable"];
  const [selectedProductType, setSelectedProductType] = useState<string>(
    initialSelectedProductType
  );
  const [loadingType, setLoadingType] = useState(false);

  const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);
  const [typeAccordionOpen, setTypeAccordionOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingBrands(true);
        const res = await axios.get("/api/brand");
        setBrands(res.data);
      } catch (error) {
        console.error("خطا در دریافت برندها");
      } finally {
        setLoadingBrands(false);
      }
    };
    fetchBrands();
  }, []);

  // وقتی فیلترها از بالا تغییر کرد، باید state داخلی هم آپدیت بشه (مثلا اگر صفحه برگشت یا از بیرون کنترل شد)
  useEffect(() => {
    setSelectedBrands(initialSelectedBrands);
  }, [initialSelectedBrands]);

  useEffect(() => {
    setSelectedProductType(initialSelectedProductType);
  }, [initialSelectedProductType]);

  // وقتی فیلترها تغییر کرد، به بالا بفرست
  useEffect(() => {
    onFilter(selectedBrands, selectedProductType);
    resetPage();
  }, [selectedBrands, selectedProductType]);

  const toggleBrand = (id: number) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleSelectProductType = (type: ProductType) => {
    setSelectedProductType((prev) => (prev === type ? "" : type));
  };

  return (
    <>
      {/* دکمه باز کردن فیلتر موبایل */}
      <div className="md:hidden w-full flex justify-start px-4 mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#F0F0F3] text-[#000] px-4 py-2 rounded-xl font-yekanDemiBold text-sm flex items-center gap-2"
        >
          <Image src="/filter.svg" alt="filter" width={16} height={16} />
          فیلتر
        </button>
      </div>

      {/* فیلتر دسکتاپ */}
      <div className="hidden md:flex w-full max-w-[281px] border border-[#E0E1E6] bg-[#F9F9FB] rounded-[24px] flex-col gap-6 px-4 py-6">
        <div className="text-[20px] text-[#000000] font-yekanDemiBold">
          فیلترها
        </div>

        {/* برند */}
        <div className="w-full">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setBrandAccordionOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-2 pr-1">
              <Image src="/car.svg" alt="برند" width={20} height={20} />
              <span className="text-[14px] font-yekanDemiBold text-[#000]">
                برند خودرو
              </span>
            </div>
            <Image
              src="/Arrow-downG.svg"
              alt="toggle"
              width={16}
              height={16}
              className={`transition-transform duration-300 ${
                brandAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {brandAccordionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-[12px] max-h-[200px] overflow-auto p-2 shadow">
                  {loadingBrands ? (
                    <div className="text-center py-4 text-gray-500">
                      در حال بارگذاری برندها...
                    </div>
                  ) : (
                    brands.map((brand) => (
                      <label
                        key={brand.id}
                        className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => toggleBrand(brand.id)}
                        />
                        {brand.name}
                      </label>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* نوع کالا */}
        <div className="w-full">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setTypeAccordionOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-2 pr-1">
              <Image src="/part.svg" alt="نوع کالا" width={20} height={20} />
              <span className="text-[14px] font-yekanDemiBold text-[#000]">
                نوع کالا
              </span>
            </div>
            <Image
              src="/Arrow-downG.svg"
              alt="toggle"
              width={16}
              height={16}
              className={`transition-transform duration-300 ${
                typeAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {typeAccordionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-[12px] max-h-[150px] overflow-auto p-2 shadow">
                  {productTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                    >
                      <input
                        type="radio"
                        name="productType"
                        checked={selectedProductType === type}
                        onChange={() => handleSelectProductType(type)}
                      />
                      {type === "spare" ? "قطعات یدکی" : "مصرفی"}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* فیلتر موبایل - اسلاید از راست */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 left-0 w-full h-full z-50 bg-white p-6 overflow-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="mb-4 px-3 py-1 border rounded bg-[#F0F0F3]"
            >
              بستن
            </button>

            <div className="text-[20px] text-[#000000] font-yekanDemiBold mb-6">
              فیلترها
            </div>

            {/* برند */}
            <div className="mb-6">
              <div className="mb-2 font-semibold text-lg">برند خودرو</div>
              {loadingBrands ? (
                <div className="text-center py-4 text-gray-500">
                  در حال بارگذاری برندها...
                </div>
              ) : (
                brands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => toggleBrand(brand.id)}
                    />
                    {brand.name}
                  </label>
                ))
              )}
            </div>

            {/* نوع کالا */}
            <div>
              <div className="mb-2 font-semibold text-lg">نوع کالا</div>
              {productTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                >
                  <input
                    type="radio"
                    name="productType"
                    checked={selectedProductType === type}
                    onChange={() => handleSelectProductType(type)}
                  />
                  {type === "spare" ? "قطعات یدکی" : "مصرفی"}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
