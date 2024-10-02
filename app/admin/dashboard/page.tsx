"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServerSearch from '@/app/components/Search/ServerSearchPage';

const AdminDashboard: React.FC = () => {
  const router = useRouter();

   // Check if the user is logged in
   useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin'); // Redirect to admin login page
    }
  }, [router]); 

  return <ServerSearch />;
};

export default AdminDashboard