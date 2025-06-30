"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaCarSide } from "react-icons/fa";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        { username, password },
        { withCredentials: true }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast.success("Login successful!");
        router.push("/home");
      } else {
        setError("Authentication failed. Token not received.");
        toast.error("Authentication failed. Token not received.");
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 px-4 relative overflow-hidden">
      {/* Decorative car icon */}
      <FaCarSide className="absolute top-10 left-10 text-white/20 text-[120px] rotate-[-15deg]" />
      <FaCarSide className="absolute bottom-10 right-10 text-white/10 text-[160px] rotate-[15deg]" />

      <div className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-md w-full transition-transform transform hover:scale-[1.02] duration-300">
        <h1 className="text-4xl font-extrabold text-white mb-4 text-center drop-shadow tracking-widest uppercase">
          Admin Login
        </h1>
        <p className="text-white text-center text-sm mb-8 opacity-80">
          Car Rental System Portal
        </p>

        {error && (
          <p className="text-red-700 bg-red-200 py-2 px-4 rounded mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 py-3 rounded-full bg-white/80 text-gray-700 focus:bg-white focus:ring-4 focus:ring-pink-300 outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 py-3 rounded-full bg-white/80 text-gray-700 focus:bg-white focus:ring-4 focus:ring-pink-300 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-red-500 text-white font-bold py-3 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-xl"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-white mt-6 text-center">
          Forgot Password?{" "}
          <a
            href="/ChangePassword"
            className="underline font-semibold hover:text-pink-200 transition"
          >
            Change Password
          </a>
        </p>

        <p
          className="text-sm text-white mt-4 text-center cursor-pointer underline hover:text-pink-300"
          onClick={() => router.push("/")}
        >
          &larr; Back to Home
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
