"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBullhorn } from "react-icons/fa";

const MailPage = () => {
  const [username, setUsername] = useState("Admin");
  const [formData, setFormData] = useState({
    email: "",
    carModel: "",
    location: "",
    description: "",
    rentalPricePerDay: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.username) setUsername(parsed.username);
      } catch (error) {
        console.error("Failed to parse userInfo from localStorage", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(formData.rentalPricePerDay) < 1) {
      toast.error("❌ Rental price per day must be greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/mail/send-car-rental-advertisement",
        {
          ...formData,
          rentalPricePerDay: Number(formData.rentalPricePerDay),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("🎉 Advertisement email sent successfully!");
      setFormData({
        email: "",
        carModel: "",
        location: "",
        description: "",
        rentalPricePerDay: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error sending email", error);
      toast.error("❌ Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex flex-col min-h-screen flex-1 ml-60">
        <Header username={username} />

        <main className="flex-1 pt-24 pb-6 px-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-200 shadow-xl space-y-6 transition-all duration-300">
            <h1 className="flex items-center text-3xl font-bold text-gray-800 mb-4">
              <FaBullhorn className="text-blue-600 mr-3" />
              Advertisement Mailing
            </h1>

            <form onSubmit={handleSend} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Recipient Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
              <input
                type="text"
                name="carModel"
                placeholder="Car Model"
                value={formData.carModel}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={3}
                required
              />
              <input
                type="number"
                name="rentalPricePerDay"
                placeholder="Rental Price Per Day (in $)"
                value={formData.rentalPricePerDay}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                min={1}
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded shadow-lg transform transition hover:scale-105 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Advertisement"}
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MailPage;
