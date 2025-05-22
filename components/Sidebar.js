"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import { useUser } from "@/app/context/UserContext";

// Reusable Sidebar Link Component
function SidebarItem({ icon: Icon, label, href, active, sidebarOpen }) {
  const classes = `flex items-center gap-3 p-2 rounded-lg transition ${
    active ? "bg-blue-200" : "hover:bg-gray-100"
  } ${!sidebarOpen ? "justify-center" : ""}`;

  return (
    <li className="cursor-pointer">
      <Link href={href} className={classes}>
        <Icon className="w-5 h-5" />
        {sidebarOpen && <span>{label}</span>}
      </Link>
    </li>
  );
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useUser();
  const pathname = usePathname();
  const roleRoute = `/${user?.role?.toLowerCase() || ""}`;
  const isActive = (route) => pathname === route;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white shadow-md flex flex-col z-40 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1 text-sm text-gray-700">

          <SidebarItem
            icon={Home}
            label="Dashboard"
            href={roleRoute}
            active={isActive(roleRoute)}
            sidebarOpen={sidebarOpen}
          />

          <SidebarItem
            icon={Users}
            label="Manage Staff"
            href="/manage-staff"
            active={isActive("/manage-staff")}
            sidebarOpen={sidebarOpen}
          />

          <SidebarItem
            icon={LayoutDashboard}
            label="Departments"
            href="/departments"
            active={isActive("/departments")}
            sidebarOpen={sidebarOpen}
          />

          <SidebarItem
            icon={BookOpen}
            label="Subjects"
            href="/subjects"
            active={isActive("/subjects")}
            sidebarOpen={sidebarOpen}
          />

        </ul>
      </nav>
    </aside>
  );
}
