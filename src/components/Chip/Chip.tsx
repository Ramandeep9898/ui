import React, { useState } from "react";

export const Chip = ({ chipInfo, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (optionName) => {
    setSelectedOption(optionName);
    onChange(chipInfo.name, optionName);
  };

  return (
    <div className="relative h-11 w-full ">
      <p className="text-[14px] font-normal mb-1 leading-tight text-gray-500">
        {chipInfo.label}
      </p>
      <div className="flex gap-3">
        {chipInfo.options.map((ele) => (
          <button
            key={ele.name}
            className={`border px-3 py-2 rounded-lg ${
              selectedOption === ele.name ? "bg-[#333] text-white" : ""
            }`}
            onClick={() => handleClick(ele.name)}
          >
            {ele.value}
          </button>
        ))}
      </div>
    </div>
  );
};
