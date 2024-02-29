"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { saveOrder } from "../../../store/order";
import Link from "next/link";
import { useSession } from "next-auth/react";

const BookingForm = ({ price, menuItem }) => {
  const dispatch = useDispatch();
  const { status } = useSession();
  const handleOrderBooking = () => {
    console.log(menuItem, "after clicked")
    dispatch(saveOrder(menuItem));
  };

  return (
    <>
      <div className="md:p-4 p-1">
        <div className="bg-slate-800 md:p-4 p-2 rounded-xl">
          <div className="text-white md:text-xl text-md mb-4">
            Book the ticket
          </div>
          <div className="flex justify-between">
            <div className="bg-white flex items-center md:text-md text-sm justify-center rounded-md md:px-3 px-2">
              Rs. {price} per person
            </div>
            <Link
              href={status === "authenticated" ? "/checkout" : "/login"}
              className="bg-blue-600 hover:bg-blue-800 text-white rounded-xl md:px-8 px-2 py-2 "
            >
              <button
                onClick={handleOrderBooking}
                className="md:text-md text-sm font-bold"
              >
                Book Ticket
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
