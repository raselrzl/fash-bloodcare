"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import NavigationLink from "@/components/NavigationLink";
import { User } from "@/lib/type";
import { BASE_API_URL } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaHeartbeat,
  FaCity,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const Search: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState({
    name: "",
    nidNumber: "",
    village: "",
    phoneNumber: "",
    bloodGroup: "",
    city: "",
    region: "",
  });
  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Function to fetch users based on search criteria
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Build query string based on search criteria
      const queryParams = new URLSearchParams();
      Object.entries(search).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      console.log("Fetching data from:", `${BASE_API_URL}/api/userdata?${queryParams}`);
      const response = await fetch(`${BASE_API_URL}/api/userdata?${queryParams}`);
      console.log("Response status:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data: User[] = await response.json();
      console.log("Fetched data:", data);
      setUsers(data);

      // Extract unique regions from the fetched data
      const uniqueRegions = Array.from(new Set(data.map((user) => user.region)));
      setRegions(uniqueRegions);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch users initially and set an interval for refreshing the data
    fetchUsers();
    const intervalId = setInterval(fetchUsers, 300000); // Refresh every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fetch users whenever the search criteria change
    fetchUsers();
  }, [search]);

  useEffect(() => {
    const getCities = (region: string) => {
      switch (region) {
        case "Dhaka":
          return [
            "Dhaka",
            "Narayanganj",
            "Gazipur",
            "Manikgonj",
            "Munshigonj",
            "Narsingdi",
            "Tangail",
            "Kishorgonj",
            "Netrokona",
            "Faridpur",
            "Gopalgonj",
            "Madaripur",
            "Rajbari",
            "Shariatpur",
          ];
        case "Sylhet":
          return ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"];
        case "Barishal":
          return [
            "Barishal",
            "Patuakhali",
            "Bhola",
            "Pirojpur",
            "Barguna",
            "Jhalokati",
          ];
        case "Chattogram":
          return [
            "Chittagong",
            "Cox's Bazar",
            "Rangamati",
            "Bandarban",
            "Khagrachhari",
            "Feni",
            "Lakshmipur",
            "Comilla",
            "Noakhali",
            "Brahmanbaria",
            "Chandpur",
          ];
        case "Khulna":
          return [
            "Khulna",
            "Bagherhat",
            "Sathkhira",
            "Jessore",
            "Magura",
            "Jhenaidah",
            "Narail",
            "Kushtia",
            "Chaudanga",
            "Meherpur",
          ];
        case "Rajshahi":
          return [
            "Rajshai",
            "Chapainawabganj",
            "Natore",
            "Naogaon",
            "Pabna",
            "Sirajganj",
            "Bogra",
            "Joypurhat",
          ];
        case "Rangpur":
          return ["Rangpur", "Nilphamari", "Saidpur", "Dinajpur"];
        case "Mymensingh":
          return [
            "Tangail",
            "Jamalpur",
            "Kishoreganj",
            "Sherpur",
            "Netrokona",
            "Mymensingh",
          ];
        default:
          return [];
      }
    };

    setCities(getCities(search.region));
  }, [search.region]);

  const handleSearchChange = (key: string, value: string) => {
    setSearch((prevSearch) => ({ ...prevSearch, [key]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-4 px-2 overflow-x-hidden">
      <h1 className="text-2xl text-green-300 font-bold text-center m-6 px-4">
        Here is our all Super Human
      </h1>

      <div className="mb-6 px-10 ">
        <div className="flex flex-col justify-center md:flex-row md:space-x-2 space-y-4 md:space-y-0">
          <input
            type="text"
            value={search.name}
            onChange={(e) => handleSearchChange("name", e.target.value)}
            placeholder="Search by Name"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
          <input
            type="text"
            value={search.nidNumber}
            onChange={(e) => handleSearchChange("nidNumber", e.target.value)}
            placeholder="Search by NID Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
          <input
            type="text"
            value={search.phoneNumber}
            onChange={(e) => handleSearchChange("phoneNumber", e.target.value)}
            placeholder="Search by Phone Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
        </div>
        <div className="flex flex-col justify-center mt-2 md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <select
            value={search.bloodGroup}
            onChange={(e) => handleSearchChange("bloodGroup", e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          >
            <option value="">Search by Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <select
            value={search.region}
            onChange={(e) => handleSearchChange("region", e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            value={search.city}
            onChange={(e) => handleSearchChange("city", e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {/* Removed manual filtering button and logic, fetch happens automatically on change */}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4 rounded-lg"
            >
              <div className="flex justify-center mb-2">
                <FaUser size={50} />
              </div>
              <h2 className="text-xl text-center">{user.name}</h2>
              <p className="text-center">
                <FaPhoneAlt className="inline mr-2" />
                {user.phoneNumber}
              </p>
              <p className="text-center">
                <FaHeartbeat className="inline mr-2" />
                Blood Group: {user.bloodGroup}
              </p>
              <p className="text-center">
                <FaMapMarkerAlt className="inline mr-2" />
                Village: {user.village}
              </p>
              <p className="text-center">
                <FaCity className="inline mr-2" />
                City: {user.city}
              </p>
              <p className="text-center">
                <FaHome className="inline mr-2" />
                Region: {user.region}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
