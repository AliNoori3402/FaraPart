import React from "react";
import ProductImages from "../../../components/DeatilPartImage";
import Image from "next/image";

function page() {
  return (
    <div className="w-full max-w-[1440px] flex flex-col gap-[64px] mx-auto pr-[10px] pb-[70px]">
      {/* عنوان و عکس و توضیح */}
      <div className="w-full max-w-[1280px] flex flex-col gap-[48px] justify-center items-center px-4">
        {/* مسیر breadcrumb */}
        <div className="flex flex-wrap gap-[4px] w-full justify-center ">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            بررسی تخصصی
          </div>
          <Image
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            بررسی تخصصی کیا
          </div>
          <Image
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            بررسی تخصصی سراتو
          </div>
          <Image
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px]"
          />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            کلاچ
          </div>
        </div>

        {/* عکس + متن */}
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-[40px]">
          {/* <ProductImages /> */}
          <div className="w-full lg:w-[591px] flex flex-col gap-[24px]">
            <div className="text-[28px] text-[#1C2024] font-yekanBold">
              کلاچ
            </div>
            <div className="text-[14px] text-[#1C2024] font-yekanRegular leading-[28px] text-justify">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد...
            </div>
          </div>
        </div>
      </div>

      {/* جدول مشخصات */}
      <div className="w-full max-w-[1280px] flex flex-col gap-[12px] px-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-full rounded-[24px] bg-[#FCFCFD] border border-[#E8E8EC] flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E8E8EC] text-right"
          >
            {/* ستون 1 */}
            <div className="flex-1 flex flex-col gap-[8px] justify-center p-4">
              <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                راهنمای تصویر
              </div>
              <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                1
              </div>
            </div>
            {/* ستون 2 */}
            <div className="flex-1 flex flex-col gap-[8px] justify-center p-4">
              <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                کد اختصاصی
              </div>
              <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                سراتو
              </div>
            </div>
            {/* ستون 3 */}
            <div className="flex-1 md:flex-[1.2] flex flex-col gap-[8px] justify-center p-4">
              <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                شرح اختصاصی
              </div>
              <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                واشر کامل موتور
              </div>
            </div>
            {/* ستون 4 */}
            <div className="flex-1 flex flex-col gap-[8px] justify-center p-4">
              <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                تعداد در خودرو
              </div>
              <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                1
              </div>
            </div>
            {/* ستون 5 */}
            <div className="flex-1 md:flex-[1.3] flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
              <div className="flex flex-col gap-[8px]">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  تعداد کاربردی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  1
                </div>
              </div>
              <div className="flex items-center gap-[8px] cursor-pointer">
                <span className="text-[#006FB4] text-[14px] font-yekanDemiBold">
                  صفحه خرید
                </span>
                <Image
                  src="/Arrow-leftB.svg"
                  className="w-[20px] h-[20px]"
                  alt="arrow"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
