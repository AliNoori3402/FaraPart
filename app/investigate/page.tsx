"use client";

import React, { useState } from "react";
import CarBrandSlider from "../components/BrandSlider";
import InvestigateCar from "../components/InvestigateCar";
import Image from "next/image";

function Page() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  return (
    <div className="w-full  max-w-[1440px] mx-auto px-4 md:px-[40px] lg:px-0">
      <div className="w-full max-w-[1280px] flex flex-col justify-center items-center gap-[40px] mx-auto">
        {/* عنوان مسیر */}
        <div className="w-full flex flex-wrap gap-[4px] justify-center items-center">
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            بررسی تخصصی
          </div>
          {selectedBrand && (
            <>
              <div className="w-[16px] h-[16px]">
                <Image
                  width={16}
                  height={16}
                  src="/Arrow-leftG.svg"
                  className="w-full h-full object-contain"
                  alt="arrow"
                />
              </div>
              <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
                بررسی تخصصی {selectedBrand}
              </div>
            </>
          )}
        </div>

        {/* اسلایدر برندها */}
        <CarBrandSlider onSelectBrand={setSelectedBrand} />

        {/* بررسی تخصصی خودرو */}
        {selectedBrand && (
          <InvestigateCar brand={selectedBrand} id={selectedBrand} />
        )}
      </div>
    </div>
  );
}

export default Page;
