import React from "react";

function page() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 text-justify">
      {/* عنوان صفحه */}
      <h1 className="text-3xl md:text-4xl font-yekanDemiBold text-[#004D7A] text-center mb-8">
        شرایط بازگشت کالا
      </h1>

      {/* مقدمه */}
      <p className="text-base md:text-lg text-[#1C2024] mb-6 leading-relaxed">
        در فراپارت، رضایت و اعتماد شما در اولویت ماست. به همین دلیل، اگر قطعه
        خریداری‌شده به هر دلیلی با خودروی شما سازگار نبود یا دارای ایراد فنی
        بود، می‌توانید تا هفت روز پس از دریافت کالا، آن را بازگردانید و از خدمات
        پشتیبانی فراپارت با اطمینان کامل بهره‌مند شوید.
      </p>

      {/* بخش موارد قابل بازگشت */}
      <div className="mb-8">
        <h2 className="text-2xl font-yekanBold text-[#006FB4] mb-4">
          موارد قابل بازگشت
        </h2>

        {/* انتخاب نادرست */}
        <div className="mb-4">
          <h3 className="text-xl font-yekanBold text-[#1C2024] mb-2">
            انتخاب نادرست
          </h3>
          <p className="text-base text-[#1C2024] leading-relaxed">
            اگر پس از دریافت متوجه شدید که قطعه خریداری‌شده مناسب خودروی شما
            نیست، در صورتی که هنوز نصب نشده باشد و در بسته‌بندی اصلی خود قرار
            داشته باشد، می‌توانید آن را بدون مشکل بازگردانید.
          </p>
        </div>

        {/* خرابی یا نقص محصول */}
        <div>
          <h3 className="text-xl font-yekanBold text-[#1C2024] mb-2">
            خرابی یا نقص محصول
          </h3>
          <p className="text-base text-[#1C2024] leading-relaxed">
            در صورت وجود هرگونه ایراد فنی، شکستگی، آسیب ظاهری یا نقص عملکرد در
            قطعه—even اگر بسته‌بندی آن باز شده باشد—امکان بازگشت یا تعویض کالا
            وجود دارد. پس از بررسی و تأیید تیم فنی فراپارت، وجه پرداختی به شما
            بازگردانده می‌شود یا قطعه جایگزین ارسال خواهد شد.
          </p>
        </div>
      </div>

      {/* شرایط بازگشت */}
      <div>
        <h2 className="text-2xl font-yekanBold text-[#006FB4] mb-4">
          شرایط بازگشت
        </h2>
        <ul className="list-disc list-inside space-y-2 text-[#1C2024] text-base leading-relaxed">
          <li>
            کالا باید در بسته‌بندی اصلی و بدون آسیب‌دیدگی باشد (به‌جز در موارد
            خرابی اولیه).
          </li>
          <li>ارائه فاکتور یا رسید خرید الزامی است.</li>
          <li>قطعات نصب‌شده تنها در صورت خرابی اولیه امکان بازگشت دارند.</li>
          <li>در صورت نقص یا خرابی، هزینه ارسال بر عهده فراپارت است.</li>
        </ul>

        <p className="text-base text-[#1C2024] mt-4 leading-relaxed">
          پس از تأیید شرایط، مبلغ پرداختی در کوتاه‌ترین زمان به حساب شما واریز
          می‌شود یا در صورت تمایل، قطعه جایگزین برایتان ارسال خواهد شد.
        </p>
      </div>
    </div>
  );
}

export default page;
