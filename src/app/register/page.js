"use client";
import Link from "next/link";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const response = await fetch("api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
  };
  return (
    <section className="flex items-center justify-center h-screen max-w-sm mx-auto">
      <div className="p-10 border rounded-lg">
        <h1 className="text-center text-slate-600 text-4xl font-semibold">
          Register
        </h1>
        {error && (
          <p className="text-center mt-4 bg-primary p-2 rounded-md text-white">
            Error when creating user, Please try again.
          </p>
        )}
        {userCreated && (
          <p className="text-center mt-4 bg-blue-600 p-2 rounded-md text-white">
            User Created Please{" "}
            <Link href="/login" className="underline">
              Login
            </Link>{" "}
            Now
          </p>
        )}{" "}
        <form onSubmit={handleSubmit}>
          <input
            className="inputStyle"
            type="email"
            placeHolder="email@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="inputStyle"
            type="password"
            placeHolder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="outline-none border rounded-xl border-gray-700 px-4 py-2 w-full hover:bg-slate-600 hover:text-white text-gray-700 font-semibold"
            type="submit"
          >
            Register
          </button>
          <div className="text-center my-4">
            Already have account,{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
