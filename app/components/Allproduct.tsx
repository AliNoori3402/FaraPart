"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

type ProductListProps = {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  products?: Product[];
  totalFilteredCount?: number;
  onProductClick?: (id: number) => void;
};

const AllProductList: React.FC<ProductListProps> = ({
  initialPage = 1,
  onPageChange,
  products: filteredProducts,
  totalFilteredCount,
}) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalParts, setTotalParts] = useState<number>(0);

  const totalPages = Math.ceil(
    (filteredProducts !== undefined ? totalFilteredCount ?? 0 : totalParts) /
      PAGE_SIZE
  );

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    if (filteredProducts !== undefined) {
      const mapped = filteredProducts.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        price: item.price ? Number(item.price).toLocaleString("fa-IR") : "0",
        image:
          item.image_urls && item.image_urls.length > 0
            ? item.image_urls[0]
            : "/Light.svg",
      }));

      setProducts(mapped);
      setLoading(false);
      setError(null);
      setTotalParts(mapped.length);
    } else {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          setError(null);

          const res = await axios.get("/api/AllProduct", {
            params: {
              pagenumber: page,
              pagesize: PAGE_SIZE,
            },
          });

          const apiProducts = res.data.results.map((item: any) => ({
            id: item.id,
            title: item.name,
            price: item.price.toLocaleString("fa-IR"),
            image:
              item.image_urls.length > 0 ? item.image_urls[0] : "/Light.svg",
          }));

          setProducts(apiProducts);
          setTotalParts(res.data.count);
        } catch (err) {
          setError("خطا در دریافت محصولات");
          setProducts([]);
          setTotalParts(0);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [page, filteredProducts]);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-10">محصولی یافت نشد</div>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/product/${product.id}`)}
                className="w-full bg-[#FFFFFF] border border-[#E0E1E6] flex flex-col gap-4 justify-center items-center rounded-[24px] px-4 py-6 cursor-pointer"
              >
                <div className="w-full h-[180px] flex justify-center items-center">
                  <img
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
                    <div className="flex flex-row gap-2 items-center">
                      <span className="text-[14px] text-[#006FB4] font-yekanDemiBold">
                        مشاهده جزئیات و خرید
                      </span>
                      <img
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
        </>
      )}
    </div>
  );
};

export default AllProductList;
