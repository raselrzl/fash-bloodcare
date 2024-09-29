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

  console.log(BASE_API_URL)

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
      const response = await fetch('/api/userdata', { cache: 'no-store' });
      console.log('BASE_API_URL in production:', process.env.NEXT_PUBLIC_BASE_API_URL);
      console.log('BASE_API_URL:', process.env.BASE_API_URL);
      console.log('MongoDB URI:', process.env.MONGODB_URI);
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

  useEffect(() => {
    fetchUsers(); // Fetch immediately when component mounts

    // Set up interval to fetch data every 10 minutes
   /*  const intervalId = setInterval(fetchUsers, 1 * 60 * 1000); // 10 minutes

    return () => {
      clearInterval(intervalId); // Clean up interval on component unmount
    }; */
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error}</div>;

  return <Search initialUsers={users}/>;
};

export default AdminDashboard