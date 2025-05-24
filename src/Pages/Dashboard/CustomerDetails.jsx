// import React from "react";

// import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { useParams, Link } from "react-router-dom";

// // Placeholder image URL - replace with actual image URL or import
// const userImage = "https://i.ibb.co.com/8Ld9cfwp/Frame-1686551036-1.png"; // Replace with actual image URL

// const CustomerDetails = () => {
//   const { email } = useParams();

//   const customer = {
//     name: "Mike Millian",
//     email: email,
//     phone: "+1 555 123 4567",
//     joinedDate: "Jan 2025",
//     status: "Active",
//     address: "123 Wellness street, California, 10001",
//     bookingHistory: [
//       {
//         type: "Deep Tissue Massage",
//         date: "Feb 25, 2025",
//         duration: "60 min",
//         price: "$120",
//         status: "Completed",
//       },
//       {
//         type: "Swedish Massage",
//         date: "Feb 28, 2025",
//         duration: "60 min",
//         price: "$120",
//         status: "Cancelled",
//       },
//     ],
//     preferences: {
//       therapistGender: "Female",
//       allergies: "Lavender Oil",
//       pressure: "Medium to Firm",
//       medicalConditions: "None reported",
//     },
//     cancelledAppointments: 3,
//   };

//   return (
//     <div className="p-5">
//       <Link
//         to="/"
//         className="mb-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-full"
//       >
//         Back
//       </Link>
//       <div className="grid grid-cols-1 md:grid-cols-2">
//         {/* User Info Section with Background Image */}
//         <div>
//           <div className="bg-[#B28D28] rounded-[15px] p-6 text-white relative overflow-hidden">
//             <div
//               className="absolute inset-0 bg-cover bg-center"
//               style={{ backgroundImage: `url(${userImage})` }}
//             ></div>
//             <div className="relative z-10">
//               <div className="flex items-center gap-10 space-y-3">
//                 <img
//                   src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
//                   alt=""
//                   className="h-[150px] rounded-full w-[150px] object-cover border-2 shadow-md shadow-gray-800"
//                 />
//                 <div className="">
//                   <h2 className="text-[34px] font-semibold">{customer.name}</h2>
//                   <p className="text-[16px] mb-4">
//                     Customer since {customer.joinedDate}
//                   </p>
//                 </div>
//               </div>
//               <div className="space-y-2 mt-10">
//                 <p className="flex items-center gap-3">
//                   <FaPhoneAlt size={18} />
//                   <span className="text-[16px] font-bold">
//                     {customer.phone}
//                   </span>
//                 </p>
//                 <p className="flex items-center gap-3">
//                   <FaEnvelope size={18} />
//                   <span className="text-[16px] font-bold">
//                     {customer.email}
//                   </span>
//                 </p>
//                 <p className="flex items-center gap-3">
//                   <FaLocationDot size={18} />
//                   <span className="text-[16px] font-bold">
//                     {customer.address}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             {/* Attention Alert */}
//           </div>

//           {/* Attention Alert */}
//           <div className="bg-red-50 rounded-[15px] p-5 flex items-center">
//             <span className="text-red-500 mr-2">⚠️</span>
//             <p className="text-red-600 font-semibold">
//               ATTENTION REQUIRED: {customer.cancelledAppointments} cancelled
//               appointments in last 30 days
//             </p>
//           </div>
//         </div>

//         {/* Main Content Section */}
//         <div className="md:col-span-2 space-y-6">
//           {/* Booking History */}
//           <div className="bg-white rounded-[15px] shadow-md p-5">
//             <h2 className="text-lg font-bold mb-4">Booking History</h2>
//             <div className="space-y-4">
//               {customer.bookingHistory.map((booking, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
//                       <span className="text-[#B28D28]">🌿</span>
//                     </div>
//                     <div>
//                       <p className="font-semibold">{booking.type}</p>
//                       <p className="text-sm text-gray-500">
//                         {booking.date} • {booking.duration} • {booking.price}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       booking.status === "Completed"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {booking.status}
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button className="text-[#B28D28] text-sm mt-4">
//               Load previous
//             </button>
//           </div>

//           {/* Preferences */}
//           <div className="bg-white rounded-[15px] shadow-md p-5">
//             <h2 className="text-lg font-bold mb-4">Preferences</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-gray-600">Preferred Therapist Gender</p>
//                 <p className="font-semibold">
//                   {customer.preferences.therapistGender}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Pressure Preference</p>
//                 <p className="font-semibold">{customer.preferences.pressure}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Allergies</p>
//                 <p className="font-semibold">
//                   {customer.preferences.allergies}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Medical Conditions</p>
//                 <p className="font-semibold">
//                   {customer.preferences.medicalConditions}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetails;

// import React from "react";
// import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { TiInfo } from "react-icons/ti";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useGetCustomerDetailsInfoQuery } from "../redux/features/baseAPI/baseApi";

// // Placeholder image URL - replace with actual image URL or import
// const userImage = "https://i.ibb.co.com/8Ld9cfwp/Frame-1686551036-1.png";

// const CustomerDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { data: customerData } = useGetCustomerDetailsInfoQuery(id);
//   console.log("customerData", customerData);

//   console.log("customer id", id);

