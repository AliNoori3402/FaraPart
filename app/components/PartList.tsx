"use client";

type Part = {
  name: string;
  image: string;
};

const parts: Part[] = [
  { name: "لنت", image: "/lent.svg" },
  { name: "روغن موتور", image: "/lent.svg" },
  { name: "فیلتر هوا", image: "/lent.svg" },
  { name: "باتری", image: "/lent.svg" },
  { name: "چراغ جلو", image: "/lent.svg" },
  { name: "لنت", image: "/lent.svg" },
  { name: "روغن موتور", image: "/lent.svg" },
  { name: "فیلتر هوا", image: "/lent.svg" },
  { name: "باتری", image: "/lent.svg" },
  { name: "چراغ جلو", image: "/lent.svg" },
  { name: "باتری", image: "/lent.svg" },
  { name: "چراغ جلو", image: "/lent.svg" },
];

const PartsList = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[19px]">
      {parts.map((part, index) => (
        <div
          key={index}
          className="h-[295px] flex flex-col justify-center items-center border border-[#E0E1E6] rounded-[24px] hover:border-b-[4px] hover:border-b-[#005E95] transition-all duration-300"
        >
          <div className="w-[200px] h-[26px] text-[20px] text-[#1C2024] font-yekanDemiBold text-center">
            {part.name}
          </div>
          <div className="w-[275px] h-[183px]">
            <img
              src={part.image}
              className="w-full h-full object-contain"
              alt={part.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartsList;
