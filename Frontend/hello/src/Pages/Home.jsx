import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">

  {/* Navbar */}
  <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-blue-500">
        StudentHub
      </h1>

      {/* Menu */}
      <ul className="flex items-center gap-8 text-lg font-medium">
        <li className="cursor-pointer hover:text-blue-400 duration-300">
          Home
        </li>

        <li className="cursor-pointer hover:text-blue-400 duration-300">
          About
        </li>

        <li className="cursor-pointer hover:text-blue-400 duration-300">
          Contact
        </li>

        <button
          onClick={() => navigate("/login")}
          className="border border-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white duration-300"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 duration-300"
        >
          Signup
        </button>
      </ul>
    </div>
  </nav>

  {/* Hero Section */}
  <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 items-center gap-12">

    {/* Left Side */}
    <div>

      <h1 className="text-5xl md:text-6xl font-bold leading-tight">
        Student Project
        <span className="text-blue-500"> Management </span>
        System
      </h1>

      <p className="mt-6 text-gray-400 text-lg leading-8">
        Manage your academic projects with ease.
        Teachers can review and approve submissions,
        while students can upload and track their projects
        in one place.
      </p>

      <div className="flex gap-5 mt-10">

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 px-7 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border border-blue-500 px-7 py-3 rounded-lg text-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

      </div>

    </div>

    {/* Right Side */}
    <div className="flex justify-center">

      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
        alt="Students"
        className="rounded-2xl shadow-2xl w-full max-w-lg border border-gray-800"
      />

    </div>

  </section>

  {/* Features */}
  <section className="bg-gray-900 py-16">

    <div className="max-w-7xl mx-auto px-8">

      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose Us?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-gray-800 p-8 rounded-xl hover:scale-105 duration-300 shadow-lg">
          <div className="text-5xl mb-4">📁</div>
          <h3 className="text-2xl font-semibold mb-3">
            Project Upload
          </h3>
          <p className="text-gray-400">
            Students can upload projects with documents and images securely.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl hover:scale-105 duration-300 shadow-lg">
          <div className="text-5xl mb-4">👨‍🏫</div>
          <h3 className="text-2xl font-semibold mb-3">
            Teacher Review
          </h3>
          <p className="text-gray-400">
            Teachers can approve or reject projects with comments.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl hover:scale-105 duration-300 shadow-lg">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-2xl font-semibold mb-3">
            Dashboard
          </h3>
          <p className="text-gray-400">
            Track project progress using an intuitive dashboard.
          </p>
        </div>

      </div>

    </div>

  </section>

  {/* Footer */}
  <footer className="bg-black text-gray-400 text-center py-6 border-t border-gray-800">
    © 2026 StudentHub. All Rights Reserved.
  </footer>

</div>
  );
};

export default Home;



