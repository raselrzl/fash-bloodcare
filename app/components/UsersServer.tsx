import { BASE_API_URL } from "@/lib/utils";
import { User } from "@/lib/type";
import Search from "./Search";

const UsersServer = async () => {
  let users: User[] = [];
  let error = "";

  try {
    const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    users = await response.json();
  } catch (err) {
    console.error(err);
    error = "Failed to fetch users";
  }

  return (
    <div>
      <Search users={users} error={error} />
    </div>
  );
};

export default UsersServer;
