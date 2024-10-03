// app/components/UsersServer.tsx
import { useState } from "react";
import { BASE_API_URL } from "@/lib/utils";
import { User } from "@/lib/type";
import Search from "./Search";

interface Props {
  initialUsers: User[];
  error?: string | null;
}

// This component renders the Search component with user data
const UsersServer: React.FC<Props> = ({ initialUsers, error }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setFetchError(null); // Reset error state before fetching

    try {
      const response = await fetch(`${BASE_API_URL}/api/userdata`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Error fetching users");
      }

      const fetchedUsers: User[] = await response.json();
      console.log("Fetched Users:", fetchedUsers);
      setUsers(fetchedUsers); // Update state with the fetched users
    } catch (error) {
      console.error("Fetch error:", error);
      setFetchError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={fetchUsers}
        disabled={loading}
        className={`mt-4 px-4 py-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      {fetchError && <div className="text-red-500">{fetchError}</div>}
      <Search users={users} error={error || fetchError} />
    </div>
  );
};

// Fetch initial user data on server-side rendering
export const getServerSideProps = async () => {
  let users: User[] = [];
  let error: string | null = null;

  try {
    const response = await fetch(`${BASE_API_URL}/api/userdata`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    users = await response.json();
  } catch (err) {
    console.error(err);
    error = "Failed to fetch users";
  }

  return {
    props: {
      initialUsers: users, // Pass initial users as props
      error,
    },
  };
};

export default UsersServer;
