import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TiInfo } from "react-icons/ti";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetCustomerDetailsInfoQuery } from "../redux/features/baseAPI/baseApi";

// Placeholder image URL - replace with actual image URL or import
const userImage = "https://i.ibb.co.com/8Ld9cfwp/Frame-1686551036-1.png";

const CustomerDetails = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { id } = useParams();
  const { data: customerData } = useGetCustomerDetailsInfoQuery(id);
  console.log("customerData", customerData);

  const navigate = useNavigate();
  const baseURL = "https://backend.thaimassagesnearmeapp.com/api";

  const customer = {
    name: "Mike Millian",
    // email: email,
    phone: "+1 555 123 4567",
    joinedDate: "Jan 2025",
    status: "Active",
    address: "123 Wellness street, California, 10001",
    bookingHistory: [
      {
        type: "Deep Tissue Massage",
        date: "Feb 25, 2025",
        duration: "60 min",
        price: "$120",
        status: "Completed",
      },
      {
        type: "Swedish Massage",
        date: "Feb 28, 2025",
        duration: "60 min",
        price: "$120",
        status: "Cancelled",
      },
    ],
    preferences: {
      therapistGender: "Female",
      allergies: "Lavender Oil",
      pressure: "Medium to Firm",
      medicalConditions: "None reported",
    },
    cancelledAppointments: 3,
  };

  const rewardsData = {
    all: [
      {
        id: 1,
        type: "Birthday Discount",
        amount: "$20",
        date: "2024-03-15",
        expire_date: "2024-04-03",
        status: "earned",
      },
      {
        id: 2,
        type: "Loyalty Points",
        amount: "$10",
        date: "2024-02-20",
        expire_date: "2024-06-18",
        status: "used",
      },
      {
        id: 3,
        type: "Welcome Bonus",
        amount: "$15",
        date: "2024-01-10",
        expire_date: "2024-03-25",
        status: "expired",
      },
    ],
    earned: [
      {
        id: 1,
        type: "Birthday Discount",
        amount: "$20",
        date: "2024-03-15",
        status: "earned",
      },
    ],
    used: [
      {
        id: 2,
        type: "Loyalty Points",
        amount: "$10",
        date: "2024-02-20",
        status: "used",
      },
    ],
    expired: [
      {
        id: 3,
        type: "Welcome Bonus",
        amount: "$15",
        date: "2024-01-10",
        status: "expired",
      },
    ],
  };

  return (
    <div className=" mx-auto dark:text-gray-900">
      {/* Back Button */}
      <Link
        onClick={() => navigate(-1)}
        className="mb-6 inline-block bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="Go back to previous page"
      >
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info and Alert Section */}
        <div className="space-y-6">
          {/* User Info Section with Background Image */}
          <div className="bg-[#B28D28] shadow-md rounded-[15px] p-6 text-white relative overflow-hidden h-[40vh]">
            <div
              className="absolute inset-0 bg-cover bg-center "
              style={{ backgroundImage: `url(${userImage})` }}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 sm:gap-6 mb-6">
                <img
                  src={`${baseURL}${customerData?.profile?.image}`}
                  alt={`${customer.name}'s profile`}
                  className="h-[150px] w-[150px] rounded-full object-cover border-2 shadow-md shadow-gray-800"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {customerData?.profile?.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Customer since {customerData?.profile?.member_since}
                  </p>
                </div>
              </div>
              <div className="space-y-3 py-10 ms-1">
                <p className="flex items-center gap-3">
                  <FaPhoneAlt size={18} className="text-white" />
                  <span className="text-sm sm:text-base font-medium">
                    {customerData?.profile?.phone}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <FaEnvelope size={18} className="text-white" />
                  <span className="text-sm sm:text-base font-medium">
                    {customerData?.profile?.email}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <FaLocationDot size={18} className="text-white" />
                  <span className="text-sm sm:text-base font-medium">
                    {customer.address}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Attention Alert */}
          <div className="bg-[#FFEBEB] shadow-md rounded-[15px] py-20 text-center flex flex-col items-center">
            <h1 className="text-red-500 text-xl p-2 bg-white rounded-full shadow-md shadow-gray-400">
              <TiInfo size={56} />
            </h1>
            <p className="text-red-600 font-semibold text-sm sm:text-base mt-5">
              ATTENTION REQUIRED <br />{" "}
              <span className="text-gray-500 font-thin">
                {customerData?.cancellation_count} cancelled appointments.
              </span>
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking History */}
          <div className="bg-white rounded-[15px] shadow-md py-14 px-10">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center justify-between">
              Booking History{" "}
              <span className="text-gray-500 text-base">
                ({customerData?.booking_history?.length})
              </span>
            </h2>
            <div className="space-y-4">
              {/* {customer.bookingHistory.map((booking, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#B28D28] text-lg">🌿</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        {booking.type}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {booking.date} • {booking.duration} • {booking.price}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </button>
                </div>
              ))} */}

              {customerData?.booking_history.map((booking, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  {/* Left Section */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#B28D28] text-lg">🌿</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        {booking.service}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {booking.date} • {booking.duration} •{" "}
                        {booking.amount || "Free"}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
                      booking.status.toLowerCase() === "complete"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
            {/* <button className="text-[#B28D28] text-sm mt-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#B28D28] rounded">
              Load previous
            </button> */}
          </div>

          <div className="bg-white rounded-[15px] shadow-md py-14 px-10">
            <div>
              <h1 className="text-lg sm:text-xl font-bold mb-4">Preferences</h1>

              <div className="grid grid-cols-2">
                <div className="mb-3">
                  <h1 className="text-[#7F7F7F] text-[14px] ">
                    Preferred Therapist Gender
                  </h1>
                  <p className="font-medium">Female</p>
                </div>

                <div>
                  <h1 className="text-[#7F7F7F] text-[14px] ">
                    Pressure Preference
                  </h1>
                  <p className="font-medium">Medium to Firm</p>
                </div>

                <div>
                  <h1 className="text-[#7F7F7F] text-[14px] ">Allergies</h1>
                  <p className="font-medium">Lavender Oil</p>
                </div>

                <div>
                  <h1 className="text-[#7F7F7F] text-[14px] ">
                    Medical Conditions
                  </h1>
                  <p className="font-medium">None reported</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="bg-white rounded-[15px] shadow-md py-14 px-10">
          <h2 className="text-lg sm:text-xl font-bold mb-6">Point History</h2>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-gray-200 mb-6">
            {["all", "earned", "used", "expired"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors duration-200
          ${
            activeTab === tab
              ? "border-b-2 border-[#B28D28] text-[#B28D28]"
              : "text-gray-500 hover:text-[#B28D28]"
          }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {rewardsData[activeTab].length > 0 ? (
              rewardsData[activeTab].map((reward) => (
                <div
                  key={reward.id}
                  className="flex justify-between items-start border rounded-lg p-4 shadow-sm"
                >
                  <div>
                    <div className="font-medium text-sm">{reward.type}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(reward.date).toLocaleDateString()} &nbsp;&nbsp;
                      <span className="text-gray-400">
                        Expired{" "}
                        {new Date(reward.expire_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-amber-700 font-semibold text-sm whitespace-nowrap">
                    +{reward.amount}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No rewards found for this category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
