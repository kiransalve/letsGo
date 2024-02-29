"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { useSelector } from "react-redux";
import { UserProfile } from "../components/layout/UserProfile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const CheckOut = () => {
  const orderItem = useSelector((state) => state.order.orderData);
  const [person, setPerson] = useState(1);
  const [time, setTime] = useState("10:00 AM");
  const [user, setUser] = useState();
  const { loading, data } = UserProfile();
  const session = useSession();
  const router = useRouter();

  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 3);
  const tomorrowISO = tomorrow.toISOString().split("T")[0];
  const [date, setDate] = useState(tomorrowISO);
  useEffect(() => {
    setUser(data._id);
  }, [data]);

  if (!orderItem) {
    return <div>Loading...</div>;
  }

  const meetTime = ["10:00 AM", "2.30 PM"];

  const name = orderItem.name;
  const price = parseFloat(orderItem.price);
  const duration = orderItem.duration;

  const totalPrice =
    person === 1 ? parseFloat(price) : parseFloat(price) * person;

  const handlePersonchange = (e) => {
    const newPerson = Math.max(1, Math.min(20, parseInt(e.target.value, 10)));
    setPerson(newPerson);
  };

  const todayDate = new Date(new Date(date).getTime()).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const formattedDate = new Date(
    new Date(date).getTime() - 1 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const maxDate = (() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 10);
    return maxDate.toISOString().split("T")[0];
  })();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const formatdate = (date) => {
    const option = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDateTime = new Date(date).toLocaleString(undefined, option);
    return formattedDateTime;
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("You are offline... Failed to load Razorpay");
      return;
    }

    const currentDate = new Date();
    const formatDate = formatdate(currentDate);
    const option = {
      key: "rzp_test_p1ACGuaCu5AvVB",
      currency: "INR",
      amount: totalPrice * 100,
      name: name,
      description: "Thanks for purchassing",
      image: "https://sugermint.com/wp-content/uploads/2022/01/Razorpay-Startup-Story.jpg",
      handler: async function (response) {
        if (response.razorpay_payment_id) {
          console.log("payment done");
          // save order in mongodb
          const orderdata = {
            itemId: orderItem._id,
            totalPrice: totalPrice,
            orderDate: formatDate,
            tourDate: date,
            tourTime: time,
            person: person,
            userId: user,
          };
          const orderResponse = await fetch("/api/order", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(orderdata),
          });
            const data = await orderResponse.json();
            console.log(data);
            router.push("/");
          toast.success("Payment is Successfull");
        }
      },
    };
    if (totalPrice > 0) {
      const paymentObject = new window.Razorpay(option);
      paymentObject.open();
    } else {
      alert("Amt should not less that 1");
    }
  };

  return (
    <>
      <div className="mt-20 text-[12px]">
        <div className="text-center p-2">
          <h1 className="text-slate-600 font-bold text-xl">Checkout</h1>
        </div>
        <div className="md:max-w-5xl max-w-md text-gray-500 mx-auto border rounded-2xl p-4 m-2 flex-wrap flex flex-col gap-4">
          <div className="font-bold">{name}</div>
          <div className="flex gap-2 items-center">
            <IoIosTimer className="" />
            <span className="">{duration}</span>
          </div>
          <div className="">
            Meet at{" "}
            <span className="text-blue-600 underline">
              108 Meeting St, Charleston, SC 29401, USA
            </span>
          </div>
          <hr />
          <div className="">
            <div className="font-bold">Select a starting date and time</div>
            <div className="flex gap-2 mt-3">
              <div className="bg-white p-2 rounded-xl border">
                <input
                  type="date"
                  className="outline-none"
                  min={tomorrowISO}
                  max={maxDate}
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>

              {meetTime.map((item, index) => {
                return (
                  <button
                    onClick={() => setTime(item)}
                    className={`${
                      time === item
                        ? "bg-slate-800 font-bold p-2 rounded-lg text-white"
                        : "border font-bold p-2 rounded-lg "
                    } `}
                    key={index}
                  >
                    {item}{" "}
                  </button>
                );
              })}
            </div>
          </div>
          <hr />
          <div className="flex md:gap-7 gap-2 md:flex-row flex-col md:max-w-full  max-w-sm">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <FaCalendar /> Cancel before 10:00 AM on {formattedDate} for a
                full refund
              </div>
              <div className="flex gap-3 items-center">
                <MdPayment /> You can reserve now & pay later with this activity
                option.
              </div>
            </div>
            <div className="w-[350px] flex flex-col gap-4">
              <div className="">Price breakdown</div>
              <div className="flex justify-between">
                <div className="">
                  <input
                    type="number"
                    value={person}
                    min={1}
                    max={20}
                    onChange={handlePersonchange}
                    className="max-w-[50px] border rounded-sm outline-none mr-2 pl-2"
                  />
                  Person X Rs. {price.toLocaleString()}
                </div>
              </div>

              {person === 20 && (
                <p className="bg-red-600 text-white rounded-md p-1">
                  Maximum 20 person booking is allowed
                </p>
              )}
            </div>
          </div>
          <hr />
          <div className="">
            <button
              className="bg-slate-800 text-white font-bold p-2 rounded-lg"
              onClick={() => displayRazorpay()}
            >
              Pay Now
            </button>
            <Link
              href="/"
              className="bg-slate-800 text-white font-bold p-2 rounded-lg ml-4"
            >
              Cancel{" "}
            </Link>
          </div>

          <div className="bg-slate-500 text-white items-center justify-start p-4 rounded-md flex md:max-w-full gap-4 ">
            <div className="font-bold">
              <div className="">Tour Name : {name}</div>
              <div className="">Tour Date : {todayDate}</div>
              <div className="">Tour Time : {time}</div>
              <div className="">No. of Person : {person}</div>
              <div className="">
                Tour Price : Rs. {totalPrice.toLocaleString()}
              </div>
              <div className="">Cancel Order Before: {formattedDate}</div>
            </div>
          </div>
        </div>
      </div>
   </>
  );
};

export default CheckOut;
