"use client"; // Ensure this is a client component
import React, { useEffect, useState } from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { CgUnavailable } from "react-icons/cg";
import { FcDepartment } from "react-icons/fc";
import { User } from "@/lib/type";
import { BASE_API_URL } from "@/lib/utils";
import { FaUser, FaPhoneAlt, FaHeartbeat, FaPhone } from "react-icons/fa";
import jsPDF from "jspdf"; // Import jsPDF
import LoadingSpinner from "./LoadingSpinner";
import NavigationLink from "./NavigationLink";
import Link from "next/link";
interface Props {
  initialUsers: User[];
  regions?: string[];
}

const Search: React.FC<Props> = ({ initialUsers, regions = [] }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [isSuperAdminLoggedIn, setIsSuperAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState({
    name: "",
    nidNumber: "",
    village: "",
    phoneNumber: "",
    bloodGroup: "",
  });
  const [showAvailableDonors, setShowAvailableDonors] = useState(false); // New state for available donors
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  useEffect(() => {
    // Check if localStorage is available and superAdminLoggedIn is true
    if (typeof window !== "undefined") {
      const superAdminLoggedIn =
        localStorage.getItem("superAdminLoggedIn") === "true";
      setIsSuperAdminLoggedIn(superAdminLoggedIn);
    }
  }, []);
  useEffect(() => {
    if (!users) return; // Ensure users is defined
    const filtered = users.filter(
      (user) =>
        (search.name
          ? user.name.toLowerCase().includes(search.name.toLowerCase())
          : true) &&
        (search.nidNumber ? user.nidNumber === search.nidNumber : true) &&
        (search.phoneNumber
          ? user.phoneNumber.includes(search.phoneNumber)
          : true) &&
        (search.bloodGroup ? user.bloodGroup === search.bloodGroup : true) &&
        (!showAvailableDonors || user.availableDonar === "available") // Filter by available donors if checkbox is checked
    );

    // Sort filtered users so available donors appear first
    const sortedFiltered = filtered.sort((a, b) =>
      a.availableDonar === "available" && b.availableDonar !== "available"
        ? -1
        : b.availableDonar === "available" && a.availableDonar !== "available"
        ? 1
        : 0
    );

    setFilteredUsers(sortedFiltered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  }, [search, showAvailableDonors, users]); // Add showAvailableDonors to dependency array

  // Function to download the filtered data as PDF
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
          `${index + 1}. Name: ${user.name}, Phone: ${
            user.phoneNumber
          }, Blood Group: ${user.bloodGroup}`,
          10,
          20 + index * 10
        );
      });
    }

    doc.save("Donors.pdf");
  };

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleUpdateClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleUpdateUser = (updatedUser: User) => {
    // Update the user in the state after successful update
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  // Get the current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-4 px-2 overflow-x-hidden">
      {isSuperAdminLoggedIn && (
        <div className="flex justify-center items-center">
          <Link
            href="/admin/dashboard/superAdmin"
            className="bg-green-500 text-white my-4 px-6 py-2 text-lg font-bold hover:bg-green-600 transition duration-300 ease-in-out justify-center items-center"
          >
            Click here Go to Super Admin Dashboard
          </Link>
        </div>
      )}
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
          {/* Checkbox for filtering available donors */}
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
        <div className="flex justify-center m-4">
          <button
            onClick={() =>
              setFilteredUsers(
                users.filter(
                  (user) =>
                    (search.name
                      ? user.name
                          .toLowerCase()
                          .includes(search.name.toLowerCase())
                      : true) &&
                    (search.phoneNumber
                      ? user.phoneNumber.includes(search.phoneNumber)
                      : true) &&
                    (search.bloodGroup
                      ? user.bloodGroup === search.bloodGroup
                      : true) &&
                    (!showAvailableDonors ||
                      user.availableDonar === "available") // Ensure the filter is applied here as well
                )
              )
            }
            className="relative px-20 py-2.5 font-bold text-white bg-transparent border-2 border-transparent overflow-hidden group"
          >
            <span className="absolute inset-0 border-2 border-gradient opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Search</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((user, index) => (
              <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 shadow-lg border border-gray-700 transition-transform transform hover:scale-105">
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <h2 className="text-2xl font-semibold flex items-center">
                    <FaUser className="mr-2 text-green-300" />
                    {user.name}
                  </h2>
                  <a
                    href={`tel:${user.phoneNumber}`} // Fixed syntax error
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
                      Available Donar: {user.availableDonar}{" "}
                      <BiSolidDonateBlood className="ml-2 text-3xl text-green-500" />
                    </p>
                  </div>
                ) : (
                  <div className="mb-2 text-red-500">
                    <p className="flex items-center text-sm">
                      <CgUnavailable className="mr-2" />
                      Available Donar: {user.availableDonar}
                      <CgUnavailable className="ml-2 text-3xl text-red-500" />
                    </p>
                  </div>
                )}
                <div className="mb-2">
                  <p className="flex items-center text-sm">
                    <FaHeartbeat className="mr-2 text-red-500" />
                    Blood Group: {user.bloodGroup}
                  </p>
                </div>

                <div className="mb-2">
                  <p className="flex items-center text-sm">
                    <FcDepartment className="mr-2 text-green-500" />
                    Study Department: {user.studyDepartment}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="flex items-center text-sm">
                    <LiaLayerGroupSolid className="mr-2 text-green-500" />
                    Semester: {user.semester}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No donor found.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center m-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="relative px-10 font-bold text-white bg-transparent border-2 border-transparent overflow-hidden"
        >
          <FaCircleChevronLeft />
        </button>
        <span className="text-white">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="relative px-10 py-2.5 font-bold text-white bg-transparent border-2 border-transparent overflow-hidden"
        >
          <FaChevronCircleRight />
        </button>
      </div>

      <div className="flex justify-center m-4">
        <button
          onClick={downloadPDF}
          className="relative px-20 py-2.5 font-bold text-white bg-transparent border-2 border-transparent overflow-hidden group"
        >
          <span className="absolute inset-0 border-2 border-gradient opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">Download as PDF</span>
        </button>
      </div>

      <NavigationLink />
    </div>
  );
};

export default Search;
