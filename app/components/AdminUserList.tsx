interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

interface AdminUsersListProps {
  adminUsers: AdminUser[];
  error: string;
}

const AdminUsersList = ({ adminUsers, error }: AdminUsersListProps) => {
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (adminUsers.length === 0) {
    return <div className="text-white">No users found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Admin Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-white border-b border-gray-600">Full Name</th>
              <th className="py-2 px-4 text-white border-b border-gray-600">Email</th>
              <th className="py-2 px-4 text-white border-b border-gray-600">Admin Status</th>
              <th className="py-2 px-4 text-white border-b border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user._id} className="bg-gray-800">
                <td className="py-2 px-4 border-b border-gray-700 text-white">{user.fullName}</td>
                <td className="py-2 px-4 border-b border-gray-700 text-white">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {user.isAdmin ? "Admin" : "User"}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-white">
                  {/* Add any action buttons you need here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersList;
