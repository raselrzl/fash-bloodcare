'use client';

import { useState, useEffect } from 'react';
import { User } from "@/lib/type";
import Search from "./Search";
import { BASE_API_URL } from "@/lib/utils";

const UsersServer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch latest data from the server dynamically at runtime
  const fetchUpdatedData = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Error fetching users");
      }
      const data = await response.json();
      setUsers(data);  // Update state with the fetched data
      setError("");  // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");  // Set error state if the request fails
    } finally {
      setLoading(false);  // End the loading state
    }
  };

  // Fetch data when the component mounts (to fetch dynamically at runtime)
  useEffect(() => {
    fetchUpdatedData(); // Fetch data when the component mounts
  }, []);

  return (
    <div>
      <button 
        onClick={fetchUpdatedData}  // Fetch updated data on button click
        className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Loading..." : "Fetch Updated Data"}
      </button>

      {/* Show error message if present */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Pass users data to Search component */}
      <Search users={users} error={error} />
    </div>
  );
};

export default UsersServer;
