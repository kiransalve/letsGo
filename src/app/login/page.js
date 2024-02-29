"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <section className="flex items-center justify-center h-screen max-w-sm mx-auto">
      <div className="p-10 border rounded-lg">
        <h1 className="text-center text-slate-600 text-4xl font-semibold">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inputStyle"
            type="email"
            name="email"
            placeholder="email@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="inputStyle"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="outline-none border rounded-xl border-gray-700 px-4 py-2 w-full hover:bg-slate-600 hover:text-white text-gray-700 font-semibold"
          >
            Login
          </button>
          <div className="text-center my-4">
            Already have account,{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
