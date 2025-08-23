"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import ProductSlider from "../../../components/ProductSlider";

import ProductList from "../../../components/ProductList";
import FilterProductCar from "../../../components/FilterProductCar";

function Page() {
  const params = useParams();

  const carIdParam = params.subid;
  const carId = Array.isArray(carIdParam) ? carIdParam[0] : carIdParam || "1";

  const pageParam = params.page;
  const pageNumber = parseInt(
    Array.isArray(pageParam) ? pageParam[0] : pageParam || "1",
    10
  );

  // مدیریت فیلترها و صفحه
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(pageNumber);

  // وقتی فیلترها تغییر کرد صفحه رو به 1 برگردون
  const resetPage = () => setCurrentPage(1);

  // تابعی که از FilterProductPage فیلترها رو میگیره
  const handleFilterChange = (brands: number[], productType: string) => {
    setSelectedBrands(brands);
    setSelectedProductType(productType);
    resetPage();
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-0 max-w-[1440px] mx-auto">
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-[58px] pt-8 pb-20 lg:pr-[80px]">
        {/* نوار مسیر */}
        <div className="flex flex-wrap gap-1 justify-center items-center text-[14px] text-[#1C2024] font-yekanDemiBold">
          <span>لوازم یدکی</span>
          <img
            src="/Arrow-leftG.svg"
            className="w-4 h-4 object-contain"
            alt="arrow"
          />
          <span>لوازم یدکی کیا</span>
          <img
            src="/Arrow-leftG.svg"
            className="w-4 h-4 object-contain"
            alt="arrow"
          />
          <span>لوازم یدکی سراتو</span>
        </div>

        <div className="w-full flex flex-col items-center gap-10">
          <div className="text-[16px] text-[#8B8D98] font-yekanBold">
            جستجوی دقیق
          </div>

          <ProductSlider />

          <div className="w-full flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[30%]">
              <FilterProductCar
                onFilter={handleFilterChange}
                currentPage={currentPage}
                resetPage={resetPage}
                initialSelectedBrands={selectedBrands}
                initialSelectedProductType={selectedProductType}
              />
            </div>

            <div className="w-full lg:w-[70%]">
              <ProductList
                carId={carId}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                selectedBrands={selectedBrands}
                selectedProductType={selectedProductType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
