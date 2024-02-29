"use client";
import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { FaWheelchair } from "react-icons/fa";

const features = [
  {
    icon: <IoIosCheckmarkCircleOutline className="text-2xl" />,
    title: "Free cancellation",
    subTitle: "Cancel up to 24 hours in advance for a full refund",
  },
  {
    icon: <MdPayment className="text-2xl" />,
    title: "Reserve now & pay later",
    subTitle:
      "Keep your travel plans flexible — book your spot and pay nothing today.",
  },
  {
    icon: <IoTimerOutline className="text-2xl" />,
    title: "Valid 1 day",
    subTitle: "Check availability to see starting times.",
  },
  {
    icon: <FaWheelchair className="text-2xl" />,
    title: "Wheelchair accessible",
    subTitle: "",
  },
];
const AboutTour = () => {
  return (
    <>
      <div className="text-xl font-semibold">About this Ticket</div>
      <div className="flex flex-col gap-4 py-4">
        {features?.map((item) => {
          return (
            <>
              <div className="flex mx-4 gap-4">
                {item.icon}
                <div className="text-sm">
                  <div className="mb-2 font-semibold">{item.title}</div>
                  <div className="text-gray-600">{item.subTitle}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AboutTour;
