"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    console.log("Sending POST request to /api/sendotp", phoneNumber);
    setSuccess(false);

    if (!/^09\d{9}$/.test(phoneNumber)) {
      setError("لطفاً شماره تلفن معتبر وارد کنید. مثال: 09120000000");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/sendotp", {
        phone_number: phoneNumber,
      });

      if (res.status === 200) {
        setSuccess(true);
        // بعد از موفقیت، ریدایرکت به verify-code همراه شماره (اختیاری)
        router.push(`/verify-code?phone=${encodeURIComponent(phoneNumber)}`);
      } else {
        setError("خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.");
        console.log(res);
      }
    } catch (err) {
      console.log(err);
      setError("خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-start overflow-hidden">
      <div className="w-[377px] max-w-full px-4 mx-auto flex flex-col items-center mt-[24px]">
        <div className="w-[377px] h-[64px] flex flex-col gap-[24px] items-center">
          <div className="w-[152px] h-[44px] bg-[#D9D9D9]"></div>
          <div className="w-[377px] h-[1px] bg-[#E8E8EC]"></div>
        </div>

        <div className="w-[377px] h-[243px] flex flex-col gap-[56px] items-center mt-[24px]">
          <div className="w-[307px] h-[83px] flex flex-col gap-[16px] justify-center items-center">
            <div className="w-[307px] h-[31px] text-[24px] text-center text-[#000000] font-yekanDemiBold">
              ورود و ثبت نام
            </div>
            <div className="w-[307px] h-[36px] text-[14px] text-center text-[#8B8D98] font-yekanDemiBold">
              برای ورود یا ثبت نام شماره همراه خود را وارد کنید تا به شماره شما
              کد تایید ارسال شود
            </div>
          </div>

          <div className="w-[377px] h-[104px] flex flex-col gap-[8px]">
            <div className="w-[100px] h-[20px] flex flex-row gap-[8px]">
              <div className="w-[20px] h-[20px]">
                <Image
                  width={20}
                  height={20}
                  src="/phone.svg"
                  className="w-full h-full object-contain"
                  alt="phone icon"
                />
              </div>
              <div className="w-[72px] h-[18px] text-[14px] text-[#1C2024] font-yekanDemiBold">
                شماره همراه
              </div>
            </div>

            <input
              type="text"
              placeholder="شماره همراه خود را وارد کنید"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-grow w-[377px] h-[48px] bg-[#E8E8EC] rounded-[20px] text-right px-2 placeholder:text-[#80838D] outline-none font-yekanDemiBold"
            />

            <div className="w-[136px] h-[20px] flex flex-row gap-[8px]">
              <div className="w-[20px] h-[20px]">
                <Image
                  width={20}
                  height={20}
                  src="/info.svg"
                  className="w-full h-full object-contain"
                  alt="info icon"
                />
              </div>
              <div className="w-[108px] h-[18px] text-[14px] text-[#80838D] font-yekanDemiBold">
                مثال: 09120000000
              </div>
            </div>
          </div>
        </div>

        <div className="w-[377px] h-[92px] flex flex-col gap-[24px] mt-[24px] justify-center items-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-[377px] h-[48px] rounded-[16px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[14px] text-[#FCFCFD] font-yekanRegular disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "در حال ارسال..." : "ارسال کد تایید"}
          </button>

          {error && (
            <div className="w-full text-center text-red-600 font-yekanDemiBold">
              {error}
            </div>
          )}

          {success && (
            <div className="w-full text-center text-green-600 font-yekanDemiBold">
              کد تایید با موفقیت ارسال شد.
            </div>
          )}

          <div className="w-[160px] h-[20px] flex flex-row gap-[4px] cursor-pointer">
            <div className="w-[136px] h-[18px] text-[14px] text-[#006FB4] font-yekanDemiBold">
              بازگشت به صفحه اصلی
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

export default Page;
