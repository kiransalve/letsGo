// src\app\menu-items\edit\[id]\page.jsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserProfile } from "../../../components/layout/UserProfile";
import UserTabs from "../../../components/layout/UserTabs";
import { useParams, useRouter } from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import DeleteButton from "../../../components/layout/DeleteButton";
import { useSelector } from "react-redux";

const EditMenuItems = () => {
  const { loading: profileLoading, data } = UserProfile();
  const [menuItem, setMenuItems] = useState();
  const [formdataLoading, setFormdataLoading] = useState(false);
  const { id } = useParams();
  const { tourItem, error, loading } = useSelector((state) => state.tourList);

  const router = useRouter();

  const getFormdata = useCallback(async () => {
    setFormdataLoading(true);
    const item = tourItem.find((i) => i._id === id);
    setFormdataLoading(false);
    setMenuItems(item);
  }, [id, tourItem]);
  useEffect(() => {
    getFormdata();
  }, [getFormdata]);

  if (profileLoading) {
    return "Loading user info...";
  }
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    data = { ...data, _id: id };
    try {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Saved");
        router.push("/menu-items");
      } else {
        toast.error("Error saving item");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error saving item");
    }
  };
  const handleDelete = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
        getFormdata();
        router.push("/menu-items");
      } else {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto mb-4">
      <UserTabs isAdmin={true} />

      {formdataLoading && (
        <div className="text-center text-gray-400">Loading Menu Item...</div>
      )}
      {!formdataLoading && (
        <>
          <MenuItemForm onSubmit={handleSubmit} menuItem={menuItem} />
          <div className=" bg-slate-200 cursor-pointer max-w-[200px]">
            <div className="bg-primary rounded-lg mx-auto">
              <div className="py-2 text-center text-white">
                <DeleteButton label={`Delete`} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default EditMenuItems;
