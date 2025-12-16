"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

function cleanToken(token: string | null) {
  if (!token) return "";
  return token.replace(/^"(.*)"$/, "$1");
}

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidNationalCode = (code: string) => /^[0-9]{10}$/.test(code);
  const isValidPhoneNumber = (phone: string) => /^09\d{9}$/.test(phone);

  const handleSubmit = async () => {
    if (
      !fullName.trim() ||
      !nationalCode.trim() ||
      !phoneNumber.trim() ||
      !email.trim() ||
      !postalCode.trim() ||
      !address.trim()
    ) {
      toast.error("❌ لطفاً همه فیلدها را پر کنید.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("📧 ایمیل وارد شده معتبر نیست.");
      return;
    }

    if (!isValidNationalCode(nationalCode)) {
      toast.error("کد ملی باید ۱۰ رقم باشد.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("📱 شماره همراه معتبر نیست (باید با 09 شروع شود).");
      return;
    }

    setLoading(true);

    try {
      await toast.promise(
        (async () => {
          const [first_name, ...lastNameParts] = fullName.trim().split(" ");
          const last_name = lastNameParts.join(" ");

          let rawAccessToken = localStorage.getItem("accessToken");
          let accessToken = cleanToken(rawAccessToken);
          const refreshToken = localStorage.getItem("refreshToken") || "";

          if (!accessToken) throw new Error("توکن دسترسی موجود نیست.");

          const sendRegisterRequest = (token: string) =>
            axios.post(
              "/api/userinfo",
              {
                first_name,
                last_name,
                national_code: nationalCode,
                email,
                postal_code: postalCode,
                address,
                phone_number: phoneNumber,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

          try {
            const response = await sendRegisterRequest(accessToken);
            const newToken = response.headers["x-new-access-token"];
            if (newToken) localStorage.setItem("accessToken", newToken);

            if (response.status === 200) {
              router.push("/product");
              return "ثبت‌نام با موفقیت انجام شد ✅";
            } else {
              throw new Error("خطایی رخ داده است.");
            }
          } catch (err: any) {
            if (err.response?.status === 401 && refreshToken) {
              const refreshResponse = await axios.post(
                "https://django.farapartco.com/api/users/token/refresh/",
                { refresh: refreshToken }
              );

              const newAccessToken = refreshResponse.data.access;
              if (!newAccessToken) throw new Error("رفرش توکن ناموفق بود.");

              localStorage.setItem("accessToken", newAccessToken);
              const retryResponse = await sendRegisterRequest(newAccessToken);

              if (retryResponse.status === 200) {
                router.push("/product");
                return "ثبت‌نام با موفقیت انجام شد ✅";
              } else {
                throw new Error("خطا در ارسال داده‌ها.");
              }
            } else {
              throw new Error(err?.response?.data?.message || "خطا در سرور");
            }
          }
        })(),
        {
          loading: "در حال ارسال اطلاعات...",
          success: (msg) => msg || "عملیات موفق بود ✅",
          error: (err) => err.message || "❌ خطا در ثبت‌نام",
        }
      );
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login-rigister");
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start sm:items-center bg-white px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* لوگو */}
        <div className="flex flex-col items-center gap-6 w-full">
          <Link href={"/"} className="flex justify-center md:justify-start">
            <div className="relative w-[152px] h-[64px] ">
              <Image fill src={"/banner/header-logo.svg"} alt="logo" />
            </div>
          </Link>
          <div className="w-full h-px bg-[#E8E8EC]" />
        </div>

        {/* فرم ثبت‌نام */}
        <div className="w-full flex flex-col gap-5">
          {[
            {
              label: "نام و نام خانوادگی",
              value: fullName,
              setter: setFullName,
            },
            { label: "کد ملی", value: nationalCode, setter: setNationalCode },
            {
              label: "شماره همراه",
              value: phoneNumber,
              setter: setPhoneNumber,
            },
            { label: "ایمیل", value: email, setter: setEmail },
            { label: "کد پستی", value: postalCode, setter: setPostalCode },
          ].map((f, i) => (
            <div className="flex flex-col gap-2" key={i}>
              <label className="text-sm sm:text-base text-[#1C2024] font-yekanDemiBold">
                {f.label}
              </label>
              <input
                type="text"
                value={f.value}
                onChange={(e) => f.setter(e.target.value)}
                className="w-full h-[48px] bg-[#E8E8EC] rounded-[16px] px-3 text-right outline-none font-yekanDemiBold"
              />
            </div>
          ))}

          {/* فیلد آدرس */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base text-[#1C2024] font-yekanDemiBold">
              آدرس
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-[90px] bg-[#E8E8EC] rounded-[16px] p-3 text-right outline-none font-yekanDemiBold resize-none"
            />
          </div>

          {/* دکمه‌ها */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[48px] mt-4 rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-white text-[14px] font-yekanRegular disabled:opacity-50 transition-all hover:opacity-90"
          >
            {loading ? "در حال ارسال..." : "ثبت تغییرات"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full h-[48px] rounded-[16px] border border-[#D93629] text-[14px] text-[#D93629] font-yekanRegular hover:bg-[#ffeaea] transition-all"
          >
            خروج از حساب
          </button>

          {/* بازگشت */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#006FB4] font-yekanDemiBold text-sm mt-2"
          >
            <span>بازگشت</span>
            <Image
              width={20}
              height={20}
              src="/Arrow-leftB.svg"
              alt="Arrow Icon"
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
