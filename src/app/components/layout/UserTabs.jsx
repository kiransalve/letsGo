"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();
  return (
    <>
      <div className="flex gap-2 justify-center tabs mt-24">
        <Link href="/profile" className={path === "/profile" ? "active" : ""}>
          Profile
        </Link>
        {isAdmin && (
          <>
            <Link
              href="/categories"
              className={path === "/categories" ? "active" : ""}
            >
              Categories
            </Link>
            <Link
              href="/menu-items"
              className={path.includes("/menu-items") ? "active" : ""}
            >
              Tours
            </Link>
            <Link
              href="/users"
              className={path.includes("/users") ? "active" : ""}
            >
              Users
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default UserTabs;
