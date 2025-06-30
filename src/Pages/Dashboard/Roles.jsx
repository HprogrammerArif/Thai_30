// import React from 'react';

// import { FaCheckCircle, FaUser, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

// const Roles = () => {
//   // Data for Roles & Permissions
//   const roles = [
//     {
//       title: 'Super Admin',
//       permissions: ['All system access', 'Manage other admins', 'System configuration'],
//     },
//     {
//       title: 'Finance Admin',
//       permissions: ['Approve refunds', 'Manage payments', 'Financial reports'],
//     },
//     {
//       title: 'Booking Admin',
//       permissions: ['Edit bookings', 'Booking reports', 'Schedule bookings'],
//     },
//   ];

//   // Data for New Admin Requests
//   const newAdminRequests = [
//     { name: 'Esthera Jackson', email: 'esthera@email.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
//     { name: 'Esthera Jackson', email: 'esthera@email.com', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop' },
//     { name: 'Esthera Jackson', email: 'esthera@email.com', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' },
//   ];

//   // Data for Therapist Background Check
//   const therapistBackgroundChecks = [
//     { name: 'Esthera Jackson', documentType: 'License', status: 'Verified', expiryDate: '14-March-2025', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
//     { name: 'Esthera Jackson', documentType: 'ID Verification', status: 'Expiring', expiryDate: '14-March-2025', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop' },
//     { name: 'Esthera Jackson', documentType: 'License', status: 'Expired', expiryDate: '14-March-2025', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' },
//   ];

//   // Data for Suspicious Activity Alerts
//   const suspiciousActivities = [
//     { title: 'Multiple failed login attempts', description: '5 failed attempts from IP: 192.168.1.0', color: 'red' },
//     { title: 'Excessive booking cancellations', description: 'Therapist ID: TH12345 - 3 cancellations today', color: 'yellow' },
//   ];

//   return (
//     <section className="p-5">
//       {/* Roles & Permissions */}
//       <div className="mb-8">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Roles & Permissions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {roles.map((role, index) => (
//             <div key={index} className="bg-white rounded-[15px] shadow-md p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">{role.title}</h3>
//                 <FaShieldAlt className="text-[#B28D28]" size={20} />
//               </div>
//               <ul className="space-y-2">
//                 {role.permissions.map((permission, idx) => (
//                   <li key={idx} className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500" size={16} />
//                     <span className="text-gray-600">{permission}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* New Admin Requests and Therapist Background Check */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* New Admin Requests */}
//         <div className="bg-white rounded-[15px] shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">New Admin Requests</h2>
//           <div className="space-y-4">
//             {newAdminRequests.map((request, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={request.image}
//                     alt={request.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-900">{request.name}</p>
//                     <p className="text-sm text-gray-500">{request.email}</p>
//                   </div>
//                 </div>
//                 <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium">
//                   View
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Therapist Background Check */}
//         <div className="bg-white rounded-[15px] shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Therapist Background Check</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="text-gray-600 border-b">
//                   <th className="p-4">Name</th>
//                   <th className="p-4">Document Type</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Expiry Date</th>
//                   <th className="p-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {therapistBackgroundChecks.map((check, index) => (
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={check.image}
//                           alt={check.name}
//                           className="w-8 h-8 rounded-full object-cover"
//                         />
//                         <span className="font-medium text-gray-900">{check.name}</span>
//                       </div>
//                     </td>
//                     <td className="p-4 text-gray-600">{check.documentType}</td>
//                     <td className="p-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           check.status === 'Verified'
//                             ? 'bg-green-100 text-green-700'
//                             : check.status === 'Expiring'
//                             ? 'bg-yellow-100 text-yellow-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}
//                       >
//                         {check.status}
//                       </span>
//                     </td>
//                     <td className="p-4 text-gray-600">{check.expiryDate}</td>
//                     <td className="p-4">
//                       <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium">
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Suspicious Activity Alerts */}
//       <div className="bg-white rounded-[15px] shadow-md p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Suspicious Activity Alerts</h2>
//         <div className="space-y-4">
//           {suspiciousActivities.map((activity, index) => (
//             <div
//               key={index}
//               className={`flex items-center justify-between p-4 rounded-[10px] border-l-4 ${
//                 activity.color === 'red' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <FaExclamationTriangle
//                   size={24}
//                   className={activity.color === 'red' ? 'text-red-500' : 'text-yellow-500'}
//                 />
//                 <div>
//                   <p className={`font-medium ${activity.color === 'red' ? 'text-red-700' : 'text-yellow-700'}`}>
//                     {activity.title}
//                   </p>
//                   <p className="text-sm text-gray-600">{activity.description}</p>
//                 </div>
//               </div>
//               <button
//                 className={`px-4 py-2 rounded-full text-white font-medium ${
//                   activity.color === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'
//                 }`}
//               >
//                 Review
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Roles;

