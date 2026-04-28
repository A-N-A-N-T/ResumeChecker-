import { useState , useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview"





const Home = () => {
  


  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight">
        AI Resume Analyzer 🚀
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg text-gray-300 max-w-2xl">
        Get instant insights on your resume using AI. Improve your chances of getting hired with smart analysis, keyword matching, and professional suggestions.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex gap-6">
        
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg transition transform hover:scale-105">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold shadow-lg transition transform hover:scale-105">
            Register
          </button>
        </Link>

      </div>

      {/* Extra Feature Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl">
        
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold">📊 Smart Analysis</h3>
          <p className="text-gray-400 mt-2">AI evaluates your resume deeply.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold">🎯 Keyword Matching</h3>
          <p className="text-gray-400 mt-2">Match resumes with job roles.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold">⚡ Instant Feedback</h3>
          <p className="text-gray-400 mt-2">Improve instantly with suggestions.</p>
        </div>

      </div>

    </div>
  );
};

export default Home;