"use client";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Includes = () => {
  return (
    <>
      <div className="flex my-4 md:gap-2 gap-10">
        <div className="text-sm font-bold text-gray-600 w-1/6">Includes</div>
        <div className="text-sm font-semibold text-gray-600 w-4/6 ">
          <div className="flex gap-4">
            <IoMdCheckmark className="text-green-600 text-xl" />
            <div className="">Walking Tour</div>
          </div>
          <div className="flex gap-4">
            <IoMdCheckmark className="text-green-600 text-xl" />
            <div className="">Professional Guide</div>
          </div>
          <div className="flex gap-4">
            <RxCross2 className="text-red-600 text-xl" />
            <div className="">Tips</div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Includes;
