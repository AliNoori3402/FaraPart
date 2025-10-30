"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import Image from "next/image";
import { toast } from "sonner";
import ProductImages from "../../../../components/DeatilPartImage";
import TextDetails from "../../../../components/TextDetails";

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
  category: { name: string };
  inventory_warning: string;
  has_warranty: boolean;
  warranty_name: string | null;
  inventory?: number;
};

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  console.log(params);
  const productId = params?.productId;
  const [activeTab, setActiveTab] = useState<"description" | "specs">(
    "description"
  );
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [hasInventory, setHasInventory] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!productId) return;

    const fetchProductAndInventory = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/AllProduct/${productId}`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات محصول");
        const data = await res.json();
        setProduct(data);

        try {
          const inventoryRes = await axios.post(
            "http://194.5.175.107:8000/api/products/inventory/",
            { id: Number(productId) },
            { headers: { "Content-Type": "application/json" } }
          );
          setHasInventory(inventoryRes.data?.has_inventory ?? false);
        } catch (invErr) {
          console.error("خطا در دریافت موجودی:", invErr);
          setHasInventory(null);
        }
      } catch (err) {
        setError((err as Error).message);
        toast.error("خطایی در دریافت اطلاعات محصول رخ داد");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndInventory();
  }, [productId]);

  const addToCart = async (quantityToAdd: number) => {
    if (!productId) return toast.error("شناسه محصول نامشخص است");

    const rawAccessToken = localStorage.getItem("accessToken");
    const accessToken = rawAccessToken
      ? rawAccessToken.replace(/^"(.*)"$/, "$1")
      : null;
    if (!accessToken) return toast.error("لطفا ابتدا وارد شوید");

    try {
      await axios.post(
        "/api/Addcart",
        { part_id: Number(productId), quantity: quantityToAdd },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toast.success("محصول با موفقیت به سبد خرید اضافه شد ✅");
    } catch (err) {
      toast.error("خطا در افزودن به سبد خرید ❌");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div className="text-[#1C2024] font-yekanRegular mt-2">
          در حال بارگذاری ...
        </div>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!product) return <div>محصول یافت نشد</div>;

  return (
    <div className="w-full max-w-[1440px] flex flex-col gap-[64px] mx-auto px-4 md:px-[10px]">
      <div className="w-full flex flex-col gap-[48px] items-center">
        {/* مسیر دسته‌بندی */}
        <div className="w-full max-w-[454px] flex flex-wrap gap-[4px] justify-center sm:justify-center md:justify-start">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            لوازم یدکی
          </div>
          <Image width={16} height={16} src="/Arrow-leftG.svg" alt="arrow" />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {product.category.name}
          </div>
          <Image width={16} height={16} src="/Arrow-leftG.svg" alt="arrow" />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {product.car_names.join(", ")}
          </div>
          <Image width={16} height={16} src="/Arrow-leftG.svg" alt="arrow" />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {product.name}
          </div>
        </div>

        {/* تصاویر و جزئیات */}
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
                  {hasInventory === null
                    ? "در حال دریافت..."
                    : hasInventory
                    ? "دارد"
                    : "ندارد"}
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

            {/* قیمت و خرید */}
            {product.inventory === 0 || !hasInventory ? (
              <div className="w-full text-center md:text-right text-[16px] text-[#D32F2F] font-yekanDemiBold mt-4">
                {product.inventory_warning ||
                  "این محصول در حال حاضر موجود نیست"}
              </div>
            ) : (
              <>
                {/* قیمت */}
                <div className="flex gap-[4px] items-center justify-center md:justify-start">
                  <div className="text-[24px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
                    {product.price.toLocaleString("fa-IR")}
                  </div>
                  <div className="text-[14px] text-[#004D7A] font-yekanDemiBold leading-[16px]">
                    تومان
                  </div>
                </div>

                {/* کنترل تعداد و خرید */}
                <div className="flex flex-col sm:flex-row gap-[16px]">
                  <div className="flex items-center gap-[16px] justify-center sm:justify-start">
                    <button
                      onClick={() => {
                        if (
                          product.inventory &&
                          quantity >= product.inventory
                        ) {
                          toast.error(
                            `حداکثر موجودی ${product.inventory} عدد است`
                          );
                          return;
                        }
                        setQuantity((q) => q + 1);
                      }}
                      className="w-[48px] h-[48px] rounded-[20px] bg-[#006FB4] flex justify-center items-center"
                      disabled={!hasInventory}
                    >
                      <Image src="/Add.svg" width={24} height={24} alt="+" />
                    </button>
                    <div className="text-[20px] text-[#000000] font-yekanDemiBold">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                      className="w-[48px] h-[48px] rounded-[20px] bg-[#FCFCFD] border border-[#E0E1E6] flex justify-center items-center"
                      disabled={!hasInventory}
                    >
                      <Image
                        src="/negative.svg"
                        width={24}
                        height={24}
                        alt="-"
                      />
                    </button>
                  </div>

                  <div className="flex-1 flex gap-[16px]">
                    <button
                      onClick={() => addToCart(quantity)}
                      className="flex-1 min-w-[140px] h-[48px] rounded-[16px] flex justify-center items-center gap-[12px] bg-[#004D7A]"
                      disabled={!hasInventory}
                    >
                      <Image
                        width={24}
                        height={24}
                        src="/addbasket.svg"
                        alt="خرید تکی"
                      />
                      <div className="text-[14px] text-[#FCFCFD] font-yekanRegular">
                        خرید تکی
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <TextDetails />
      <div className="w-full px-10 pb-10  mt-8">
        {/* تب‌ها */}
        <div className="flex bg-[#F5F5F7] rounded-xl shadow-sm overflow-hidden border border-[#E0E1E6]">
          <button
            className={`flex-1 py-3 font-yekanDemiBold transition-colors duration-200 ${
              activeTab === "description"
                ? "bg-[#004D7A] text-white"
                : "text-[#8B8D98] hover:bg-[#E0E1E6]"
            }`}
            onClick={() => setActiveTab("description")}
          >
            معرفی محصول
          </button>
          <button
            className={`flex-1 py-3 font-yekanDemiBold transition-colors duration-200 ${
              activeTab === "specs"
                ? "bg-[#004D7A] text-white"
                : "text-[#8B8D98] hover:bg-[#E0E1E6]"
            }`}
            onClick={() => setActiveTab("specs")}
          >
            مشخصات فنی
          </button>
        </div>

        {/* محتوای تب‌ها */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 text-[#1C2024] font-yekanRegular text-[14px]">
          {activeTab === "description" ? (
            product.description ? (
              <p className="leading-relaxed">{product.description}</p>
            ) : (
              <p className="text-[#8B8D98]">این محصول توضیحی ندارد.</p>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-yekanDemiBold text-[#004D7A]">
                  کد داخلی
                </span>
                <span>{product.internal_code}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-yekanDemiBold text-[#004D7A]">
                  کد تجاری
                </span>
                <span>{product.commercial_code}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-yekanDemiBold text-[#004D7A]">
                  نوع قطعه
                </span>
                <span>
                  {product.part_type === "spare" ? "مصرفی" : "غیر مصرفی"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-yekanDemiBold text-[#004D7A]">
                  دسته بندی
                </span>
                <span>{product.category.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-yekanDemiBold text-[#004D7A]">
                  خودروهای سازگار
                </span>
                <span>{product.car_names.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-yekanDemiBold text-[#004D7A]">
                  گارانتی
                </span>
                <span>
                  {product.has_warranty
                    ? product.warranty_name || "دارد"
                    : "ندارد"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
