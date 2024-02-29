import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { saveOrder } from "../../../store/order";
import { useDispatch } from "react-redux";

const CheckForm = ({ price, menuItem }) => {
  const { status } = useSession();
  const dispatch = useDispatch();
  const handleOrderBooking = () => {
    dispatch(saveOrder(menuItem));
  };
  return (
    <>
      <div className="border rounded-lg border-gray-400 p-2 text-center text-sm justify-between hidden md:flex">
        <div class="p-2 ">
          <p class="">From Rs. {price}</p>
          <p class="">per person</p>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href={status === "authenticated" ? "/checkout" : "/login"}
            class="mt-2 bg-blue-600 hover:bg-blue-800 text-white text-sm rounded-xl px-4 py-2 font-bold border cursor-pointer"
            onClick={handleOrderBooking}
          >
            Book Ticket
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckForm;
