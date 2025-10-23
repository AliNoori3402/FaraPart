"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductSlider from "../../../components/ProductSlider";
import ProductList from "../../../components/ProductList";
import FilterProductPage from "../../../components/FilterProductPage";

const PAGE_SIZE = 12;

function Page() {
  const params = useParams();
  console.log(params);
  const carIdParam = params.subid;
  const carId = Array.isArray(carIdParam) ? carIdParam[0] : carIdParam || "1";
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    2
  );
  const [filtersActive, setFiltersActive] = useState(false); // برای تشخیص حالت فیلتر

  const resetPage = () => setCurrentPage(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // ✅ حالت عادی: وقتی فیلتر فعال نیست، دیتا رو از car_id بگیر
  useEffect(() => {
    if (filtersActive) return; // اگه فیلتر فعاله، این useEffect اجرا نشه

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/AllProduct", {
          params: {
            car_id: carId,
            pagenumber: currentPage,
            pagesize: PAGE_SIZE,
          },
        });

        const data = response.data;
        const mappedProducts = data.results.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price).toLocaleString("fa-IR"),
          image_urls: item.image_urls,
        }));

        console.log(mappedProducts);
        setProducts(mappedProducts);
        setTotalCount(data.count || 0);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      }
    };

    fetchProducts();
  }, [carId, currentPage, filtersActive]);

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
              setFiltersActive(false); // فیلتر ریست بشه
            }}
          />

          <div className="w-full flex flex-col lg:flex-row gap-10">
            {/* ستون فیلتر */}
            <div className="w-full lg:w-[30%]">
              <FilterProductPage
                currentPage={currentPage}
                resetPage={() => {
                  resetPage();
                  setFiltersActive(true);
                }}
                onFilter={(filteredProducts, total) => {
                  setProducts(filteredProducts);
                  setTotalCount(total);
                  setFiltersActive(true);
                }}
              />
            </div>

            {/* ستون محصولات */}
            <div className="w-full lg:w-[70%]">
              <ProductList
                products={products}
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
