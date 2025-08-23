"use client";

import CarCard from "./CardBlogs";

const cardData = [
  {
    title: "تحلیل بازار خودروهای برقی در سال 2024",
    description:
      "افزایش تقاضا برای خودروهای دوستدار محیط زیست، خودروسازان را وادار به نوآوری بیشتر کرده است.",
    date: "20 اردیبهشت 1404",
  },
  {
    title: "چالش‌های زیرساختی برای خودروهای الکتریکی",
    description:
      "کمبود ایستگاه‌های شارژ و نیاز به توسعه شبکه برق از دغدغه‌های اصلی کاربران است.",
    date: "25 اردیبهشت 1404",
  },
  {
    title: "رشد فناوری باتری در خودروهای آینده",
    description:
      "باتری‌های جدید با ظرفیت بالا و شارژ سریع، آینده حمل و نقل را متحول می‌کنند.",
    date: "28 اردیبهشت 1404",
  },
  {
    title: "رقابت تسلا با برندهای آسیایی",
    description:
      "ورود خودروسازان چینی بازار خودروهای برقی را رقابتی‌تر کرده است.",
    date: "1 خرداد 1404",
  },
  {
    title: "تأثیر سیاست‌های دولت بر بازار خودرو",
    description:
      "سوبسیدها و قوانین جدید نقش مهمی در جهت‌دهی به بازار خودروهای سبز دارند.",
    date: "5 خرداد 1404",
  },
];

export default function CarCardList() {
  return (
    <div className="w-full max-w-[1287px] px-4 md:px-0 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[66px]">
        {cardData.map((card, index) => (
          <CarCard
            key={index}
            title={card.title}
            description={card.description}
            date={card.date}
          />
        ))}
      </div>
    </div>
  );
}
