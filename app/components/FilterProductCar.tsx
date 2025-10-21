"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";

type Car = { id: number; code: string; name: string };
type Brand = { id: number; name: string; display_name: string; cars: Car[] };
type Category = { id: number; name: string; child?: Category[] };
type ProductType = "spare" | "consumable";

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

  const [accordion, setAccordion] = useState({
    category: true,
    brand: true,
    car: true,
    productType: true,
  });

  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>(
    {}
  );
  const productTypes: ProductType[] = ["spare", "consumable"];

  // ----------------- fetch brands -----------------
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading((prev) => ({ ...prev, brands: true }));
        const res = await axios.get("/api/brand");
        setBrands(res.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, brands: false }));
      }
    };
    fetchBrands();
  }, []);

  // ----------------- fetch categories -----------------
  const fetchCategories = async (parentId?: number) => {
    try {
      setLoading((prev) => ({ ...prev, categories: true }));
      let data: Category[] = [];

      if (parentId) {
        const res = await axios.post("/api/products/categories", {
          parent_id: parentId,
        });
        data = res.data || [];
      } else {
        const res = await axios.get("/api/categorylist");
        data = res.data || [];
      }

      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ----------------- filter updates -----------------
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
    arr: number[],
    setter: (val: number[]) => void
  ) => {
    setter(arr.includes(id) ? arr.filter((i) => i !== id) : [...arr, id]);
    resetPage();
  };

  const handleProductType = async (type: ProductType) => {
    const newType = selectedProductType === type ? "" : type;
    setSelectedProductType(newType);
    resetPage();

    // اگر نوع کالا انتخاب شد، fetch دسته‌بندی‌های والد مربوطه
    if (newType === "spare") await fetchCategories(1); // لوازم یدکی
    else if (newType === "consumable")
      await fetchCategories(175); // لوازم مصرفی
    else await fetchCategories(); // اگر خالی شد، کل دسته‌بندی‌ها
  };

  const toggleAccordion = (key: keyof typeof accordion) => {
    setAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNestedCategory = (id: number) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNestedCategory = (category: Category, level = 0) => {
    const hasChild = category.child && category.child.length > 0;
    const isOpen = openCategories[category.id];

    return (
      <div key={category.id} className="flex flex-col gap-1">
        <div
          className={`flex items-center justify-between gap-2 py-1 px-2 rounded-lg cursor-pointer select-none ${
            selectedCategories.includes(category.id)
              ? "bg-blue-50"
              : "hover:bg-gray-50"
          }`}
          style={{ paddingLeft: `${level * 16}px` }}
          onClick={() => hasChild && toggleNestedCategory(category.id)}
        >
          <span>{category.name}</span>
          {hasChild && (
            <Image
              src="/Arrow-downG.svg"
              alt="toggle"
              width={12}
              height={12}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={(e) => {
              e.stopPropagation();
              toggleItem(
                category.id,
                selectedCategories,
                setSelectedCategories
              );
            }}
          />
        </div>

        {hasChild && isOpen && (
          <div className="flex flex-col gap-1 ml-4 border-l border-gray-200">
            {category.child!.map((child) =>
              renderNestedCategory(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
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
          <span className="text-[14px] font-medium">{title}</span>
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
            <div className="flex flex-col gap-1 bg-white border border-gray-200 rounded-[12px] max-h-[220px] overflow-auto p-2 shadow">
              {loading[loadingKey] ? (
                <div className="text-center py-4 text-gray-500">
                  در حال بارگذاری...
                </div>
              ) : title === "Category" ? (
                items.map((cat) => renderNestedCategory(cat))
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

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedCars([]);
    setSelectedProductType("");
    fetchCategories();
    resetPage();
  };

  return (
    <>
      {/* دکمه موبایل */}
      <div className="md:hidden w-full flex justify-start px-4 mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#F0F0F3] text-[#000] px-4 py-2 rounded-xl font-medium flex items-center gap-2"
        >
          <Image src="/filter.svg" alt="filter" width={16} height={16} />
          فیلتر
        </button>
      </div>

      {/* فیلتر دسکتاپ */}
      <div className="hidden md:flex w-full max-w-[281px] border border-[#E0E1E6] bg-[#F9F9FB] rounded-[24px] flex-col gap-4 px-4 py-6">
        <div className="flex justify-between items-center">
          <span className="text-[18px] font-medium">فیلترها</span>
          {(selectedCategories.length > 0 ||
            selectedBrands.length > 0 ||
            selectedCars.length > 0 ||
            selectedProductType !== "") && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:underline"
            >
              حذف فیلترها
            </button>
          )}
        </div>

        {renderAccordion(
          "Category",
          categories,
          selectedCategories,
          (id) => toggleItem(id, selectedCategories, setSelectedCategories),
          "categories"
        )}
        {renderAccordion(
          "Brand",
          brands,
          selectedBrands,
          (id) => toggleItem(id, selectedBrands, setSelectedBrands),
          "brands"
        )}
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
              <span className="text-[14px] font-medium">نوع کالا</span>
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
