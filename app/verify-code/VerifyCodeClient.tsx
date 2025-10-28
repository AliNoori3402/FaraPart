"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner"; // ✅ اضافه شد

function VerifyCodePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(80);
  const [resending, setResending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone");

  // تایمر شمارش معکوس
  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // ✅ ارسال کد تأیید
  const handleSubmit = async () => {
    if (!code || !phoneNumber) {
      toast.error("کد یا شماره تلفن وارد نشده است.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/verifycode", {
        phone_number: phoneNumber,
        code,
      });

      const data = response.data;

      if (response.status === 200 && data.status === "success") {
        const { tokens, user_created, person_created, phone_number } = data;

        // ذخیره توکن‌ها
        localStorage.setItem("accessToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);
        localStorage.setItem("userId", tokens.user_id.toString());
        localStorage.setItem("phoneNumber", phone_number);

        toast.success("ورود با موفقیت انجام شد 🎉");

        // هدایت بر اساس وضعیت کاربر
        if (!user_created || !person_created) {
          router.push("/personal-information");
        } else {
          router.push("/");
        }
      } else {
        toast.error("کد وارد شده نادرست است ❌");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ارسال مجدد کد
  const handleResendCode = async () => {
    if (!phoneNumber) return;
    try {
      setResending(true);
      await axios.post("/api/sendotp", { phone_number: phoneNumber });
      setTimer(80);
      toast.success("کد تأیید جدید ارسال شد 📩");
    } catch {
      toast.error("خطا در ارسال مجدد کد ❌");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-start overflow-hidden">
      <div className="w-[377px] max-w-full px-4 mx-auto flex flex-col items-center mt-[24px]">
        {/* هدر */}
        <div className="w-[377px] h-[64px] flex flex-col gap-[24px] items-center">
          <div className="w-[152px] h-[44px] bg-[#D9D9D9]"></div>
          <div className="w-[377px] h-[1px] bg-[#E8E8EC]"></div>
        </div>

        {/* محتوای اصلی */}
        <div className="w-[377px] h-[243px] flex flex-col gap-[56px] items-center mt-[24px]">
          <div className="w-[307px] h-[83px] flex flex-col gap-[16px] justify-center items-center">
            <div className="w-[307px] h-[31px] text-[24px] text-center text-[#000000] font-yekanDemiBold">
              ورود و ثبت نام
            </div>
            <div className="w-[307px] h-[36px] text-[14px] text-center text-[#8B8D98] font-yekanDemiBold">
              کد تایید ارسال شده به شماره{" "}
              <span className="text-[#008BDF]">{phoneNumber}</span> را وارد کنید
            </div>
          </div>

          <div className="w-[377px] h-[104px] flex flex-col gap-[8px]">
            <div className="w-[100px] h-[20px] flex flex-row gap-[8px]">
              <div className="w-[20px] h-[20px]">
                <img
                  src="/code.svg"
                  className="w-full h-full object-contain"
                  alt="کد تایید"
                />
              </div>
              <div className="w-[72px] h-[18px] text-[14px] text-[#1C2024] font-yekanDemiBold">
                کد تایید
              </div>
            </div>

            <input
              type="text"
              placeholder="کد تایید خود را وارد کنید"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow w-[377px] h-[48px] bg-[#E8E8EC] rounded-[20px] text-right px-2 placeholder:text-[#80838D] outline-none font-yekanDemiBold"
            />

            <div className="w-[159px] h-[21px] text-[14px] text-[#80838D] font-yekanDemiBold text-center">
              {timer > 0 ? (
                <>
                  ارسال مجدد کد بعد از{" "}
                  <span className="text-[#008BDF]">
                    {`0${Math.floor(timer / 60)}:${(timer % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </span>
                </>
              ) : (
                <button
                  onClick={handleResendCode}
                  disabled={resending}
                  className="text-[#006FB4] underline font-yekanDemiBold"
                >
                  {resending ? "در حال ارسال..." : "ارسال مجدد کد تایید"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="w-[377px] h-[92px] flex flex-col gap-[24px] mt-[24px] justify-center items-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-[377px] h-[48px] rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[14px] text-[#FCFCFD] font-yekanRegular"
          >
            {loading ? "در حال بررسی..." : "تایید کد"}
          </button>

          <div
            className="w-[129px] h-[20px] flex flex-row gap-[4px] cursor-pointer"
            onClick={() => router.push("/login-rigister")}
          >
            <div className="w-[105px] h-[18px] text-[14px] text-[#006FB4] font-yekanDemiBold">
              تغییر شماره همراه
            </div>
            <div className="w-[20px] h-[20px]">
              <img
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

export default VerifyCodePage;
