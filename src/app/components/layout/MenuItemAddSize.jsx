import React, { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const MenuItemAddSize = ({ props, setProps, addLabel, name }) => {
  const [isOPen, setIsOPen] = useState(false);

  const addProps = () => {
    if (props.name !== "" && props.price !== "") {
      setProps((oldProps) => {
        return [...oldProps, { name: "", price: 0 }];
      });
    }
  };

  const editProps = (e, index, prop) => {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeProps = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  };

  return (
    <>
      <div className="border p-2 rounded-md mb-2 max-w-sm ">
        <div
          className="flex justify-between mx-auto max-w-sm cursor-pointer mb-2"
          onClick={() => setIsOPen(!isOPen)}
        >
          <div className="w-full text-center">
            <span className="text-md">{name}</span>
            <span> ({props?.length})</span>
          </div>
          {isOPen ? (
            <IoIosArrowDropup className="text-2xl text-gray-400 bg-white rounded-md" />
          ) : (
            <IoIosArrowDropdown className="text-2xl text-gray-400 bg-white rounded-md" />
          )}
        </div>
        <div className={isOPen ? "block" : "hidden"}>
          {props?.length > 0 &&
            props.map((size, index) => (
              <div
                className="flex gap-1 justify-center items-center"
                key={index}
              >
                <div className="mt-0 flex-1">
                  <label>Name</label>
                  <input
                    className="inputStyle"
                    type="text"
                    placeholder="Size Name"
                    value={size.name}
                    onChange={(e) => editProps(e, index, "name")}
                  />
                </div>
                <div className="mt-0 flex-1">
                  <label>Extra price</label>
                  <input
                    className="inputStyle"
                    type="text"
                    value={size.price}
                    placeholder="Extra Price"
                    onChange={(e) => editProps(e, index, "price")}
                  />
                </div>
                <div onClick={() => removeProps(index)}>
                  <MdDelete className=" cursor-pointer text-gray-600 rounded-md flex-1 mt-4 mx-2 text-2xl hover:text-primary" />
                </div>
              </div>
            ))}
          <button
            type="button"
            onClick={addProps}
            className="bg-white  hover:bg-gray-600 hover:text-white"
          >
            {addLabel}
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuItemAddSize;
