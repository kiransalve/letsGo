import React from "react";
import Image from "next/image";

const TourImg = ({ image }) => {
  return (
    <div className=" p-1 h-96">
      <div className="h-full flex gap-2 w-full mx-auto">
        <div className="w-full relative">
          <Image
            src={image}
            fill={true}
            className="rounded-md"
            alt="tourImage1"
          />
        </div>
        <div className=" w-full flex flex-col gap-2">
          <div className="w-500 w-full h-full relative">
            <Image
              src={image}
              fill={true}
              className="rounded-md"
              alt="tourImage2"
            />
          </div>
          <div className=" flex  h-full gap-2">
            <div className="w-full relative">
              <Image
                src={image}
                fill={true}
                className="rounded-md"
                alt="tourImage3"
              />
            </div>
            <div className=" w-full relative hidden md:block">
              <Image
                className="rounded-md"
                alt="tourImage4"
                src={image}
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourImg;
