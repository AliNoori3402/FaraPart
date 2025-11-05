"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import PackDetails from "../../components/PackDetails";
import TextDetails from "../../components/TextDetails";

interface Car {
  id: number;
  name: string;
  brand: { display_name: string };
}

interface Part {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
  cars: Car[];
  category_title: string;
  warranty_name?: string;
}

interface Pack {
  id: number;
  title: string;
  description: string;
  parts: Part[];
  discount_percent: number;
  total_original_price: number;
  final_discounted_price: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export default function PackPage() {
  const { id } = useParams();
  const [pack, setPack] = useState<Pack | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const res = await axios.get(
          `https://www.django.farapartmotor.com/api/admin/discount-pack/${id}/`
        );
        setPack(res.data);
      } catch (err) {
        console.error("Error fetching pack:", err);
      }
    };
    if (id) fetchPack();
  }, [id]);

  if (!pack) {
    return (
      <div className="w-full text-center py-10 text-lg font-yekanDemiBold">
        در حال بارگذاری پک...
      </div>
    );
  }

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const allImages = pack.parts.flatMap((p) => p.image_urls || []);

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] py-10 px-4 md:px-8">
      {/* مسیر نان‌بری */}
      <div className="w-full max-w-6xl mx-auto flex items-center gap-2 text-[#444] mb-6">
        <span className="font-yekanDemiBold text-[14px]">لوازم یدکی</span>
        <Image
          width={16}
          height={16}
          src="/Arrow-leftG.svg"
          alt="arrow"
          className="w-[16px] h-[16px]"
        />
        <span className="font-yekanDemiBold text-[14px] text-[#004D7A]">
          {pack.title}
        </span>
      </div>

      {/* محتوا اصلی */}
      <div className="lg:flex lg:gap-10 max-w-6xl mx-auto">
        {/* ستون گالری sticky */}
        <div className="lg:w-5/12">
          <div className="lg:sticky top-24 flex flex-col gap-4">
            {/* تصویر بزرگ */}
            {allImages[selectedIndex] && (
              <div className="w-full h-[432px] rounded-3xl bg-[#FCFCFD] border border-[#E0E1E6] flex items-center justify-center">
                <Image
                  src={allImages[selectedIndex]}
                  alt="selected"
                  width={290}
                  height={234}
                  className="object-contain w-full h-full"
                />
              </div>
            )}

            {/* تصاویر کوچک */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 mt-4">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`min-w-[120px] h-[100px] rounded-2xl cursor-pointer flex items-center justify-center border-2 ${
                    selectedIndex === idx
                      ? "border-[#007BFF]"
                      : "border-[#E0E1E6]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`img-${idx}`}
                    width={90}
                    height={73}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ستون اطلاعات و خرید */}
        <div className="lg:w-7/12 mt-8 lg:mt-0 flex flex-col gap-6">
          {/* عنوان و توضیحات */}
          <div className="space-y-3 text-center lg:text-right">
            <h1 className="text-[28px] text-[#1C2024] font-yekanBold">
              {pack.title}
            </h1>
            <p className="text-[15px] text-[#8B8D98] font-yekanRegular leading-relaxed">
              {pack.description || "توضیحات برای این پک ثبت نشده است."}
            </p>
          </div>

          {/* جزئیات قطعات */}
          <PackDetails parts={pack.parts} />

          {/* قیمت و دکمه خرید */}
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex flex-wrap justify-between items-center gap-3 bg-[#F9FAFB] p-4 rounded-2xl border border-[#E0E1E6]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="text-[16px] text-[#B9BBC6] line-through font-yekanDemiBold">
                  {pack.total_original_price.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[20px] text-[#004D7A] font-yekanExtraBold">
                    {pack.final_discounted_price.toLocaleString()}
                  </span>
                  <span className="text-[12px] text-[#004D7A] font-yekanDemiBold">
                    تومان
                  </span>
                </div>
              </div>
              <div className="w-[45px] h-[29px] rounded-full bg-[#D93629] text-[14px] text-white font-yekanDemiBold flex justify-center items-center">
                %{pack.discount_percent}
              </div>
            </div>

            {/* کنترل تعداد و دکمه خرید */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={increaseQuantity}
                  className="w-[48px] h-[48px] rounded-2xl bg-[#006FB4] flex justify-center items-center hover:bg-[#005a8f] transition"
                >
                  <Image width={24} height={24} src="/Add.svg" alt="add" />
                </button>
                <span className="text-[20px] font-yekanDemiBold">
                  {quantity}
                </span>
                <button
                  onClick={decreaseQuantity}
                  className="w-[48px] h-[48px] rounded-2xl bg-white border border-[#E0E1E6] flex justify-center items-center hover:bg-gray-100 transition"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/negative.svg"
                    alt="minus"
                  />
                </button>
              </div>

              <button className="w-full sm:w-[250px] h-[52px] bg-[#004D7A] hover:bg-[#006FB4] transition text-white font-yekanBold rounded-2xl flex justify-center items-center gap-3">
                <Image width={24} height={24} src="/addbasket.svg" alt="cart" />
                <span>افزودن به سبد خرید</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* توضیحات بیشتر */}
      <div className="w-full max-w-6xl mx-auto mt-10">
        <TextDetails />
      </div>
    </div>
  );
}
