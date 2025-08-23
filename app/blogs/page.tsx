import React from "react";
import CarCardList from "../components/ListBlogs";

function page() {
  return (
    <div className="w-full max-w-[1440px] flex flex-col gap-[40px] justify-center items-center mx-auto pt-[56px] pb-[110px] px-4 md:px-[80px]">
      <div className="text-[24px] md:text-[32px] text-[#006FB4] font-yekanBold text-center md:text-right w-full max-w-[186px]">
        اخبار و مقالات
      </div>
      <CarCardList />
    </div>
  );
}

export default page;
