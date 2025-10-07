"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidNationalCode = (code: string) => /^[0-9]{10}$/.test(code);
  const isValidPhoneNumber = (phone: string) => /^[0-9]{10,15}$/.test(phone);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (
      !fullName.trim() ||
      !nationalCode.trim() ||
      !phoneNumber.trim() ||
      !email.trim() ||
      !postalCode.trim() ||
      !address.trim()
    ) {
      setError("لطفا همه فیلدها را پر کنید.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("ایمیل وارد شده معتبر نیست.");
      return;
    }

    if (!isValidNationalCode(nationalCode)) {
      setError("کد ملی باید ۱۰ رقم باشد.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError("شماره همراه معتبر نیست.");
      return;
    }

    setLoading(true);

    try {
      const [first_name, ...lastNameParts] = fullName.trim().split(" ");
      const last_name = lastNameParts.join(" ");

      let rawAccessToken = localStorage.getItem("accessToken");
      let accessToken = cleanToken(rawAccessToken);
      const refreshToken = localStorage.getItem("refreshToken") || "";

      if (!accessToken) {
        setError("توکن دسترسی موجود نیست. لطفاً ابتدا وارد شوید.");
        setLoading(false);
        return;
      }

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
        // درخواست اولیه
        const response = await sendRegisterRequest(accessToken);

        const newToken = response.headers["x-new-access-token"];
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
        }

        if (response.data.status === "success") {
          setSuccess("ثبت نام با موفقیت انجام شد.");
          router.push("/product");
        } else {
          setError(response.data.message || "خطایی رخ داده است.");
        }
      } catch (err: any) {
        if (err.response?.status === 401 && refreshToken) {
          try {
            const refreshResponse = await axios.post(
              "http://isaco.liara.run/api/users/token/refresh/",
              { refresh: refreshToken }
            );

            const newAccessToken = refreshResponse.data.access;

            if (!newAccessToken) {
              setError("رفرش توکن ناموفق بود. لطفاً مجدداً وارد شوید.");
              setLoading(false);
              return;
            }

            localStorage.setItem("accessToken", newAccessToken);

            // تلاش مجدد با توکن جدید
            const retryResponse = await sendRegisterRequest(newAccessToken);

            if (retryResponse.data.status === "success") {
              setSuccess("ثبت نام با موفقیت انجام شد.");
              router.push("/product");
            } else {
              setError(retryResponse.data.message || "خطایی رخ داده است.");
            }
          } catch {
            setError("خطا در رفرش توکن. لطفا دوباره وارد شوید.");
          }
        } else {
          setError(err?.response?.data?.message || "خطا در ارتباط با سرور");
        }
      }
    } catch (err: any) {
      setError(err.message || "خطای نامشخص");
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
          <div className="w-[152px] h-[44px] bg-[#D9D9D9]"></div>
          <div className="w-[377px] h-[1px] bg-[#E8E8EC]"></div>
        </div>

        <div className="w-[377px] h-auto flex flex-col gap-[56px] items-center mt-[24px]">
          <div className="w-[307px] h-[65px] flex flex-col gap-[16px] justify-center items-center">
            <div className="w-[307px] h-[31px] text-[24px] text-center text-[#000000] font-yekanDemiBold">
              اطلاعات کاربری
            </div>
            <div className="w-[307px] h-[18px] text-[14px] text-center text-[#8B8D98] font-yekanDemiBold">
              تمام اطلاعات کاربری شما
            </div>
          </div>

          <div className="w-[377px] flex flex-col gap-[16px]">
            {[
              {
                label: "نام و نام خانوادگی",
                value: fullName,
                setter: setFullName,
                placeholder: "نام و نام خانوادگی خود را وارد کنید",
              },
              {
                label: "کد ملی",
                value: nationalCode,
                setter: setNationalCode,
                placeholder: "کد ملی خود را وارد کنید",
              },
              {
                label: "شماره همراه",
                value: phoneNumber,
                setter: setPhoneNumber,
                placeholder: "شماره همراه خود را وارد کنید",
              },
              {
                label: "ایمیل",
                value: email,
                setter: setEmail,
                placeholder: "ایمیل خود را وارد کنید",
              },
              {
                label: "کد پستی",
                value: postalCode,
                setter: setPostalCode,
                placeholder: "کد پستی خود را وارد کنید",
              },
            ].map((field, i) => (
              <div className="flex flex-col gap-[8px]" key={i}>
                <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
                  {field.label}
                </div>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full h-[48px] bg-[#E8E8EC] rounded-[20px] text-right px-2 placeholder:text-[#80838D] outline-none font-yekanDemiBold"
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
                placeholder="آدرس خود را وارد کنید"
                className="w-full h-[95px] bg-[#E8E8EC] rounded-[20px] text-right px-2 placeholder:text-[#80838D] outline-none font-yekanDemiBold resize-none"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-center font-yekanDemiBold mt-2">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-center font-yekanDemiBold mt-2">
            {success}
          </div>
        )}

        <div className="w-[377px] flex flex-col justify-center items-center gap-[16px]">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[48px] rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[14px] text-[#FCFCFD] font-yekanRegular disabled:opacity-50"
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
            className="w-[70px] h-[20px] flex flex-row gap-[4px] cursor-pointer"
            onClick={() => router.back()}
          >
            <div className="w-[48px] h-[18px] text-[14px] text-[#006FB4] font-yekanDemiBold">
              بازگشت
            </div>
            <div className="w-[20px] h-[20px]">
              <Image
                width={20}
                height={20}
                src="/Arrow-leftB.svg"
                alt="Arrow Icon"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
