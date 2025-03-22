"use client";
import { useState } from "react";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";

export default function Login() {
  // Initialize a state to track visibility for each role
  const [showPassword, setShowPassword] = useState({
    Admin: false,
    HOD: false,
    Faculty: false
  });

  const togglePasswordVisibility = (role) => {
    setShowPassword((prev) => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 gap-8 bg-slate-200">
      <h1 className="text-2xl font-bold text-center">Please Login First To Continue..</h1>
      <div className="flex justify-center items-center w-full">

        {/* Centered Grid of Login Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">

          {["Admin", "HOD", "Faculty"].map((role) => (
            <div key={role} className="border border-gray-400 bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center flex flex-col items-center w-full max-w-xs mx-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-600">{role} Login</h2>

              {/* Email Input */}
              <div className="relative w-full mb-2">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="border border-gray-300 p-2 pl-10 w-full rounded"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full mb-4">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword[role] ? "text" : "password"}
                  placeholder="Password"
                  className="border border-gray-300 p-2 pl-10 w-full rounded"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => togglePasswordVisibility(role)}
                >
                  {showPassword[role] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Login Button */}
              <button className="bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer hover:bg-green-700">
                Login
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
