"use client";

import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white flex flex-col p-6 fixed left-0 top-0">
      <Link href="/home" className="text-2xl font-bold mb-10 hover:text-pink-400 transition">Dashboard</Link>
      <Link href="/users" className="mb-4 hover:text-pink-400 transition">Users</Link>
      <Link href="/earnings" className="mb-4 hover:text-pink-400 transition">Earnings</Link>
      <Link href="/payment" className="mb-4 hover:text-pink-400 transition">Payment</Link>
      <Link href="/advertisement" className="mb-4 hover:text-pink-400 transition">Advertisement</Link>
      <Link href="/settings" className="mb-4 hover:text-pink-400 transition">Settings</Link>
    </div>
  );
};

export default Sidebar;