import React, { useState } from "react";
import {
  FaCheckCircle,
  FaUser,
  FaShieldAlt,
  FaExclamationTriangle,
  FaFileAlt,
  FaEnvelope,
} from "react-icons/fa";

import {
  useAssignRoleInAdminRequestMutation,
  useGetNewAdminRequestQuery,
  useGetTherapistDataQuery,
} from "../redux/features/baseAPI/baseApi";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Roles = () => {
  // State to manage selected user for modals
  const [selectedAdminRequest, setSelectedAdminRequest] = useState(null);
  const [selectedTherapistCheck, setSelectedTherapistCheck] = useState(null);
  const [role, setRole] = useState("");
  const {
    data: newAdminRequests,
    isLoading: isAdminRequestLoading,
    error: isAdminRequestError,
  } = useGetNewAdminRequestQuery();

  // const {
  //   data: therapistBackgroundChecks,
  //   isLoading: isTherapistBackgroundLoading,
  //   error: isTherapistBackgroundError,
  // } = useGetTherapistDataQuery();

  // console.log({ therapistBackgroundChecks });

  const [
    assignRoleAdminRequest,
    {
      isLoading: isAdminUpdateAdminRequestLoading,
      error: isAdminUpdateAdminRequestError,
    },
  ] = useAssignRoleInAdminRequestMutation();

  const roles = [
    {
      title: "Super Admin",
      permissions: [
        "All system access",
        "Manage other admins",
        "System configuration",
      ],
    },
    {
      title: "Finance Admin",
      permissions: ["Approve refunds", "Manage payments", "Financial reports"],
    },
    {
      title: "Booking Admin",
      permissions: ["Edit bookings", "Booking reports", "Schedule bookings"],
    },
  ];

  const therapistBackgroundChecks = [
    {
      name: "Esthera Jackson",
      documentType: "License",
      status: "Verified",
      expiryDate: "14-March-2025",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      specialty: "Thai Massage Therapist",
      phone: "+1123456789",
      email: "esthera@email.com",
      documents: [
        { type: "Certificate", file: "certificate.jpg", size: "10 kB" },
        { type: "ID Document", file: "ID_document.pdf", size: "10 kB" },
      ],
      expiringDocuments: [
        { type: "License", file: "license.png", size: "10 kB" },
      ],
    },
    {
      name: "Esthera Jackson",
      documentType: "ID Verification",
      status: "Expiring",
      expiryDate: "14-March-2025",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
      specialty: "Thai Massage Therapist",
      phone: "+1123456789",
      email: "esthera@email.com",
      documents: [
        { type: "Certificate", file: "certificate.jpg", size: "10 kB" },
        { type: "ID Document", file: "ID_document.pdf", size: "10 kB" },
      ],
      expiringDocuments: [
        { type: "License", file: "license.png", size: "10 kB" },
      ],
    },
    {
      name: "Esthera Jackson",
      documentType: "License",
      status: "Expired",
      expiryDate: "14-March-2025",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
      specialty: "Thai Massage Therapist",
      phone: "+1123456789",
      email: "esthera@email.com",
      documents: [
        { type: "Certificate", file: "certificate.jpg", size: "10 kB" },
        { type: "ID Document", file: "ID_document.pdf", size: "10 kB" },
      ],
      expiringDocuments: [
        { type: "License", file: "license.png", size: "10 kB" },
      ],
    },
  ];

 // Data for Suspicious Activity Alerts

  const suspiciousActivities = [
    {
      title: "Multiple failed login attempts",
      description: "5 failed attempts from IP: 192.168.1.0",
      color: "red",
    },
    {
      title: "Excessive booking cancellations",
      description: "Therapist ID: TH12345 - 3 cancellations today",
      color: "yellow",
    },
  ];

  // Functions to open modals
  const openAdminRequestModal = (request) => {

    setSelectedAdminRequest(request);
    document.getElementById("admin_request_modal").showModal();
  };

  const openTherapistCheckModal = (check) => {
    setSelectedTherapistCheck(check);
    document.getElementById("therapist_check_modal").showModal();
  };

  // Function for handleAdmin role

  const handleAssignRole = async (data) => {

     try {
    const assignRole = {
    body: {
      assign_role: role, 
    },
    id: data.user_id, 
  };

    const res =  await assignRoleAdminRequest(assignRole).unwrap()

    toast.success("Role assigned successfully!");
    

    console.log("Assigned Role:", { res});

    // Make API request or state update here
    // await someApi.assignRole(assignRole);

    // Close the modal properly
    // const modal = document.getElementById("admin_request_modal");
    // if (modal?.close) {
    //   modal.close();
    // } 
    document.getElementById("admin_request_modal").close();
  } catch (error) {
    toast.error("Something went wrong!")
    console.error("Error assigning role:", error);
  }


  };

  // Handle loading and error states
  if (
    isAdminRequestLoading ||
    isAdminUpdateAdminRequestLoading
  ) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (
    isAdminRequestError ||
    isAdminUpdateAdminRequestError 
  ) {
    return (
      <div className="text-red-500">
        Error loading data:{" "}
        {isAdminRequestError?.message ||
          isAdminUpdateAdminRequestError?.message}
      </div>
    );
  }

  return (
    <section>
      {/* Roles & Permissions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Roles & Permissions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div key={index} className="bg-white rounded-[15px] shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {role.title}
                </h3>
                <FaShieldAlt className="text-[#B28D28]" size={20} />
              </div>
              <ul className="space-y-2">
                {role.permissions.map((permission, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" size={16} />
                    <span className="text-gray-600">{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* New Admin Requests and Therapist Background Check */}
      <div className="flex gap-6 mb-8">
        {/* New Admin Requests */}
        <div className="bg-white rounded-[15px] shadow-md p-6 basis-5/12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            New Admin Requests
          </h2>
          <div className="space-y-4">
            {newAdminRequests?.map((request, index) => (
              <div
                key={index}
                className="flex items-center justify-between  hover:bg-gray-100 cursor-pointer p-4 rounded-[15px]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={request.image}
                    alt={request.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-base text-gray-900">
                      {request.full_name}
                    </p>
                    <p className="text-sm text-gray-500">{request.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => openAdminRequestModal(request)}
                  className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Therapist Background Check */}
        <div className="bg-white rounded-[15px] shadow-md p-6 col-span-1 basis-7/12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Therapist Background Check
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="p-4">Name</th>
                  <th className="p-4">Document Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {therapistBackgroundChecks.map((check, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={check.image}
                          alt={check.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {check.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{check.documentType}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          check.status === "Verified"
                            ? "bg-[#41D377] text-white px-3 py-2"
                            : check.status === "Expiring"
                            ? "bg-[#FFF1CA] text-[#FFAE00]"
                            : "bg-[#FFD6D4] text-[#F1312B]"
                        }`}
                      >
                        {check.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{check.expiryDate}</td>
                    <td className="p-4">
                      <button
                        onClick={() => openTherapistCheckModal(check)}
                        className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Suspicious Activity Alerts */}
      <div className="bg-white rounded-[15px] shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Suspicious Activity Alerts
        </h2>
        <div className="space-y-4">
          {suspiciousActivities.map((activity, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-[10px] border-l-4 ${
                activity.color === "red"
                  ? "border-red-500 bg-[#FEF2F2]"
                  : "border-yellow-500 bg-yellow-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div>
                  <p
                    className={`font-medium ${
                      activity.color === "red"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-full text-white font-medium ${
                  activity.color === "red"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DaisyUI Modal for Admin Request */}
      <dialog id="admin_request_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Admin Request</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>
          {selectedAdminRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">
                    {selectedAdminRequest.full_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">
                    {selectedAdminRequest.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium text-gray-900">
                  {selectedAdminRequest.phone_number}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assign Role</p>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="super_admin">Super Admin</option>
                  <option value="finance_admin">Finance Admin</option>
                  <option value="booking_admin">Booking Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center gap-2"
                  onClick={ () => handleAssignRole(selectedAdminRequest)}
                  disabled={isAdminUpdateAdminRequestLoading || !role}
                >
                  <FaCheckCircle size={16} /> Approve
                </button>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center gap-2"
                  // onClick={() => handleRespond(false)}
                  disabled={isAdminUpdateAdminRequestLoading}
                >
                  <FaExclamationTriangle size={16} /> Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>

      

      {/* DaisyUI Modal for Therapist Background Check */}
      <dialog id="therapist_check_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Background Check</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>
          {selectedTherapistCheck && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialty</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck.specialty}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base text-gray-600 font-medium mb-2">
                  Documents Verified
                </p>
                {selectedTherapistCheck.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-[10px] p-3 mb-2 flex items-center gap-3  border-2 border-[#B28D28]/10 bg-[#FAE08C]/30"
                  >
                    <FaFileAlt className="text-gray-500" size={16} />
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        {doc.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.file} ({doc.size})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-base text-gray-900 font-medium mb-2">
                  Documents Expiring
                </p>
                {selectedTherapistCheck.expiringDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className=" rounded-[10px] p-3 mb-2 flex items-center gap-3 border-2 border-[#B28D28]/10 bg-[#FAE08C]/30"
                  >
                    <FaFileAlt className="text-gray-500" size={16} />
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        {doc.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.file} ({doc.size})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <FaEnvelope size={16} /> Send Message
                </button>
                <button className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors">
                  Disable Therapist
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>

     {/* Toast container for showing notifications */}
      <ToastContainer
        position="top-right" // ← changed from "top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default Roles;
