// components/AdminUsersList.tsx
"use client";

import { useEffect, useState } from "react";
import NavigationLink from "./NavigationLink";

interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

const AdminUsersList = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/adminuser", { cache: 'no-store' });
      const data = await response.json();

      if (!response.ok) {
        setError("Error fetching users");
      } else {
        setAdminUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/adminuser/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !currentStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      } else {
        fetchUsers(); // Refresh the list after update
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/adminuser/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      } else {
        fetchUsers(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Admin Users
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Full Name
              </th>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Email
              </th>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Admin Status
              </th>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user._id} className="bg-gray-800">
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {user.fullName}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    className="bg-green-500 text-white px-2 mx-2 py-2 text-lg font-bold hover:bg-green-600 transition duration-300 ease-in-out justify-center items-center w-48"
                    onClick={() => toggleAdminStatus(user._id, user.isAdmin)}
                  >
                    {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-2 text-lg font-bold hover:bg-red-600 transition duration-300 ease-in-out justify-center items-center"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavigationLink />
    </div>
  );
};

export default AdminUsersList;
