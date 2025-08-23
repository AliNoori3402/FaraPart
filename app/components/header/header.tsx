"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import "../font.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Header() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState<any | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState<{
    [key: string]: boolean;
  }>({});
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

  const toggleBrand = (brandId: string) => {
    setExpandedBrands((prev) => ({
      ...prev,
      [brandId]: !prev[brandId],
    }));
  };

  return (
    <div className="h-[169px] flex flex-col items-center justify-center gap-4 font-yekanDemiBold py-4 relative">
      <div className="w-[152px] h-[44px] bg-[#D9D9D9]" />
      <div className="w-[323px] h-px bg-[#E8E8EC]" />
      <div className="w-full max-w-[1280px] px-4 flex flex-nowrap items-center justify-between gap-4 lg:gap-[135px] relative">
        <div className="w-[50px] lg:w-[350px] h-[42px] flex flex-nowrap items-center justify-center gap-[28px] min-w-max">
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
                    transition={{ duration: 0.3 }}
                    className="absolute top-full mt-4 bg-white shadow-xl rounded-[16px] z-50 w-[820px] right-0 overflow-hidden"
                  >
                    <div className="flex flex-row gap-6 w-full">
                      <div className="w-1/2 flex flex-col gap-2 pr-2">
                        {brands.map((brand) => (
                          <div
                            key={brand.id}
                            onMouseEnter={() => setHoveredBrand(brand)}
                            onClick={() =>
                              router.push(`/CarCategory/${brand.id}`)
                            }
                            className="flex items-center gap-[10.5px] cursor-pointer hover:bg-gray-100 p-2 rounded"
                          >
                            <img
                              src="/car-logo.svg"
                              alt={brand.display_name}
                              className="w-8 h-8 object-contain"
                            />
                            <span className="text-[16px]">
                              {brand.display_name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="w-1/2 flex flex-col gap-2 border-r pr-4">
                        {hoveredBrand?.cars?.length > 0 ? (
                          hoveredBrand.cars.map((car: any) => (
                            <div
                              key={car.id}
                              onClick={() =>
                                router.push(`/CarCategory/${car.id}`)
                              }
                              className="text-[15px] px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                              {car.name}
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-400 text-sm">
                            یک برند را انتخاب کنید
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex justify-between items-center w-full py-2 px-3 text-[18px] font-yekanDemiBold rounded cursor-pointer"
                  >
                    <span>دسته بندی</span>
                    <motion.svg
                      initial={false}
                      animate={{ rotate: isCategoryOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-1 overflow-auto"
                      >
                        {brands.map((brand) => (
                          <div key={brand.id} className="flex flex-col">
                            <button
                              onClick={() => toggleBrand(brand.id)}
                              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded w-full"
                            >
                              <img
                                src="/car-logo.svg"
                                alt={brand.display_name}
                                className="w-8 h-8 object-contain"
                              />
                              <span className="text-[18px]">
                                {brand.display_name}
                              </span>
                            </button>
                            <AnimatePresence>
                              {expandedBrands[brand.id] && brand.cars && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="pl-10 flex flex-col gap-1 overflow-hidden"
                                >
                                  {brand.cars.map((car: any) => (
                                    <div
                                      key={car.id}
                                      className="text-[16px] text-right px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                                    >
                                      {car.name}
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="text-[18px] font-yekanDemiBold cursor-pointer pr-2">
                    سامانه خودرو
                  </div>
                  <div className="text-[18px] font-yekanDemiBold cursor-pointer pr-2">
                    خرید آنلاین بیمه نامه
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="text-[14px] text-[#1C2024] hidden md:flex">
            سامانه خودرو
          </div>
          <div className="text-[14px] text-[#1C2024] hidden md:flex">
            خرید آنلاین بیمه نامه
          </div>
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
            <button className="w-[115px] h-[42px] rounded-[16px] text-[14px] text-white font-yekanRegular bg-[#004D7A]">
              ثبت نام / ورود
            </button>
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
