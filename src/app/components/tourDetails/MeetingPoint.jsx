"use client";
import React from "react";

const MeetingPoint = () => {
  return (
    <div>
      <div className="flex my-4 md:gap-2 gap-10">
        <div className="text-sm font-bold text-gray-600 w-1/6 ">
          Meeting Point
        </div>
        <div className="text-sm font-semibold text-gray-600 w-4/6 ">
          <div className="">
            <div className="">
              Meet at the Historic Charleston Foundation gift shop.
            </div>
            <div className="text-blue-600 underline mt-3">
              Open in Google map
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default MeetingPoint;
