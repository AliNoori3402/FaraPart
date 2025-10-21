"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ProductSlider from "../../../components/ProductSlider";
import ProductList from "../../../components/ProductList";
import FilterProductPage from "../../../components/FilterProductPage";

function Page() {
  const params = useParams();
  const carIdParam = params.subid;
  const carId = Array.isArray(carIdParam) ? carIdParam[0] : carIdParam || "1";

  const pageParam = params.page;
  const pageNumber = parseInt(
    Array.isArray(pageParam) ? pageParam[0] : pageParam || "1",
    10
  );

  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    2
  );

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="w-full px-4 md:px-8 lg:px-0 max-w-[1440px] mx-auto">
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-[58px] pt-8 pb-20 lg:pr-[80px]">
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
            {/* ستون فیلتر */}
            <div className="w-full lg:w-[30%]">
              <FilterProductPage
                currentPage={currentPage}
                resetPage={resetPage}
                categoryId={selectedCategory}
                onFilter={(filteredProducts, total) => {
                  setProducts(filteredProducts);
                  setTotalCount(total);
                }}
              />
            </div>

            {/* ستون محصولات */}
            <div className="w-full lg:w-[70%]">
              <ProductList
                carId={carId}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
