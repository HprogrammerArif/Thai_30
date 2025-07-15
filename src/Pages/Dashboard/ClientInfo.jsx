import { useState, useEffect } from "react";
import { FaDollarSign, FaUserClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { TbPhysotherapist } from "react-icons/tb";
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useAdminInfoQuery,
  useDeleteCustomerMutation,
  useDeleteTherapistMutation,
  useGetCustomersDetailsQuery,
  useGetTherapistDetailsQuery,
} from "../redux/features/baseAPI/baseApi";
import { LuTrash2 } from "react-icons/lu";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ClientInfo = () => {
  const [approvedTherapists, setApprovedTherapists] = useState({});
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [therapistSearchQuery, setTherapistSearchQuery] = useState("");
  const [currentCustomerPage, setCurrentCustomerPage] = useState(1);
  const [currentTherapistPage, setCurrentTherapistPage] = useState(1);
  const customerPerPage = 4;
  const therapistPerPage = 4;
  const debouncedCustomerSearchQuery = useDebounce(customerSearchQuery, 300);
  const debouncedTherapistSearchQuery = useDebounce(therapistSearchQuery, 300);

  const mapStatusQuery = (query) => {
    return query.toLowerCase().trim();
  };

  const customerApiQuery = mapStatusQuery(debouncedCustomerSearchQuery);
  const therapistApiQuery = mapStatusQuery(debouncedTherapistSearchQuery);
  const { data: adminData } = useAdminInfoQuery();
  const {
    data: customerData,
    isLoading,
    isError,
    error,
  } = useGetCustomersDetailsQuery(debouncedCustomerSearchQuery || "");

  const { data: therapistData } = useGetTherapistDetailsQuery(
    debouncedTherapistSearchQuery || ""
  );
  console.log("therapistData", therapistData);

  const [deleteCustomer] = useDeleteCustomerMutation();
  const [deleteTherapist] = useDeleteTherapistMutation();

  //delete therapist/customers function
  const handleDeleteCustomer = (customerId) => {
    console.log(customerId, "customerId");

    try {
      const response = deleteCustomer(customerId).unwrap();
      console.log(response, "Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleDeleteTherapist = (id) => {
    console.log(id, "therapistId");

    try {
      const response = deleteTherapist(id).unwrap();
      console.log(response, "Therapist deleted successfully");
    } catch (error) {
      console.error("Error deleting therapist:", error);
    }
  };

  const paseURL = "http://10.10.13.75:3333/";

  // Pagination calculations for Customers
  const filteredCustomers = customerData
    ? customerData.filter(
        (customer) =>
          customer?.full_name
            ?.toLowerCase()
            .includes(customerSearchQuery.toLowerCase()) ||
          customer?.email
            ?.toLowerCase()
            .includes(customerSearchQuery.toLowerCase()) ||
          customer?.status
            ?.toLowerCase()
            .includes(customerSearchQuery.toLowerCase()) ||
          customer?.phone
            ?.toLowerCase()
            .includes(customerSearchQuery.toLowerCase())
      )
    : [];
  const totalCustomers = filteredCustomers.length || 0;
  const totalCustomerPages = Math.ceil(totalCustomers / customerPerPage);
  const customerStartIndex = (currentCustomerPage - 1) * customerPerPage;
  const customerEndIndex = customerStartIndex + customerPerPage;
  const displayedCustomers = customerData
    ? customerData
        .filter(
          (customer) =>
            customer?.full_name
              ?.toLowerCase()
              .includes(customerSearchQuery.toLowerCase()) ||
            customer?.email
              ?.toLowerCase()
              .includes(customerSearchQuery.toLowerCase()) ||
            customer?.status
              ?.toLowerCase()
              .includes(customerSearchQuery.toLowerCase()) ||
            customer?.phone
              ?.toLowerCase()
              .includes(customerSearchQuery.toLowerCase())
        )
        .slice(customerStartIndex, customerEndIndex)
    : [];

  // Pagination calculations for Therapists
  const filteredTherapists = therapistData
    ? therapistData.filter(
        (therapist) =>
          therapist?.full_name
            ?.toLowerCase()
            .includes(therapistSearchQuery.toLowerCase()) ||
          therapist?.email
            ?.toLowerCase()
            .includes(therapistSearchQuery.toLowerCase()) ||
          therapist?.status
            ?.toLowerCase()
            .includes(therapistSearchQuery.toLowerCase()) ||
          therapist?.phone
            ?.toLowerCase()
            .includes(therapistSearchQuery.toLowerCase())
      )
    : [];
  const totalTherapists = filteredTherapists.length || 0;
  const totalTherapistPages = Math.ceil(totalTherapists / therapistPerPage);
  const therapistStartIndex = (currentTherapistPage - 1) * therapistPerPage;
  const therapistEndIndex = therapistStartIndex + therapistPerPage;
  const displayedTherapists = therapistData
    ? therapistData
        .filter(
          (therapist) =>
            therapist?.full_name
              ?.toLowerCase()
              .includes(therapistSearchQuery.toLowerCase()) ||
            therapist?.email
              ?.toLowerCase()
              .includes(therapistSearchQuery.toLowerCase()) ||
            therapist?.status
              ?.toLowerCase()
              .includes(therapistSearchQuery.toLowerCase()) ||
            therapist?.phone
              ?.toLowerCase()
              .includes(therapistSearchQuery.toLowerCase())
        )
        .slice(therapistStartIndex, therapistEndIndex)
    : [];

  // Reset customer page when customer search query changes
  useEffect(() => {
    setCurrentCustomerPage(1);
  }, [debouncedCustomerSearchQuery]);

  // Reset therapist page when therapist search query changes
  useEffect(() => {
    setCurrentTherapistPage(1);
  }, [debouncedTherapistSearchQuery]);

  // Generate page numbers with ellipsis
  const getPageNumbers = (totalPages) => {
    const pages = [];
    const maxPagesToShow = 5;
    const ellipsis = "...";

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      if (startPage > 2) {
        pages.push(1);
        if (startPage > 3) {
          pages.push(ellipsis);
        }
      }
      for (let i = startPage; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  // Handle page change for Customers
  const handleCustomerPageChange = (page) => {
    if (page >= 1 && page <= totalCustomerPages) {
      setCurrentCustomerPage(page);
    }
  };

  // Handle page change for Therapists
  const handleTherapistPageChange = (page) => {
    if (page >= 1 && page <= totalTherapistPages) {
      setCurrentTherapistPage(page);
    }
  };

  // Handle search input change for Customers
  const handleCustomerSearchChange = (e) => {
    setCustomerSearchQuery(e.target.value);
  };

  // Handle search input change for Therapists
  const handleTherapistSearchChange = (e) => {
    setTherapistSearchQuery(e.target.value);
  };

  const handleApprove = (therapistId) => {
    setApprovedTherapists((prev) => ({
      ...prev,
      [therapistId]: true,
    }));
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800">Pending Approvals</h1>
            <h1 className="font-bold text-xl text-black">
              {adminData?.pending_approvals}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaUserClock className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800">Active Users</h1>
            <h1 className="font-bold text-xl text-black">
              {adminData?.active_users}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FiUsers className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800">Active Therapists</h1>
            <h1 className="font-bold text-xl text-black">
              {adminData?.active_therapists}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <TbPhysotherapist className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800">Total Revenue</h1>
            <h1 className="font-bold text-xl text-black">
              ${adminData?.total_revenue}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaDollarSign className="text-white font-bold" size={24} />
          </div>
        </div>
      </div>

      {/* Customers Section */}
      <div className="bg-white rounded-[15px] shadow-md p-5 dark:text-gray-900">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">Customers</h1>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search by name or status"
              className="border rounded-lg p-2 ps-2"
              value={customerSearchQuery}
              onChange={handleCustomerSearchChange}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center p-3">
              <span className="loading loading-bars loading-xl"></span>
            </div>
          ) : isError ? (
            <div className="text-center p-3 text-red-500">
              Error: {error?.data?.message || "Failed to load customers"}
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Joined Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedCustomers && displayedCustomers.length > 0 ? (
                  displayedCustomers.map((customer, id) => (
                    <tr key={id} className="border-t">
                      <td className="p-3 flex items-center">
                        <Link
                          to={`/dashboard/customer/${customer?.user_id}`}
                          state={customer}
                          className="flex items-center"
                        >
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3">
                            {customer.image && (
                              <img
                                src={`${paseURL}api${customer.image}`}
                                alt={customer?.full_name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">
                              {customer?.full_name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {customer?.email}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="p-3">{customer?.phone || "N/A"}</td>
                      <td className="p-3">{customer?.joined_date}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full ${
                            customer?.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {customer?.status}
                        </span>
                      </td>
                      <td className="p-3 flex space-x-2">
                        {/* <button className="text-gray-500">
                          <FaEdit size={20} />
                        </button> */}
                        <button
                          onClick={() =>
                            handleDeleteCustomer(customer?.user_id)
                          }
                          className="text-red-500 shadow-sm shadow-gray-300 p-2 rounded-full hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <LuTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination for Customers */}
        {totalCustomerPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handleCustomerPageChange(currentCustomerPage - 1)}
              disabled={currentCustomerPage === 1}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentCustomerPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black"
              }`}
            >
              <FaAngleLeft />
            </button>
            {getPageNumbers(totalCustomerPages).map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handleCustomerPageChange(page)
                }
                className={`px-3 py-1 rounded-full text-sm ${
                  page === currentCustomerPage
                    ? "bg-[#B28D28] text-white"
                    : typeof page === "number"
                    ? "bg-gray-100 text-black hover:bg-gray-200"
                    : "text-gray-500 cursor-default"
                }`}
                disabled={typeof page !== "number"}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handleCustomerPageChange(currentCustomerPage + 1)}
              disabled={currentCustomerPage === totalCustomerPages}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentCustomerPage === totalCustomerPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black"
              }`}
            >
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>

      {/* Therapists Section */}
      <div className="bg-white rounded-[15px] shadow-md p-5 mt-20 dark:text-gray-900">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">Therapists</h1>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search by name, email, or status"
              className="border rounded-lg p-2 ps-2"
              value={therapistSearchQuery}
              onChange={handleTherapistSearchChange}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center p-3">
              <span className="loading loading-bars loading-xl"></span>
            </div>
          ) : isError ? (
            <div className="text-center p-3 text-red-500">
              Error: {error?.data?.message || "Failed to load therapists"}
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Joined Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedTherapists && displayedTherapists.length > 0 ? (
                  displayedTherapists.map((therapist, index) => (
                    <tr key={therapist.therapist_id} className="border-t">
                      <td className="p-3 flex items-center">
                        <Link
                          to={`/dashboard/therapist/${therapist?.therapist_id}`}
                          state={{ therapist }}
                          className="flex items-center"
                        >
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3">
                            {therapist.image_url && (
                              <img
                                src={`${paseURL}api${therapist.image_url}`}
                                alt={therapist.full_name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">
                              {therapist?.full_name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {therapist?.email || "N/A"}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="p-3">{therapist?.phone || "N/A"}</td>
                      <td className="p-3">{therapist?.joined_date}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full ${
                            therapist?.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {therapist?.status}
                        </span>
                      </td>
                      <td className="p-3 flex space-x-2">
                        <button
                          onClick={() =>
                            handleDeleteTherapist(therapist?.therapist_id)
                          }
                          className="text-red-500 shadow-sm shadow-gray-300 p-2 rounded-full hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <LuTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      No therapists found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination for Therapists */}
        {totalTherapistPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() =>
                handleTherapistPageChange(currentTherapistPage - 1)
              }
              disabled={currentTherapistPage === 1}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentTherapistPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black"
              }`}
            >
              <FaAngleLeft />
            </button>
            {getPageNumbers(totalTherapistPages).map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handleTherapistPageChange(page)
                }
                className={`px-3 py-1 rounded-full text-sm ${
                  page === currentTherapistPage
                    ? "bg-[#B28D28] text-white"
                    : typeof page === "number"
                    ? "bg-gray-100 text-black hover:bg-gray-200"
                    : "text-gray-500 cursor-default"
                }`}
                disabled={typeof page !== "number"}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                handleTherapistPageChange(currentTherapistPage + 1)
              }
              disabled={currentTherapistPage === totalTherapistPages}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentTherapistPage === totalTherapistPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black"
              }`}
            >
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientInfo;
