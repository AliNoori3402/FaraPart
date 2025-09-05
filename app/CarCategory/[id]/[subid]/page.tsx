"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ProductSlider from "../../../components/ProductSlider";
import ProductList from "../../../components/ProductList";
import FilterProductCar from "../../../components/FilterProductCar";

type ProductType = "spare" | "consumable";

function Page() {
  const params = useParams();
  const carIdParam = params.subid;
  const carId = Array.isArray(carIdParam) ? carIdParam[0] : carIdParam || "1";

  const pageParam = params.page;
  const pageNumber = parseInt(
    Array.isArray(pageParam) ? pageParam[0] : pageParam || "1",
    10
  );

  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<
    ProductType | ""
  >("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    2
  );

  const resetPage = () => setCurrentPage(1);

  const handleFilterChange = (
    brands: number[],
    cars: number[],
    productType: ProductType | "",
    categories: number[]
  ) => {
    setSelectedBrands(brands);
    setSelectedCars(cars);
    setSelectedProductType(productType);
    setSelectedCategories(categories);
    resetPage();
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-0 max-w-[1440px] mx-auto">
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-[58px] pt-8 pb-20 lg:pr-[80px]">
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
          <ProductSlider
            onCategoryClick={(categoryId) => {
              setSelectedCategory(categoryId);
              resetPage();
            }}
          />
          <div className="w-full flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[30%]">
              <FilterProductCar
                onFilterChange={handleFilterChange}
                currentPage={currentPage}
                resetPage={resetPage}
                categoryId={selectedCategory}
              />
            </div>

            <div className="w-full lg:w-[70%]">
              <ProductList
                carId={carId}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                selectedBrands={selectedBrands}
                selectedCars={selectedCars}
                selectedProductType={selectedProductType}
                selectedCategories={selectedCategories}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
