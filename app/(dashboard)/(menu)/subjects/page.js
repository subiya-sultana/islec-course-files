"use client"
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Subjects() {
  const { user, loading, error } = useUser();
  const router = useRouter();
  
  if (loading) return <div className="p-4">Loading user info...</div>;
  if (error) return <div className="p-4">Error loading user info: {error}</div>;

  return (
    <div className="p-4">
      <h1>Subjects</h1>

      {/* Display subjects info */}
      <div>
        fetch subjects here from route
      </div>

      
    </div>
  );
}