//   // const customer = {
//   //   name: "Mike Millian",
//   //   email: email,
//   //   phone: "+1 555 123 4567",
//   //   joinedDate: "Jan 2025",
//   //   status: "Active",
//   //   address: "123 Wellness street, California, 10001",
//   //   bookingHistory: [
//   //     {
//   //       type: "Deep Tissue Massage",
//   //       date: "Feb 25, 2025",
//   //       duration: "60 min",
//   //       price: "$120",
//   //       status: "Completed",
//   //     },
//   //     {
//   //       type: "Swedish Massage",
//   //       date: "Feb 28, 2025",
//   //       duration: "60 min",
//   //       price: "$120",
//   //       status: "Cancelled",
//   //     },
//   //   ],
//   //   preferences: {
//   //     therapistGender: "Female",
//   //     allergies: "Lavender Oil",
//   //     pressure: "Medium to Firm",
//   //     medicalConditions: "None reported",
//   //   },
//   //   cancelledAppointments: 3,
//   // };

//   return (
//     <div className=" mx-auto">
//       {/* Back Button */}
//       <Link
//         onClick={() => navigate(-1)}
//         className="mb-6 inline-block bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
//         aria-label="Go back to previous page"
//       >
//         Back
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="space-y-6">
//           <div className="bg-[#B28D28] rounded-[15px] p-6 text-white relative overflow-hidden h-[40vh]">
//             <div
//               className="absolute inset-0 bg-cover bg-center "
//               style={{ backgroundImage: `url(${userImage})` }}
//             ></div>
//             <div className="relative z-10">
//               {/* <div className="flex items-center gap-4 sm:gap-6 mb-6">
//                 <img
//                   src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
//                   alt={`${customer.name}'s profile`}
//                   className="h-[150px] w-[150px] rounded-full object-cover border-2 shadow-md shadow-gray-800"
//                 />
//                 <div>
//                   <h2 className="text-xl sm:text-2xl font-semibold">
//                     {customer.name}
//                   </h2>
//                   <p className="text-sm sm:text-base">
//                     Customer since {customer.joinedDate}
//                   </p>
//                 </div>
//               </div> */}
//               <div className="space-y-3 py-10 ms-1">
//                 <p className="flex items-center gap-3">
//                   <FaPhoneAlt size={18} className="text-white" />
//                   {/* <span className="text-sm sm:text-base font-medium">
//                     {customer.phone}
//                   </span> */}
//                 </p>
//                 {/* <p className="flex items-center gap-3">
//                   <FaEnvelope size={18} className="text-white" />
//                   <span className="text-sm sm:text-base font-medium">
//                     {customer.email}
//                   </span>
//                 </p> */}
//                 <p className="flex items-center gap-3">
//                   <FaLocationDot size={18} className="text-white" />
//                   {/* <span className="text-sm sm:text-base font-medium">
//                     {customer.address}
//                   </span> */}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#FFEBEB] rounded-[15px] py-20 text-center flex flex-col items-center">
//             <h1 className="text-red-500 text-xl p-2 bg-white rounded-full shadow-md shadow-gray-400">
//               <TiInfo size={56} />
//             </h1>
//             <p className="text-red-600 font-semibold text-sm sm:text-base mt-5">
//               ATTENTION REQUIRED <br />{" "}
//               {/* <span className="text-gray-500 font-thin">
//                 {customer.cancelledAppointments} cancelled appointments in the
//                 last 30 days
//               </span> */}
//             </p>
//           </div>
//         </div>

//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white rounded-[15px] shadow-md py-14 px-10">
//             <h2 className="text-lg sm:text-xl font-bold mb-4">
//               Booking History
//             </h2>
//             {/* <div className="space-y-4">
//               {customer.bookingHistory.map((booking, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
//                       <span className="text-[#B28D28] text-lg">🌿</span>
//                     </div>
//                     <div>
//                       <p className="font-semibold text-sm sm:text-base">
//                         {booking.type}
//                       </p>
//                       <p className="text-xs sm:text-sm text-gray-500">
//                         {booking.date} • {booking.duration} • {booking.price}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
//                       booking.status === "Completed"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {booking.status}
//                   </button>
//                 </div>
//               ))}
//             </div> */}
//             <button className="text-[#B28D28] text-sm mt-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#B28D28] rounded">
//               Load previous
//             </button>
//           </div>

//           <div className="bg-white rounded-[15px] shadow-md py-14 px-10">
//             <h2 className="text-lg sm:text-xl font-bold mb-4">Preferences</h2>
//             {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Preferred Therapist Gender
//                 </p>
//                 <p className="font-semibold text-sm sm:text-base">
//                   {customer.preferences.therapistGender}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Pressure Preference
//                 </p>
//                 <p className="font-semibold text-sm sm:text-base">
//                   {customer.preferences.pressure}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600 text-sm sm:text-base">Allergies</p>
//                 <p className="font-semibold text-sm sm:text-base">
//                   {customer.preferences.allergies}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Medical Conditions
//                 </p>
//                 <p className="font-semibold text-sm sm:text-base">
//                   {customer.preferences.medicalConditions}
//                 </p>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetails;

import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TiInfo } from "react-icons/ti";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetCustomerDetailsInfoQuery } from "../redux/features/baseAPI/baseApi";

// Placeholder image URL - replace with actual image URL or import
const userImage = "https://i.ibb.co.com/8Ld9cfwp/Frame-1686551036-1.png";

const CustomerDetails = () => {
  const { id } = useParams();
  const { data: customerData } = useGetCustomerDetailsInfoQuery(id);
  console.log("customerData", customerData);

  const navigate = useNavigate();
  const baseURL = "http://192.168.10.139:3333/api";

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

  return (
    <div className=" mx-auto">
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
          <div className="bg-[#B28D28] rounded-[15px] p-6 text-white relative overflow-hidden h-[40vh]">
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
          <div className="bg-[#FFEBEB] rounded-[15px] py-20 text-center flex flex-col items-center">
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
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
