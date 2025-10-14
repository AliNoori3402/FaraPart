"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  code: string;
  logo_binary: string;
  name: string;
}

interface Brand {
  id: number;
  name: string;
  display_name: string;
  cars: Car[];
  logo_binary: string;
}

export default function BrandGrid() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [width, setWidth] = useState<number>(1280);
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("/api/brand");
        setBrands(res.data);
      } catch (err) {
        console.error("خطا در axios:", err);
      }
    };

    fetchBrands();

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  // ✅ اینجا هم id و هم display_name رو نگه می‌داریم
  const brandItems = brands.map((b) => ({
    id: b.id,
    name: b.display_name,
    logo_binary: b.logo_binary,
  }));

  const rows: { id: number; name: string; logo_binary: string }[][] = [];

  if (isMobile) {
    rows.push(brandItems);
  } else if (isTablet) {
    const firstRow = [...brandItems.slice(0, 3)];
    rows.push(firstRow);
    for (let i = 3; i < brandItems.length; i += 4) {
      rows.push(brandItems.slice(i, i + 4));
    }
  } else {
    const firstRow = [...brandItems.slice(0, 4)];
    rows.push(firstRow);
    for (let i = 4; i < brandItems.length; i += 5) {
      rows.push(brandItems.slice(i, i + 5));
    }
  }

  const tabletHeight = 921;
  const desktopHeight = 632;
  const rowCount = rows.length;
  const rowHeight = isTablet
    ? tabletHeight / rowCount
    : isDesktop
    ? desktopHeight / rowCount
    : 0;

  return (
    <>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="responsiveClip" clipPathUnits="objectBoundingBox">
            <path d="M0.808 0.203 C0.808 0.230 0.819 0.253 0.833 0.253 H0.975 C0.990 0.253 1 0.276 1 0.304 V0.949 C1 0.977 0.990 1 0.975 1 H0.025 C0.0112 1 0 0.977 0 0.949 V0.0508 C0 0.0226 0.0112 0 0.025 0 H0.783 C0.797 0 0.808 0.0226 0.808 0.0508 V0.203 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className={`
          relative mx-auto mt-10
          ${isDesktop ? "md:w-[1280px] md:h-[632px]" : ""}
          ${isTablet ? "sm:w-[770px] sm:h-[921px]" : ""}
          ${isMobile ? "w-[361px] h-[258px]" : ""}
          flex justify-center items-center
        `}
      >
        {/* باکس عنوان بالا */}
        <div
          className="absolute z-[999] w-[194px] h-[75px] rounded-[12px]
          flex flex-col items-center justify-center gap-[12px] px-2
          md:top-[42px] md:right-[16px]
          sm:top-[80px] sm:right-[-46px]
          top-[-92px]"
        >
          <div className="text-[32px] text-[#006FB4] font-yekanDemiBold leading-none">
            برند ها
          </div>
          <div className="text-[16px] md:w-[194px] sm:w-[144px] w-[194px] text-[#80838D] font-yekanRegular text-center leading-none">
            برند خودرو خود را انتخاب کنید
          </div>
        </div>

        <div
          className="w-full h-full overflow-hidden rounded-[12px]"
          style={{
            background: "linear-gradient(90deg, #E8E8EC 0%, #E0E1E6 100%)",
            clipPath: isMobile ? "none" : "url(#responsiveClip)",
          }}
        >
          {!isMobile ? (
            <div className="relative z-10 pt-[52px] flex flex-col px-[152px] pl-[20px] gap-0">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex cursor-pointer flex-row-reverse gap-4 w-full border-b border-[#1987FF] ${
                    rowIndex === rows.length - 1 ? "border-b-0" : ""
                  }`}
                  style={{ height: rowHeight }}
                >
                  {row.map((brand, i) => (
                    <div
                      onClick={() => router.push(`/CarCategory/${brand.id}`)}
                      key={brand.id}
                      className={`flex flex-col items-center justify-center relative border-r border-[#1987FF] ${
                        i === row.length - 1 ? "border-r-0" : ""
                      }`}
                      style={{
                        width: `${100 / row.length}%`,
                        height: "100%",
                      }}
                    >
                      <Image
                        src={
                          brand.logo_binary
                            ? `data:image/png;base64,${brand.logo_binary}` // اضافه کردن MIME type
                            : "/car-logo.svg"
                        }
                        alt={brand.name}
                        className="w-[40px] h-[40px]"
                        width={40}
                        height={40}
                      />
                      <span className="mt-2 text-[16px] font-yekanDemiBold text-[#1C4024]">
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center overflow-x-auto scrollbar-hide ">
              <div className="flex gap-4 pr-4">
                {brandItems.map((brand) => (
                  <div
                    onClick={() => router.push(`/CarCategory/${brand.id}`)}
                    key={brand.id}
                    className="w-[100px] cursor-pointer min-w-[100px] h-[120px] bg-white rounded-[12px] shadow-md flex flex-col items-center justify-center"
                  >
                    <Image
                      src={
                        brand.logo_binary
                          ? `data:image/png;base64,${brand.logo_binary}` // اضافه کردن MIME type
                          : "/car-logo.svg"
                      }
                      alt={brand.name}
                      className="w-[40px] h-[40px]"
                      width={40}
                      height={40}
                    />
                    <span className="mt-2 text-[14px] text-[#1C2024] font-yekanDemiBold text-center">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
