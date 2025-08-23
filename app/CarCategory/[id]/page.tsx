import React from "react";
import ProductCards from "../../components/CardCategory";
import CarCards from "../../components/CarCard";

const Page = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-[30px] justify-center items-center">
        {/* مسیر و عنوان */}

        {/* کارت‌ها */}
        <CarCards />
      </div>
    </div>
  );
};

export default Page;
