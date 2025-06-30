"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { FaUsers, FaUserFriends, FaCar, FaCarSide } from "react-icons/fa";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function generateCalendarDays(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const leadingEmpty = Array(firstDay).fill(null);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return [...leadingEmpty, ...daysArray];
}

const HomePage = () => {
  const [username, setUsername] = useState("Admin");
  const [weather, setWeather] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");

  const now = new Date();
  const [calendarYear] = useState(now.getFullYear());
  const [calendarMonth] = useState(now.getMonth());

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

    fetchWeather();
    fetchNews();
    updateTime();

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateTime = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    setCurrentTime(timeStr);
  };

  const fetchWeather = async () => {
    try {
      const apiKey = "weather api key";
      const city = "Dhaka";
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather", error);
    }
  };

  const fetchNews = async () => {
    try {
      const apiKey = "news api key";
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`
      );
      setNews(res.data.articles);
    } catch (error) {
      console.error("Error fetching news", error);
    }
  };

  const currentDate = now.toLocaleDateString();
  const currentYear = now.getFullYear();
  const currentMonthName = now.toLocaleString("default", { month: "long" });
  const today = now.getDate();

  const calendarDays = generateCalendarDays(calendarYear, calendarMonth);

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex flex-col min-h-screen flex-1 ml-60">
        <Header username={username} />

        <main className="flex-1 pt-32 pb-6 px-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md text-center font-semibold flex flex-col items-center">
                <FaUsers className="text-4xl mb-2" />
                Total Owners: 50
              </div>
              <div className="bg-green-600 text-white p-6 rounded-xl shadow-md text-center font-semibold flex flex-col items-center">
                <FaUserFriends className="text-4xl mb-2" />
                Total Passengers: 300
              </div>
              <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-md text-center font-semibold flex flex-col items-center">
                <FaCar className="text-4xl mb-2" />
                Rented Cars: 120
              </div>
              <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md text-center font-semibold flex flex-col items-center">
                <FaCarSide className="text-4xl mb-2" />
                Available Cars: 30
              </div>
            </div>

            {/* Weather, News, Date-Time + Calendar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Weather */}
              <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col min-h-[250px] justify-center items-center text-white text-center">
                <h2 className="text-2xl font-bold mb-6">🌤️ Live Weather</h2>
                {weather ? (
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-lg font-semibold">
                      City: <span className="font-normal">{weather.location.name}</span>
                    </p>
                    <p className="text-lg font-semibold">
                      Temperature: <span className="font-normal">{weather.current.temp_c} °C</span>
                    </p>
                    <p className="text-lg font-semibold">
                      Condition: <span className="font-normal">{weather.current.condition.text}</span>
                    </p>
                    <img
                      src={weather.current.condition.icon}
                      alt="Weather Icon"
                      className="w-20"
                    />
                  </div>
                ) : (
                  <p className="text-white text-lg">Loading weather...</p>
                )}
              </div>

              {/* News */}
              <div className="bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col min-h-[250px]">
                <h2 className="text-2xl font-bold mb-4 text-teal-900 text-center">📰 Latest News</h2>
                {news.length > 0 ? (
                  <ul className="space-y-3 overflow-y-auto flex-1 pr-2">
                    {news.map((article, index) => (
                      <li key={index}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-900 hover:text-teal-700 transition-colors duration-200 font-medium"
                        >
                          {article.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-teal-900 text-center">Loading news...</p>
                )}
              </div>

              {/* Date & Calendar */}
              <div className="bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="flex justify-between items-center mb-4 bg-slate-50 rounded-md p-4">
                  <h2 className="text-xl font-bold text-slate-800">
                    📅 {currentMonthName} {currentYear} Calendar
                  </h2>
                  <div className="text-slate-900 font-mono font-semibold text-lg tracking-wide select-none">
                    {currentDate}{" "}
                    <span className="ml-2 text-2xl">{currentTime}</span>
                  </div>
                </div>

                <table className="table-fixed w-full border-collapse border border-slate-700 rounded-md overflow-hidden">
                  <thead>
                    <tr>
                      {WEEK_DAYS.map((day) => (
                        <th
                          key={day}
                          className="border border-slate-600 p-2 text-center bg-slate-200 text-slate-900 font-semibold select-none"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
                      (_, weekIndex) => (
                        <tr key={weekIndex}>
                          {calendarDays
                            .slice(weekIndex * 7, weekIndex * 7 + 7)
                            .map((date, idx) => {
                              const isToday =
                                date === today &&
                                calendarMonth === now.getMonth() &&
                                calendarYear === now.getFullYear();

                              return (
                                <td
                                  key={idx}
                                  className={`border border-slate-600 p-3 text-center select-none ${
                                    date === null
                                      ? "bg-slate-50"
                                      : isToday
                                      ? "bg-slate-700 text-white font-bold rounded-full"
                                      : "text-slate-900"
                                  }`}
                                >
                                  {date || ""}
                                </td>
                              );
                            })}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
