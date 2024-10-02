"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServerSearch from '@/app/components/ServerSearch';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
   useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin'); 
    }
  }, [router]); 

  return <ServerSearch />;
};

export default AdminDashboard