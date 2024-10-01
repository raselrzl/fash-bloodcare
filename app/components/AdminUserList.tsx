import { BASE_API_URL } from "@/lib/utils";
import { AdminUserActions } from "./AdminUserAction";

interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

async function fetchAdminUsers(): Promise<AdminUser[]> {
  const res = await fetch(`${BASE_API_URL}/api/adminuser`, {
    cache: 'no-store', // Prevent caching on server
  });
  if (!res.ok) {
    throw new Error("Failed to fetch admin users");
  }
  return res.json();
}

const AdminUsersTable = async () => {
  const adminUsers = await fetchAdminUsers();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Admin Users
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Full Name
              </th>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Email
              </th>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Admin Status
              </th>
              <th className="py-2 px-4 text-white border-b border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user._id} className="bg-gray-800">
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {user.fullName}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <AdminUserActions userId={user._id} isAdmin={user.isAdmin} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersTable;
