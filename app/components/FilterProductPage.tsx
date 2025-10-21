"use client";

import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Product } from "../product/page";

type Car = { id: number; code: string; name: string };
type Brand = { id: number; name: string; display_name: string; cars: Car[] };
type ProductType = "spare" | "consumable";
type Category = { id: number; name: string; child: Category[] | null };

type FilterProductPageProps = {
  onFilter: (products: Product[], totalCount: number) => void;
  currentPage: number;
  pageSize?: number;
  resetPage: () => void;
  categoryId?: number;
};

export default function FilterProductPage({
  onFilter,
  currentPage,
  pageSize = 12,
  resetPage,
  categoryId,
}: FilterProductPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<
    ProductType | ""
  >("");
  const [loading, setLoading] = useState(true);

  const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(true);
  const [brandAccordionOpen, setBrandAccordionOpen] = useState(true);
  const [carAccordionOpen, setCarAccordionOpen] = useState(true);
  const [typeAccordionOpen, setTypeAccordionOpen] = useState(true);

  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>(
    {}
  );

  const productTypes: ProductType[] = ["spare", "consumable"];

  // --------------------- دریافت برندها و ماشین‌ها ---------------------
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("/api/brand");
        setBrands(res.data.results || []);
      } catch (error) {
        console.error("خطا در دریافت برندها");
      }
    };
    fetchBrands();
  }, []);

  // --------------------- دریافت دسته‌بندی‌ها ---------------------
  const fetchCategories = async (type: ProductType | "" = "") => {
    setLoading(true);
    try {
      const res = await axios.post("/api/categorylistbyid/", {
        parent_id: type === "" ? undefined : type === "spare" ? 1 : 175,
      });
      setCategories(res.data || []);
    } catch (error) {
      console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(selectedProductType);
  }, [selectedProductType]);

  // --------------------- دریافت محصولات فیلتر شده ---------------------
  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {
        pagenumber: currentPage,
        pagesize: pageSize,
      };
      if (categoryId) params.category_id = categoryId;
      if (selectedCategories.length > 0)
        params.category_id = selectedCategories.join(",");
      if (selectedBrands.length > 0) params.brand_id = selectedBrands.join(",");
      if (selectedCars.length > 0) params.car_id = selectedCars.join(",");
      if (selectedProductType) params.part_type = selectedProductType;

      const res = await axios.get("/api/AllProduct", { params });
      onFilter(res.data.results || [], res.data.count || 0);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
      onFilter([], 0);
    } finally {
      setLoading(false);
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

  // --------------------- توگل‌ها ---------------------
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];
      resetPage();
      return updated;
    });
  };
  const toggleBrand = (id: number) => {
    setSelectedBrands((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id];
      resetPage();
      return updated;
    });
  };
  const toggleCar = (id: number) => {
    setSelectedCars((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];
      resetPage();
      return updated;
    });
  };
  const handleSelectProductType = (type: ProductType) => {
    setSelectedProductType((prev) => (prev === type ? "" : type));
    resetPage();
  };
  const toggleNestedCategory = (id: number) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedCars([]);
    setSelectedProductType("");
    resetPage();
    fetchCategories(""); // دوباره کل دسته بندی‌ها
  };

  // --------------------- رندر اکاردیون تو در تو ---------------------
  const renderNestedCategory = (category: Category, level = 0): JSX.Element => {
    const hasChild = category.child && category.child.length > 0;
    const isOpen = openCategories[category.id];

    return (
      <div key={category.id} className="flex flex-col gap-1">
        <div
          className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg cursor-pointer select-none transition-colors
          ${
            selectedCategories.includes(category.id)
              ? "bg-blue-50"
              : "hover:bg-gray-50"
          }`}
          style={{ paddingLeft: `${level * 16}px` }}
          onClick={() => hasChild && toggleNestedCategory(category.id)}
        >
          <span className="text-sm text-gray-800">{category.name}</span>
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
              toggleCategory(category.id);
            }}
            className="w-4 h-4 accent-blue-500 rounded"
          />
        </div>

        {hasChild && (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-col gap-1 border-l border-gray-200 ml-4"
              >
                {category.child!.map((child) =>
                  renderNestedCategory(child, level + 1)
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  const renderCheckboxItem = (
    label: string,
    checked: boolean,
    onChange: () => void
  ) => (
    <label
      className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg cursor-pointer select-none transition-colors
      ${checked ? "bg-blue-50" : "hover:bg-gray-50"}`}
    >
      <span className="text-sm text-gray-800">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-blue-500 rounded"
      />
    </label>
  );

  const renderRadioItem = (
    label: string,
    checked: boolean,
    onChange: () => void
  ) => (
    <label
      className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg cursor-pointer select-none transition-colors
      ${checked ? "bg-blue-50" : "hover:bg-gray-50"}`}
    >
      <span className="text-sm text-gray-800">{label}</span>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-blue-500"
      />
    </label>
  );

  const renderAccordion = (
    title: string,
    open: boolean,
    setOpen: any,
    items: JSX.Element[]
  ) => (
    <div className="w-full">
      <div
        className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setOpen((prev: boolean) => !prev)}
      >
        <div className="flex items-center gap-2 pr-1">
          <Image src="/car.svg" alt={title} width={20} height={20} />
          <span className="text-sm font-medium text-gray-900">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <AiOutlineLoading3Quarters className="animate-spin text-gray-400" />
          )}
          <Image
            src="/Arrow-downG.svg"
            alt="toggle"
            width={16}
            height={16}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-2"
          >
            <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-xl max-h-[220px] overflow-auto p-3 shadow-sm">
              {items.length > 0 ? (
                items
              ) : (
                <div className="text-center py-4 text-gray-400 text-sm">
                  داده‌ای وجود ندارد
                </div>
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
          className="bg-gray-200 text-gray-900 px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2"
        >
          <Image src="/filter.svg" alt="filter" width={16} height={16} />
          فیلتر
        </button>
      </div>

      {/* فیلتر دسکتاپ */}
      <div className="hidden md:flex w-full max-w-[281px] border border-gray-300 bg-gray-50 rounded-2xl flex-col gap-4 px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-lg text-gray-900 font-semibold">فیلترها</div>
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

        {/* دسته‌بندی */}
        {renderAccordion(
          "دسته‌بندی",
          categoryAccordionOpen,
          setCategoryAccordionOpen,
          categories.map((cat) => renderNestedCategory(cat))
        )}

        {/* برند */}
        {renderAccordion(
          "برند خودرو",
          brandAccordionOpen,
          setBrandAccordionOpen,
          brands.map((brand) =>
            renderCheckboxItem(
              brand.display_name,
              selectedBrands.includes(brand.id),
              () => toggleBrand(brand.id)
            )
          )
        )}

        {/* خودروها */}
        {renderAccordion(
          "خودروها",
          carAccordionOpen,
          setCarAccordionOpen,
          (selectedBrands.length > 0
            ? brands.filter((b) => selectedBrands.includes(b.id))
            : brands
          )
            .flatMap((b) => b.cars)
            .map((car) =>
              renderCheckboxItem(car.name, selectedCars.includes(car.id), () =>
                toggleCar(car.id)
              )
            )
        )}

        {/* نوع کالا */}
        {renderAccordion(
          "نوع کالا",
          typeAccordionOpen,
          setTypeAccordionOpen,
          productTypes.map((type) =>
            renderRadioItem(
              type === "spare" ? "قطعات یدکی" : "مصرفی",
              selectedProductType === type,
              () => handleSelectProductType(type)
            )
          )
        )}
      </div>
    </>
  );
}
