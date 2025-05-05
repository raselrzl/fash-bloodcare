import { BASE_API_URL } from "@/lib/utils";
import AdminUsersList from "./AdminUserList";
import { AdminUser } from "@/lib/type";
import { unstable_noStore as noStore } from "next/cache";
// Server-side data fetching component
const AdminUsersServer = async () => {
  noStore();
  let adminUsers: AdminUser[] = [];
  let error = '';

  try {
    const response = await fetch(`${BASE_API_URL}/api/adminuser`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    adminUsers = await response.json();
  } catch (err) {
    console.error(err);
    error = "Failed to fetch users";
  }

  return (
    <div>
      <AdminUsersList adminUsers={adminUsers} error={error} />
    </div>
  );
};

export default AdminUsersServer;
