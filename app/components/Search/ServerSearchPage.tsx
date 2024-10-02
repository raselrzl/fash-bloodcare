// components/ServerSearch.tsx (Server Component)
import { User } from "@/lib/type";
import { BASE_API_URL } from "@/lib/utils";
import SearchC from "./SearchCom";

const ServerSearch = async () => {
  let users: User[] = [];
  let error = null;

  try {
    const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    users = await response.json();
  } catch (err) {
    error = (err as Error).message;
  }

  return <SearchC users={users} error={error} />;
};

export default ServerSearch;
