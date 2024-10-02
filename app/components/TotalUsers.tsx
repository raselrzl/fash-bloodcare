"use client";

import { useEffect, useState } from 'react';
import TotalUsersServer from './TotalUsersServer';

const TotalUsers = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [availableDonors, setAvailableDonors] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    const { userCount: count, availableDonors: donors, error } = await TotalUsersServer();

    if (error) {
      setError(error);
    } else {
      setUserCount(count);
      setAvailableDonors(donors);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData(); // Fetch on initial mount

    const interval = setInterval(() => {
      fetchUserData(); // Fetch every 5 seconds (5000 milliseconds)
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
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
};

export default TotalUsers;
