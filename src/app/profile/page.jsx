// src\app\profile\page.jsx
"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import UserForm from "../components/layout/UserForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = () => {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const session = useSession();
 
  const getProfiledata = async () => {
    const response = await fetch("/api/profile");
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setUser(data);
        setIsAdmin(data.admin);
        return data;
      }
    }
  };
  const router = useRouter();
  useEffect(() => {
    if(session.status === "authenticated") {
      getProfiledata();
    } 
  }, [session.status]);

  if (session.status === "loading") {
    return <div className="text-center mt-10">Loading...</div>;
  }
  if (session.status === "unauthenticated") {
    return (
      <>
        <section className="my-4">
          <h1 className="text-center text-primary text-2xl">
            Please{" "}
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>{" "}
            to view Profile
          </h1>
        </section>
      </>
    );
  }

  const handleProfileUpdate = async (e, data) => {
    e.preventDefault();

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (response.ok) {
      setSaved(true);
      console.log("Profile updated");
    }
  };
  return (
    <section className="">
      <UserTabs isAdmin={isAdmin} />
      <UserForm
        user={user}
        onSave={handleProfileUpdate}
        saved={saved}
        saving={saving}
        isAdmin={isAdmin}
      />
    </section>
  );
};

export default Profile;
