"use client";
import React, { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchToursList } from "../../../store/toursList";

const HomeMenu = () => {
  const [activeCategoryData, setActiveCategoryData] = useState([]);
  const categorydata = useSelector((state) => state.category.activeLink);
  const { tourItem, error, loading } = useSelector((state) => state.tourList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToursList());
  }, [dispatch]);

  useEffect(() => {
    const name = categorydata?.name || "Nature";
    const selectedCategoryData = tourItem.filter(
      (item) => item.category === name
    );
    setActiveCategoryData(selectedCategoryData);
  }, [tourItem, categorydata]);
  return (
    <section className="max-w-[1180px] px-5 mx-auto">
      <div className="">
        <div className="mt-4 my-4">
          <h3 className="text-gray-500 md:text-[30px] text-[25px]">
            Unforgettable{" "}
            <span className="text-blue-600 font-bold">
              {categorydata?.name || "Nature "}
            </span>{" "}
            Experiences
          </h3>
        </div>
        {loading && <div className="text-center">Loading Tours...</div>}
        <div className="flex flex-wrap gap-5 my-4">
          {activeCategoryData &&
            activeCategoryData?.map((items, index) => {
              return (
                <div key={index}>
                  <MenuItem {...items} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
