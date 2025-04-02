"use client"
import { useState } from "react";
import axios from "axios";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    Admin: false,
    HOD: false,
    Faculty: false,
  });
  const [formData, setFormData] = useState({
    Admin: { email: "", password: "" },
    HOD: { email: "", password: "" },
    Faculty: { email: "", password: "" },
  });
  const [loading, setLoading] = useState({ Admin: false, HOD: false, Faculty: false });
  const [error, setError] = useState(null);

  const togglePasswordVisibility = (role) => {
    setShowPassword((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  const handleChange = (e, role) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [role]: { ...prev[role], [name]: value },
    }));
  };

  const handleLogin = async (role) => {
    setLoading((prev) => ({ ...prev, [role]: true }));
    setError(null);
    try {
        const response = await axios.post("/api/login", {
            ...formData[role],
            role,
        });

        const { token, role: userRole } = response.data;
    alert(`Login successful: ${response.data.role}`);
    console.log(response.data);

    Cookies.set("token", token); // Set token in cookies
    router.push(`/dashboard/${userRole.toLowerCase()}`);
      console.log("Router push executed");

    } catch (err) {
        setError(err.response?.data?.error || "Login failed");
    } finally {
        setLoading((prev) => ({ ...prev, [role]: false }));
    }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 gap-8 bg-slate-200">
      <h1 className="text-2xl font-bold text-center">Please Login First To Continue..</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {["Admin", "HOD", "Faculty"].map((role) => (
            <div key={role} className="border border-gray-400 bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center flex flex-col items-center w-full max-w-xs mx-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-600">{role} Login</h2>
              <div className="relative w-full mb-2">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border border-gray-300 p-2 pl-10 w-full rounded"
                  required
                  value={formData[role].email}
                  onChange={(e) => handleChange(e, role)}
                />
              </div>
              <div className="relative w-full mb-4">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword[role] ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="border border-gray-300 p-2 pl-10 w-full rounded"
                  required
                  value={formData[role].password}
                  onChange={(e) => handleChange(e, role)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => togglePasswordVisibility(role)}
                >
                  {showPassword[role] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer hover:bg-green-700"
                onClick={() => handleLogin(role)}
                disabled={loading[role]}
              >
                {loading[role] ? "Logging in..." : "Login"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
