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

type Category = {
  id: number;
  name: string;
};

type FilterProductCarProps = {
  onFilterChange: (
    brands: number[],
    cars: number[],
    productType: ProductType | "",
    categories: number[]
  ) => void;
  currentPage: number;
  resetPage: () => void;
  categoryId?: number;
};

export default function FilterProductCar({
  onFilterChange,
  currentPage,
  resetPage,
  categoryId,
}: FilterProductCarProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<
    ProductType | ""
  >("");

  const [loading, setLoading] = useState({
    categories: true,
    brands: true,
    cars: false,
    productType: false,
  });

  // وضعیت اکاردیون‌ها
  const [accordion, setAccordion] = useState({
    category: false,
    brand: false,
    car: false,
    productType: false,
  });

  const productTypes: ProductType[] = ["spare", "consumable"];

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading((prev) => ({ ...prev, categories: true }));
        const res = await fetch("/api/categorylist");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    };
    fetchCategories();
  }, []);

  // fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading((prev) => ({ ...prev, brands: true }));
        const res = await axios.get("/api/brand");
        const brandList: Brand[] = res.data.results || [];
        setBrands(brandList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, brands: false }));
      }
    };
    fetchBrands();
  }, []);

  // تغییرات فیلترها را به Page بفرست
  useEffect(() => {
    onFilterChange(
      selectedBrands,
      selectedCars,
      selectedProductType,
      selectedCategories
    );
  }, [
    selectedBrands,
    selectedCars,
    selectedProductType,
    selectedCategories,
    onFilterChange,
  ]);

  const toggleItem = (
    id: number,
    stateArray: number[],
    setter: (val: number[]) => void
  ) => {
    setter(
      stateArray.includes(id)
        ? stateArray.filter((i) => i !== id)
        : [...stateArray, id]
    );
    resetPage();
  };

  const handleProductType = (type: ProductType) => {
    setSelectedProductType((prev) => (prev === type ? "" : type));
    resetPage();
  };

  const toggleAccordion = (key: keyof typeof accordion) => {
    setAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderAccordion = <
    T extends { id: number; name?: string; display_name?: string; cars?: Car[] }
  >(
    title: string,
    items: T[],
    stateArray: number[],
    onChange: (id: number) => void,
    loadingKey: keyof typeof loading
  ) => (
    <div className="w-full">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() =>
          toggleAccordion(title.toLowerCase() as keyof typeof accordion)
        }
      >
        <div className="flex items-center gap-2 pr-1">
          <Image src="/car.svg" alt={title} width={20} height={20} />
          <span className="text-[14px] font-yekanDemiBold text-[#000]">
            {title}
          </span>
        </div>
        <Image
          src="/Arrow-downG.svg"
          alt="toggle"
          width={16}
          height={16}
          className={`transition-transform duration-300 ${
            accordion[title.toLowerCase() as keyof typeof accordion]
              ? "rotate-180"
              : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {accordion[title.toLowerCase() as keyof typeof accordion] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-2"
          >
            <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-[12px] max-h-[200px] overflow-auto p-2 shadow">
              {loading[loadingKey] ? (
                <div className="text-center py-4 text-gray-500">
                  در حال بارگذاری...
                </div>
              ) : (
                items.map((item) => {
                  const label = item.name || item.display_name || "";
                  return (
                    <label
                      key={item.id}
                      className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                    >
                      <input
                        type="checkbox"
                        checked={stateArray.includes(item.id)}
                        onChange={() => onChange(item.id)}
                      />
                      {label}
                    </label>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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

        {/* دسته‌بندی */}
        {renderAccordion(
          "Category",
          categories,
          selectedCategories,
          (id) => toggleItem(id, selectedCategories, setSelectedCategories),
          "categories"
        )}

        {/* برند */}
        {renderAccordion(
          "Brand",
          brands,
          selectedBrands,
          (id) => toggleItem(id, selectedBrands, setSelectedBrands),
          "brands"
        )}

        {/* خودرو */}
        {renderAccordion(
          "Car",
          brands.flatMap((b) => b.cars || []),
          selectedCars,
          (id) => toggleItem(id, selectedCars, setSelectedCars),
          "cars"
        )}

        {/* نوع کالا */}
        <div className="w-full">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAccordion("productType")}
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
                accordion.productType ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {accordion.productType && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-[12px] max-h-[200px] overflow-auto p-2 shadow">
                  {productTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 py-1 cursor-pointer text-sm select-none"
                    >
                      <input
                        type="radio"
                        name="productType"
                        value={type}
                        checked={selectedProductType === type}
                        onChange={() => handleProductType(type)}
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
    </>
  );
}
