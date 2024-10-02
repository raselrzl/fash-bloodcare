import { BASE_API_URL } from "@/lib/utils";
import AdminUsersList from "./AdminUserList";
import { AdminUser } from "@/lib/type";

// Server-side data fetching component
const AdminUsersServer = async () => {
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
      {/* Pass the fetched users to the client component */}
      <AdminUsersList adminUsers={adminUsers} error={error} />
    </div>
  );
};

export default AdminUsersServer;
