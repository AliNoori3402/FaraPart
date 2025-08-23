"use client";

import React from "react";

type DetailItem = {
  label: string;
  value: string;
};

type Product = {
  title: string;
  rows: DetailItem[][];
  price: string;
  currency: string;
};

export default function PackDetails(): React.ReactElement {
  const products: Product[] = [
    {
      title: "پوسته سپر جلو سراتو قدیم",
      rows: [
        [
          { label: "برند", value: "کیا" },
          { label: "مدل خودرو", value: "سراتو" },
          { label: "کد فنی", value: "۸۶۶۹۵۱M۰۰۰" },
        ],
        [
          { label: "کشور سازنده", value: "ایران" },
          { label: "گارانتی سلامت فیزیکی", value: "دارد" },
          { label: "برند تولید کننده", value: "نیرومحرکه" },
        ],
      ],
      price: "2،250،000",
      currency: "تومان",
    },
    {
      title: "پوسته سپر جلو سراتو قدیم",
      rows: [
        [
          { label: "برند", value: "کیا" },
          { label: "مدل خودرو", value: "سراتو" },
          { label: "کد فنی", value: "۸۶۶۹۵۱M۰۰۰" },
        ],
        [
          { label: "کشور سازنده", value: "ایران" },
          { label: "گارانتی سلامت فیزیکی", value: "دارد" },
          { label: "برند تولید کننده", value: "نیرومحرکه" },
        ],
      ],
      price: "2،250،000",
      currency: "تومان",
    },
    {
      title: "پوسته سپر جلو سراتو قدیم",
      rows: [
        [
          { label: "برند", value: "کیا" },
          { label: "مدل خودرو", value: "سراتو" },
          { label: "کد فنی", value: "۸۶۶۹۵۱M۰۰۰" },
        ],
        [
          { label: "کشور سازنده", value: "ایران" },
          { label: "گارانتی سلامت فیزیکی", value: "دارد" },
          { label: "برند تولید کننده", value: "نیرومحرکه" },
        ],
      ],
      price: "2،250،000",
      currency: "تومان",
    },
  ];

  return (
    <div className="w-full max-w-[638px] flex flex-col gap-[32px]">
      {products.map((product, productIndex) => (
        <div key={productIndex} className="w-full flex flex-col gap-[16px]">
          {/* عنوان */}
          <div className="text-[20px] sm:text-[24px] md:text-[28px] text-[#1C2024] font-yekanBold text-center sm:text-center md:text-right">
            {product.title}
          </div>

          {/* ردیف‌های مشخصات */}
          {product.rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="w-full rounded-[24px] bg-[#FCFCFD] border border-[#E8E8EC] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8EC]"
            >
              {row.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex-1 flex flex-col gap-[16px] justify-center p-4"
                >
                  <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                    {item.label}
                  </div>
                  <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* قیمت */}
          <div className="flex gap-[4px] items-center justify-center md:justify-start">
            <div className="text-[20px] md:text-[24px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
              {product.price}
            </div>
            <div className="text-[12px] md:text-[14px] text-[#004D7A] font-yekanDemiBold leading-[16px]">
              {product.currency}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
