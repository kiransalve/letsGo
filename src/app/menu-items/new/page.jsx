// src\app\menu-items\new\page.jsx
"use client";
import React from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import { UserProfile } from "../../components/layout/UserProfile";
import MenuItemForm from "../../components/layout/MenuItemForm";
import { useRouter } from "next/navigation";

const MenuItems = () => {
  const { loading, data } = UserProfile();
  const router = useRouter();

  if (loading) {
    return "Loading user info...";
  }
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/menu-items", {
        method: "POST",
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

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />

      <MenuItemForm onSubmit={handleSubmit} />
    </section>
  );
};

export default MenuItems;
