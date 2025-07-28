import { useState } from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaExclamationTriangle,
  FaFileAlt,
  FaEnvelope,
} from "react-icons/fa";

import {
  useAssignRoleInAdminRequestMutation,
  useDeactivateTherapistMutation,
  useGetNewAdminRequestQuery,
  useGetSingleTherapistBackgroundDataQuery,
  useGetTherapistBackgroundDataQuery,
  useRejectAdminRequestMutation,
} from "../redux/features/baseAPI/baseApi";
// import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from "sonner";
// import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Roles = () => {
  const baseURL = "https://backend.thaimassagesnearmeapp.com/";
  // State to manage selected user for modals
  const [selectedAdminRequest, setSelectedAdminRequest] = useState(null);
  const [selectedTherapistCheck, setSelectedTherapistCheck] = useState(null);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [role, setRole] = useState("");
  const {
    data: newAdminRequests,
    isLoading: isAdminRequestLoading,
    error: isAdminRequestError,
  } = useGetNewAdminRequestQuery();

  console.log({ selectedTherapistCheck });

  const [rejectAdminRequest, { isLoading: redjectAdminRequestLoading }] =
    useRejectAdminRequestMutation();

  const [
    assignRoleAdminRequest,
    {
      isLoading: isAdminUpdateAdminRequestLoading,
      error: isAdminUpdateAdminRequestError,
    },
  ] = useAssignRoleInAdminRequestMutation();

  const [deactivateTherapist, { isLoading: isDisabling }] =
    useDeactivateTherapistMutation();

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

  // const therapistBackgroundChecksData = [
  //   {
  //     name: "Esthera Jackson",
  //     documentType: "License",
  //     status: "Verified",
  //     expiryDate: "14-March-2025",
  //     image:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  //     specialty: "Thai Massage Therapist",
  //     phone: "+1123456789",
  //     email: "esthera@email.com",
  //     documents: [
  //       { type: "Certificate", file: "certificate.jpg", size: "10 kB" },
  //       { type: "ID Document", file: "ID_document.pdf", size: "10 kB" },
  //     ],
  //     expiringDocuments: [
  //       { type: "License", file: "license.png", size: "10 kB" },
  //     ],
  //   },
  //   {
  //     name: "Esthera Jackson",
  //     documentType: "ID Verification",
  //     status: "Expiring",
  //     expiryDate: "14-March-2025",
  //     image:
  //       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
  //     specialty: "Thai Massage Therapist",
  //     phone: "+1123456789",
  //     email: "esthera@email.com",
  //     documents: [
  //       { type: "Certificate", file: "certificate.jpg", size: "10 kB" },
  //       { type: "ID Document", file: "ID_document.pdf", size: "10 kB" },
  //     ],
  //     expiringDocuments: [
  //       { type: "License", file: "license.png", size: "10 kB" },
  //     ],
  //   },
  //   {
  //     name: "Esthera Jackson",
  //     documentType: "License",
  //     status: "Expired",
  //     expiryDate: "14-March-2025",
  //     image:
  //       "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
  //     specialty: "Thai Massage Therapist",
  //     phone: "+1123456789",
  //     email: "esthera@email.com",
  //     documents: [
  //       { type: "Certificate", file: "certificate.jpg", size: "10 kB" },
  //       { type: "ID Document", file: "ID_document.pdf", size: "10 kB" },
  //     ],
  //     expiringDocuments: [
  //       { type: "License", file: "license.png", size: "10 kB" },
  //     ],
  //   },
  // ];

  // Data for Suspicious Activity Alerts

  const {
    data: therapistBackgroundChecks,
    isLoading: isTherapistBackgroundLoading,
    error: isTherapistBackgroundError,
  } = useGetTherapistBackgroundDataQuery();

  console.log({ therapistBackgroundChecks });

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

  // Fetch therapist data when selectedTherapistId is set
  const {
    data: selectedTherapistCheckData,
    isLoading,
    isError,
  } = useGetSingleTherapistBackgroundDataQuery(selectedTherapistId, {
    skip: !selectedTherapistId,
  });

  // Function to open modal and set therapist id
  const openTherapistCheckModal = (therapistId) => {
    setSelectedTherapistId(therapistId);
    document.getElementById("therapist_check_modal").showModal();
  };

  // Function to close modal and clear data
  const closeModal = () => {
    document.getElementById("therapist_check_modal").close();
    setSelectedTherapistId(null);
  };

  const handleDisableTherapist = async () => {
    if (!selectedTherapistId) return;

    try {
      const res = await deactivateTherapist(selectedTherapistId).unwrap();
      console.log({ res });
      toast.success("Succeseefull!");
      document.getElementById("therapist_check_modal").close();
      setSelectedTherapistId(null);
      // optionally refresh list or update UI here
    } catch (error) {
      console.error("Failed to disable therapist:", error);
      toast.error("Failed to disable therapist. Please try again.");
    }
  };

  // const handleDisableTherapist = () => {
  //   confirmAlert({
  //     title: "Confirm to disable",
  //     message: "Are you sure you want to disable this therapist?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: async () => {
  //           try {
  //             await deactivateTherapist(selectedTherapistId).unwrap();
  //             toast.success("Therapist disabled successfully!");
  //             document.getElementById("therapist_check_modal")?.close();
  //             setSelectedTherapistId(null);
  //           } catch (err) {
  //             toast.error("Failed to disable therapist.");
  //           }
  //         },
  //       },
  //       {
  //         label: "Cancel",
  //         onClick: () => {},
  //       },
  //     ],
  //   });
  // };

  // Function for handleAdmin role

  const handleAssignRole = async (data) => {
    try {
      const assignRole = {
        body: {
          assign_role: role,
        },
        id: data.user_id,
      };

      const res = await assignRoleAdminRequest(assignRole).unwrap();

      toast.success("Role assigned successfully!");

      console.log("Assigned Role:", { res });

      // Make API request or state update here
      // await someApi.assignRole(assignRole);

      // Close the modal properly
      // const modal = document.getElementById("admin_request_modal");
      // if (modal?.close) {
      //   modal.close();
      // }
      document.getElementById("admin_request_modal").close();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error assigning role:", error);
    }
  };

  const handleRejectAdminRequest = async (user_id) => {
    try {
      const response = await rejectAdminRequest(user_id).unwrap();
      console.log(response, "reject req");
      toast.success("Admin request rejected successfully");
      // closeTherapistModal();
    } catch (error) {
      toast.error("Error admin request rejected, please try again.");
      console.error("Error rejecting admin request:", error);
    }
  };

  // Handle loading and error states
  if (isAdminRequestLoading || isAdminUpdateAdminRequestLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (isAdminRequestError || isAdminUpdateAdminRequestError) {
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
      <Toaster position="top-center" richColors />
      {/* Roles & Permissions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Roles & Permissions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles?.map((role, index) => (
            <div key={index} className="bg-white rounded-[15px] shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {role.title}
                </h3>
                <FaShieldAlt className="text-[#B28D28]" size={20} />
              </div>
              <ul className="space-y-2">
                {role?.permissions?.map((permission, idx) => (
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
                    src={`${baseURL}api${request?.image}`}
                    // src={request.image}
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
                {therapistBackgroundChecks?.map((check, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          // src={check.image_url}
                          src={`${baseURL}api${check.image_url}`}
                          alt={check.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {check.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{check.document_type}</td>
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
                    <td className="p-4 text-gray-600">{check.expiry_date}</td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          openTherapistCheckModal(check.therapist_id)
                        } // replace with dynamic ID like check.therapist_id
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
          {suspiciousActivities?.map((activity, index) => (
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
      <dialog id="admin_request_modal" className="modal dark:text-gray-50">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Admin Request</h3>
            <form method="dialog">
              <button className="text-gray-500 dark:text-gray-50 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>
          {selectedAdminRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm  dark:text-gray-50">Name</p>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {selectedAdminRequest.full_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-50">
                    Email
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {selectedAdminRequest.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-50">
                  Phone Number
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-200">
                  {selectedAdminRequest.phone_number}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-50">
                  Assign Role
                </p>
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
                  onClick={() => handleAssignRole(selectedAdminRequest)}
                  disabled={isAdminUpdateAdminRequestLoading || !role}
                >
                  <FaCheckCircle size={16} /> Approve
                </button>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center gap-2"
                  // onClick={() => handleRespond(false)}
                  onClick={() =>
                    handleRejectAdminRequest(selectedAdminRequest?.user_id)
                  }
                  disabled={isAdminUpdateAdminRequestLoading}
                >
                  <FaExclamationTriangle size={16} /> Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>

      <dialog id="therapist_check_modal" className="modal dark:text-gray-50">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Background Check</h3>
            <form method="dialog">
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                type="button"
                onClick={() =>
                  document.getElementById("therapist_check_modal").close()
                }
              >
                ×
              </button>
            </form>
          </div>

          {selectedTherapistCheckData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-50">
                    Name
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {selectedTherapistCheckData.therapist_info.full_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-50">
                    Specialty
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {selectedTherapistCheckData.therapist_info.role}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-50">
                    Phone
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {selectedTherapistCheckData.therapist_info.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-50">
                    Email
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {selectedTherapistCheckData.therapist_info.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base text-gray-600 dark:text-gray-50 font-medium mb-2">
                  Documents Verified
                </p>
                {selectedTherapistCheckData?.documents?.length ? (
                  selectedTherapistCheckData?.documents?.map((doc, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-[10px] p-3 mb-2 flex items-center gap-3 border-2 border-[#B28D28]/10 bg-[#FAE08C]/30"
                    >
                      <FaFileAlt
                        className="text-gray-500 dark:text-gray-50"
                        size={16}
                      />
                      <div>
                        {/* You can show specific document types and links */}
                        {Object.entries(doc)?.map(([key, url]) =>
                          url ? (
                            <p
                              key={key}
                              className="text-sm text-gray-900 font-medium"
                            >
                              {key.replace(/_/g, " ")}:{" "}
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                View Document
                              </a>
                            </p>
                          ) : null
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-50">
                    No documents available.
                  </p>
                )}
              </div>
              {/* If you want you can add expiringDocuments or any other sections similarly */}

              <div className="flex justify-end gap-3 mt-6">
                {/* <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <FaEnvelope size={16} /> Send Message
                </button> */}
                <button
                  onClick={handleDisableTherapist}
                  disabled={isDisabling}
                  className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors"
                >
                  {isDisabling ? "Disabling..." : "Disable Therapist"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data found.</p>
          )}
        </div>
      </dialog>

      {/* DaisyUI Modal for Therapist Background Check
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

          {isLoading && selectedTherapistCheckData ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : selectedTherapistCheckData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialty</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck?.specialty}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">
                    {selectedTherapistCheck?.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base text-gray-600 font-medium mb-2">
                  Documents Verified
                </p>
                {selectedTherapistCheck?.documents?.map((doc, index) => (
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
                {selectedTherapistCheck?.expiringDocuments?.map(
                  (doc, index) => (
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
                  )
                )}
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
          ) : (
            <p className="text-center text-gray-500">No data found.</p>
          )}
        </div>
      </dialog> */}

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
