// app/(menu)/manage-staff/[id]/page.js
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const dummyStaff = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "ADMIN",
    departments: ["HR", "Finance"],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "HOD",
    departments: ["Computer Science"],
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    role: "FACULTY",
    departments: ["Mathematics", "Physics"],
  },
  {
    id: 4,
    name: "Jack Smith",
    email: "jack@example.com",
    role: "HOD",
    departments: ["Computer Science"],
  },
];

export default function StaffProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const found = dummyStaff.find((staff) => staff.id === parseInt(id));
    setUser(found);
  }, [id]);

  if (!user) return <div className="p-8">Staff not found.</div>;

  return (
    <div className="m-4 p-8 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Staff Profile</h1>
      <div className="space-y-2 text-gray-700">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Departments:</strong> {user.departments.join(", ")}</p>
      </div>
    </div>
  );
}
