"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "../font.css";

export default function Header() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await axios.get(
          "http://194.5.175.107:8000/api/products/list-brands/"
        );
        if (Array.isArray(res.data.results)) {
          setBrands(res.data.results);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getBrands();
  }, []);

  return (
    <header className="h-[169px] flex flex-col items-center justify-center gap-4 font-yekanDemiBold py-4 relative">
      {/* Logo */}
      <div className="relative w-[152px] h-[44px]">
        <Image fill src={"/banner/headerIcon.png"} alt="logo" />
      </div>

      {/* Divider */}
      <div className="w-[323px] h-px bg-[#E8E8EC]" />

      {/* Desktop Layout */}
      <div className="w-full max-w-[1280px] px-4 flex items-center justify-between gap-4 lg:gap-[135px] relative">
        {/* Left section */}
        <div className="hidden lg:flex items-center gap-[28px]">
          {/* دسته بندی */}
          <div className="relative">
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

            {/* Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-full mt-4 bg-white shadow-xl rounded-2xl z-50 min-w-[760px] border border-gray-100 p-6 flex flex-wrap gap-10"
                >
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => router.push(`/CarCategory/${brand.id}`)}
                      className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition"
                    >
                      <Image
                        width={28}
                        height={28}
                        src={
                          brand.logo_binary
                            ? `data:image/png;base64,${brand.logo_binary}`
                            : "/car-logo.svg"
                        }
                        alt={brand.display_name}
                      />
                      <span>{brand.display_name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href={"/product"} className="text-[14px] text-[#1C2024]">
            محصولات
          </Link>
          <Link href={"/blogs"} className="text-[14px] text-[#1C2024]">
            اخبار و مقالات
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-[323px] border border-[#E0E1E6] rounded-full h-[42px] px-4 flex items-center bg-white">
            <input
              type="text"
              placeholder="جستجو کنید..."
              className="flex-grow text-right px-2 placeholder:text-gray-400 outline-none font-yekanDemiBold bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
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
            </svg>
            <div className="text-[16px]">0</div>
          </div>

          <Link href={"/login-rigister"}>
            <button className="w-[115px] h-[42px] rounded-[16px] text-[14px] text-white bg-[#004D7A]">
              ثبت نام / ورود
            </button>
          </Link>
        </div>

        {/* ====== MOBILE BURGER MENU ====== */}
        <div className="lg:hidden">
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

          <AnimatePresence>
            {isBurgerOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 flex flex-col p-6 gap-6 overflow-y-auto"
              >
                <button
                  onClick={() => setIsBurgerOpen(false)}
                  className="self-end text-gray-600 text-3xl font-bold"
                >
                  ×
                </button>

                {/* Search */}
                <div className="border border-[#E0E1E6] rounded-full h-[42px] px-4 flex items-center">
                  <input
                    type="text"
                    placeholder="جستجو کنید..."
                    className="flex-grow text-right px-2 placeholder:text-gray-400 outline-none bg-transparent"
                  />
                </div>

                {/* DropDown دسته بندی خودروها */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() =>
                      setIsMobileDropdownOpen(!isMobileDropdownOpen)
                    }
                  >
                    <h3 className="text-[16px] font-yekanDemiBold">
                      دسته بندی خودروها
                    </h3>
                    <motion.svg
                      width="16"
                      height="16"
                      fill="none"
                      animate={{
                        rotate: isMobileDropdownOpen ? 180 : 0,
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <path
                        d="M12 6.00003C12 6.00003 9.05407 10 8 10C6.94587 10 4 6 4 6"
                        stroke="#8B8D98"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>

                  <AnimatePresence>
                    {isMobileDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 flex flex-col gap-2 overflow-hidden"
                      >
                        {brands.map((brand) => (
                          <button
                            key={brand.id}
                            onClick={() =>
                              router.push(`/CarCategory/${brand.id}`)
                            }
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-right"
                          >
                            <Image
                              width={28}
                              height={28}
                              src={
                                brand.logo_binary
                                  ? `data:image/png;base64,${brand.logo_binary}`
                                  : "/car-logo.svg"
                              }
                              alt={brand.display_name}
                            />
                            <span>{brand.display_name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3 border-t pt-4">
                  <Link href={"/product"} className="text-[16px]">
                    محصولات
                  </Link>
                  <Link href={"/blogs"} className="text-[16px]">
                    اخبار و مقالات
                  </Link>
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-col gap-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
                      </svg>
                      <span>سبد خرید (0)</span>
                    </div>
                  </div>
                  <Link href={"/login-rigister"}>
                    <button className="w-full h-[42px] rounded-[16px] text-[14px] text-white bg-[#004D7A]">
                      ثبت نام / ورود
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
