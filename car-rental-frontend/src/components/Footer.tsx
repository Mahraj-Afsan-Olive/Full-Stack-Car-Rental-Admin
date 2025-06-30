"use client";

import React from "react";

const Footer = () => {
  return (
    <div className="bg-indigo-900 text-white text-center p-4">
      &copy; {new Date().getFullYear()} Car Rental Admin Panel. All rights reserved.
    </div>
  );
};

export default Footer;
