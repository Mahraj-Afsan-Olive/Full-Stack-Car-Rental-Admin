"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-800 to-pink-700 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="text-white text-3xl font-extrabold tracking-wide cursor-default select-none">
          CarRental
        </div>
        <div>
          <button
            onClick={goToLogin}
            className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:shadow-xl hover:bg-blue-100 transition"
          >
            Login Portal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto px-8 py-20 gap-12">
        {/* Left Text */}
        <div className="text-center md:text-left max-w-xl text-white">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Rent Your Dream Car Today
          </h1>
          <p className="text-lg text-blue-200 mb-8">
            Discover the easiest way to rent premium cars at affordable prices. 
            Our trusted platform offers a seamless experience for all your car rental needs.
          </p>
          <button
            onClick={goToLogin}
            className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:shadow-2xl hover:bg-blue-100 transition text-lg"
          >
            Rent Now!
          </button>
        </div>

        {/* Right Image */}
        <div className="max-w-md w-full">
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
            alt="Luxury Car"
            className="rounded-3xl shadow-2xl object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-200 text-center py-6 mt-auto">
        <p>
          &copy; {new Date().getFullYear()} CarRental System. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
