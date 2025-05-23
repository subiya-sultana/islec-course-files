"use client"
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Departments() {
  const { user, loading, error } = useUser();
  const router = useRouter();
  
  if (loading) return <div className="p-4">Loading user info...</div>;
  if (error) return <div className="p-4">Error loading user info: {error}</div>;

  return (
    <div className="p-4">
      <h1>Depaartments</h1>

      {/* Display user info */}
      <div>
        fetch departments here from route
      </div>

      {/* Your admin dashboard content goes here */}
    </div>
  );
}
