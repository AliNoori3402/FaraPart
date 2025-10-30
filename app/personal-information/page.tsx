"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner"; // ✅ اضافه شد

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
                "http://isaco.liara.run/api/users/token/refresh/",
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
      console.log(err);
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
    <div className="w-full h-screen flex justify-center items-start overflow-y-auto">
      <div className="w-[377px] max-w-full px-4 mx-auto flex flex-col items-center gap-[24px] mt-[24px]">
        <div className="w-[377px] h-[64px] flex flex-col gap-[24px] items-center">
          <div className="w-[152px] h-[44px] bg-[#D9D9D9]" />
          <div className="w-[377px] h-[1px] bg-[#E8E8EC]" />
        </div>

        <div className="w-[377px] flex flex-col gap-[16px] mt-[24px]">
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
            <div className="flex flex-col gap-[8px]" key={i}>
              <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
                {f.label}
              </div>
              <input
                type="text"
                value={f.value}
                onChange={(e) => f.setter(e.target.value)}
                className="w-full h-[48px] bg-[#E8E8EC] rounded-[20px] text-right px-2 outline-none font-yekanDemiBold"
              />
            </div>
          ))}

          <div className="flex flex-col gap-[8px]">
            <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
              آدرس
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-[95px] bg-[#E8E8EC] rounded-[20px] text-right px-2 outline-none font-yekanDemiBold resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[48px] mt-4 rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[14px] text-[#FCFCFD] font-yekanRegular disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : "ثبت تغییرات"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full h-[48px] rounded-[16px] border border-[#D93629] text-[14px] text-[#D93629] font-yekanRegular"
          >
            خروج از حساب
          </button>

          <div
            className="w-[70px] h-[20px] flex flex-row gap-[4px] cursor-pointer self-start"
            onClick={() => router.back()}
          >
            <div className="w-[48px] text-[14px] text-[#006FB4] font-yekanDemiBold">
              بازگشت
            </div>
            <Image
              width={20}
              height={20}
              src="/Arrow-leftB.svg"
              alt="Arrow Icon"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
