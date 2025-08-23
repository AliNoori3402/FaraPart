"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Brand {
  id: number;
  name: string;
}

const BrandCards: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    axios
      .get("/api/brand")
      .then((res) => setBrands(res.data))
      .catch((err) => console.error("خطا در گرفتن برندها:", err));
  }, []);

  return (
    <div className="w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[19px] pr-0 mx-auto mb-[40px] px-4">
      {brands.map((brand) => (
        <Link key={brand.id} href={`/CarCategory/${brand.id}`}>
          <div
            className="cursor-pointer relative w-full h-[200px] flex flex-col justify-between 
              border border-[#E0E1E6] rounded-[24px] overflow-hidden 
              hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300 p-6"
          >
            <div className="text-[20px] text-[#000000] font-yekanDemiBold">
              {brand.name}
            </div>

            <div className="w-full h-[100px]">
              <img
                src="/category.svg"
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BrandCards;
