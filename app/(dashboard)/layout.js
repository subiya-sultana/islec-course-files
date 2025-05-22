"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "../context/UserContext";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <UserProvider>
      <div className="h-screen flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div
          className={`flex-1 flex flex-col transition-all duration-300`}
          style={{ marginLeft: sidebarOpen ? "16rem" : "4rem" }}
        >
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </UserProvider>
  );
}
