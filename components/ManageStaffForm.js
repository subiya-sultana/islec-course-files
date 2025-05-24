// components/ManageStaffForm.jsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Lazy-load the actual form
const StaffForm = dynamic(() => import("./forms/StaffForm"), {
  loading: () => <p className="p-4 text-center">Loading Form...</p>,
});

export default function ManageStaffForm({ onClose }) {
  const [formType] = useState("staff"); // Expandable for future types

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <i className="bx bx-x text-2xl"></i>
        </button>
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Add Staff</h2>
        {formType === "staff" && <StaffForm type="create" />}
      </div>
    </div>
  );
}
