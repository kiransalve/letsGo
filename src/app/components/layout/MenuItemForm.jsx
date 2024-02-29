// src\app\components\layout\MenuItemForm.jsx
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [name, setName] = useState(menuItem?.name || "");
  const [desc, setDesc] = useState(menuItem?.desc || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [image, setimage] = useState(menuItem?.image || "");
  const [duration, setDuration] = useState(menuItem?.duration || "");
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setcategories] = useState([]);

  console.log(menuItem);

  useEffect(() => {
    setName(menuItem?.name);
    setDesc(menuItem?.desc);
    setPrice(menuItem?.price);
    setimage(menuItem?.image);
    setDuration(menuItem?.duration);
    setCategory(menuItem?.category);
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setcategories(categories);
      });
    });
  }, [menuItem]);

  return (
    <div className="">
      <div className=" max-w-2xl mt-4 text-gray-600 cursor-pointer mx-auto text-center border rounded-lg">
        <Link href="/menu-items">Show All Item</Link>
      </div>
      <section className="md:mx-0 mx-2 my-3 md:my-0">
        <form
          className="md:m-8 mt-5 md:max-w-4xl md:mx-auto mx-1"
          onSubmit={(e) => {
            onSubmit(e, {
              name,
              desc,
              price,
              image,
              duration,
              category,
            });
            setName("");
            setDesc("");
            setPrice("");
            setimage("");
            setCategory("");
            setDuration("");
          }}
        >
          <div className="">
            <div className="">
              <label className="">Image Link : </label>
              <div className="flex">
                {image && (
                  <Image
                    src={image}
                    width={240}
                    height={240}
                    className="rounded-lg mt-2"
                    alt="tourImage"
                  ></Image>
                )}
              </div>
              <input
                className="inputStyle"
                value={image}
                type="text"
                onChange={(e) => setimage(e.target.value)}
              />
            </div>
            <div className="">
              <label>Item Name : </label>
              <input
                className="inputStyle"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label>Description : </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
              <div className="flex items-start justify-between md:max-w-xl max-w-full md:flex-row flex-col ">
                <div>
                  <label>Duration : </label>
                  <input
                    type="text"
                    className="inputStyle"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                  />
                </div>

                <div>
                  <label>Price : </label>
                  <input
                    className="inputStyle"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <select
                    className="inputStyle"
                    name="cat"
                    id="cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.length > 0 &&
                      categories.map((c, index) => {
                        return (
                          <option value={c.name} key={index}>
                            {c.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="hover:bg-slate-700 rounded-lg py-2 text-center max-w-[200px] hover:text-white border cursor-pointer">
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MenuItemForm;
