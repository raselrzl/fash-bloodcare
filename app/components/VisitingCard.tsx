import { BASE_API_URL } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaPhoneAlt, FaUser } from "react-icons/fa";

interface AdminUser {
  fullName: string;
  phoneNumber: string;
  email: string;
}

const VisitingCard: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch admin user data from the API
    const fetchAdminUsers = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/adminuser`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch admin user data");
        }
        const data: AdminUser[] = await response.json();
        setAdminUsers(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  return (
    <div className="px-8">
      <h1 className="items-center text-center text-4xl font-bold text-white mb-8">
        Contact us
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 ">
        {adminUsers && adminUsers.length > 0 ? (
          adminUsers.map((user, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 shadow-lg border-4 rounded-lg animate-moving-border relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold flex items-center">
                  <FaUser className="mr-2 text-green-300" />
                  {user.fullName}
                </h2>
                <a
                  href={`tel:${user.phoneNumber}`}
                  className="text-green-500 hover:text-green-200"
                >
                  <FaPhoneAlt className="text-2xl" />
                </a>
              </div>

              <div className="mb-2">
                <p className="flex items-center text-sm text-gray-300">
                  <FaEnvelope className="mr-2 text-green-500" />
                  {user.email}
                </p>
              </div>

              <div className="mb-2">
                <p className="flex items-center text-sm text-gray-300">
                  <FaPhone className="mr-2 text-green-500" />
                  {user.phoneNumber}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default VisitingCard;
