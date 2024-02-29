"use client";
import React, { useEffect } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfile } from "../components/layout/UserProfile";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchToursList } from "../../store/toursList";

const MenuItems = () => {
  const { loading: profileLoading, data: profileData } = UserProfile();
  const { tourItem, error, loading } = useSelector((state) => state.tourList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToursList());
  }, [dispatch]);

  if (profileLoading) {
    return "Loading user info...";
  }

  return (
    <section className="mt-8">
      {!profileData.admin && (
        <div className="mt-24 flex items-center justify-center">
          <div className="bg-red-600 max-w-xl text-white p-2 rounded-lg ">
            You are not authorized to view this page
          </div>
        </div>
      )}
      {profileData.admin && (
        <>
          <UserTabs isAdmin={true} />
          <div className="py-1 max-w-sm text-gray-600 cursor-pointer text-center border mx-auto rounded-lg my-5 hover:text-white hover:bg-gray-600">
            <Link href="/menu-items/new">Create New Item</Link>
          </div>
          <div className="px-24 max-w-5xl mx-auto mt-2">
            {profileData.admin && tourItem?.length === 0 && !loading && (
              <div className="text-center text-gray-600">
                Please Add Menu Items
              </div>
            )}
            {profileData.admin && loading ? (
              <div className="text-center text-gray-600">
                Loading menu items...
              </div>
            ) : (
              <>
                {tourItem?.length > 0 && (
                  <h2 className="text-sm text-gray-500 m-4 ml-0">
                    Edit Menu Items :{" "}
                  </h2>
                )}
                {tourItem?.length > 0 &&
                  tourItem?.map((item) => {
                    return (
                      <>
                        <Link
                          key={item._id}
                          className="mb-2 text-gray-600 border rounded-md flex md:flex-row flex-col p-2 gap-4"
                          href={"menu-items/edit/" + item._id}
                        >
                          <div className="flex-1">
                            <Image
                              src={item.image}
                              width={240}
                              height={240}
                              className="rounded-md"
                              alt="image1"
                            />
                          </div>
                          <div className="flex-col flex-1 gap-2">
                            <p>Tour Name : {item.name}</p>
                            <p>Price : Rs. {item.price}</p>
                            <p>Time : {item.duration}</p>
                            <div>Catgory : {item.category}</div>
                          </div>
                        </Link>
                      </>
                    );
                  })}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default MenuItems;
