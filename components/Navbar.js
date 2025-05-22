"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, setUser } = useUser(); // assuming your context provides setUser
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-blue-50 shadow-md relative">
      {/* Left: Toggle & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-lg font-bold text-blue-600">CourseFlies</div>
      </div>

      {/* Right: User & Notifications */}
      <div className="flex items-center gap-5 ml-auto">
        <div className="relative text-xl text-gray-700 cursor-pointer">
          <i className="bx bx-message-dots"></i>
        </div>

        <div className="relative text-xl text-gray-700 cursor-pointer">
          <i className="bx bx-bell"></i>
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">1</span>
        </div>

        {user && (
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-medium">{user.name}</span>
            <span className="text-[10px] text-gray-500">{user.role}</span>
          </div>
        )}

        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer text-lg text-gray-600"
          >
            <i className="bx bx-user"></i>
          </div>

          {showDropdown && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              {user && (
                <li className="px-4 py-2 hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full text-gray-600">
                      <i className="bx bx-user text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                </li>
              )}
              <li className="border-t px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <i className="bx bx-user mr-2"></i> My Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <i className="bx bx-cog mr-2"></i> Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <div className="flex justify-between">
                  <span><i className="bx bx-bell mr-2"></i> Notifications</span>
                  <span className="bg-red-500 text-white text-xs px-2 rounded-full">4</span>
                </div>
              </li>
              <li
                onMouseDown={handleLogout}
                className="border-t px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
              >
                <i className="bx bx-power-off mr-2"></i> Log Out
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
