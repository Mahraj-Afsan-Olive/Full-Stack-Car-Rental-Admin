"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { FaMobileAlt, FaStripe } from "react-icons/fa";

export default function PaymentPage() {
  const [method, setMethod] = useState<"mobile" | "stripe" | null>(null);

  // Mobile payment states
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState<"staff" | "owner">("owner");
  const [phoneNo, setPhoneNo] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [step, setStep] = useState<"init" | "otp">("init");

  // Toast helpers
  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  // Helpers
  const isPositiveInteger = (value: string) => {
    const num = Number(value);
    return Number.isInteger(num) && num > 0;
  };

  const isPositiveNumber = (value: string) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  };

  const handleInitiatePayment = async () => {
    if (!userId || !phoneNo || !amount) {
      notifyError("Please fill in all fields");
      return;
    }
    if (!isPositiveInteger(userId)) {
      notifyError("User ID must be a positive integer");
      return;
    }
    if (!isPositiveNumber(amount)) {
      notifyError("Amount must be a positive number");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          userType,
          phoneNo,
          amount: parseFloat(amount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to initiate payment");
      setPaymentId(data.paymentId);
      notifySuccess(data.message || "OTP sent. Please enter it below.");
      setStep("otp");
      setOtp("");
    } catch (error: any) {
      notifyError(error.message || "Failed to initiate payment.");
    }
  };

  const handleConfirmPayment = async () => {
    if (!otp) {
      notifyError("Please enter the OTP");
      return;
    }
    if (!paymentId) {
      notifyError("Payment ID is missing. Please initiate payment first.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ paymentId, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to confirm payment");
      notifySuccess(data.message);
      setStep("init");
      setPaymentId("");
      setOtp("");
    } catch (error: any) {
      notifyError(error.message || "Failed to confirm payment.");
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) {
      setUserId(e.target.value);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const [username, setUsername] = useState("Admin");
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.username) setUsername(parsed.username);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-h-screen ml-60">
        <Header username={username} />

        <main className="flex-1 p-10 overflow-y-auto max-w-3xl mx-auto flex flex-col items-center min-h-[calc(100vh-80px)]">
          {/* Removed extra <Toaster /> here since it's already in RootLayout */}

          {!method && (
            <div className="flex flex-col items-center justify-center flex-grow">
              <h1 className="text-4xl font-bold mb-10 text-gray-800">Select Payment Method</h1>

              <div className="flex flex-col md:flex-row gap-6">
                <button
                  onClick={() => setMethod("mobile")}
                  className="flex items-center gap-3 px-8 py-3 w-56 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-md justify-center"
                >
                  <FaMobileAlt className="text-xl" />
                  Mobile Payment
                </button>
                <button
                  onClick={() => setMethod("stripe")}
                  className="flex items-center gap-3 px-8 py-3 w-56 rounded-lg font-medium bg-sky-500 text-white hover:bg-sky-600 transition shadow-md justify-center"
                >
                  <FaStripe className="text-xl" />
                  Stripe
                </button>
              </div>
            </div>
          )}

          {method && (
            <div
              className={`w-full ${
                method === "mobile" ? "max-w-4xl" : "max-w-2xl"
              } bg-white rounded-xl p-8 shadow-lg mt-8`}
            >
              <h2 className="text-2xl font-semibold mb-6 text-emerald-700">
                {method === "mobile" ? "Mobile Payment" : "Stripe Payment"}
              </h2>

              {method === "mobile" && (
                <>
                  {step === "init" && (
                    <>
                      <div className="mb-4">
                        <label className="block font-medium text-gray-700 mb-1">User ID</label>
                        <input
                          type="text"
                          value={userId}
                          onChange={handleUserIdChange}
                          placeholder="User ID"
                          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium text-gray-700 mb-1">User Type</label>
                        <select
                          value={userType}
                          onChange={(e) => setUserType(e.target.value as "staff" | "owner")}
                          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="owner">Owner</option>
                          <option value="staff">Staff</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          placeholder="e.g., +8801..."
                          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-1">Amount</label>
                        <input
                          type="text"
                          value={amount}
                          onChange={handleAmountChange}
                          placeholder="Amount"
                          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <button
                        onClick={handleInitiatePayment}
                        className="w-full bg-emerald-600 text-white py-3 rounded-md font-semibold hover:bg-emerald-700 transition"
                      >
                        Send OTP
                      </button>
                    </>
                  )}

                  {step === "otp" && (
                    <>
                      <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-1">Enter OTP</label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="OTP"
                          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <button
                        onClick={handleConfirmPayment}
                        className="w-full bg-emerald-600 text-white py-3 rounded-md font-semibold hover:bg-emerald-700 transition"
                      >
                        Confirm Payment
                      </button>
                    </>
                  )}
                </>
              )}

              {method === "stripe" && (
                <div>
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="Amount in USD"
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      if (!amount || Number(amount) <= 0) {
                        notifyError("Please enter a valid amount");
                        return;
                      }

                      try {
                        const res = await fetch("http://localhost:3000/stripe/create-checkout-session", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ amount: parseFloat(amount) }),
                        });

                        const data = await res.json();
                        if (!res.ok) throw new Error(data.message || "Failed to create Stripe session");

                        // Redirect to Stripe Checkout
                        window.location.href = data.url;
                      } catch (error: any) {
                        notifyError(error.message || "Stripe payment failed.");
                      }
                    }}
                    className="w-full bg-sky-500 text-white py-3 rounded-md font-semibold hover:bg-sky-600 transition"
                  >
                    Pay with Stripe
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setMethod(null);
                  setStep("init");
                  setUserId("");
                  setUserType("owner");
                  setPhoneNo("");
                  setAmount("");
                  setOtp("");
                  setPaymentId("");
                }}
                className="mt-6 block text-center text-emerald-600 hover:underline"
              >
                &larr; Back to payment methods
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
