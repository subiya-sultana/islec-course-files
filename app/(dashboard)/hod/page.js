"use client"
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HodDashboard() {
  const { user, loading, error } = useUser();
  const router = useRouter();

  console.log(user)

  useEffect(() => {
    if (!loading) {
      if (!user) return; 
      if (user.role.toLowerCase() !== "hod") router.push("/");
    }
  }, [user, loading, router]);
  
  if (loading || !user || user.role.toLowerCase() !== "hod") return null;
  if (loading) return <div className="p-4">Loading user info...</div>;
  if (error) return <div className="p-4">Error loading user info: {error}</div>;

  return (
    <div className="p-4">
      <h1>hod Dashboard</h1>

      {/* Display user info */}
      <div>
        <h2>Logged in user info:</h2>
        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>Role:</strong> {user?.role || "N/A"}</p>
      </div>

      {/* Your hod dashboard content goes here */}
    </div>
  );
}
