"use client";
import { useState, useEffect } from "react";
import React from "react";
import { UserProfile } from "../components/layout/UserProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToursList } from "../../store/toursList";

const Order = () => {
  const { data } = UserProfile();
  const userId = data._id;
  const [orderData, setOrderData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const [user, setUser] = useState(null);
  const { tourItem } = useSelector((state) => state.tourList);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("tourItem");
    dispatch(fetchToursList());
  }, [dispatch]);

  const orderItemHandler = () => {
    const items = orderData?.map((order) => {
      const itemList = tourItem?.find((item) => item._id === order.itemId);
      const userList = user?.find((item) => item._id === order.userId);
      return {
        orderNo: order._id,
        itemList: itemList,
        person: order.person,
        totalPrice: order.totalPrice,
        tourDate: order.tourDate,
        tourTime: order.tourTime,
        userList: userList,
        orderDate: order.orderDate,
      };
    });
    setOrderItem(items || []);
  };

  const fetchOrderUserData = async () => {
    const response = await fetch(`/api/users`);
    const data = await response.json();
    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    orderItemHandler();
    fetchOrderUserData();
  }, [orderData, tourItem]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setDataLoading(true);
        const response = await fetch(`/api/order?userId=${userId}`);
        const data = await response.json();
        if (data) {
          setOrderData(data);
          setDataLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <>
      {session.status === "authenticated" && (
        <>
          <div className="mt-5">
            <div className="md:p-10 p-2 mx-auto">
              <div className="text-slate-600 font-bold mt-10 text-xl py-2 text-center">
                User Orders
              </div>
              <div className="md:p-6 p-1 mx-auto overflow-x-auto">
                <div className="flex flex-col w-[1220px] rounded-lg md:p-4 p-0 text-sm">
                  {/* heading of data */}
                  <div className="flex font-bold py-2 text-sm">
                    {data?.admin && (
                      <>
                        <div className="flex-1 p-1 border-b ">User Name </div>
                        <div className="flex-1 p-1 border-b">User Email </div>
                      </>
                    )}
                    <div className="flex-1 p-1 border-b">Order Date </div>
                    <div className="flex-1 p-1 border-b">Tour </div>
                    <div className="flex-1 p-1 border-b  ">No. of Person </div>
                    <div className="flex-1 p-1 border-b ">Total Price </div>
                    <div className="flex-1 p-1 border-b ">Tour Date </div>
                    <div className="flex-1 p-1 border-b ">Tour Time </div>
                  </div>
                  {/* if no order */}
                  {!dataLoading && orderItem.length === 0 && (
                    <>
                      <div className="max-w-sm flex gap-5 text-sm md:mx-auto mt-10">
                        <div className="p-2 bg-red-600 text-white rounded-lg">
                          No Orders Yet
                        </div>
                        <Link
                          href="/tours"
                          className="p-2 bg-green-600 text-white rounded-lg"
                        >
                          Book Now
                        </Link>
                      </div>
                    </>
                  )}
                  {/* if orders loading */}
                  <div className="overflow-y-auto h-72">
                    {dataLoading && (
                      <div className="md:max-w-[18rem] max-w-[14rem]  md:mx-auto text-sm mt-10">
                        <div className="p-2 bg-green-600 text-white rounded-lg text-center">
                          Order Data is loading...
                        </div>
                      </div>
                    )}
                    {/* if order is loaded successfully */}
                    {!dataLoading &&
                      orderItem?.map((item, index) => {
                        return (
                          <div
                            className="flex p-1 text-sm mt-10"
                            key={index}
                          >
                            {data?.admin && (
                              <>
                                <div className="flex-1 p-1 ">
                                  {item?.userList?.name || "No Username"}{" "}
                                </div>
                                <div className="flex-1 p-1  ">
                                  {item?.userList?.email}{" "}
                                </div>
                              </>
                            )}
                            <div className="flex-1 p-1  ">{item?.orderDate} </div>

                            <Link
                              href={`/tourdetails/${item?.itemList?._id}`}
                              className="flex-1 p-1  text-blue-400 underline "
                            >
                              {item?.itemList?.name}{" "}
                            </Link>

                            <div className="flex-1 p-1  text-center ">
                              {item?.person || "1"}{" "}
                            </div>
                            <div className="flex-1 p-1  ">
                              Rs. {item?.totalPrice?.toLocaleString()}{" "}
                            </div>
                            <div className="flex-1 p-1  ">{item?.tourDate} </div>
                            <div className="flex-1 p-1  ">{item?.tourTime} </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Order;
