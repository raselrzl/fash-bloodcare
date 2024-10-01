// components/AdminUserActions.tsx
"use client";

import { useState } from "react";

interface AdminUserActionsProps {
  userId: string;
  isAdmin: boolean;
}

export const AdminUserActions = ({ userId, isAdmin }: AdminUserActionsProps) => {
  const [adminStatus, setAdminStatus] = useState(isAdmin);
  const [loading, setLoading] = useState(false);

  const toggleAdminStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/adminuser/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !adminStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      } else {
        setAdminStatus(!adminStatus); // Update admin status
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/adminuser/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      } else {
        alert("User deleted successfully");
        // Optionally refresh the data
        window.location.reload(); // For simplicity, reload the page after deletion
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <button
        className={`bg-${adminStatus ? 'green' : 'gray'}-500 text-white px-2 mx-2 py-2 text-lg font-bold hover:bg-${adminStatus ? 'green' : 'gray'}-600 transition duration-300 ease-in-out justify-center items-center w-48`}
        onClick={toggleAdminStatus}
        disabled={loading}
      >
        {adminStatus ? "Revoke Admin" : "Make Admin"}
      </button>
      <button
        className="bg-red-500 text-white px-2 py-2 text-lg font-bold hover:bg-red-600 transition duration-300 ease-in-out justify-center items-center"
        onClick={deleteUser}
        disabled={loading}
      >
        Delete
      </button>
    </>
  );
};
