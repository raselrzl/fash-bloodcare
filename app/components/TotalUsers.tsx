import { BASE_API_URL } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function TotalUsers() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [availableDonors, setAvailableDonors] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const users = await response.json();

        setUserCount(users.length); // Set the total user count
        setAvailableDonors(users.filter((user: any) => user.availableDonar === 'available').length); // Filter available donors
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex justify-center items-center bg-black space-x-8">
      {/* Total Users Counter */}
      <div className="bg-black border-4 border-red-500 p-8 rounded-full shadow-lg flex justify-center items-center w-28 h-28">
        <div className="text-center">
          <h1 className="text-sm font-bold text-red-500">Total</h1>
          <p className="text-2xl mt-4 text-red-500 font-extrabold">
            {userCount !== null ? userCount : '0'}+
          </p>
        </div>
      </div>

      {/* Available Donors Counter */}
      <div className="bg-black border-4 border-green-500 p-8 rounded-full shadow-lg flex justify-center items-center w-28 h-28">
        <div className="text-center">
          <h1 className="text-sm font-bold text-white">Available</h1>
          <p className="text-2xl mt-4 text-green-500 font-extrabold">
            {availableDonors !== null ? availableDonors : '0'}+
          </p>
        </div>
      </div>
    </div>
  );
}
