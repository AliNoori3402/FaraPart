"use client";

import React from "react";

const products = [
  {
    id: 1,
    title: "رم دسکتاپ مدل SPECTRIX D60G DDR4 RGB ظرفیت 8 گیگابایت",
    image: "/Light.svg",
    price: "2٬250٬000",
    discount: "20%-",
  },
  {
    id: 2,
    title: "رم CORSAIR Vengeance LPX ظرفیت 16 گیگ",
    image: "/Light.svg",
    price: "3٬450٬000",
    discount: "15%-",
  },
  {
    id: 3,
    title: "رم ADATA XPG Spectrix ظرفیت 8 گیگ",
    image: "/Light.svg",
    price: "1٬950٬000",
    discount: "10%-",
  },
  {
    id: 4,
    title: "رم KINGSTON Fury Beast 8GB",
    image: "/Light.svg",
    price: "2٬100٬000",
    discount: "18%-",
  },
  {
    id: 5,
    title: "رم CORSAIR Vengeance LPX ظرفیت 16 گیگ",
    image: "/Light.svg",
    price: "3٬450٬000",
    discount: "15%-",
  },
  {
    id: 6,
    title: "رم ADATA XPG Spectrix ظرفیت 8 گیگ",
    image: "/Light.svg",
    price: "1٬950٬000",
    discount: "10%-",
  },
  {
    id: 7,
    title: "رم KINGSTON Fury Beast 8GB",
    image: "/Light.svg",
    price: "2٬100٬000",
    discount: "18%-",
  },
  {
    id: 8,
    title: "رم دسکتاپ مدل SPECTRIX D60G DDR4 RGB ظرفیت 8 گیگابایت",
    image: "/Light.svg",
    price: "2٬250٬000",
    discount: "20%-",
  },
  {
    id: 9,
    title: "رم CORSAIR Vengeance LPX ظرفیت 16 گیگ",
    image: "/Light.svg",
    price: "3٬450٬000",
    discount: "15%-",
  },
  {
    id: 10,
    title: "رم ADATA XPG Spectrix ظرفیت 8 گیگ",
    image: "/Light.svg",
    price: "1٬950٬000",
    discount: "10%-",
  },
];

const ProductCard: React.FC<{ product: (typeof products)[0] }> = ({
  product,
}) => {
  return (
    <div className="w-[243px] h-[342px] rounded-[20px] bg-white flex flex-col justify-center items-center gap-[16px] border border-[#E0E1E6] hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300">
      <div className="w-[221px] h-[178px] relative overflow-hidden">
        <div className="w-[45px] h-[29px] rounded-full bg-[#D93629] text-white text-[16px] font-yekanRegular flex justify-center items-center absolute top-2 right-2 z-10">
          {product.discount}
        </div>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-[221px] h-[118px] flex flex-col gap-[28px]">
        <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
          {product.title}
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row gap-[4px] items-center">
            <p className="text-[16px] text-[#B9BBC6] font-yekanDemiBold line-through">
              3٬000٬000
            </p>
            <div className="flex flex-row gap-[4px] items-center">
              <div className="text-[20px] text-[#004D7A] font-yekanDemiBold">
                {product.price}
              </div>
              <div className="text-[12px] text-[#004D7A] font-yekanDemiBold">
                تومان
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-[4px]">
            <div className="text-[14px] text-[#006FB4] font-yekanDemiBold">
              مشاهده جزئیات و خرید
            </div>
            <img src="/Arrow-leftB.svg" className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const OfferList: React.FC = () => {
  return (
    <div
      className="
        w-full max-w-[1280px] 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-[19px] px-4 mx-auto mb-[40px] justify-center
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default OfferList;
