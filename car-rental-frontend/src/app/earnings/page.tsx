"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { FaDollarSign, FaCar, FaFilePdf } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EarningsPage = () => {
  const [username, setUsername] = useState("Admin");
  const [totalEarnings, setTotalEarnings] = useState<number | null>(null);
  const [topCars, setTopCars] = useState<
    { name: string; location: string; total_earnings: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");

      const totalRes = await axios.get("http://localhost:3000/earnings/total", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTotalEarnings(totalRes.data.total_earnings);

      const carsRes = await axios.get("http://localhost:3000/earnings/top-cars", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTopCars(carsRes.data);
    } catch (err) {
      console.error("Error fetching earnings data", err);
      setError("❌ Failed to fetch earnings data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/earnings/top-cars/pdf";

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
        withCredentials: true,
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "top-earning-cars.pdf";
        link.click();
        setSuccessMessage("✅ PDF downloaded successfully!");
        setError("");
      })
      .catch((err) => {
        console.error("Error downloading PDF", err);
        setError("❌ Failed to download PDF.");
      });
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-60">
        {/* Fixed header */}
        <div className="fixed top-0 left-60 right-0 z-50">
          <Header username={username} />
        </div>

        {/* Fixed footer */}
        <div className="fixed bottom-0 left-60 right-0 z-50">
          <Footer />
        </div>

        {/* Scrollable content */}
<main className="flex-1 pt-20 pb-16 px-6 overflow-y-auto mb-[60px]">

          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg p-10 rounded-3xl border border-gray-200 shadow-2xl space-y-8 transition-all duration-300">
            <h1 className="flex items-center text-3xl font-bold text-gray-800 mb-4">
              <FaDollarSign className="text-green-600 mr-3" />
              Earnings Dashboard
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded animate-fade-in">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded animate-fade-in">
                {successMessage}
              </div>
            )}

            <div className="bg-gradient-to-r from-green-200 via-green-100 to-green-50 border border-green-300 text-green-900 p-6 rounded-2xl shadow-inner text-2xl font-bold text-center">
              Total Earnings: {loading ? "Loading..." : `$${totalEarnings?.toFixed(2)}`}
            </div>

            <h2 className="flex items-center text-2xl font-bold text-gray-700 mt-6">
              <FaCar className="text-blue-600 mr-2" />
              Top Earning Cars
            </h2>

            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Rank</th>
                    <th className="px-4 py-2 text-left">Car Name</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Total Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {topCars.map((car, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-gray-100"}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{car.name}</td>
                      <td className="px-4 py-2">{car.location}</td>
                      <td className="px-4 py-2">${car.total_earnings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Earnings Bar Chart</h3>
              <div className="w-full h-96 bg-white rounded-xl shadow-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topCars}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_earnings" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaFilePdf className="mr-2" />
              Download Top Cars PDF
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EarningsPage;
