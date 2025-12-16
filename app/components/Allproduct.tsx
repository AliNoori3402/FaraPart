"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "../product/[id]/components/pageclient";

const PAGE_SIZE = 10;

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

  const listTopRef = useRef<HTMLDivElement | null>(null);

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
      const mapped: Product[] = filteredProducts.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image_urls: item.image_urls || [],
        internal_code: item.internal_code || "",
        commercial_code: item.commercial_code || "",
        description: item.description || "",
        has_warranty: item.has_warranty || false,
        warranty_name: item.warranty_name || null,
        inventory: item.inventory || 0,
        inventory_warning: item.inventory_warning || "",
        part_type: item.part_type as "spare" | "consumable",
        car_names: item.car_names || [],
        turnover: item.turnover || null,
        category: item.category || { name: "" },
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
            name: item.name,
            price: item.price.toLocaleString("fa-IR"),
            image_urls:
              item.image_urls && item.image_urls.length > 0
                ? item.image_urls
                : ["/Light.svg"],
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

  // ✅ اسکرول خودکار به ابتدای لیست بعد از تغییر صفحه
  useEffect(() => {
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [page]);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <div>
      {products.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="w-20 h-20 mb-4 flex justify-center items-center bg-gray-100 rounded-full"></div>
          <div className="text-center text-gray-500 font-yekanBold text-lg sm:text-xl">
            محصولی یافت نشد
          </div>
          <div className="text-center text-gray-400 text-sm mt-2">
            ممکن است فیلترهای شما نتیجه‌ای نداشته باشند
          </div>
        </div>
      ) : (
        <>
          {/* مرجع اسکرول */}
          <div ref={listTopRef}></div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/product/${product.id}`)}
                className="w-full bg-[#FFFFFF] border border-[#E0E1E6] flex flex-col gap-4 justify-center items-center rounded-[24px] px-4 py-6 cursor-pointer"
              >
                <div className="w-full h-[180px] flex justify-center items-center">
                  <Image
                    src={
                      product.image_urls && product.image_urls.length > 0
                        ? product.image_urls[0]
                        : "/Light.svg"
                    }
                    width={200}
                    height={180}
                    className="w-[200px] h-full object-contain"
                    alt={product.name}
                  />
                </div>

                <div className="w-full flex flex-col gap-6">
                  <div className="text-[14px] text-[#1C2024] font-yekanDemiBold leading-[20px]">
                    {product.name}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="text-[18px] sm:text-[20px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
                        {Number(product.price).toLocaleString("fa-IR")}
                      </div>
                      <div className="text-[12px] text-[#004D7A] font-yekanDemiBold leading-[16px]">
                        تومان
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
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

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page <= 1}
              onClick={() => changePage(page - 1)}
              className="px-4 py-2 text-xs md:text-sm lg:text-base rounded bg-[#004D7A] text-white font-yekanDemiBold disabled:bg-gray-400"
            >
              صفحه قبلی
            </button>

            <span className="text-[#004D7A] text-xs md:text-sm lg:text-base font-yekanDemiBold">
              صفحه {page} از {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => changePage(page + 1)}
              className="px-4 py-2 text-xs md:text-sm lg:text-base rounded bg-[#004D7A] text-white font-yekanDemiBold disabled:bg-gray-400"
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
