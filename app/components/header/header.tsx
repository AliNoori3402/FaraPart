"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import "../font.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await axios.get("/api/brand");
        setBrands(res.data);
      } catch (err) {
        console.error("خطا در axios:", err);
      }
    };
    getBrands();
  }, []);

  return (
    <div className="h-[169px] flex flex-col items-center justify-center gap-4 font-yekanDemiBold py-4 relative">
      <div className="w-[152px] h-[44px] bg-[#D9D9D9]" />
      <div className="w-[323px] h-px bg-[#E8E8EC]" />

      <div className="w-full max-w-[1280px] px-4 flex flex-nowrap items-center justify-between gap-4 lg:gap-[135px] relative">
        <div className="w-[50px] lg:w-[350px] h-[42px] flex flex-nowrap items-center justify-center gap-[28px] min-w-max">
          {/* Dropdown - فقط برندها */}
          <div className="relative flex flex-col items-start cursor-pointer">
            <div className="hidden md:flex items-center gap-1 relative">
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="text-[14px] text-[#1C2024]">دسته بندی</span>
                <svg width="16" height="16" fill="none">
                  <path
                    d="M12 6.00003C12 6.00003 9.05407 10 8 10C6.94587 10 4 6 4 6"
                    stroke="#8B8D98"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full mt-4 bg-white shadow-xl rounded-2xl z-50 min-w-[760px] max-w-[560px] w-fit right-0 overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-wrap gap-10 divide-gray-100">
                      {brands.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() =>
                            router.push(`/CarCategory/${brand.id}`)
                          }
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                        >
                          <Image
                            width={28}
                            height={28}
                            src="/car-logo.svg"
                            alt={brand.display_name}
                            className="w-7 h-7 object-contain shrink-0"
                          />
                          <span className="text-base text-gray-800">
                            {brand.display_name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* منوی موبایل */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsBurgerOpen(true)}
                className="w-[42px] h-[42px] flex items-center justify-center border border-[#E0E1E6] rounded-md"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#1C2024"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>

            <AnimatePresence>
              {isBurgerOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-lg z-40 flex flex-col p-6 gap-4 md:hidden overflow-y-auto"
                  style={{ maxHeight: "100dvh" }}
                >
                  <button
                    onClick={() => setIsBurgerOpen(false)}
                    className="self-end text-gray-600 text-2xl font-bold"
                  >
                    &times;
                  </button>
                  <div className="flex flex-col gap-2">
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => router.push(`/CarCategory/${brand.id}`)}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded w-full"
                      >
                        <Image
                          width={32}
                          height={32}
                          src="/car-logo.svg"
                          alt={brand.display_name}
                          className="w-8 h-8 object-contain"
                        />
                        <span className="text-[18px]">
                          {brand.display_name}
                        </span>
                      </button>
                    ))}
                  </div>
                  <Link href={"/product"}>
                    <div className="text-[18px] font-yekanDemiBold cursor-pointer pr-2">
                      محصولات
                    </div>
                  </Link>
                  <Link href={"/blogs"}>
                    <div className="text-[18px] font-yekanDemiBold cursor-pointer pr-2">
                      اخبار ومقالات
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href={"/product"}>
            <div className="text-[14px] text-[#1C2024] hidden md:flex">
              محصولات
            </div>
          </Link>
          <Link href={"/blogs"}>
            <div className="text-[14px] text-[#1C2024] hidden md:flex">
              اخبار ومقالات
            </div>
          </Link>
        </div>
        <div className="flex flex-nowrap items-center justify-end gap-3 relative min-w-max">
          <div className="lg:hidden">
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                className="w-[42px] h-[42px] flex items-center justify-center border border-[#E0E1E6] rounded-full"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  className="text-[#80838D]"
                >
                  <path
                    d="M17 17L21 21"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                  <path
                    d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </svg>
              </button>
            ) : (
              <div className="flex items-center border border-[#E0E1E6] rounded-full h-[42px] px-4 w-[220px]">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  className="text-[#80838D]"
                >
                  <path
                    d="M17 17L21 21"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                  <path
                    d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </svg>
                <input
                  type="text"
                  placeholder="جستجو کنید..."
                  className="flex-grow text-right px-2 placeholder:text-gray-400 outline-none font-yekanDemiBold bg-transparent"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="ml-2 text-sm text-gray-500"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-center items-center gap-[12px]">
            <div className="flex flex-row justify-center items-center gap-[8px] w-[60px] h-[40px]">
              <svg width="24" height="24" fill="none">
                <path
                  d="M7.5 8V6.36364C7.5 3.95367 9.51472 2 12 2C14.4853 2 16.5 3.95367 16.5 6.36364V8"
                  stroke="#80838D"
                  strokeWidth="1.5"
                />
                <path
                  d="M13.8816 7.5H10.1184C6.22973 7.5 4.7255 8.48796 3.6501 12.2373C2.68147 15.6144 2.19716 17.3029 2.70352 18.6124C3.01361 19.4143 3.56418 20.1097 4.28549 20.6104C6.8944 22.4216 16.9865 22.5043 19.7145 20.6104C20.4358 20.1097 20.9864 19.4143 21.2965 18.6124C21.8028 17.3029 21.3185 15.6144 20.3499 12.2373C19.3173 8.63723 17.9313 7.5 13.8816 7.5Z"
                  stroke="#80838D"
                  strokeWidth="1.5"
                />
                <path
                  d="M11 11H13"
                  stroke="#80838D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-[16px] font-yekanRegular">0</div>
            </div>

            <Link href={"/login-rigister"}>
              <button className="w-[115px] h-[42px] rounded-[16px] text-[14px] text-white font-yekanRegular bg-[#004D7A]">
                ثبت نام / ورود
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[323px] border border-[#E0E1E6] rounded-full h-[42px] px-4 items-center justify-center bg-white z-20">
          <svg width="24" height="24" fill="none" className="text-[#80838D]">
            <path d="M17 17L21 21" stroke="currentColor" strokeWidth={1.5} />
            <path
              d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </svg>
          <input
            type="text"
            placeholder="جستجو کنید..."
            className="flex-grow text-right px-2 placeholder:text-gray-400 outline-none font-yekanDemiBold bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
