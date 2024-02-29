"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfile } from "../components/layout/UserProfile";
import Link from "next/link";

const Users = () => {
  const { loading, data } = UserProfile();
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState();

  const fetchUser = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
    setDataLoading(false);
  };

  useEffect(() => {
    setDataLoading(true);
    fetchUser();
  }, []);

  if (loading) {
    return "Profile data Loading...";
  }
  if (dataLoading) {
    return <div className="text-center mt-8">Loading Users...</div>;
  }

  return (
    <section className="mt-8 md:max-w-xl max-w-md md:mx-auto mx-2">
      <div className="">
        {data.admin && (
          <>
            <UserTabs isAdmin={true} />
            <div className="mt-4">
              {users &&
                users.map((user, index) => (
                  <div
                    className="flex bg-gray-600 rounded-lg mb-2 p-1 items-center justify-around px-4"
                    key={index}
                  >
                    <div className="text-white py-3 flex-1">
                      {!!user.name && <span>{user.name}</span>}
                      {!user.name && <span className="italic">No Name</span>}
                    </div>
                    <span className="text-white py-3 flex-1">{user.email}</span>
                    <Link
                      className="button text-white py-3 flex-1 text-center"
                      href={"/users/" + user._id}
                    >
                      Edit
                    </Link>
                  </div>
                ))}
            </div>
          </>
        )}
        {!data.admin && (
          <>
            <div className="mt-24 flex items-center justify-center">
              <div className="bg-red-600 max-w-xl text-white p-2 rounded-lg ">
                You are not authorized to view this page
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Users;
