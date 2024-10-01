// app/admin/dashboard/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { User } from '@/lib/type';
import { BASE_API_URL } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Search from '@/app/components/Search';

const AdminDashboard: React.FC = () => {
  const router = useRouter();

 
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

   // Check if the user is logged in
   useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin'); // Redirect to admin login page
    }
  }, [router]); 

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/api/adminuser`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: User[] = await response.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error}</div>;

  return <Search/>;
};

export default AdminDashboard