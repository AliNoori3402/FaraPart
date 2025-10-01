import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="w-[1300px] mx-auto ">
      <div className="w-[508px] flex flex-col gap-[42px] justify-center items-center  mx-auto">
        <div className="w-[200px] flex flex-col gap-[20px]">
          <div className="w-[200px] h-[26px] text-[20px] text-[#008BDF] font-yekanBold">
            رسید پرداخت الکترونیکی
          </div>
          <div className="w-[187px] flex flex-col gap-[16px] justify-center items-center">
            <div className="w-[88px] h-[88px]">
              <Image
                src="/Accept.svg"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full h-[21px]  text-[16px] text-[#1D9C53] font-yekanDemiBold ">
              پرداخت با موفقیت انجام شد
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[14px]">
          <div className="w-full flex flex-col gap-[22px] justify-center items-center">
            <div className="w-full h-[36px] border-b border-b-[#E0E1E6]  flex flex-row gap-[230px]">
              <div className="w-[160px] h-[18px] text-[14px] text-[#1C2024] font-yekanDemiBold">
                قیمت کل محصولات انتخابی
              </div>
              <div className="w-[118px] h-[26px] flex flex-row gap-[4px] justify-center items-center">
                <div className="w-[84px] h-[26px] text-[20px] text-[#1C2024] font-yekanDemiBold ">
                  2،250،000
                </div>
                <div className="w-[30px] h-[16px] text-[12px] text-[#1C2024] font-yekanDemiBold">
                  تومان
                </div>
              </div>
            </div>

            <div className="w-full h-[36px] border-b border-b-[#E0E1E6]  flex flex-row gap-[230px]">
              <div className="w-[160px] h-[18px] text-[14px] text-[#1C2024] font-yekanDemiBold">
                قیمت کل محصولات انتخابی
              </div>
              <div className="w-[118px] h-[26px] flex flex-row gap-[4px] justify-center items-center">
                <div className="w-[84px] h-[26px] text-[20px] text-[#1C2024] font-yekanDemiBold ">
                  2،250،000
                </div>
                <div className="w-[30px] h-[16px] text-[12px] text-[#1C2024] font-yekanDemiBold">
                  تومان
                </div>
              </div>
            </div>

            <div className="w-full h-[36px] border-b border-b-[#E0E1E6]  flex flex-row gap-[230px]">
              <div className="w-[160px] h-[18px] text-[14px] text-[#1C2024] font-yekanDemiBold">
                قیمت کل محصولات انتخابی
              </div>
              <div className="w-[118px] h-[26px] flex flex-row gap-[4px] justify-center items-center">
                <div className="w-[84px] h-[26px] text-[20px] text-[#1C2024] font-yekanDemiBold ">
                  2،250،000
                </div>
                <div className="w-[30px] h-[16px] text-[12px] text-[#1C2024] font-yekanDemiBold">
                  تومان
                </div>
              </div>
            </div>

            <div className="w-full h-[36px] border-b border-b-[#E0E1E6]  flex flex-row gap-[230px]">
              <div className="w-[160px] h-[18px] text-[14px] text-[#1C2024] font-yekanDemiBold">
                قیمت کل محصولات انتخابی
              </div>
              <div className="w-[118px] h-[26px] flex flex-row gap-[4px] justify-center items-center">
                <div className="w-[84px] h-[26px] text-[20px] text-[#1C2024] font-yekanDemiBold ">
                  2،250،000
                </div>
                <div className="w-[30px] h-[16px] text-[12px] text-[#1C2024] font-yekanDemiBold">
                  تومان
                </div>
              </div>
            </div>
          </div>
          <div className="w-[160px] h-[20px] flex flex-row mx-auto gap-[4px]">
            <div className="w-[136px] h-[18px] text-[14px] text-[#006FB4] font-yekanDemiBold">
              بازگشت به صفحه اصلی
            </div>
            <div className="w-[20px] h-[20px] ">
              <Image
                alt=""
                src="/Arrow-leftB.svg"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
