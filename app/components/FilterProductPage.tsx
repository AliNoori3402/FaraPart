"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";

type Brand = { id: number; name: string };
type ProductType = "spare" | "consumable";

type Product = { id: number; name: string };

type FilterProductPageProps = {
  onFilter: (products: Product[], totalCount: number) => void;
  currentPage: number; // شماره صفحه از بیرون میاد
  pageSize?: number; // اندازه صفحه (پیش‌فرض 12)
  resetPage: () => void; // تابعی برای ریست کردن صفحه به 1
};

export default function FilterProductPage({
  onFilter,
  currentPage,
  pageSize = 12,
  resetPage,
}: FilterProductPageProps) {
  // موبایل: باز/بسته بودن فیلتر
  const [isOpen, setIsOpen] = useState(false);

  // برندها و انتخاب شده‌ها
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);

  // نوع کالا و انتخاب شده
  const productTypes: ProductType[] = ["spare", "consumable"];
  const [selectedProductType, setSelectedProductType] = useState<
    ProductType | ""
  >("");
  const [loadingType, setLoadingType] = useState(false);

  // آکاردئون (باز/بسته شدن بخش‌ها)
  const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);
  const [typeAccordionOpen, setTypeAccordionOpen] = useState(false);

  // گرفتن برندها فقط یکبار هنگام لود اولیه
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

  // گرفتن محصولات بر اساس فیلتر و صفحه‌بندی
  const fetchFilteredProducts = async () => {
    try {
      let res;

      // اگر نوع کالا انتخاب شده باشه، اولویت با فیلتر نوع کالا است
      if (selectedProductType) {
        setLoadingType(true);
        res = await axios.post("/api/filterSpare", {
          part_type: selectedProductType,
          brand_ids:
            selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
          pageNumber: currentPage,
          pageSize,
        });
      }
      // اگر فقط برند انتخاب شده باشه
      else if (selectedBrands.length > 0) {
        setLoadingBrands(true);
        res = await axios.get("/api/BrandFilter", {
          params: {
            category_id: selectedBrands.join(","),
            pageNumber: currentPage,
            pageSize,
          },
        });
      }
      // اگر هیچ فیلتری انتخاب نشده باشه، کل محصولات
      else {
        res = await axios.get("/api/products", {
          params: { pageNumber: currentPage, pageSize },
        });
      }

      onFilter(res.data.results || [], res.data.count || 0);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
      onFilter([], 0);
    } finally {
      setLoadingBrands(false);
      setLoadingType(false);
    }
  };

  // اجرا وقتی فیلتر یا صفحه تغییر کرد
  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedBrands, selectedProductType, currentPage]);

  // انتخاب/حذف برندها و ریست صفحه
  const toggleBrand = (id: number) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
    resetPage(); // صفحه برگرده به 1
  };

  // انتخاب نوع کالا و ریست صفحه
  const handleSelectProductType = (type: ProductType) => {
    // اگر دوباره روی همان نوع کلیک شد، آن را خالی کن (تغییر وضعیت)
    setSelectedProductType((prev) => (prev === type ? "" : type));
    resetPage(); // صفحه برگرده به 1
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
              <Image src="/car.svg" alt="نوع کالا" width={20} height={20} />
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
                <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-[12px] max-h-[200px] overflow-auto p-2 shadow">
                  {loadingType ? (
                    <div className="text-center py-4 text-gray-500">
                      در حال بارگذاری نوع کالا...
                    </div>
                  ) : (
                    productTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                      >
                        <input
                          type="radio"
                          name="productType"
                          value={type}
                          checked={selectedProductType === type}
                          onChange={() => handleSelectProductType(type)}
                        />
                        {type === "spare" ? "قطعات یدکی" : "مصرفی"}
                      </label>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
