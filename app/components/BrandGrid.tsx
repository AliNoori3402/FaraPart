"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("/api/brand");
        if (Array.isArray(res.data.results)) {
          setBrands(res.data.results);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="w-full container mx-auto py-10">
      {/* Blue Wrapper */}
      <div className="w-full bg-[#005E95] rounded-3xl p-7 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="text-white space-y-1 mb-8">
          <div className="flex items-center gap-2 text-2xl md:text-3xl font-yekanDemiBold">
            <span className="opacity-90"></span> برندها
          </div>
          <div className="opacity-80 text-sm md:text-base font-yekanDemiBold">
            نوع برند خود را انتخاب کنید
          </div>
        </div>

        {/* Cards – Slider on Mobile, Grid on Desktop */}
        <div
          className="
            flex overflow-x-auto no-scrollbar gap-4 pb-4 snap-x snap-mandatory
            md:flex md:flex-wrap md:justify-center md:gap-6 md:overflow-visible md:snap-none
          "
        >
          {loading
            ? Array(12)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="
                      h-32 w-40 rounded-2xl bg-white/30 backdrop-blur-xl animate-pulse
                      flex-shrink-0 snap-center
                    "
                  ></div>
                ))
            : brands.map((brand, index) => (
                <motion.button
                  key={brand.id}
                  onClick={() => router.push(`/brands/${brand.id}`)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  whileHover={{
                    scale: 1.08,
                    y: -8,
                    boxShadow: "0px 18px 35px rgba(0,0,0,0.28)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="
                    relative w-40 flex-shrink-0 snap-center
                    bg-white/15 backdrop-blur-xl
                    border border-white/25
                    rounded-2xl p-6
                    flex flex-col items-center justify-center
                    shadow-[0_6px_18px_rgba(0,0,0,0.15)]
                    transition-all duration-300 overflow-hidden
                  "
                >
                  {/* نور بالای کارت */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-white/20 blur-xl"></div>

                  {/* لوگو */}
                  <div className="relative w-16 h-16 mb-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center">
                    <Image
                      src={
                        brand.logo_binary
                          ? `data:image/png;base64,${brand.logo_binary}`
                          : "/car-logo.svg"
                      }
                      alt={brand.display_name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* نام برند */}
                  <div className="text-center text-sm md:text-base font-yekanDemiBold text-white drop-shadow-sm">
                    {brand.display_name}
                  </div>
                </motion.button>
              ))}
        </div>
      </div>
    </div>
  );
}
