"use client";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#005E95] rounded-[32px] px-4 py-10 sm:px-6 lg:px-12 max-w-[1280px] mx-auto">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between gap-12">
        {/* توضیحات برند */}
        <div className="flex flex-col gap-8 max-w-[376px] mx-auto lg:mx-0">
          <div className="flex items-center gap-6 justify-center lg:justify-start">
            <div className="w-[126px] h-[65px] bg-[#D9D9D9]" />
            <div className="text-[32px] sm:text-[36px] text-white font-yekanBold">
              اسم برند
            </div>
          </div>
          <p className="text-[14px] text-white font-yekanRegular leading-7 text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد...
          </p>
        </div>

        {/* لینک‌ها */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-12 w-full lg:w-auto">
          {/* دسترسی سریع */}
          <div className="flex flex-col gap-6 min-w-[140px]">
            <h3 className="text-white text-[18px] font-yekanDemiBold">
              دسترسی سریع
            </h3>
            <ul className="text-white text-[16px] font-yekanRegular flex flex-col gap-3">
              <li>تماس با ما</li>
              <li>قوانین و مقررات</li>
              <li>فروش اعتباری</li>
              <li>درباره ماشین نو</li>
              <li>وبلاگ</li>
              <li>شرایط بازگشت کالا</li>
            </ul>
          </div>

          {/* لوازم یدکی */}
          <div className="flex flex-col gap-6 min-w-[140px]">
            <h3 className="text-white text-[18px] font-yekanDemiBold">
              لوازم یدکی
            </h3>
            <ul className="text-white text-[16px] font-yekanRegular flex flex-col gap-3">
              <li>لوازم یدکی بنز</li>
              <li>لوازم یدکی کیا</li>
              <li>لوازم یدکی هیوندا</li>
              <li>لوازم یدکی پژو</li>
              <li>لوازم یدکی سایپا</li>
              <li>لوازم یدکی رنو</li>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی و نماد */}
          <div className="flex flex-col gap-8 items-center lg:items-start">
            <div>
              <h3 className="text-white text-[18px] font-yekanDemiBold mb-4">
                شبکه‌های اجتماعی
              </h3>
              <div className="flex gap-4">
                <Image src="/tel.svg" alt="تلگرام" />
                <Image src="/whats.svg" alt="واتساپ" />
                <Image src="/insta.svg" alt="اینستاگرام" />
              </div>
            </div>
            <div className="w-[158px] h-[108px] bg-[#D9D9D9]" />
          </div>
        </div>
      </div>

      {/* خط جداکننده و کپی‌رایت */}
      <div className="mt-10 border-t border-[#B9BBC6] pt-4 text-center text-white text-[14px] font-yekanRegular">
        تمامی حقوق مادی و معنوی برای اسم برند محفوظ است. هرگونه کپی‌برداری پیگرد
        قانونی دارد.
      </div>
    </div>
  );
}
