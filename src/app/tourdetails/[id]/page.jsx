"use client";
import React, { useEffect, useState } from "react";
import FullDesc from "../../components/tourDetails/FullDesc";
import OgExperience from "../../components/tourDetails/OgExperience";
import Includes from "../../components/tourDetails/Includes";
import AboutTour from "../../components/tourDetails/AboutTour";
import BookingForm from "../../components/tourDetails/BookingForm";
import TourImg from "../../components/tourDetails/TourImg";
import CheckForm from "../../components/tourDetails/CheckForm";
import MeetingPoint from "../../components/tourDetails/MeetingPoint";
import ImpInfo from "../../components/tourDetails/ImpInfo";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { useSelector } from "react-redux";

const TourDetails = () => {
  const [menuItem, setMenuItems] = useState();
  const { id } = useParams();
  const { category, name, image, desc, price } = menuItem || {};
  const { tourItem, error, loading } = useSelector((state) => state.tourList);
  useEffect(() => {
    const getTourdata = async () => {
      const item = tourItem.find((i) => i._id === id);
      setMenuItems(item);
    };
    getTourdata();
  }, [id, tourItem]);

  return (
    <section className="mt-20 w-full mx-auto md:max-w-5xl">
      <div className="mt-12 px-2 md:px-0">
        <div className="">
          {loading && <>Loading Tour...</>}
          <Link className="text-blue-400 flex gap-2" href="/">
            <LuArrowLeft className="mt-1" />
            <div className="">Back to Home page</div>
          </Link>
          <div className="text-gray-400 mt-3">{category}</div>
          <div className="text-2xl font-bold my-4">{name}</div>
        </div>
        <TourImg image={image} />
      </div>
      <div class="flex sm:flex-row flex-col justify-between py-4 space-x-6 w-full my-4 px-4">
        {/* <!-- Left Part --> */}
        <div class="w-full sm:w-2/3">
          <p class="text-sm font-semibold">{desc}</p>
          <div className="md:my-4 md:px-10 my-3 px-2">
            <div className="">
              <AboutTour />
              <BookingForm price={price} menuItem={menuItem} />
              <div className="my-4">
                <OgExperience />
                <FullDesc />
                <Includes />
                <MeetingPoint />
                <ImpInfo />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Right Part --> */}
        <div class="w-full sm:w-1/3 ">
          <CheckForm price={price} menuItem={menuItem} />
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
