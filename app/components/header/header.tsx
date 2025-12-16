"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "../font.css";
import { BiSearch } from "react-icons/bi";
import { LogIn } from "lucide-react";

export default function Header() {
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("consumables");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isConsumablesOpen, setIsConsumablesOpen] = useState(false);
  const [isSparePartsOpen, setIsSparePartsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (!token) {
      setLoadingUser(false);
      return;
    }

    const getProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    getProfile();
  }, []);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await axios.get("/api/brand");
        if (Array.isArray(res.data.results)) {
          setBrands(res.data.results);
        }
      } catch (err) {}
    };

    const getCategories = async () => {
      try {
        const res = await axios.get("/api/categorylist");
        setCategories(res.data);
      } catch (err) {}
    };

    getBrands();
    getCategories();
  }, []);

  const consumableCat = categories.find((c) => c.id === 175);
  const sparePartsCat = categories.find((c) => c.id === 1);

  const handleDesktopItemClick = (callback?: () => void) => {
    if (callback) callback();
    setIsMenuOpen(false);
  };

  const handleMobileItemClick = (path: string) => {
    router.push(path);
    setIsBurgerOpen(false);
  };

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      router.push(`/product?search=${encodeURIComponent(searchText)}`);
      setSearchText("");
      setIsBurgerOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="w-full  mx-auto container flex flex-col items-center justify-between py-4 px-4 md:px-8 font-yekanDemiBold relative bg-white ">
      {/* ===== LOGO ===== */}
      <div className=" hidden lg:flex justify-center items-center w-full ">
        <Link href={"/"} className="flex justify-center md:justify-start">
          <div className="relative w-[152px] h-[64px] ">
            <Image fill src={"/banner/header-logo.svg"} alt="logo" />
          </div>
        </Link>

        {/* BURGER (MOBILE) */}
      </div>

      {/* ===== MAIN ROW ===== */}
      <div className="w-full  flex flex-col sm:flex-row items-center justify-center lg:justify-between  mt-4 md:mt-6">
        {/* ===== LEFT MENU (DESKTOP) ===== */}
        <div className="hidden lg:flex items-center  gap-4 xl:gap-[28px]">
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

            {/* مگا منو دسکتاپ */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-full right-0 mt-4 bg-white shadow-xl rounded-2xl z-50 w-[90vw] lg:w-[900px] border border-gray-100 flex flex-col md:flex-row overflow-hidden"
                >
                  {/* ستون راست */}
                  <div className="w-full md:w-[250px] border-b md:border-b-0 md:border-l border-gray-100 bg-[#F9FAFB] flex flex-row md:flex-col">
                    {[
                      { id: "brands", name: "برند خودرو" },
                      { id: "consumables", name: "لوازم مصرفی" },
                      { id: "spareParts", name: "لوازم یدکی" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className={`flex-1 text-right px-4 py-2 md:px-6 md:py-3 transition ${
                          activeMenu === item.id
                            ? "bg-white text-[#004D7A] font-bold"
                            : "hover:bg-white/60 text-gray-700"
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>

                  {/* ستون چپ */}
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[400px]">
                    {activeMenu === "consumables" && consumableCat?.child && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {consumableCat.child.map((child: any) => (
                          <Link
                            key={child.id}
                            href={`/product?category_id=${child.id}`}
                            onClick={() => handleDesktopItemClick()}
                            className="text-right text-[14px] hover:text-[#004D7A] transition"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}

                    {activeMenu === "spareParts" && sparePartsCat?.child && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {sparePartsCat.child.map((child: any) => (
                          <Link
                            key={child.id}
                            href={`/product?category_id=${child.id}`}
                            onClick={() => handleDesktopItemClick()}
                            className="text-right text-[14px] hover:text-[#004D7A] transition"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}

                    {activeMenu === "brands" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {brands.map((brand) => (
                          <button
                            key={brand.id}
                            onClick={() =>
                              handleDesktopItemClick(() =>
                                router.push(`/CarCategory/${brand.id}`)
                              )
                            }
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
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* لینک‌ها */}
          <Link href={"/product"} className="text-[14px] text-[#1C2024]">
            محصولات
          </Link>
          <Link href={"/blogs"} className="text-[14px] text-[#1C2024]">
            اخبار و مقالات
          </Link>
          <Link href={"/investigate"} className="text-[14px] text-[#1C2024]">
            بررسی تخصصی
          </Link>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="w-[323px] border border-[#E0E1E6] rounded-full h-[42px] px-4 hidden lg:flex justify-center items-center bg-white order-3 sm:order-none ">
          <input
            type="text"
            placeholder="جستجو در فراپارت..."
            className="flex-grow text-right px-2 placeholder:text-gray-400 outline-none font-yekanDemiBold bg-transparent"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="p-1 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <BiSearch className="w-6 h-6" />
          </button>
        </div>

        {/* ===== RIGHT SECTION ===== */}
        <div className="hidden  lg:flex items-center gap-3">
          <Link href={"/basket"}>
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
            </div>
          </Link>

          {/* USER SECTION */}
          {loadingUser ? (
            <div className="w-[115px] h-[42px] rounded-[16px] bg-gray-200 animate-pulse" />
          ) : user ? (
            <Link href={"/user-panel"}>
              <button className="w-[135px] h-[42px] rounded-[16px] text-[14px] text-white bg-[#004D7A] flex items-center justify-center gap-2">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="6" r="3" />
                  <path d="M2 18c0-4 3-6 8-6s8 2 8 6" />
                </svg>
                {user?.full_name || "پنل کاربری"}
              </button>
            </Link>
          ) : (
            <Link href={"/login-rigister"}>
              <button className="w-[115px] h-[42px] rounded-[16px] text-[14px] text-white bg-[#004D7A]">
                ثبت نام / ورود
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex mt-2 justify-between items-center w-full">
        <div className="flex lg:hidden justify-center items-center gap-3">
          {/* USER SECTION */}
          {loadingUser ? (
            <div className="w-[42px] h-[42px] rounded-[16px] bg-gray-200 animate-pulse" />
          ) : user ? (
            <Link href={"/user-panel"}>
              <button className="w-[42px] h-[42px] rounded-[16px] bg-[#004D7A] flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="6" r="3" />
                  <path d="M2 18c0-4 3-6 8-6s8 2 8 6" />
                </svg>
              </button>
            </Link>
          ) : (
            <Link href={"/login-rigister"}>
              <button className="w-[42px] h-[42px] rounded-[16px] bg-[#004D7A] flex items-center justify-center">
                <LogIn className="text-white" />
              </button>
            </Link>
          )}
          <Link href={"/basket"}>
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
            </div>
          </Link>
        </div>{" "}
        <div className="lg:hidden flex justify-center items-center w-full ">
          <Link href={"/"} className="flex justify-center md:justify-start">
            <div className="relative w-[152px] h-[64px] ">
              <Image fill src={"/banner/logo-mobile.svg"} alt="logo" />
            </div>
          </Link>

          {/* BURGER (MOBILE) */}
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center border border-[#E0E1E6]"
            >
              <BiSearch className="w-6 h-6 text-gray-500" />
            </button>

            {/* MODAL */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg w-11/12 max-w-md p-4 relative">
                  <button
                    className="absolute top-3 right-3 text-gray-500 text-xl"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ✕
                  </button>
                  <div className="flex items-center mt-8 border border-gray-300 rounded-full px-3 py-2">
                    <input
                      type="text"
                      placeholder="جستجو در فراپارت..."
                      className="flex-grow text-right px-2 placeholder:text-gray-400 outline-none font-yekanDemiBold bg-transparent"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        handleSearch();
                        setIsModalOpen(false);
                      }}
                      className="p-1 flex items-center justify-center text-gray-500 hover:text-gray-700"
                    >
                      <BiSearch className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end lg:hidden">
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
        </div>
      </div>
      {/* ===== MOBILE BURGER MENU ===== */}
      <AnimatePresence>
        {isBurgerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white shadow-xl z-[999] flex flex-col p-6 gap-6 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsBurgerOpen(false)}
              className="self-end text-gray-600 text-3xl font-bold"
            >
              ×
            </button>

            {/* Brands Accordion */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer select-none mt-2"
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
              >
                <span>برند خودرو</span>
                <span>{isBrandsOpen ? "▲" : "▼"}</span>
              </div>
              <AnimatePresence>
                {isBrandsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-2 mt-2"
                  >
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() =>
                          handleMobileItemClick(`/CarCategory/${brand.id}`)
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

            {/* Consumables Accordion */}
            {consumableCat?.child && (
              <div>
                <div
                  className="flex justify-between items-center cursor-pointer mt-2"
                  onClick={() => setIsConsumablesOpen(!isConsumablesOpen)}
                >
                  <span>لوازم مصرفی</span>
                  <span>{isConsumablesOpen ? "▲" : "▼"}</span>
                </div>
                <AnimatePresence>
                  {isConsumablesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-1 mt-1"
                    >
                      {consumableCat.child.map((child: any) => (
                        <button
                          key={child.id}
                          onClick={() =>
                            handleMobileItemClick(
                              `/product?category_id=${child.id}`
                            )
                          }
                          className="text-right p-2 hover:bg-gray-100 rounded"
                        >
                          {child.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Spare Parts Accordion */}
            {sparePartsCat?.child && (
              <div>
                <div
                  className="flex justify-between items-center cursor-pointer mt-2"
                  onClick={() => setIsSparePartsOpen(!isSparePartsOpen)}
                >
                  <span>لوازم یدکی</span>
                  <span>{isSparePartsOpen ? "▲" : "▼"}</span>
                </div>
                <AnimatePresence>
                  {isSparePartsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-1 mt-1"
                    >
                      {sparePartsCat.child.map((child: any) => (
                        <button
                          key={child.id}
                          onClick={() =>
                            handleMobileItemClick(
                              `/product?category_id=${child.id}`
                            )
                          }
                          className="text-right p-2 hover:bg-gray-100 rounded"
                        >
                          {child.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Static Links */}
            <Link
              href={"/product"}
              onClick={() => setIsBurgerOpen(false)}
              className="text-right block mt-3"
            >
              محصولات
            </Link>
            <Link
              href={"/blogs"}
              onClick={() => setIsBurgerOpen(false)}
              className="text-right block"
            >
              اخبار و مقالات
            </Link>
            <Link
              href={"/investigate"}
              onClick={() => setIsBurgerOpen(false)}
              className="text-right block"
            >
              بررسی تخصصی
            </Link>

            {/* ===== RIGHT SECTION ===== */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
