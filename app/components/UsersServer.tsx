import { BASE_API_URL } from "@/lib/utils";
import { User } from "@/lib/type";
import Search from "./Search";
import { unstable_noStore as noStore } from "next/cache";
const UsersServer = async () => {
noStore()
  let users: User[] = [];
  let error = "";

  try {
    const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-cache" });
    console.log("API URL:", BASE_API_URL);
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    users = await response.json();
    console.log(users)
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
