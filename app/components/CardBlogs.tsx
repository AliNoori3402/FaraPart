"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  date: string;
  id: number;
  logo_binary: string;
};

export default function CarCard({
  title,
  logo_binary,
  description,
  id,
  date,
}: Props) {
  return (
    <div className="w-full max-w-[385px] flex flex-col gap-[20px]">
      <div className="w-full relative h-[244px] md:h-[257px] rounded-[16px] overflow-hidden">
        <Image
          fill
          src={
            logo_binary
              ? `data:image/png;base64,${logo_binary}` // اضافه کردن MIME type
              : "/car-logo.svg"
          }
          alt="Pro Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full flex flex-col gap-[16px]">
        <div className="text-[18px] md:text-[20px] text-[#1C2024] font-yekanDemiBold leading-[1.4]">
          {title}
        </div>

        <div className="text-[14px] md:text-[16px] text-[#8B8D98] font-yekanDemiBold leading-[1.6]">
          {description}
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row gap-[8px] items-center">
            <Image
              width={20}
              height={20}
              src="/calender.svg"
              alt="calendar"
              className="w-[20px] h-[20px] object-contain"
            />
            <span className="text-[13px] md:text-[14px] text-[#8B8D98] font-yekanDemiBold">
              {new Date(date).toLocaleDateString("fa-IR")}
            </span>
          </div>

          <Link href={`/blogs/${id}`}>
            <div className="flex flex-row gap-[4px] items-center">
              <span className="text-[14px] text-[#006FB4] font-yekanDemiBold">
                بیشتر بخوانید
              </span>
              <Image
                width={18}
                height={18}
                src="/Arrow-leftB.svg"
                alt="arrow"
                className="w-[18px] h-[18px] object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
