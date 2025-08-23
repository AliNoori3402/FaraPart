import React from "react";

function page() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[40px] lg:px-0">
      <div className="w-full max-w-[1280px] flex flex-col gap-[48px] justify-center items-center pr-0  mx-auto">
        {/* مسیر عنوان */}
        <div className="w-full flex flex-wrap gap-[4px] justify-center items-center">
          <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            اخبار و مقالات
          </span>
          <img
            src="/Arrow-leftG.svg"
            alt="arrow"
            className="w-[16px] h-[16px] object-contain"
          />
          <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            تحلیل بازار خودروهای برقی در سال 2024
          </span>
        </div>

        {/* بخش تصویر و توضیحات */}
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[65px] w-full">
          {/* تصویر */}
          <div className="w-full lg:w-[642px] h-auto">
            <img
              src="/car-blog.svg"
              alt="car"
              className="w-full h-full object-contain"
            />
          </div>

          {/* متن‌ها */}
          <div className="w-full lg:w-[591px] flex flex-col gap-[40px]">
            <h1 className="text-[24px] md:text-[28px] text-[#1C2024] font-yekanBold leading-[1.4]">
              تحلیل بازار خودروهای برقی در سال 2024
            </h1>

            {/* تاریخ */}
            <div className="flex flex-col gap-[12px]">
              <span className="text-[14px] text-[#8B8D98] font-yekanDemiBold">
                تاریخ
              </span>
              <div className="flex flex-row gap-[12px] items-center">
                <div className="w-[48px] h-[48px] rounded-full bg-[#E8E8EC] flex items-center justify-center">
                  <img
                    src="/calender.svg"
                    alt="calendar"
                    className="w-[28px] h-[28px] object-contain"
                  />
                </div>
                <span className="text-[14px] text-[#1C2024] font-yekanDemiBold">
                  20 اردیبهشت 1404
                </span>
              </div>
            </div>

            {/* متن کوتاه */}
            <p className="text-[14px] text-[#1C2024] font-yekanRegular leading-[2]">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است...
            </p>

            {/* ادامه مطلب */}
            <div className="flex flex-row gap-[4px] items-center cursor-pointer">
              <span className="text-[14px] text-[#006FB4] font-yekanDemiBold">
                ادامه مطلب
              </span>
              <img
                src="/Arrow-leftB.svg"
                alt="arrow"
                className="w-[20px] h-[20px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* بخش متن بلند و تصویر وسطی */}
        <div className="w-full flex flex-col gap-[40px]">
          <p className="text-[14px] text-[#1C2024] font-yekanRegular leading-[2]">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
          </p>

          <div className="w-full h-[200px] sm:h-[286px] bg-[#D9D9D9] rounded-[32px]" />

          <p className="text-[14px] text-[#1C2024] font-yekanRegular leading-[2]">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
