"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const socialLinks = [
    {
      href: "https://t.me/FarapartSupport",
      icon: "/tel.svg",
      alt: "تلگرام",
    },
    {
      href: "https://wa.me/message/F5TZLNS2VGLQG1",
      icon: "/whats.svg",
      alt: "واتساپ",
    },
    {
      href: "https://www.instagram.com/farapartcom?igsh=NXVneWFrNGF4eWt4",
      icon: "/insta.svg",
      alt: "اینستاگرام",
    },
  ];

  return (
    <div className="bg-[#005E95] rounded-[32px] px-4 py-10 sm:px-6 lg:px-12 max-w-[1280px] mx-auto">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between gap-12">
        {/* توضیحات برند */}
        <div className="flex flex-col gap-8 max-w-[376px] mx-auto lg:mx-0">
          <div className="flex items-center gap-6 justify-center lg:justify-start">
            <Link href={"/"}>
              <div className="w-[126px] h-[65px] bg-[#D9D9D9]" />
            </Link>
            <div className="w-[126px] h-[65px] bg-[#D9D9D9]" />
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

              <Link href={"/TermsAndCondition"}>
                <li>قوانین و مقررات</li>
              </Link>
              <Link href={"/about-us"}>
                {" "}
                <li>درباره فراپارت</li>
              </Link>
              <Link href={"/blogs"}>
                <li>وبلاگ</li>
              </Link>

              <Link href={"/ReturnPolicy"}>
                <li>شرایط بازگشت کالا</li>
              </Link>
            </ul>
          </div>

          {/* لوازم یدکی */}
          <div className="flex flex-col gap-6 min-w-[140px]">
            <h3 className="text-white text-[18px] font-yekanDemiBold">
              لوازم یدکی
            </h3>
            <ul className="text-white text-[16px] font-yekanRegular flex flex-col gap-3">
              <Link href={`/product?${"brand_id=2"}`}>
                <li>لوازم یدکی پژو</li>
              </Link>
              <Link href={`/product?${"brand_id=3"}`}>
                <li>لوازم یدکی ایران خودرو</li>
              </Link>
              <Link href={`/product?${"brand_id=7"}`}>
                <li>لوازم یدکی رنو</li>
              </Link>
              <Link href={`/product?${"brand_id=8"}`}>
                <li>لوازم یدکی سوزوکی</li>
              </Link>
              <Link href={`/product?${"brand_id=9"}`}>
                <li>لوازم یدکی چری</li>
              </Link>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی و نماد */}
          <div className="flex flex-col gap-8 items-center lg:items-start">
            <div>
              <h3 className="text-white text-[18px] font-yekanDemiBold mb-4">
                شبکه‌های اجتماعی
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110 hover:shadow-lg rounded-full p-2"
                  >
                    <Image
                      src={link.icon}
                      width={24}
                      height={24}
                      alt={link.alt}
                    />
                  </a>
                ))}
              </div>
            </div>
            <Link href={"/"}>
              <div className="w-[158px] h-[108px] bg-[#D9D9D9]" />
            </Link>
          </div>
        </div>
      </div>

      {/* خط جداکننده و کپی‌رایت */}
      <div className="mt-10 border-t border-[#B9BBC6] pt-4 text-center text-white text-[14px] font-yekanRegular">
        تمامی حقوق مادی و معنوی برای اسم فراپارت محفوظ است. هرگونه کپی‌برداری
        پیگرد قانونی دارد.
      </div>
    </div>
  );
}
