"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const PAGE_SIZE = 12;

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

type ProductListProps = {
  carId: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  selectedBrands?: number[];
  selectedCategories?: number[];
};

const ProductList: React.FC<ProductListProps> = ({
  carId,
  currentPage = 1,
  onPageChange,
  selectedBrands = [],
  selectedCategories = [],
}) => {
  const router = useRouter();
  const params = useParams();
  const { id, subid } = params as { id: string; subid: string };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(currentPage);
  const [totalParts, setTotalParts] = useState(0);

  const totalPages = Math.ceil(totalParts / PAGE_SIZE);

  // وقتی currentPage از props تغییر کنه، state page رو آپدیت کن بدون ایجاد لوپ
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  // fetch محصولات
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("/api/AllProduct", {
          params: {
            car_id: carId,

            pagenumber: page,
            pagesize: PAGE_SIZE,
          },
        });

        const data = response.data;
        const apiProducts = data.results.map((item: any) => ({
          id: item.id,
          title: item.name,
          price: Number(item.price).toLocaleString("fa-IR"),
          image: item.image_urls.length > 0 ? item.image_urls[0] : "/Light.svg",
        }));

        setProducts(apiProducts);
        setTotalParts(data.total_parts || 0);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت محصولات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [carId, page]);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* محصولات */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() =>
              router.push(`/CarCategory/${id}/${subid}/${product.id}`)
            }
            className="w-full bg-[#FFFFFF] border border-[#E0E1E6] flex flex-col gap-4 justify-center items-center rounded-[24px] px-4 py-6 cursor-pointer"
          >
            <div className="w-full relative h-[180px] flex justify-center items-center">
              <Image
                fill
                src={product.image}
                className="w-[200px] h-full object-contain"
                alt={product.title}
              />
            </div>
            <div className="w-full flex flex-col gap-6">
              <div className="text-[14px] text-[#1C2024] font-yekanDemiBold leading-[20px]">
                {product.title}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <div className="text-[18px] sm:text-[20px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
                    {product.price}
                  </div>
                  <div className="text-[12px] text-[#004D7A] font-yekanDemiBold leading-[16px]">
                    تومان
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center cursor-pointer">
                  <span className="text-[14px] text-[#006FB4] font-yekanDemiBold">
                    مشاهده جزئیات و خرید
                  </span>
                  <Image
                    width={20}
                    height={20}
                    src="/Arrow-leftB.svg"
                    className="w-5 h-5"
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* پجینیشن */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
          className="px-4 py-2 rounded bg-[#004D7A] text-white font-yekanDemiBold disabled:bg-gray-400"
        >
          صفحه قبلی
        </button>

        <span className="text-[#004D7A] font-yekanDemiBold">
          صفحه {page} از {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => changePage(page + 1)}
          className="px-4 py-2 rounded bg-[#004D7A] text-white font-yekanDemiBold disabled:bg-gray-400"
        >
          صفحه بعدی
        </button>
      </div>
    </div>
  );
};

export default ProductList;
