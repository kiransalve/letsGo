"use client";
// src\app\components\layout\UserForm.js
import React, { useEffect, useState } from "react";

const UserForm = ({ user, onSave, saved, saving, isAdmin }) => {
  const [username, setUserName] = useState("");
  const [street, setStreet] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  useEffect(() => {
    // Update the state when the 'user' prop changes
    setUserName(user?.name || "");
    setStreet(user?.street || "");
    setMobile(user?.mobile || "");
    setCity(user?.city || "");
    setPincode(user?.pincode || "");
  }, [user]);

  return (
    <div className="">
      <form
        className="md:max-w-xl max-w-sm mx-auto"
        onSubmit={(e) =>
          onSave(e, { name: username, street, mobile, city, pincode })
        }
      >
        {saved && (
          <h2 className="text-center bg-green-500 my-2 max-w-sm rounded-md mx-auto text-white">
            Profile Saved Successfully...!
          </h2>
        )}
        {saving && (
          <h2 className="text-center bg-green-500 my-2 max-w-sm rounded-md mx-auto text-white">
            Saving...
          </h2>
        )}
        {isAdmin && (
          <>
            <div className="w-full bg-green-600 text-center text-white font-bold rounded-lg p-2 my-2">
              Admin
            </div>
          </>
        )}
        <div className="flex items-start">
          <div className="grow">
            <label>Full Name</label>
            <input
              className="inputStyle"
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              className="inputStyle"
              type="text"
              value={user?.email}
              disabled
            />
            <label>Mobile</label>
            <input
              className="inputStyle"
              type="tel"
              placeholder="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label>Address</label>
            <input
              className="inputStyle"
              type="text"
              placeholder="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                className="inputStyle"
                type="text"
                placeholder="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                className="inputStyle"
                placeholder="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <button
              className="outline-none border rounded-xl border-gray-700 px-6 py-2 block text-gray-700 font-semibold"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
