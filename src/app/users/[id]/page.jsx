// src\app\users\[id]\page.js
"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { UserProfile } from "../../components/layout/UserProfile";
import UserForm from "../../components/layout/UserForm";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditUser = () => {
  const { loading } = UserProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const router = useRouter();
  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        const user = users.find((u) => u._id === id);
        setUser(user);
      });
    });
  }, [id]);

  if (loading) {
    return "Loading user profile...";
  }
  const handleProfileUpdate = async (e, data) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) {
        toast.success("User profile updated successfully!");
        router.push("/users");
      } else {
        toast.error("Error updating user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Error updating user profile");
    }
  };
  return (
    <section className="mt-9 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <UserForm user={user} onSave={handleProfileUpdate} />
    </section>
  );
};

export default EditUser;
