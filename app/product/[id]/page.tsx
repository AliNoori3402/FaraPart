"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import axios from "axios";
import ProductImages from "../../components/DeatilPartImage";
import TextDetails from "../../components/TextDetails";
import Image from "next/image";

type ProductDetail = {
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

  inventory: number;
  inventory_warning: string;
  has_warranty: boolean;
  warranty_name: string | null;
};

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // state تعداد کالا
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/AllProduct/${id}`);
        if (!res.ok) {
          throw new Error("خطا در دریافت اطلاعات محصول");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // تابع افزودن به سبد خرید
  const addToCart = async (quantityToAdd: number) => {
    if (!id) {
      alert("شناسه محصول نامشخص است");
      return;
    }

    const rawAccessToken = localStorage.getItem("accessToken"); // یا accessToken اگر نامش متفاوت است
    const accessToken = rawAccessToken
      ? rawAccessToken.replace(/^"(.*)"$/, "$1")
      : null;

    if (!accessToken) {
      alert("لطفا ابتدا وارد شوید");
      return;
    }

    const response = await axios.post(
      "/api/Addcart",
      {
        part_id: Number(id),
        quantity: quantityToAdd,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>محصول یافت نشد</div>;

  return (
    <div className="w-full max-w-[1440px] flex flex-col gap-[64px] mx-auto px-4 md:px-[10px]">
      <div className="w-full flex flex-col gap-[48px] items-center">
        <div className="w-full max-w-[454px] flex flex-wrap gap-[4px] justify-center sm:justify-center md:justify-start">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی
          </div>
          <Image
            width={16}
            height={16}
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {product.category.name}
          </div>
          <Image
            width={16}
            height={16}
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {product.car_names.join(", ")}
          </div>
          <Image
            width={16}
            height={16}
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {product.name}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-col md:flex-row gap-[32px] sm:gap-[32px] md:gap-[67px] items-center md:items-start">
          <ProductImages images={product.image_urls} />

          <div className="w-full max-w-[591px] flex flex-col gap-[40px]">
            <div className="text-[28px] text-[#1C2024] font-yekanBold text-center sm:text-center md:text-right">
              {product.name}
            </div>

            {/* ردیف اول */}
            <div className="w-full rounded-[24px] bg-[#FCFCFD] border border-[#E8E8EC] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8EC]">
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  کد داخلی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.internal_code}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  کد تجاری
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.commercial_code}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  نوع قطعه
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.part_type === "spare" ? "مصرفی" : "غیر مصرفی"}
                </div>
              </div>
            </div>

            {/* ردیف دوم */}
            <div className="w-full rounded-[24px] bg-[#FCFCFD] border border-[#E8E8EC] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8EC]">
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  موجودی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.inventory > 0
                    ? product.inventory
                    : product.inventory_warning}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  گارانتی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.has_warranty
                    ? product.warranty_name || "دارد"
                    : "ندارد"}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  دسته بندی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.category.name}
                </div>
              </div>
            </div>

            <div className="flex gap-[4px] items-center justify-center md:justify-start">
              <div className="text-[24px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
                {product.price.toLocaleString("fa-IR")}
              </div>
              <div className="text-[14px] text-[#004D7A] font-yekanDemiBold leading-[16px]">
                تومان
              </div>
            </div>

            {/* کنترل تعداد و دکمه های خرید */}
            <div className="flex flex-col sm:flex-row gap-[16px]">
              <div className="flex items-center gap-[16px] justify-center sm:justify-start">
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(q + 1, product.inventory))
                  }
                  className="w-[48px] h-[48px] rounded-[20px] bg-[#006FB4] flex justify-center items-center"
                  aria-label="افزایش تعداد"
                >
                  <Image src="/Add.svg" className="w-[24px] h-[24px]" alt="+" />
                </button>
                <div className="text-[20px] text-[#000000] font-yekanDemiBold">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="w-[48px] h-[48px] rounded-[20px] bg-[#FCFCFD] border border-[#E0E1E6] flex justify-center items-center"
                  aria-label="کاهش تعداد"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/negative.svg"
                    className="w-[24px] h-[24px]"
                    alt="-"
                  />
                </button>
              </div>

              <div className="flex-1 flex gap-[16px]">
                <button
                  onClick={() => addToCart(1)}
                  className="flex-1 min-w-[140px] h-[48px] rounded-[16px] flex justify-center items-center gap-[12px] bg-[#004D7A]"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/addbasket.svg"
                    className="w-[24px] h-[24px]"
                    alt="خرید تکی"
                  />
                  <div className="text-[14px] text-[#FCFCFD] font-yekanRegular">
                    خرید تکی
                  </div>
                </button>
                <button
                  onClick={() => addToCart(quantity)}
                  className="flex-1 min-w-[140px] h-[48px] rounded-[16px] flex justify-center items-center gap-[12px] bg-[#FCFCFD] border border-[#006FB4]"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/addbasketB.svg"
                    className="w-[24px] h-[24px]"
                    alt="خرید عمده"
                  />
                  <div className="text-[14px] text-[#006FB4] font-yekanRegular">
                    خرید عمده
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TextDetails />
    </div>
  );
};

export default ProductDetailPage;
