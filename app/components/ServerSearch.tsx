// components/ServerSearch.tsx
"use client";
import React, { useState } from "react";
import { User } from "@/lib/type";
import { BASE_API_URL } from "@/lib/utils";
import SearchC from "./SearchCom";

const ServerSearch = ({ initialUsers }: { initialUsers: User[] }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch the latest data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchC
      users={users}
      error={error}
      isLoading={isLoading}
      refetchData={fetchData} // Pass fetch function to the child
    />
  );
};

export default ServerSearch;
