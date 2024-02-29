"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getActiveLink } from "../../../store/categorySlice";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Nature");

  useEffect(() => {
    fetchCat();
  }, []);

  const fetchCat = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    if (data) {
      setCategories(data);
    }
  };
  const dispatch = useDispatch();
  const handleCategory = (category) => {
    dispatch(getActiveLink(category));
  };
  return (
    <div className="z-10 lg:max-w-xl mx-auto relative">
      <ul className="flex w-full justify-between absolute md:top-[-30px] top-[-25px]">
        {categories?.length > 0 &&
          categories.map((category, index) => (
            <li
              className={`md:py-2 py-1 md:px-4 px-2 md:text-lg text-md rounded-lg font-bold cursor-pointer ${
                category.name === selectedCat
                  ? "bg-white text-md "
                  : "text-white"
              }`}
              key={index}
              onClick={() => {
                handleCategory(category);
                setSelectedCat(category.name);
              }}
            >
              {category?.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Category;
