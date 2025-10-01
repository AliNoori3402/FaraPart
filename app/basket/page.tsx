"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Part {
  id: number;
  name: string;
  price: number;
  image_urls: string[];
}

interface CartItem {
  id: number;
  part: Part;
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
  total_price: number;
  message: string;
}

function Page() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("توکن پیدا نشد. لطفاً وارد شوید.");
          setLoading(false);
          return;
        }
        const res = await axios.get("/api/ListCart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
      } catch (err: any) {
        console.error("خطا در گرفتن اطلاعات سبد:", err);
        setError("خطا در دریافت اطلاعات سبد خرید");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // حذف یک کالا از سبد
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("توکن پیدا نشد!");
        return;
      }

      await axios.delete(`/api/ListCart/delete/${id}`, {
        headers: { Authorization: `Token ${token}` }, // توجه به فرمت Token
      });

      // حذف آیتم از state بدون نیاز به رفرش
      setCart((prev: any) => ({
        ...prev,
        items: prev.items.filter((item: any) => item.id !== id),
      }));
    } catch (err) {
      console.error("خطا در حذف کالا:", err);
      alert("خطا در حذف کالا");
    }
  };
  if (loading) {
    return <div className="p-4">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="p-4">سبد خرید شما خالی است.</div>;
  }

  return (
    <div className="w-full bg-[#F9F9FB] flex justify-center px-4 py-8">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row gap-10 lg:gap-[87px]">
        {/* سبد خرید */}
        <div className="w-full max-w-[1000px] flex flex-col gap-6">
          <div className="text-[14px] text-[#8B8D98] font-yekanDemiBold">
            سبد خرید شما
          </div>

          {cart.items.map((item) => (
            <div
              key={item.id}
              className="w-full rounded-[24px] border border-[#E0E1E6] bg-white flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-6"
            >
              <div className="w-full sm:w-[123px] h-[99px] flex justify-center items-center">
                {item.part.image_urls.length > 0 ? (
                  <Image
                    src={item.part.image_urls[0]}
                    className="h-full object-contain"
                    alt={item.part.name}
                  />
                ) : (
                  <Image
                    src="/Light.svg"
                    alt=""
                    className="h-full object-contain"
                  />
                )}
              </div>

              <div className="flex flex-col gap-4 flex-grow">
                <div className="text-[14px] text-[#1C2024] font-yekanDemiBold leading-[20px]">
                  {item.part.name}
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-1">
                    <div className="text-[16px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
                      {item.part.price.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-[#004D7A] font-yekanDemiBold">
                      تومان
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button className="w-12 h-12 rounded-[20px] bg-[#006FB4] flex justify-center items-center">
                      <Image src="/Add.svg" alt="" className="w-6 h-6" />
                    </button>
                    <span className="text-[20px] font-yekanDemiBold">
                      {item.quantity}
                    </span>
                    <button className="w-12 h-12 rounded-[20px] bg-[#FCFCFD] border border-[#E0E1E6] flex justify-center items-center">
                      <Image src="/negative.svg" alt="" className="w-6 h-6" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-12 h-12 rounded-[20px] bg-[#FCFCFD] border border-[#E0E1E6] flex justify-center items-center"
                  >
                    <Image src="/trash.svg" alt="" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* فاکتور خرید */}
        <div className="w-full max-w-[508px] flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="text-[14px] text-[#8B8D98] font-yekanDemiBold">
              صورت حساب
            </div>
            <div className="flex justify-between border-b border-[#E0E1E6] pb-2">
              <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
                قیمت کل محصولات انتخابی
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[20px] text-[#1C2024] font-yekanDemiBold">
                  {cart.total_price.toLocaleString()}
                </span>
                <span className="text-[12px] text-[#1C2024] font-yekanRegular">
                  تومان
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b border-[#E0E1E6] pb-4">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
                مالیات بر ارزش افزوده
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[20px] text-[#1C2024] font-yekanDemiBold">
                  ۰
                </span>
                <span className="text-[12px] text-[#1C2024] font-yekanRegular">
                  تومان
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/discount-tag.svg" alt="" className="w-5 h-5" />
              <span className="text-[14px] text-[#D93629] font-yekanRegular">
                کد تخفیف دارید؟
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#008BDF] font-yekanBold">
                قیمت پرداخت نهایی
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[20px] text-[#008BDF] font-yekanDemiBold">
                  {cart.total_price.toLocaleString()}
                </span>
                <span className="text-[12px] text-[#008BDF] font-yekanRegular">
                  تومان
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-[14px] text-[#8B8D98] font-yekanDemiBold">
                انتخاب درگاه پرداختی
              </div>

              <div className="flex flex-wrap gap-4">
                {[false, true, false].map((active, index) => (
                  <div
                    key={index}
                    className={`w-[108px] h-[84px] rounded-[32px] flex justify-center items-center text-[14px] font-yekanBold ${
                      active
                        ? "border border-[#008BDF]"
                        : "border border-[#E0E1E6]"
                    } bg-[#FCFCFD]`}
                  >
                    درگاه
                  </div>
                ))}
              </div>

              <button className="w-full h-12 rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-white text-[14px] font-yekanRegular">
                پرداخت نهایی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
