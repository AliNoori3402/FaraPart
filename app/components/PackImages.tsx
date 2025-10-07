"use client";

import Image from "next/image";
import { useState } from "react";

const images = ["/Light.svg", "/Light.svg", "/Light.svg", "/Light.svg"];

export default function PackImages() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-[48px] md:gap-[67px] mx-auto px-4">
      <div className="w-full max-w-[622px] flex flex-col gap-[16px] mx-auto">
        {/* تصویر بزرگ */}
        <div className="w-full max-w-[586px] h-[300px] md:h-[432px] rounded-[40px] bg-[#FCFCFD] border border-[#E0E1E6] flex items-center justify-center mx-auto">
          <Image
            width={200}
            height={20}
            src={images[selectedIndex]}
            className="w-[200px] h-[160px] md:w-[290px] md:h-[234px] object-contain"
            alt="selected"
          />
        </div>

        {/* تصاویر کوچک - ریسپانسیو */}
        <div className="w-full flex flex-wrap md:flex-wrap gap-[7px] overflow-x-auto scrollbar-hide md:overflow-visible">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`min-w-[130px] md:w-[181px] h-[100px] md:h-[139px] rounded-[24px] md:rounded-[32px] cursor-pointer bg-[#FCFCFD] flex items-center justify-center border-2 transition-all ${
                selectedIndex === index
                  ? "border-[#007BFF]"
                  : "border-[#E0E1E6]"
              }`}
            >
              <Image
                width={70}
                height={55}
                src={img}
                className="w-[70px] h-[55px] md:w-[90px] md:h-[73px] object-contain"
                alt={`img-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
