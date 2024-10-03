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
  users: User[]; // Passed from server-side
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtering logic based on the `users` prop passed from the server
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
    setCurrentPage(1); // Reset to first page on every new filter/search
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

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-4 px-2 overflow-x-hidden">
      <h1 className="text-2xl text-green-300 font-bold text-center m-6 px-4">
        Here is our all Super Human
      </h1>

      {/* Search Inputs */}
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
            onChange={(e) => setSearch({ ...search, phoneNumber: e.target.value })}
            placeholder="Search by Phone Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
          <select
            value={search.bloodGroup}
            onChange={(e) => setSearch({ ...search, bloodGroup: e.target.value })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setShowAvailableDonors(!showAvailableDonors)}
          >
            {showAvailableDonors ? "Show All Donors" : "Show Available Donors"}
          </button>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Display Filtered Users */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 px-6 md:px-10 lg:px-20 2xl:px-80">
        {currentItems.map((user) => (
          <div key={user.id} className="bg-gray-700 p-4 rounded">
            <h2 className="text-white font-bold">{user.name}</h2>
            <p className="text-gray-300">Phone: {user.phoneNumber}</p>
            <p className="text-gray-300">Blood Group: {user.bloodGroup}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
