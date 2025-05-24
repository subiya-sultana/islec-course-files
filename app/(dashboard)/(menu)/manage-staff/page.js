/* eslint-disable jsx-a11y/role-has-required-aria-props */
"use client";

import { useState, useRef, useEffect } from "react";
import ActionButton from "@/components/ActionButton";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

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

// Role priority for sorting
const rolePriority = {
  ADMIN: 1,
  HOD: 2,
  FACULTY: 3,
};

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Role", accessor: "role" },
  { header: "Departments", accessor: "departments" },
  { header: "Actions", accessor: "actions" },
];

export default function ManageStaff() {
  const [staff, setStaff] = useState(dummyStaff);
  const [sortBy, setSortBy] = useState("role");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const sortStaff = (data, criteria) => {
    const sorted = [...data];
    if (criteria === "role") {
      sorted.sort((a, b) => rolePriority[a.role] - rolePriority[b.role]);
    } else if (criteria === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "departments") {
      sorted.sort((a, b) => {
        const deptA = a.departments[0] || "";
        const deptB = b.departments[0] || "";
        return deptA.localeCompare(deptB);
      });
    }
    return sorted;
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setDropdownOpen(false);
  };

  const handleAddStaff = () => {
    alert("Add Staff clicked");
  };

  const toggleDropdown = () => {
    setDropdownOpen((open) => !open);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDeleteConfirmed = () => {
    setStaff((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const sortedStaff = sortStaff(staff, sortBy);

  const renderRow = (user) => (
    <tr key={user.id} className="border-b hover:bg-gray-100">
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2 uppercase">{user.role}</td>
      <td className="p-2">{user.departments.join(", ")}</td>
      <td className="p-2 flex gap-4 text-xl">
        <ActionButton
          iconClass="bx bx-show"
          title="View Profile"
          asLink
          href={`/manage-staff/${user.id}`}
          color="blue"
        />
        <ActionButton
          iconClass="bx bx-edit"
          title="Edit"
          onClick={() => alert(`Edit user ${user.name} clicked`)}
          color="blue"
        />
        <ActionButton
          iconClass="bx bx-trash"
          title="Delete"
          onClick={() => {
            setSelectedUser(user);
            setIsDeleteModalOpen(true);
          }}
          color="red"
        />
      </td>
    </tr>
  );

  return (
    <div className="p-6 m-4 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-500">Manage Staff</h1>

        <div className="flex items-center gap-4 relative">
          <ActionButton
            iconClass="bx bx-plus"
            title="Add Staff"
            onClick={handleAddStaff}
            color="green"
          />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              title="Sort By"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              className="p-1 cursor-pointer hover:bg-opacity-80 text-3xl flex items-center justify-center rounded-md transition-colors text-blue-600 bg-blue-100 hover:bg-blue-200"
            >
              <i className="bx bx-filter"></i>
            </button>

            {dropdownOpen && (
              <ul
                role="listbox"
                tabIndex={-1}
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-md z-10"
              >
                <li
                  role="option"
                  tabIndex={0}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                    sortBy === "role" ? "font-semibold bg-blue-50" : ""
                  }`}
                  onClick={() => handleSortChange("role")}
                >
                  Role
                </li>
                <li
                  role="option"
                  tabIndex={0}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                    sortBy === "name" ? "font-semibold bg-blue-50" : ""
                  }`}
                  onClick={() => handleSortChange("name")}
                >
                  Name
                </li>
                <li
                  role="option"
                  tabIndex={0}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                    sortBy === "departments" ? "font-semibold bg-blue-50" : ""
                  }`}
                  onClick={() => handleSortChange("departments")}
                >
                  Departments
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col) => (
              <th key={col.accessor} className="p-2 text-left text-gray-700">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{sortedStaff.map((user) => renderRow(user))}</tbody>
      </table>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="Confirm Staff Deletion"
        message={`Are you sure you want to delete the staff name "${selectedUser?.name}"?`}
      />
    </div>
  );
}
