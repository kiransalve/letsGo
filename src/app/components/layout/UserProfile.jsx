"use client";
import React, { useEffect, useState } from "react";

export const UserProfile = () => {
  const [data, setData] = useState({});
  const [loadng, setLoading] = useState(true);

  const getProfiledata = async () => {
    const response = await fetch("/api/profile");
    if (response.ok) {
      const responsedata = await response.json();
      if (responsedata) {
        setData(responsedata);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getProfiledata();
  }, []);

  return { loadng, data };
};
