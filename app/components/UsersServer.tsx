import { BASE_API_URL } from "@/lib/utils";
import { User } from "@/lib/type";
import Search from "./Search";
import { useState } from "react";

const UsersServer = async () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Error fetching users");
      }
      const data: User[] = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    }
  };

  // Fetch users initially
  await fetchUsers();

  return (
    <div>
      <Search users={users} error={error} refreshData={fetchUsers} />
    </div>
  );
};

export default UsersServer;
