import Image from "next/image";
import React from "react";

function TextDetails() {
  return (
    <div className="w-full flex flex-wrap justify-center gap-y-[32px] gap-x-[32px] mb-6">
      <div className="flex gap-[12px] w-[240px] h-[56px] items-center">
        <Image
          src="/bus.svg"
          alt=""
          className="w-[56px] h-[56px] object-contain"
        />
        <div className="flex flex-col gap-[4px]">
          <div className="text-[16px] font-yekanDemiBold text-[#006FB4]">
            ارسال سریع
          </div>
          <div className="text-[14px] font-yekanRegular text-[#006FB4]">
            امن و مطمئن
          </div>
        </div>
      </div>
      <div className="flex gap-[12px] w-[240px] h-[56px] items-center">
        <Image
          width={56}
          height={56}
          src="/medal.svg"
          alt=""
          className="w-[56px] h-[56px] object-contain"
        />
        <div className="flex flex-col gap-[4px]">
          <div className="text-[16px] font-yekanDemiBold text-[#D93629]">
            اصالت کالا
          </div>
          <div className="text-[14px] font-yekanRegular text-[#D93629]">
            تضمین 100 درصدی
          </div>
        </div>
      </div>
      <div className="flex gap-[12px] w-[240px] h-[56px] items-center">
        <Image
          width={56}
          height={56}
          src="/backup.svg"
          alt=""
          className="w-[56px] h-[56px] object-contain"
        />
        <div className="flex flex-col gap-[4px]">
          <div className="text-[16px] font-yekanDemiBold text-[#EF6207]">
            پشتیبانی عالی
          </div>
          <div className="text-[14px] font-yekanRegular text-[#EF6207]">
            از ساعت ۹ الی ۱۷
          </div>
        </div>
      </div>
      <div className="flex gap-[12px] w-[240px] h-[56px] items-center">
        <Image
          width={56}
          height={56}
          src="/clock.svg"
          alt=""
          className="w-[56px] h-[56px] object-contain"
        />
        <div className="flex flex-col gap-[4px]">
          <div className="text-[16px] font-yekanDemiBold text-[#1B7A43]">
            ضمانت بازگشت وجه
          </div>
          <div className="text-[14px] font-yekanRegular text-[#1B7A43]">
            در صورت عدم رضایت
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextDetails;
