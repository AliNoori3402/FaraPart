"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!/^09\d{9}$/.test(phoneNumber)) {
      toast.error("❌ لطفاً شماره تلفن معتبر وارد کنید. مثال: 09120000000");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/sendotp", {
        phone_number: phoneNumber,
      });

      if (res.status === 200) {
        toast.success("✅ کد تایید با موفقیت ارسال شد");
        router.push(`/verify-code?phone=${encodeURIComponent(phoneNumber)}`);
      } else {
        toast.error("⚠️ خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.");
      }
    } catch (err) {
      toast.error("⚠️ خطا در برقراری ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start sm:items-center bg-white px-4 py-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* لوگو و خط بالا */}
        <div className="w-full flex flex-col items-center gap-6">
          <Link href={"/"} className="flex justify-center md:justify-start">
            <div className="relative w-[152px] h-[64px] ">
              <Image fill src={"/banner/header-logo.svg"} alt="logo" />
            </div>
          </Link>
          <div className="w-full h-[1px] bg-[#E8E8EC]"></div>
        </div>

        {/* تیتر */}
        <div className="w-full flex flex-col gap-6 items-center mt-8 text-center">
          <div>
            <h1 className="text-xl sm:text-2xl text-[#000] font-yekanDemiBold">
              ورود و ثبت نام
            </h1>
            <p className="text-sm sm:text-base text-[#8B8D98] font-yekanDemiBold mt-2 leading-relaxed">
              برای ورود یا ثبت نام شماره همراه خود را وارد کنید تا به شماره شما
              کد تایید ارسال شود.
            </p>
          </div>

          {/* فیلد شماره */}
          <div className="w-full flex flex-col gap-2 text-right">
            <label className="flex items-center gap-2 text-[#1C2024] font-yekanDemiBold text-sm sm:text-base">
              <img
                src="/phone.svg"
                alt="phone"
                className="w-[20px] h-[20px] object-contain"
              />
              شماره همراه
            </label>

            <input
              type="text"
              placeholder="شماره همراه خود را وارد کنید"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-[48px] bg-[#E8E8EC] rounded-[16px] px-3 text-right placeholder:text-[#80838D] outline-none font-yekanDemiBold"
            />

            <div className="flex items-center gap-2 text-[#80838D] font-yekanDemiBold text-sm mt-1">
              <img
                src="/info.svg"
                alt="info"
                className="w-[18px] h-[18px] object-contain"
              />
              مثال: 09120000000
            </div>
          </div>
        </div>

        {/* دکمه ارسال */}
        <div className="w-full flex flex-col gap-6 mt-8 items-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[48px] rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-white text-[14px] font-yekanRegular transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          >
            {loading ? "در حال ارسال..." : "ارسال کد تایید"}
          </button>

          {/* بازگشت */}
          <Link href="/" className="flex items-center gap-2 text-[#006FB4]">
            <span className="text-sm sm:text-base font-yekanDemiBold">
              بازگشت به صفحه اصلی
            </span>
            <img
              src="/Arrow-leftB.svg"
              alt="arrow"
              className="w-[20px] h-[20px] object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
