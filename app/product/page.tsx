// app/product/[id]/page.tsx
"use client";

import React, { useState } from "react";
import ProductSlider from "../components/ProductSlider";
import FilterProductPage from "../components/FilterProductPage";
import AllProductList from "../components/Allproduct";
import Image from "next/image";
// types/product.ts
export interface Product {
  id: number;
  name: string;
  internal_code: string;
  commercial_code: string;
  price: number;
  description: string;
  image_urls: string[];
  part_type: string;
  car_names: string[];
  category: {
    name: string;
  };
  turnover: number | null;
  inventory: number;
  inventory_warning: string;
  has_warranty: boolean;
  warranty_name: string | null;
}

// -------------------
// تایپ پروپ‌ها
// -------------------
interface FilterProductPageProps {
  onFilter: (products: Product[], totalCount: number) => void;
  currentPage: number;
  resetPage: () => void;
  categoryId?: number;
}

interface AllProductListProps {
  products?: Product[];
  totalFilteredCount?: number;
  initialPage: number;
  onPageChange: (page: number) => void;
}

export default function Page() {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    2
  );
  const [filteredTotalCount, setFilteredTotalCount] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleFilter = (products: Product[], totalCount: number) => {
    setFilteredProducts(products);
    setFilteredTotalCount(totalCount);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-0 max-w-[1440px] mx-auto">
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-[58px] pt-8 pb-20 lg:pr-[80px]">
        {/* نوار مسیر */}
        <div className="flex flex-wrap gap-1 justify-center items-center text-[14px] text-[#1C2024] font-yekanDemiBold">
          <span>لوازم یدکی</span>
          <Image
            src="/Arrow-leftG.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="arrow"
          />
          <span>لوازم یدکی کیا</span>
          <Image
            src="/Arrow-leftG.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="arrow"
          />
          <span>لوازم یدکی سراتو</span>
        </div>

        <div className="w-full flex flex-col items-center gap-10">
          <div className="text-[16px] text-[#8B8D98] font-yekanBold">
            جستجوی دقیق
          </div>

          {/* اسلایدر محصولات */}
          <ProductSlider
            onCategoryClick={(categoryId: number) => {
              setSelectedCategory(categoryId);
              resetPage();
            }}
          />

          <div className="w-full flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[30%]">
              <FilterProductPage
                onFilter={handleFilter}
                currentPage={currentPage}
                resetPage={resetPage}
                categoryId={selectedCategory}
              />
            </div>

            <div className="w-full lg:w-[70%]">
              <AllProductList
                products={
                  filteredProducts !== null && filteredProducts.length >= 0
                    ? filteredProducts
                    : undefined
                }
                totalFilteredCount={filteredTotalCount ?? undefined}
                initialPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
