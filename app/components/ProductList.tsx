"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls: string[];
};

type ProductListProps = {
  products: Product[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PAGE_SIZE = 12;

export default function ProductList({
  products,
  totalCount,
  currentPage,
  onPageChange,
}: ProductListProps) {
  const router = useRouter();
  const { id, subid } = useParams() as { id: string; subid: string };

  const listTopRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  // ✅ اسکرول خودکار به ابتدای لیست بعد از تغییر صفحه
  useEffect(() => {
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  if (!products || products.length === 0)
    return <div className="text-center py-8">محصولی یافت نشد</div>;

  return (
    <div>
      {/* مرجع اسکرول */}
      <div ref={listTopRef}></div>

      {/* محصولات */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() =>
              router.push(`/CarCategory/${id}/${subid}/${product.id}`)
            }
            className="w-full bg-[#FFFFFF] border border-[#E0E1E6] flex flex-col gap-4 justify-center items-center rounded-[24px] px-4 py-6 cursor-pointer"
          >
            <div className="w-full relative h-[180px] flex justify-center items-center">
              <Image
                fill
                src={product.image_urls?.[0] ?? "/Light.svg"}
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
                    {product.price.toLocaleString("fa-IR")}
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
          disabled={currentPage <= 1}
          onClick={() => changePage(currentPage - 1)}
          className="px-4 py-2 text-xs md:text-sm lg:text-base rounded bg-[#004D7A] text-white font-yekanDemiBold disabled:bg-gray-400"
        >
          صفحه قبلی
        </button>

        <span className="text-[#004D7A] text-xs md:text-sm lg:text-base font-yekanDemiBold">
          صفحه {currentPage} از {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => changePage(currentPage + 1)}
          className="px-4 py-2 text-xs md:text-sm lg:text-base rounded bg-[#004D7A] text-white font-yekanDemiBold disabled:bg-gray-400"
        >
          صفحه بعدی
        </button>
      </div>
    </div>
  );
}
