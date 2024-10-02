"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { User } from "@/lib/type"; // Adjust this import based on your actual file structure

interface Props {
  users: User[];
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
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Effect to filter users whenever the search criteria or users change
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
    setCurrentPage(1); // Reset to the first page when filtering
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
            <option value="">Search by Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAvailableDonors((prev) => !prev)}
            className="bg-gray-600 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          >
            {showAvailableDonors ? "Hide Available Donors" : "Show Available Donors"}
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full px-4">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-600 px-4 py-2">Phone Number</th>
              <th className="border border-gray-600 px-4 py-2">Blood Group</th>
              <th className="border border-gray-600 px-4 py-2">Available Donor</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} className="bg-gray-700">
                <td className="border border-gray-600 px-4 py-2">{user.name}</td>
                <td className="border border-gray-600 px-4 py-2">{user.phoneNumber}</td>
                <td className="border border-gray-600 px-4 py-2">{user.bloodGroup}</td>
                <td className="border border-gray-600 px-4 py-2">{user.availableDonar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination logic */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span className="text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
