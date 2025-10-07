import Image from "next/image";

// FilterProduct.tsx
export default function FilterProduct() {
  return (
    <div
      className="
       md:w-[1280px] md:h-[232px]
        sm:w-[770px] sm:h-[316px]
        w-[377px] h-[484px]
        flex flex-col justify-center items-center gap-[32px]
        border border-[#E0E1E6] bg-[#F9F9FB] rounded-[32px]
        p-4
      "
    >
      {/* عنوان */}
      <div className="text-[20px] md:text-[24px] text-[#000000] font-yekanDemiBold text-center">
        فیلتر محصولات ما
      </div>

      {/* فیلترها + دکمه */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="w-full flex flex-wrap justify-center gap-[20px]">
          <FilterBox icon="/filter.svg" title="دسته بندی ها" />
          <FilterBox icon="/car.svg" title="دسته بندی ها" />
          <FilterBox icon="/product.svg" title="نوع کالا" />
          <FilterBox icon="/product.svg" title="وضعیت موجودی" />
        </div>

        <button className="w-[138px] h-[48px] bg-gradient-to-r from-[#008BDF] to-[#006FB4] text-[#fff] font-yekanDemiBold rounded-[16px] mt-4 lg:mt-0">
          نتیجه فیلتر
        </button>
      </div>
    </div>
  );
}

function FilterBox({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="w-[238px] h-[76px] flex flex-col gap-[8px]">
      <div className="flex flex-row gap-[8px] pr-[5px] items-center">
        <div className="w-[20px] h-[20px]">
          <Image width={20} height={20} src={icon} alt={title} />
        </div>
        <div className="text-[14px] text-[#000000] font-yekanDemiBold">
          {title}
        </div>
      </div>
      <div className="w-full h-[48px] bg-[#E8E8EC] rounded-[20px] flex justify-between items-center px-4">
        <div className="text-[14px] text-[#80838D] font-yekanDemiBold">
          انتخاب کنید
        </div>
        <div className="w-[16px] h-[16px]">
          <Image width={16} height={16} src="/Arrow-downG.svg" alt="dropdown" />
        </div>
      </div>
    </div>
  );
}
