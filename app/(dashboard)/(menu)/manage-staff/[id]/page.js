"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StaffProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  if (!id) return;

  setLoading(true);
  setError(null);

  fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/user?userId=${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch staff data");
      }
      return res.json();
    })
    .then((data) => {
      if (!data || Object.keys(data).length === 0) {
        setUser(null); // No user found
      } else {
        setUser(data);
      }
    })
    .catch((err) => {
      setError(err.message);
      setUser(null);
    })
    .finally(() => setLoading(false));
}, [id]);

  if (loading) return <div className="m-4 p-8 max-w-xl mx-auto bg-white rounded shadow">Loading staff data...</div>;

  if (error) return <div className="m-4 p-8 max-w-xl mx-auto bg-white rounded shadow text-red-600">Error: {error}</div>;

  if (!user) return <div className="m-4 p-8 max-w-xl mx-auto bg-white rounded shadow">Staff not found.</div>;

  return (
    <div className="m-4 p-8 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Staff Profile</h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p>
            <strong>Departments:</strong>{" "}
            {user.departments?.map((dept) => dept.name).join(", ")}
          </p>
        </div>

    </div>
    
  );
}
