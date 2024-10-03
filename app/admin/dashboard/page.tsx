// app/admin/dashboard/page.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UsersServer from '@/app/components/UsersServer';
import { BASE_API_URL } from "@/lib/utils";
import { User } from "@/lib/type";

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin'); // Redirect to admin login page
    }
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Error fetching users");
        }
        const fetchedUsers: User[] = await response.json();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };

    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <div>
      <UsersServer initialUsers={users} error={error} />
    </div>
  );
};

export default AdminDashboard;
