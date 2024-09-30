"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the AdminUsersList component
const AdminUsersList = dynamic(() => import("@/app/components/AdminUserList"), {
  ssr: false, // Disables SSR for this component
  loading: () => <p>Loading Admin Users...</p>, // Loading placeholder while component is being loaded
});

const SuperAdmin = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const superAdminLoggedIn = localStorage.getItem("superAdminLoggedIn");

    // Check if user is not logged in or not a super admin
    if (isLoggedIn !== "true" || superAdminLoggedIn !== "true") {
      router.push("/admin/dashboard");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>; // You can display a loading state or message while checking authentication
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Super Admin Dashboard</h1>

      <div className="flex justify-center items-center">
        <Link
          href="/admin/dashboard"
          className="bg-green-500 text-white my-10 px-6 py-2 text-lg font-bold hover:bg-green-600 transition duration-300 ease-in-out justify-center items-center"
        >
          Click here to go to Admin Dashboard
        </Link>
      </div>

      {/* Dynamically loaded AdminUsersList component */}
      <AdminUsersList />
    </div>
  );
};

export default SuperAdmin;
