"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminUsersServer from "@/app/components/AdminUsersServer";

const SuperAdmin = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const superAdminLoggedIn = localStorage.getItem("superAdminLoggedIn");

    // Check if user is not logged in or not a super admin
    if (isLoggedIn !== "true" || superAdminLoggedIn !== "true") {
      // Redirect to another page (e.g., admin dashboard)
      router.push("/admin/dashboard");
    }
  }, [router]);

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

      <AdminUsersServer />
    </div>
  );
};

export default SuperAdmin;
