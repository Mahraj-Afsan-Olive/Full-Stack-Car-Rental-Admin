"use client";

import React from "react";
import { FaCar } from "react-icons/fa";
import toast from "react-hot-toast";

const Header = ({ username }: { username: string }) => {
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="bg-indigo-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-60 right-0 z-50 shadow-md">
  
      <div className="flex items-center gap-3 text-3xl font-extrabold select-none pointer-events-none">
        <FaCar className="text-white" size={36} />
        CarRental
      </div>

    
      <div className="flex items-center gap-6 font-semibold text-lg">
        <div>Welcome, {username}</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
