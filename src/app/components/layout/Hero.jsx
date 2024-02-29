"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const Hero = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCat();
  }, []);

  const fetchCat = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    if (!response.ok) {
      console.error(`Error fetching categories. Status: ${response.status}`);
      return;
    }
    if (data) {
      setCategories(data);
    }
  };

  const categorydata = useSelector((state) => state.category.activeLink);
  const name = categorydata?.name || "Nature";
  const catdata = categories.find((item) => item.name === name);

  return (
    <div className="relative md:h-screen h-96">
      <Image
        src={catdata?.catImage}
        layout="fill"
        objectFit="cover"
        alt="Hero"
      />
      <div className="relative md:top-48 top-24">
        <div className="md:max-w-5xl md:mx-auto mx-2 max-w-64">
          <div className="flex flex-col justify-center gap-10 text-white ">
            <div className="font-bold md:text-[60px] md:text-5xl text-2xl text-slate-100">
              {catdata?.title}
            </div>
            <div className="text-white md:text-xl text-sm font-semi-bold">
              Be Ready with your Bags...!
            </div>
            <div className="md:text-2xl text-md font-semi-bold">
              {catdata?.subTitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
