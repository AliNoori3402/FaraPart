// app/product/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductSlider from "../components/ProductSlider";
import FilterProductPage from "../components/FilterProductPage";
import AllProductList from "../components/Allproduct";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";

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
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
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
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const brand_id = searchParams.get("brand_id");
      const car_id = searchParams.get("car_id");
      const category_id = searchParams.get("category_id");

      try {
        const res = await axios.get("/api/AllProduct", {
          params: { car_id, brand_id, category_id },
        });

        console.log("API Response:", res.data);

        setFilteredProducts(res.data.results ?? []);
        setFilteredTotalCount(res.data.count ?? 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFilteredProducts([]);
        setFilteredTotalCount(0);
      }
    };

    fetchFilteredProducts();
  }, [searchParams]);

  return (
    <div className="w-full px-4 md:px-8 lg:px-0 max-w-[1440px] mx-auto">
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-[58px] pt-8 pb-20 lg:pr-[80px]">
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
                  filteredProducts !== null && filteredProducts
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
