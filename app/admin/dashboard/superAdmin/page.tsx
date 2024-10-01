import Link from "next/link";
import AdminUsersList from "@/app/components/AdminUserList";
import { BASE_API_URL } from "@/lib/utils";

// Define the props for the SuperAdmin component
interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

// This function will now fetch the users directly in the page component (SSR by default in Next.js App Router)
const fetchUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${BASE_API_URL}/api/adminuser`, {
    cache: 'no-store', // no caching to ensure fresh data
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data;
};

export default async function SuperAdminPage() {
  let adminUsers: AdminUser[] = [];
  let error = "";

  try {
    // Fetching users on the server side
    adminUsers = await fetchUsers();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Super Admin Dashboard</h1>

      <div className="flex justify-center items-center">
        <Link
          href="/admin/dashboard"
          className="bg-green-500 text-white my-10 px-6 py-2 text-lg font-bold hover:bg-green-600 transition duration-300 ease-in-out justify-center items-center"
        >
          Click here Go to Admin Dashboard
        </Link>
      </div>

      {/* Pass fetched users and error to AdminUsersList */}
      <AdminUsersList adminUsers={adminUsers} error={error} />
    </div>
  );
}
