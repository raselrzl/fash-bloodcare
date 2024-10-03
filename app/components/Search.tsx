
"use client";
import React, { useEffect, useState } from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaChevronCircleRight, FaPhoneAlt, FaPhone, FaUser, FaHeartbeat } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { CgUnavailable } from "react-icons/cg";
import { FcDepartment } from "react-icons/fc";
import { User } from "@/lib/type";
import jsPDF from "jspdf";
import LoadingSpinner from "./LoadingSpinner";
import NavigationLink from "./NavigationLink";
interface Props {
  users: User[]; // Initially passed from server-side component
  error?: string | null;
  regions?: string[];
}
const Search: React.FC<Props> = ({ users = [], error = null, regions = [] }) => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [search, setSearch] = useState({
      name: "",
      nidNumber: "",
      village: "",
      phoneNumber: "",
      bloodGroup: "",
    });
    const [showAvailableDonors, setShowAvailableDonors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; 

  
    useEffect(() => {
      const filtered = users.filter(
        (user) =>
          (search.name ? user.name.toLowerCase().includes(search.name.toLowerCase()) : true) &&
          (search.nidNumber ? user.nidNumber === search.nidNumber : true) &&
          (search.phoneNumber ? user.phoneNumber.includes(search.phoneNumber) : true) &&
          (search.bloodGroup ? user.bloodGroup === search.bloodGroup : true) &&
          (!showAvailableDonors || user.availableDonar === "available")
      );
  
      const sortedFiltered = filtered.sort((a, b) =>
        a.availableDonar === "available" && b.availableDonar !== "available"
          ? -1
          : b.availableDonar === "available" && a.availableDonar !== "available"
          ? 1
          : 0
      );
  
      setFilteredUsers(sortedFiltered);
      setCurrentPage(1); 
    }, [search, showAvailableDonors, users]);
  
    const downloadPDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Filtered Donor Data", 10, 10);
      doc.setFontSize(12);
  
      if (filteredUsers.length === 0) {
        doc.text("No donors found for the current search.", 10, 20);
      } else {
        filteredUsers.forEach((user, index) => {
          doc.text(
            `${index + 1}. Name: ${user.name}, Phone: ${user.phoneNumber}, Blood Group: ${user.bloodGroup}`,
            10,
            20 + index * 10
          );
        });
      }
  
      doc.save("Donors.pdf");
    };
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
    if (error) return <div>Error: {error}</div>;
  
    if (isLoading) {
      return <LoadingSpinner />;
    }

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-4 px-2 overflow-x-hidden">
      <h1 className="text-2xl text-green-300 font-bold text-center m-6 px-4">
        Here is our all Super Human
      </h1>

      <div className="mb-6 px-10">
        <div className="flex flex-col justify-center md:flex-row md:space-x-2 space-y-4 md:space-y-0">
          <input
            type="text"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            placeholder="Search by Name"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
          <input
            type="text"
            value={search.phoneNumber}
            onChange={(e) =>
              setSearch({ ...search, phoneNumber: e.target.value })
            }
            placeholder="Search by Phone Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
          <select
            value={search.bloodGroup}
            onChange={(e) =>
              setSearch({ ...search, bloodGroup: e.target.value })
            }
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          >
            <option value="">Search by Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-center mt-2 md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={showAvailableDonors}
              onChange={(e) => setShowAvailableDonors(e.target.checked)}
              className={`mr-2 h-6 w-6 rounded border-2 appearance-none ${
                showAvailableDonors
                  ? "bg-green-500 border-green-500 checked:bg-green-500 checked:border-green-500"
                  : "border-gray-400"
              } transition duration-200`}
            />
            <label className="text-white">Check Available Donors</label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((user, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 shadow-lg border border-gray-700 transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold flex items-center">
                  <FaUser className="mr-2 text-green-300" />
                  {user.name}
                </h2>
                <a
                  href={`tel:${user.phoneNumber}`} 
                  className="text-green-500 hover:text-green-200"
                >
                  <FaPhoneAlt className="text-2xl" />
                </a>
              </div>
              <div className="mb-2">
                <p className="flex items-center text-sm">
                  <FaPhone className="mr-2 text-green-500" />
                  {user.phoneNumber}
                </p>
              </div>
              {user.availableDonar === "available" ? (
                <div className="mb-2">
                  <p className="flex items-center text-sm">
                    <MdEventAvailable className="mr-2 text-green-500" />
                    Available Donor: {user.availableDonar}{" "}
                    <BiSolidDonateBlood className="ml-2 text-2xl text-green-500" />
                  </p>
                </div>
              ) : (
                <div className="mb-2">
                  <p className="flex items-center text-sm">
                    <CgUnavailable className="mr-2 text-red-500" />
                    Unavailable Donor: {user.availableDonar}
                  </p>
                </div>
              )}
              <div className="mb-2">
                <p className="flex items-center text-sm">
                  <FaHeartbeat className="mr-2 text-red-400" />
                  Blood Group: {user.bloodGroup}
                </p>
              </div>
              <div className="mb-2">
                <p className="flex items-center text-sm">
                  <LiaLayerGroupSolid className="mr-2 text-yellow-300" />
                  Division: {user.region}, District: {user.city}
                </p>
              </div>
              <div className="mb-2">
                <p className="flex items-center text-sm">
                  <FcDepartment className="mr-2" />
                  Upazila: {user.policeStation}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No users found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300"
            } px-4 py-2 rounded-lg mx-1`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={downloadPDF}
        className="bg-green-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg mt-8"
      >
        Download as PDF
      </button>

      <div className="my-8">
        <NavigationLink />
      </div>
    </div>
  );
};

export default Search;
