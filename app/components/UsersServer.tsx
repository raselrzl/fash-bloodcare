'use client';

import { useState, useEffect } from 'react';
import { User } from "@/lib/type";
import Search from "./Search";
import { BASE_API_URL } from "@/lib/utils";

const UsersServer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch user data from the server dynamically
  const fetchUpdatedData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/api/userdata`, {
        method: 'GET',  // Use GET method
        cache: 'no-cache', // Use no-cache to force fresh data
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate', // Ensure fresh fetch
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching users");
      }

      const data = await response.json();
      setUsers(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data once when the component mounts
  useEffect(() => {
    fetchUpdatedData();
  }, []);

  return (
    <div>
      <button
        onClick={fetchUpdatedData}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Loading..." : "Fetch Updated Data"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <Search users={users} error={error} />
    </div>
  );
};

export default UsersServer;
