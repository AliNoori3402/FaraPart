"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";

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

type Product = { id: number; name: string };

type FilterProductPageProps = {
  onFilter: (products: Product[], totalCount: number) => void;
  currentPage: number;
  pageSize?: number;
  resetPage: () => void;
  categoryId?: number; // اضافه شد
};
type Category = {
  id: number;
  name: string;
};
export default function FilterProductPage({
  onFilter,
  currentPage,
  pageSize = 12,
  resetPage,
  categoryId, // اضافه شد
}: FilterProductPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  // برندها و ماشین‌ها
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingCars, setLoadingCars] = useState(false);

  // اکاردیون‌ها
  const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);
  const [carAccordionOpen, setCarAccordionOpen] = useState(false);

  // نوع کالا
  const productTypes: ProductType[] = ["spare", "consumable"];
  const [selectedProductType, setSelectedProductType] = useState<
    ProductType | ""
  >("");
  const [loading, setLoading] = useState(true);
  const [typeAccordionOpen, setTypeAccordionOpen] = useState(false);
  const [loadingType, setLoadingType] = useState(false);

  // گرفتن برندها و ماشین‌ها فقط یکبار
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
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categorylist");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);
  // تابع فیلتر محصولات
  const fetchFilteredProducts = async () => {
    try {
      let res;

      // اگر prop categoryId داده شده باشه
      if (categoryId) {
        res = await axios.get("/api/CategoryFilter", {
          params: {
            category_id: categoryId,
            pageNumber: currentPage,
            pageSize,
          },
        });
      }
      // اگر کاربر دسته‌بندی‌ها رو انتخاب کرده
      else if (selectedCategories.length > 0) {
        res = await axios.get("/api/CategoryFilter", {
          params: {
            category_id: selectedCategories.join(","),
            pageNumber: currentPage,
            pageSize,
          },
        });
      } else if (selectedCars.length > 0) {
        setLoadingCars(true);
        res = await axios.get("/api/CarFilter", {
          params: {
            car_id: selectedCars.join(","),
            pagenumber: currentPage,
            pagesize: pageSize,
          },
        });
      } else if (selectedProductType) {
        setLoadingType(true);
        res = await axios.post("/api/filterSpare", {
          part_type: selectedProductType,
          brand_ids:
            selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
          pageNumber: currentPage,
          pageSize,
        });
      } else if (selectedBrands.length > 0) {
        setLoadingBrands(true);
        res = await axios.get("/api/BrandFilter", {
          params: {
            brand_id: selectedBrands.join(","),
            pageNumber: currentPage,
            pageSize,
          },
        });
      } else {
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
      setLoadingCars(false);
      setLoadingType(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [
    selectedBrands,
    selectedCars,
    selectedProductType,
    currentPage,
    categoryId,
    selectedCategories,
  ]);
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    resetPage();
  };
  // توگل برند
  const toggleBrand = (id: number) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
    resetPage();
  };

  // توگل ماشین
  const toggleCar = (id: number) => {
    setSelectedCars((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    resetPage();
  };

  // انتخاب نوع کالا
  const handleSelectProductType = (type: ProductType) => {
    setSelectedProductType((prev) => (prev === type ? "" : type));
    resetPage();
  };

  return (
    <>
      {/* دکمه موبایل */}
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
        <div className="w-full">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setCategoryAccordionOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-2 pr-1">
              <Image
                src="/category.svg"
                alt="دسته‌بندی"
                width={20}
                height={20}
              />
              <span className="text-[14px] font-yekanDemiBold text-[#000]">
                دسته‌بندی
              </span>
            </div>
            <Image
              src="/Arrow-downG.svg"
              alt="toggle"
              width={16}
              height={16}
              className={`transition-transform duration-300 ${
                categoryAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {categoryAccordionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-[12px] max-h-[200px] overflow-auto p-2 shadow">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500">
                      در حال بارگذاری دسته‌بندی‌ها...
                    </div>
                  ) : (
                    categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                        />
                        {category.name}
                      </label>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                        {brand.display_name}
                      </label>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ماشین */}
        <div className="w-full">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setCarAccordionOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-2 pr-1">
              <Image src="/car.svg" alt="ماشین" width={20} height={20} />
              <span className="text-[14px] font-yekanDemiBold text-[#000]">
                خودروها
              </span>
            </div>
            <Image
              src="/Arrow-downG.svg"
              alt="toggle"
              width={16}
              height={16}
              className={`transition-transform duration-300 ${
                carAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {carAccordionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-[12px] max-h-[200px] overflow-auto p-2 shadow">
                  {loadingCars ? (
                    <div className="text-center py-4 text-gray-500">
                      در حال بارگذاری خودروها...
                    </div>
                  ) : (
                    brands
                      .flatMap((brand) => brand.cars)
                      .map((car) => (
                        <label
                          key={car.id}
                          className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCars.includes(car.id)}
                            onChange={() => toggleCar(car.id)}
                          />
                          {car.name}
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
