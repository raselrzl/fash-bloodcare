"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { BASE_API_URL } from "@/lib/utils";
import NavigationLink from "../components/NavigationLink";

interface Errors {
  name?: string;
  phoneNumber?: string;
  email?: string;
  dateOfLastDonation?: string;
  bloodGroup?: string;
  numberOfTimes?: string;
  studyDepartment?: string;
  semester?: string;
  region?: string;
  village?: string;
  session?: string;
  rollNumber?: string;
  regiNumber?: string;
  policeStation?: string;
  PreviousDonation?:string;
}
const UserForm: React.FC = () => {
  const router = useRouter();
  const [regions, setRegions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [cities, setCities] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    nidNumber: "",
    phoneNumber: "",
    email: "",
    dateOfLastDonation: "",
    bloodGroup: "",
    numberOfTimes: "",
    studyDepartment: "",
    semester: "",
    region: "",
    city: "",
    village: "",
    session: "",
    rollNumber: "",
    regiNumber: "",
    policeStation: "",
    PreviousDonation:"",
  });

  useEffect(() => {
    const uniqueRegions = [
      "Dhaka",
      "Sylhet",
      "Barishal",
      "Chattogram",
      "Khulna",
      "Rajshahi",
      "Rangpur",
      "Mymensingh",
    ];
    setRegions(uniqueRegions);
  }, []);

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

    setCities(getCities(formData.region));
  }, [formData.region]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/admin"); // Redirect to admin login page if not logged in
    }
  }, [router]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [updatePrompt, setUpdatePrompt] = useState<boolean>(false); // To prompt the user for update
  const [existingUser, setExistingUser] = useState<any>(null); // Store the existing user if found
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const semesters = [
    "First Semester",
    "Second Semester",
    "Third Semester",
    "Fourth Semester",
    "Fifth Semester",
    "Sixth Semester",
    "Seventh Semester",
    "Eighth Semester",
  ];

  const depertment = [
    "CST first shift",
    "CST second shift",
    "ENT first shift",
    "ENT second shift",
    "RAT first shift",
    "RAT second shift",
    "FT first shift",
    "FT second shift",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    setErrorMessage(null);
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_API_URL}/api/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setIsLoading(false);

      if (response.ok) {
        if (result.updatePrompt) {
          setUpdatePrompt(true);
          setExistingUser(result.existingUser); // Store existing user data
        } else {
          router.push(`/register/${encodeURIComponent(formData.name)}/`);
        }
      } else {
        setErrorMessage(result.message || "Failed to add user");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/api/adduser`, {
        method: "PUT", // Change method to PUT for update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setIsLoading(false);

      if (response.ok) {
        router.push(`/register/${encodeURIComponent(formData.name)}/`);
      } else {
        setErrorMessage(result.message || "Failed to update user");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-8 px-2 overflow-x-hidden">
      {/* Error messages and warnings */}
      <div className="bg-red-700 text-white p-2 shadow-lg flex items-center space-x-4 md:mx-80 lg:mx-90">
        <FaExclamationTriangle className="text-2xl text-yellow-400" />
        <div className="flex-1">
          <p className="mt-2 text-xs text-center md:text-xl">
            Please ensure that the information you provide is accurate and
            truthful. Incorrect data can adversely affect those in need. If you
            need assistance or wish to report any issues,
            <a
              href="mailto:raselz.se@gmail.com"
              className="underline text-yellow-300"
            >
              {" "}
              please contact us.
            </a>
          </p>
        </div>
        <FaInfoCircle className="text-2xl text-yellow-400" />
      </div>

      <h1 className="text-2xl font-bold text-center m-6">
        Register Your Blood Group
      </h1>

      {errorMessage && (
        <div className="bg-red-600 text-white p-2 rounded-lg shadow-lg mb-4">
          <FaExclamationTriangle className="text-2xl inline-block mr-2" />
          {errorMessage}
        </div>
      )}

      {updatePrompt && (
        <div className="bg-yellow-600 text-white p-2 rounded-lg shadow-lg mb-4">
          <FaExclamationTriangle className="text-2xl inline-block mr-2" />
          <p>
            User already exists with this phone number. Do you want to update
            the existing user?
          </p>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg mt-2"
          >
            Yes, Update
          </button>
        </div>
      )}

      {/* Registration form */}
      {!updatePrompt && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700 p-4 md:px-10 lg:px-20 xl:px-24"
        >
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Full Name"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
              required
            />

            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="Phone Number"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
              required
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              value={formData.nidNumber}
              onChange={(e) =>
                setFormData({ ...formData, nidNumber: e.target.value })
              }
              placeholder="NID Number"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
            <input
              type="text"
              value={formData.rollNumber}
              onChange={(e) =>
                setFormData({ ...formData, rollNumber: e.target.value })
              }
              placeholder="Roll Number"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
            <input
              type="text"
              value={formData.regiNumber}
              onChange={(e) =>
                setFormData({ ...formData, regiNumber: e.target.value })
              }
              placeholder="Registration Number"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <select
              value={formData.bloodGroup}
              onChange={(e) =>
                setFormData({ ...formData, bloodGroup: e.target.value })
              }
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <input
              type="date"
              placeholder="Date of Previous Donation"
              value={formData.PreviousDonation}
              onChange={(e) =>
                setFormData({ ...formData, PreviousDonation: e.target.value })
              }
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />

            <input
              type="date"
              placeholder="Date of Current Donation"
              value={formData.dateOfLastDonation}
              onChange={(e) =>
                setFormData({ ...formData, dateOfLastDonation: e.target.value })
              }
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
            <input
              type="number"
              value={formData.numberOfTimes}
              onChange={(e) =>
                setFormData({ ...formData, numberOfTimes: e.target.value })
              }
              placeholder="Number of Times Donated"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <select
              value={formData.studyDepartment}
              onChange={(e) =>
                setFormData({ ...formData, studyDepartment: e.target.value })
              }
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            >
              <option value="">Select Depertment</option>
              {depertment.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={formData.semester}
              onChange={(e) =>
                setFormData({ ...formData, semester: e.target.value })
              }
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={formData.session}
              onChange={(e) =>
                setFormData({ ...formData, session: e.target.value })
              }
              placeholder="2011-12"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <select
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              className="bg-gray-800 text-white font-bold border border-gray-700 px-4 py-2 w-full"
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="bg-gray-800 text-white font-bold border border-gray-700 px-4 py-2 w-full"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={formData.policeStation}
              onChange={(e) =>
                setFormData({ ...formData, policeStation: e.target.value })
              }
              placeholder="Enter Upazila"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />

            <input
              type="text"
              value={formData.village}
              onChange={(e) =>
                setFormData({ ...formData, village: e.target.value })
              }
              placeholder="Enter Village Name"
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="relative px-6 py-3 font-bold text-white bg-transparent border-2 border-transparent overflow-hidden group hover:border-gray-400 hover:bg-gray-800"
            >
              <span className="absolute inset-0 border-2 border-gradient opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 px-10 text-base md:text-lg lg:text-xl">
                {isLoading ? "Loading..." : "Register"}
              </span>
            </button>
          </div>
        </form>
      )}
      <NavigationLink />
    </div>
  );
};

export default UserForm;
