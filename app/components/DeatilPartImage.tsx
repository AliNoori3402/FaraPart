"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImagesProps = {
  images: string[];
};

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-[361px] h-[432px] rounded-[40px] bg-[#FCFCFD] border border-[#E0E1E6] flex items-center justify-center">
        <span className="text-gray-400">تصویری موجود نیست</span>
      </div>
    );
  }

  return (
    <div className="w-[1200px] flex flex-row gap-[67px] mx-auto">
      <div className="w-[622px] flex md:flex-row sm:flex-row flex-col gap-[16px]">
        {/* تصویر بزرگ */}
        <div className="w-[361px] md:w-[466px] sm:w-[466px] h-[432px] rounded-[40px] bg-[#FCFCFD] border border-[#E0E1E6] flex items-center justify-center">
          <Image
            width={290}
            height={234}
            src={images[selectedIndex]}
            className="w-[290px] h-[234px] object-contain"
            alt="selected"
          />
        </div>

        {/* تصاویر کوچک */}
        <div className="w-[370px] md:w-[140px] sm:w-[140px] flex md:flex-col sm:flex-col flex-row gap-[7px]">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-[140px] h-[139px] rounded-[32px] cursor-pointer bg-[#FCFCFD] flex items-center justify-center border-2 transition-all ${
                selectedIndex === index
                  ? "border-[#007BFF]"
                  : "border-[#E0E1E6]"
              }`}
            >
              <Image
                width={90}
                height={73}
                src={img}
                className="w-[90px] h-[73px] object-contain"
                alt={`img-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
