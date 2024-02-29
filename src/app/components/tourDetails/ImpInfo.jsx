"use client";
import React from "react";

const ImpInfo = () => {
  return (
    <>
      <div className="flex my-4 md:gap-2 gap-10">
        <div className="text-sm font-bold text-gray-600 w-1/6 ">
          Important Information
        </div>
        <div className="text-sm font-semibold text-gray-600 w-4/6 ">
          <div className="">
            <div className="">What to bring</div>
            <ul className="pl-10 list-disc my-2">
              <li>Water</li>
              <li>Weather-appropriate clothing</li>
              <li>Sunscreen</li>
              <li>Comfortable shoes</li>
            </ul>
          </div>
          <div className="mt-4">
            <div className="">Know before you go</div>
            <ul className="pl-10 list-disc my-2">
              <li>This tour involves a substantial amount of walking</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ImpInfo;
