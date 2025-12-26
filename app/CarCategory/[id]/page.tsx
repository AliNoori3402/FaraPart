import React from "react";

import CarCards from "../../components/CarCard";

const Page = () => {
  return (
    <div className="w-full mt-20 sm:mt-30 lg:mt-45  max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-[30px] justify-center items-center">
        {/* مسیر و عنوان */}

        {/* کارت‌ها */}
        <CarCards />
      </div>
    </div>
  );
};

export default Page;
