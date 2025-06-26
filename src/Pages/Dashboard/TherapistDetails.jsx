import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaPhone,
  FaEnvelope,
  FaPhoneAlt,
  FaUserCheck,
  FaDollarSign,
  FaPlus,
} from "react-icons/fa";
import { TbClockDollar, TbMassage } from "react-icons/tb";
import { useGetTherapistDetailsInfoQuery } from "../redux/features/baseAPI/baseApi";

const TherapistDetails = () => {
  const { id } = useParams();
  console.log("clicked", id);

  const { data: therapistInfo } = useGetTherapistDetailsInfoQuery(id);

  console.log(therapistInfo, "therapist data");

  const navigate = useNavigate();
  const userImage = "https://i.ibb.co.com/8Ld9cfwp/Frame-1686551036-1.png";
  const baseURL = "http://192.168.10.16:3333/api";

  // State for the modal and form
  const [documentType, setDocumentType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Function to open the modal
  const openAddDocumentModal = () => {
    document.getElementById("add_document_modal").showModal();
  };

  // Function to handle form submission
  const handleAddDocument = (e) => {
    e.preventDefault();
    console.log("New Document:", { documentType, expiryDate });
    // Add logic to save the document (e.g., API call)
    document.getElementById("add_document_modal").close();
    setDocumentType("");
    setExpiryDate("");
  };

  return (
    <div>
      <Link
        onClick={() => navigate(-1)}
        className="mb-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-full"
      >
        Back
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="bg-[#B28D28] rounded-[15px] p-6 text-white relative overflow-hidden h-[40vh]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${userImage})` }}
              ></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 sm:gap-6 mb-6">
                  <img
                    src={`${baseURL}${therapistInfo?.therapist_info?.image_url}`}
                    alt={`${therapistInfo?.therapist_info?.full_name}'s profile`}
                    className="h-[150px] w-[150px] rounded-full object-cover border-2 shadow-md shadow-gray-800"
                  />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold">
                      {therapistInfo?.therapist_info?.full_name}
                    </h2>
                    <p>
                      <span className="font-semibold">Joined</span>{" "}
                      {therapistInfo?.therapist_info?.join_date}
                    </p>
                    <p className="">
                      <span className="ms-2 flex items-center  gap-1  text-white font-semibold">
                        {therapistInfo?.therapist_info?.rating}{" "}
                        <FaStar className="text-[#FFBE0C]" />{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="space-y-3 py-10 ms-1">
                  <p className="flex items-end gap-3">
                    <TbMassage
                      size={28}
                      className="scale-x-[-1] scale-y-[1.2]"
                    />
                    <p className="text-sm sm:text-base font-medium">
                      {therapistInfo?.therapist_info?.role}
                    </p>
                  </p>
                  <p className="flex items-center gap-3">
                    <FaPhoneAlt size={18} className="text-white" />
                    <span className="text-sm sm:text-base font-medium ms-3">
                      {therapistInfo?.therapist_info?.phone}
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FaEnvelope size={18} className="text-white" />
                    <span className="text-sm sm:text-base font-medium ms-3">
                      {therapistInfo?.therapist_info?.email}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          {/* <div className="bg-white rounded-[20px] p-6">
            <h2 className="text-lg font-semibold mb-6">Performance Metrics</h2>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#FFF5D6"
                  strokeWidth="20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#FFEAAF"
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.02} ${
                    2 * Math.PI * 40 * 0.98
                  }`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#B28D28"
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.96} ${
                    2 * Math.PI * 40 * 0.04
                  }`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#B28D28]"></div>
                <span className="text-sm text-gray-600">
                  No-Show Rate: {therapist.performanceMetrics.noShowRate}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFEAAF]"></div>
                <span className="text-sm text-gray-600">
                  Cancellation Rate:{" "}
                  {therapist.performanceMetrics.cancellationRate}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFF5D6]"></div>
                <span className="text-sm text-gray-600">
                  On-Time Rate: {therapist.performanceMetrics.onTimeRate}%
                </span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-2">
                <h1 className="text-gray-800">Total Bookings</h1>
                <h1 className="font-bold text-xl text-black">
                  {therapistInfo?.therapist_info?.total_bookings}
                </h1>
              </div>
              <div className="bg-[#B28D28] p-2 rounded-xl">
                <FaUserCheck className="text-white font-bold" size={24} />
              </div>
            </div>

            <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-2">
                <h1 className="text-gray-800">Total Earnings</h1>
                <h1 className="font-bold text-xl text-black">
                  $
                  {therapistInfo?.therapist_info?.total_earnings.toLocaleString()}
                </h1>
              </div>
              <div className="bg-[#B28D28] p-2 rounded-xl">
                <FaDollarSign className="text-white font-bold" size={24} />
              </div>
            </div>

            <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-2">
                <h1 className="text-gray-800">Pending Payout</h1>
                <h1 className="font-bold text-xl text-black">
                  ${therapistInfo?.pendingPayout}
                </h1>
              </div>
              <div className="bg-[#B28D28] p-2 rounded-xl">
                <TbClockDollar className="text-white font-bold" size={24} />
              </div>
            </div>
          </div>

          {/* Licenses & Documents */}
          {/* <div className="bg-white rounded-[15px] p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Licenses & Documents</h2>
              <button
                onClick={openAddDocumentModal}
                className="bg-[#B28D28] text-white px-4 py-2 rounded-full text-base flex items-center gap-1"
              >
                <FaPlus /> New Document
              </button>
            </div>
            <div className="space-y-4">
              {therapist.licenses.map((license, index) => (
                <div key={index} className="flex justify-between items-center p-4 rounded-[15px] bg-gray-100">
                  <div>
                    <p className="font-medium">{license.name}</p>
                    <p className="text-sm text-gray-500">Expires: {license.expiry}</p>
                  </div>
                  <span className="px-5 py-2 bg-[#41D377] text-white font-medium rounded-full text-sm">
                    {license.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="text-[#B28D28] mt-4 text-sm hover:underline">View All</button>
          </div> */}

          <div className="bg-white rounded-[15px] p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Licenses & Documents</h2>
              <button
                onClick={openAddDocumentModal}
                className="bg-[#B28D28] text-white px-4 py-2 rounded-full text-base flex items-center gap-1"
              >
                <FaPlus /> New Document
              </button>
            </div>

            <div className="space-y-4">
              {therapistInfo?.documents?.length > 0 &&
                therapistInfo.documents.map((docItem, docIndex) => (
                  <div key={docIndex}>
                    {Object.entries(docItem).map(
                      ([key, value], index) =>
                        value && (
                          <div
                            key={index}
                            className="flex justify-between items-center p-4 rounded-[15px] bg-gray-100 mb-2"
                          >
                            <div>
                              <p className="font-medium capitalize">
                                {key.replace(/_/g, " ")}
                              </p>
                              <a
                                href={`${baseURL}${value}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 underline"
                              >
                                View Document
                              </a>
                            </div>
                            <span className="px-5 py-2 bg-[#41D377] text-white font-medium rounded-full text-sm">
                              Uploaded
                            </span>
                          </div>
                        )
                    )}
                  </div>
                ))}
            </div>

            <button className="text-[#B28D28] mt-4 text-sm hover:underline">
              View All
            </button>
          </div>

          {/* Work Schedule */}
          {/* <div className="bg-white rounded-[15px] p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Work Schedule</h2>
              <button className="bg-[#B28D28] text-white px-4 py-2 rounded-full text-base">
                Edit Schedule
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {therapist.workSchedule.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-200 hover:bg-gray-100 cursor-pointer p-2">
                  <span className="text-gray-600 font-semibold">{schedule.day}</span>
                  <span className={schedule.hours === 'OFF' ? 'text-red-500' : 'text-[#B28D28]'}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          <div className="bg-white rounded-[15px] p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Work Schedule</h2>
              <button className="bg-[#B28D28] text-white px-4 py-2 rounded-full text-base">
                Edit Schedule
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].map((day) => {
                const schedule = therapistInfo?.schedule?.[day]; // get the day object from backend
                const displayDay = day.charAt(0).toUpperCase() + day.slice(1); // capitalize

                if (!schedule) {
                  return (
                    <div
                      key={day}
                      className="flex justify-between items-center border-b border-gray-200 hover:bg-gray-100 cursor-pointer p-2"
                    >
                      <span className="text-gray-600 font-semibold">
                        {displayDay}
                      </span>
                      <span className="text-red-500">OFF</span>
                    </div>
                  );
                }

                const startTime = schedule?.start?.slice(0, 5);
                const endTime = schedule?.end?.slice(0, 5);

                return (
                  <div
                    key={day}
                    className="flex justify-between items-center border-b border-gray-200 hover:bg-gray-100 cursor-pointer p-2"
                  >
                    <span className="text-gray-600 font-semibold">
                      {displayDay}
                    </span>
                    <span className="text-[#B28D28] space-x-3">
                      {startTime} || {endTime}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Reviews */}
          {/* <div className="bg-white rounded-[15px] p-6 shadow-md w-full">
            <h2 className="text-lg font-semibold mb-6">Recent Reviews</h2>
            <div className="space-y-6 w-full">
              {therapist.reviews.map((review, index) => (
                <div key={index} className="flex gap-4 border p-4 rounded-[15px]">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div>
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-[#B28D28]' : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{review.time}</span>
                    </div>
                    <p className="text-gray-600 mt-5">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-[#B28D28] mt-6 text-start hover:underline w-full">Load previous</button>
          </div> */}

          <div className="bg-white rounded-[15px] p-6 shadow-md w-full">
            <h2 className="text-lg font-semibold mb-6">Recent Reviews</h2>
            <div className="space-y-6 w-full">
              {therapistInfo?.reviews?.length > 0 ? (
                therapistInfo.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border p-4 rounded-[15px]"
                  >
                    <img
                      src={
                        review.client_image?.startsWith("http")
                          ? review.client_image
                          : `${baseURL}${review.client_image}`
                      }
                      alt={review.client_name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "/default-avatar.png"; // fallback image
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div>
                          <span className="font-medium block">
                            {review.client_name}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-[#B28D28]"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-5">{review.review}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No reviews available.</p>
              )}
            </div>
            {therapistInfo?.reviews?.length > 0 && (
              <button className="text-[#B28D28] mt-6 text-start hover:underline w-full">
                Load previous
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DaisyUI Modal for Add Document */}
      <dialog id="add_document_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Add Document</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>
          <form onSubmit={handleAddDocument} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{therapistInfo?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Specialty</p>
                <p className="font-medium text-gray-900">
                  {therapistInfo?.specialization}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <div className="basis-6/12">
                <p className="text-sm text-gray-600">Document Type</p>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                  required
                >
                  <option value="" disabled>
                    Select document type
                  </option>
                  <option value="license">License</option>
                  <option value="id_verification">ID Verification</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              <div className="basis-6/12">
                <p className="text-sm text-gray-600">Expiry</p>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <form method="dialog">
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
              </form>
              <button
                type="submit"
                className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TherapistDetails;
