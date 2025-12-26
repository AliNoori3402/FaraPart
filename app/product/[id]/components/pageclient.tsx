"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductSlider from "../../../components/ProductSlider";
import FilterProductPage from "../../../components/FilterProductPage";
import AllProductList from "../../../components/Allproduct";

export interface Product {
  id: number;
  name: string;
  internal_code: string;
  commercial_code: string;
  price: number;
  description: string;
  image_url: string[];
  part_type: string;
  car_names: string[];
  category: { name: string };
  turnover: number | null;
  inventory: number;
  inventory_warning: string;
  has_warranty: boolean;
  warranty_name: string | null;
}

export default function ProductPageClient() {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [filteredTotalCount, setFilteredTotalCount] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const brand_id = searchParams.get("brand_id");
  const car_id = searchParams.get("car_id");
  const category_id = searchParams.get("category_id");
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const res = await axios.get("/api/AllProduct", {
          params: { car_id, brand_id, category_id, search },
        });
        setFilteredProducts(res.data.results ?? []);
        setFilteredTotalCount(res.data.count ?? 0);
      } catch (error) {
        setFilteredProducts([]);
        setFilteredTotalCount(0);
      }
    };

    fetchFilteredProducts();
  }, [brand_id, car_id, category_id, search]);

  const handleFilter = (products: Product[], totalCount: number) => {
    setFilteredProducts(products);
    setFilteredTotalCount(totalCount);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="w-full mt-20 sm:mt-30 lg:mt-45  px-4 md:px-8 lg:px-0 container  mx-auto">
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-[58px] pt-8 pb-20 ">
        <div className="w-full flex flex-col items-center gap-10">
          <div className="text-[16px] text-[#8B8D98] font-yekanBold">
            جستجوی دقیق
          </div>

          <ProductSlider
            onCategoryClick={(categoryId: number) => {
              setSelectedCategory(categoryId);
              resetPage();
            }}
          />

          <div className="w-full flex flex-col lg:flex-row gap-0 px-6">
            <div className="w-full lg:w-[30%]">
              <FilterProductPage
                onFilter={handleFilter}
                currentPage={currentPage}
                resetPage={resetPage}
                categoryId={selectedCategory}
              />
            </div>

            <div className="w-full lg:w-[70%]">
              {filteredProducts === null ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                  <div className="text-[#1C2024] font-yekanRegular mt-2">
                    در حال بارگذاری محصولات...
                  </div>
                </div>
              ) : (
                <AllProductList
                  products={filteredProducts || undefined}
                  totalFilteredCount={filteredTotalCount ?? undefined}
                  initialPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
