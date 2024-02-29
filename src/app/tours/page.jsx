"use client";
import React, { useEffect, useState } from "react";
import MenuItem from "../components/menu/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchToursList } from "../../store/toursList";
import { getsearchVal } from "../../store/tours";

const Tours = () => {
  const searchValue = useSelector((state) => state.tours.searchVal);
  const { tourItem, error, loading } = useSelector((state) => state.tourList);

  const [priceVal, setPriceVal] = useState(10000);
  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToursList());
  }, [dispatch]);

  const resetFilters = () => {
    setPriceVal(10000);
    setSortBy("");
    dispatch(getsearchVal(""));
  };
  const filteredMenuItems = tourItem
    .filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const descMatch = item.desc
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const categoryMatch = item.category
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const priceMatch = item.price <= priceVal;
      return (nameMatch || descMatch || categoryMatch) && priceMatch;
    })
    .sort((a, b) => {
      if (sortBy === "Low to High") {
        return a.price - b.price;
      }
      if (sortBy === "High to Low") {
        return b.price - a.price;
      }
      return 0;
    });
  return (
    <section className="md:mt-27 mt-16 max-w-5xl mx-auto">
      <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
        <div className="md:my-10 my-2 font-bold text-3xl text-gray-500 ">
          All Tours
        </div>
        {filteredMenuItems?.length === 0 ? (
          <div className="text-gray-500">No Item found</div>
        ) : (
          <div className="text-gray-500">
            {filteredMenuItems.length} item found
          </div>
        )}
        <div className="flex md:gap-5 gap-2">
          <label htmlFor="price" className="md:text-md text-sm">
            Select Price
          </label>
          <input
            type="range"
            value={priceVal}
            min={1000}
            max={10000}
            onChange={(e) => setPriceVal(e.target.value)}
          />
          <span className="text-gray-500 md:text-md text-sm">
            {" "}
            upto Rs. {priceVal.toLocaleString()}
          </span>
        </div>
        <div className="flex gap-2">
          <div
            className="border rounded-lg p-2 cursor-pointer hover:bg-gray-500 hover:text-white font-bold md:text-md text-sm
            "
            onClick={() => setSortBy("Low to High")}
          >
            Low to High
          </div>
          <div
            className="border rounded-lg p-2 cursor-pointer hover:bg-gray-500 hover:text-white font-bold md:text-md text-sm"
            onClick={() => setSortBy("High to Low")}
          >
            High to Low
          </div>
          <button
            className="border rounded-lg p-2 cursor-pointer hover:bg-gray-500 hover:text-white font-bold md:text-md text-sm"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 my-4 justify-center md:justify-start items-center md:items-start">
        {loading ? (
          <div className="text-center text-gray-600 w-full">
            Loading tours...
          </div>
        ) : (
          <>
            {filteredMenuItems?.length > 0 &&
              filteredMenuItems?.map((items) => {
                return (
                  <>
                    <MenuItem key={items.id} {...items} />
                  </>
                );
              })}
          </>
        )}
      </div>
    </section>
  );
};

export default Tours;
