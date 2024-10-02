import { useState, useEffect } from 'react';
import { User } from "@/lib/type";
import Search from "./Search";
import { BASE_API_URL } from "@/lib/utils";

const UsersServer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch latest data from the server
  const fetchUpdatedData = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
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
      setLoading(false); // Hide loading state
    }
  };

 

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
