import React, { useState } from "react";
import { CalendarClock, X } from "lucide-react";
import { AiFillWarning } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { useGetAllBookingsQuery, useGetBookingDetailsQuery } from "../redux/features/baseAPI/baseApi";
import TransactionHistory from "./TransactionHistory";

const Bookings = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const maxPageButtons = 5; 

  const { data: bookingsInfo } = useGetAllBookingsQuery();
  const { data: bookingDetails } = useGetBookingDetailsQuery(selectedBookingId);

  const baseURL = "http://192.168.10.139:3333/";

  const filteredBookings = bookingsInfo?.filter((booking) =>
    booking.booking_status.toLowerCase().includes(searchStatus.toLowerCase())
  );

  const totalItems = filteredBookings?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchStatus(e.target.value);
    setCurrentPage(1); 
  };

  const getPaginationButtons = () => {
    const buttons = [];
    let startPage, endPage;

    if (totalPages <= maxPageButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfMax = Math.floor(maxPageButtons / 2);
      if (currentPage <= halfMax + 1) {
        startPage = 1;
        endPage = maxPageButtons;
        buttons.push(...Array.from({ length: endPage }, (_, i) => i + 1));
        if (totalPages > maxPageButtons) {
          buttons.push("...");
          buttons.push(totalPages);
        }
      } else if (currentPage >= totalPages - halfMax) {
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
        buttons.push(1);
        buttons.push("...");
        buttons.push(...Array.from({ length: maxPageButtons }, (_, i) => startPage + i));
      } else {
        startPage = currentPage - halfMax;
        endPage = currentPage + halfMax;
        buttons.push(1);
        buttons.push("...");
        buttons.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
        buttons.push("...");
        buttons.push(totalPages);
      }
    }

    return buttons.map((page, index) =>
      page === "..." ? (
        <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-600">
          ...
        </span>
      ) : (
        <button
          key={page}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
            page === currentPage
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "text-gray-500 hover:bg-orange-100 hover:text-orange-500"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      )
    );
  };

  const openModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    document.getElementById("bookingId").showModal();
  };

  return (
    <section className="">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Bookings</h1>
            <h1 className="font-bold text-2xl text-black">{bookingsInfo?.length || 0}</h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <FaCalendarCheck className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Revenue</h1>
            <h1 className="font-bold text-2xl text-black">
              $34,672 <span className="text-sm font-semibold text-green-500">+5%</span>
            </h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <FaDollarSign className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Pending Payouts</h1>
            <h1 className="font-bold text-2xl text-black flex items-center gap-3">
              $1,870{" "}
              <span className="text-sm font-medium text-[#F1312B] bg-red-50 px-2 py-1 rounded-full">
                12 Pending
              </span>
            </h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <CalendarClock className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Commission</h1>
            <h1 className="font-bold text-2xl text-black">$9,000</h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <AiFillWarning className="text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search by status (e.g., Confirmed, Pending)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
              value={searchStatus}
              onChange={handleSearchChange}
            />
          
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Therapist</th>
                <th className="p-4">Date/Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings?.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => openModal(booking?.booking_id)}
                >
                  <td className="p-4 font-medium">{booking.booking_id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${baseURL}api${booking.client_image}`}
                        alt={booking?.client_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.client_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.client_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${baseURL}api${booking?.therapist_image}`}
                        alt={booking.therapist_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.therapist_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.therapist_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <h1 className="text-gray-900 font-semibold">
                      {new Date(booking.booking_date_time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </h1>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        booking.booking_status === "complete"
                          ? "bg-[#41D377] text-white"
                          : "bg-[#B28D284D]/30 text-[#B28D28]"
                      }`}
                    >
                      {booking.booking_status}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{booking?.amount}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        className="text-red-500 shadow-lg shadow-gray-300 p-2 rounded-full hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <LuTrash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentBookings?.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No bookings found for the selected status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
     
      <div className="flex justify-between items-center mt-6 px-4">
  <p className="text-gray-600">
    Showing {startIndex + 1}-
    {Math.min(endIndex, totalItems)} of {totalItems} entries
  </p>
  <div className="flex items-center space-x-3">
    <button
      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-500 disabled:opacity-50"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <MdChevronLeft size={20} />
    </button>
    {getPaginationButtons().map((button, index) =>
      button === "..." ? (
        <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-600">
          ...
        </span>
      ) : (
        <button
          key={button}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
            button === currentPage
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "text-gray-500 hover:bg-orange-100 hover:text-orange-500"
          }`}
          onClick={() => handlePageChange(button)}
        >
          {button}
        </button>
      )
    )}
    <button
      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-500 disabled:opacity-50"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <MdChevronRight size={20} />
    </button>
  </div>
</div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id="bookingId" className="modal">
        <div className="modal-box bg-white rounded-xl p-6 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Booking Details</h3>
            <form method="dialog">
              <button className="text-gray-500 flex items-center justify-center text-2xl p-1 rounded-full hover:text-white hover:bg-red-500 bg-gray-300">
                <X size={18} />
              </button>
            </form>
          </div>
          {bookingDetails && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Therapist Name</p>
                  <p className="font-medium">{bookingDetails?.therapist_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Date/Time</p>
                  <p className="font-medium">
                    {new Date(bookingDetails?.booking_date_time).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{bookingDetails?.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{bookingDetails?.service_name}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{bookingDetails?.location || 'N/A'}</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-5">
                <p className="text-sm text-gray-500 font-medium mb-2">Payment Summary</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Message Charges</p>
                    <p className="font-medium">${bookingDetails?.summary?.massage_charges || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{bookingDetails?.payment_method || 'N/A'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Commission</p>
                    <p className="font-medium">${bookingDetails?.summary?.commission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking Fee</p>
                    <p className="font-medium">${bookingDetails?.summary?.booking_fee || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tips</p>
                    <p className="font-medium">${bookingDetails?.summary?.tip || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-lg">${bookingDetails?.summary?.total}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>

      {/* Transaction History Component */}
      <TransactionHistory />

      {/* Safety Alerts */}
      <div className="bg-white p-5 my-8 rounded-[15px] shadow-md">
        <h1 className="text-xl font-semibold pb-8">Safety Alerts</h1>
        <div className="space-y-8">
          <div className="flex items-center justify-between bg-[#FEF2F2] px-10 rounded-[15px]">
            <div className="flex items-center gap-10 py-5">
              <AiFillWarning size={44} className="text-[#F1312B]" />
              <div>
                <h1 className="text-lg font-medium text-[#F1312B]">
                  Multiple Refund Request Detected
                </h1>
                <p className="font-medium text-gray-500">
                  3 refund requests from the same account in 24 hours
                </p>
              </div>
            </div>
            <button className="px-10 py-3 text-white rounded-full bg-[#F1312B]">
              Review
            </button>
          </div>
          <div className="flex items-center justify-between bg-[#FEF2F2] px-10 rounded-[15px]">
            <div className="flex items-center gap-10 py-5">
              <AiFillWarning size={44} className="text-[#F1312B]" />
              <div>
                <h1 className="text-lg font-medium text-[#F1312B]">
                  Multiple Refund Request Detected
                </h1>
                <p className="font-medium text-gray-500">
                  3 refund requests from the same account in 24 hours
                </p>
              </div>
            </div>
            <button className="px-10 py-3 text-white rounded-full bg-[#F1312B]">
              Review
            </button>
          </div>
        </div>
        <div>
          <p className="text-[#B28D28] mt-5 hover:underline cursor-pointer font-medium">
            Load More
          </p>
        </div>
      </div>
    </section>
  );
};

export default Bookings;


// import React, { useState } from "react";
// import { CalendarClock, X } from "lucide-react";
// import { AiFillWarning } from "react-icons/ai";
// import { FaDollarSign } from "react-icons/fa";
// import { FaCalendarCheck } from "react-icons/fa6";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { LuTrash2 } from "react-icons/lu";
// import { useGetAllBookingsQuery, useGetBookingDetailsQuery } from "../redux/features/baseAPI/baseApi";
// import TransactionHistory from "./TransactionHistory";

// const Bookings = () => {
//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const [searchStatus, setSearchStatus] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; 
//   const maxPageButtons = 5; 

//   const { data: bookingsInfo } = useGetAllBookingsQuery();
//   const { data: bookingDetails } = useGetBookingDetailsQuery(selectedBookingId);

//   const baseURL = "http://192.168.10.139:3333/";

//   const filteredBookings = bookingsInfo?.filter((booking) =>
//     booking.booking_status.toLowerCase().includes(searchStatus.toLowerCase())
//   );

//   const totalItems = filteredBookings?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentBookings = filteredBookings?.slice(startIndex, endIndex);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchStatus(e.target.value);
//     setCurrentPage(1); 
//   };

//   const getPaginationButtons = () => {
//     const buttons = [];
//     let startPage, endPage;

//     if (totalPages <= maxPageButtons) {
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       const halfMax = Math.floor(maxPageButtons / 2);
//       if (currentPage <= halfMax + 1) {
//         startPage = 1;
//         endPage = maxPageButtons;
//         buttons.push(...Array.from({ length: endPage }, (_, i) => i + 1));
//         if (totalPages > maxPageButtons) {
//           buttons.push("...");
//           buttons.push(totalPages);
//         }
//       } else if (currentPage >= totalPages - halfMax) {
//         startPage = totalPages - maxPageButtons + 1;
//         endPage = totalPages;
//         buttons.push(1);
//         buttons.push("...");
//         buttons.push(...Array.from({ length: maxPageButtons }, (_, i) => startPage + i));
//       } else {
//         startPage = currentPage - halfMax;
//         endPage = currentPage + halfMax;
//         buttons.push(1);
//         buttons.push("...");
//         buttons.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
//         buttons.push("...");
//         buttons.push(totalPages);
//       }
//     }

//     return buttons.map((page, index) =>
//       page === "..." ? (
//         <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-600">
//           ...
//         </span>
//       ) : (
//         <button
//           key={page}
//           className={`px-4 py-2 rounded-lg ${
//             page === currentPage
//               ? "bg-[#B28D28] text-white"
//               : "text-gray-600 hover:bg-gray-100"
//           }`}
//           onClick={() => handlePageChange(page)}
//         >
//           {page}
//         </button>
//       )
//     );
//   };

//   const openModal = (bookingId) => {
//     setSelectedBookingId(bookingId);
//     document.getElementById("bookingId").showModal();
//   };

//   return (
//     <section className="">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
//           <div className="space-y-2">
//             <h1 className="text-gray-800 font-medium">Total Bookings</h1>
//             <h1 className="font-bold text-2xl text-black">{bookingsInfo?.length || 0}</h1>
//           </div>
//           <div className="bg-[#B28D28] p-3 rounded-xl">
//             <FaCalendarCheck className="text-white" size={24} />
//           </div>
//         </div>

//         <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
//           <div className="space-y-2">
//             <h1 className="text-gray-800 font-medium">Total Revenue</h1>
//             <h1 className="font-bold text-2xl text-black">
//               $34,672 <span className="text-sm font-semibold text-green-500">+5%</span>
//             </h1>
//           </div>
//           <div className="bg-[#B28D28] p-3 rounded-xl">
//             <FaDollarSign className="text-white" size={24} />
//           </div>
//         </div>

//         <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
//           <div className="space-y-2">
//             <h1 className="text-gray-800 font-medium">Pending Payouts</h1>
//             <h1 className="font-bold text-2xl text-black flex items-center gap-3">
//               $1,870{" "}
//               <span className="text-sm font-medium text-[#F1312B] bg-red-50 px-2 py-1 rounded-full">
//                 12 Pending
//               </span>
//             </h1>
//           </div>
//           <div className="bg-[#B28D28] p-3 rounded-xl">
//             <CalendarClock className="text-white" size={24} />
//           </div>
//         </div>

//         <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
//           <div className="space-y-2">
//             <h1 className="text-gray-800 font-medium">Commission</h1>
//             <h1 className="font-bold text-2xl text-black">$9,000</h1>
//           </div>
//           <div className="bg-[#B28D28] p-3 rounded-xl">
//             <AiFillWarning className="text-white" size={24} />
//           </div>
//         </div>
//       </div>

//       {/* Bookings Table */}
//       <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
//           <div className="flex gap-4">
//             <input
//               type="search"
//               placeholder="Search by status (e.g., Confirmed, Pending)"
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
//               value={searchStatus}
//               onChange={handleSearchChange}
//             />
          
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-600 border-b">
//                 <th className="p-4">Booking ID</th>
//                 <th className="p-4">Customer</th>
//                 <th className="p-4">Therapist</th>
//                 <th className="p-4">Date/Time</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Amount</th>
//                 <th className="p-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentBookings?.map((booking, index) => (
//                 <tr
//                   key={index}
//                   className="border-b hover:bg-gray-50 cursor-pointer"
//                   onClick={() => openModal(booking?.booking_id)}
//                 >
//                   <td className="p-4 font-medium">{booking.booking_id}</td>
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={`${baseURL}api${booking.client_image}`}
//                         alt={booking?.client_name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {booking.client_name}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {booking.client_email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={`${baseURL}api${booking?.therapist_image}`}
//                         alt={booking.therapist_name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {booking.therapist_name}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {booking.therapist_email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <h1 className="text-gray-900 font-semibold">
//                       {new Date(booking.booking_date_time).toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         hour12: true,
//                       })}
//                     </h1>
//                   </td>
//                   <td className="p-4">
//                     <span
//                       className={`px-4 py-2 rounded-full text-sm font-medium ${
//                         booking.booking_status === "Confirmed"
//                           ? "bg-[#41D377] text-white"
//                           : "bg-[#B28D284D]/30 text-[#B28D28]"
//                       }`}
//                     >
//                       {booking.booking_status}
//                     </span>
//                   </td>
//                   <td className="p-4 font-medium">{booking?.amount}</td>
//                   <td className="p-4">
//                     <div className="flex gap-3">
//                       <button
//                         className="text-red-500 shadow-lg shadow-gray-300 p-2 rounded-full hover:text-red-700 transition-colors"
//                         title="Delete"
//                       >
//                         <LuTrash2 size={20} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {currentBookings?.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="p-4 text-center text-gray-500">
//                     No bookings found for the selected status.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
     
//       <div className="flex justify-between items-center mt-6 px-4">
//   <p className="text-gray-600">
//     Showing {startIndex + 1}-
//     {Math.min(endIndex, totalItems)} of {totalItems} entries
//   </p>
//   <div className="flex items-center space-x-3">
//     <button
//       className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-500 disabled:opacity-50"
//       onClick={() => handlePageChange(currentPage - 1)}
//       disabled={currentPage === 1}
//     >
//       <MdChevronLeft size={20} />
//     </button>
//     {getPaginationButtons().map((button, index) =>
//       button === "..." ? (
//         <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-600">
//           ...
//         </span>
//       ) : (
//         <button
//           key={button}
//           className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
//             button === currentPage
//               ? "bg-orange-500 text-white hover:bg-orange-600"
//               : "text-gray-500 hover:bg-orange-100 hover:text-orange-500"
//           }`}
//           onClick={() => handlePageChange(button)}
//         >
//           {button}
//         </button>
//       )
//     )}
//     <button
//       className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-500 disabled:opacity-50"
//       onClick={() => handlePageChange(currentPage + 1)}
//       disabled={currentPage === totalPages}
//     >
//       <MdChevronRight size={20} />
//     </button>
//   </div>
// </div>
//       </div>

//       {/* DaisyUI Modal */}
//       <dialog id="bookingId" className="modal">
//         <div className="modal-box bg-white rounded-xl p-6 w-full max-w-3xl">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-xl">Booking Details</h3>
//             <form method="dialog">
//               <button className="text-gray-500 flex items-center justify-center text-2xl p-1 rounded-full hover:text-white hover:bg-red-500 bg-gray-300">
//                 <X size={18} />
//               </button>
//             </form>
//           </div>
//           {bookingDetails && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Therapist Name</p>
//                   <p className="font-medium">{bookingDetails?.therapist_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Booking Date/Time</p>
//                   <p className="font-medium">
//                     {new Date(bookingDetails?.booking_date_time).toLocaleString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit',
//                       hour12: true,
//                     })}
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Customer</p>
//                   <p className="font-medium">{bookingDetails?.customer_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Service</p>
//                   <p className="font-medium">{bookingDetails?.service_name}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Location</p>
//                   <p className="font-medium">{bookingDetails?.location || 'N/A'}</p>
//                 </div>
//               </div>
//               <div className="border-t pt-4 space-y-5">
//                 <p className="text-sm text-gray-500 font-medium mb-2">Payment Summary</p>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Message Charges</p>
//                     <p className="font-medium">${bookingDetails?.summary?.massage_charges || 'Pending'}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Payment Method</p>
//                     <p className="font-medium">{bookingDetails?.payment_method || 'N/A'}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Commission</p>
//                     <p className="font-medium">${bookingDetails?.summary?.commission}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Booking Fee</p>
//                     <p className="font-medium">${bookingDetails?.summary?.booking_fee || 'Pending'}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Tips</p>
//                     <p className="font-medium">${bookingDetails?.summary?.tip || 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="border-t pt-4 flex justify-end">
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500">Total Amount</p>
//                   <p className="font-bold text-lg">${bookingDetails?.summary?.total}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </dialog>

//       {/* Transaction History Component */}
//       <TransactionHistory />

//       {/* Safety Alerts */}
//       <div className="bg-white p-5 my-8 rounded-[15px] shadow-md">
//         <h1 className="text-xl font-semibold pb-8">Safety Alerts</h1>
//         <div className="space-y-8">
//           <div className="flex items-center justify-between bg-[#FEF2F2] px-10 rounded-[15px]">
//             <div className="flex items-center gap-10 py-5">
//               <AiFillWarning size={44} className="text-[#F1312B]" />
//               <div>
//                 <h1 className="text-lg font-medium text-[#F1312B]">
//                   Multiple Refund Request Detected
//                 </h1>
//                 <p className="font-medium text-gray-500">
//                   3 refund requests from the same account in 24 hours
//                 </p>
//               </div>
//             </div>
//             <button className="px-10 py-3 text-white rounded-full bg-[#F1312B]">
//               Review
//             </button>
//           </div>
//           <div className="flex items-center justify-between bg-[#FEF2F2] px-10 rounded-[15px]">
//             <div className="flex items-center gap-10 py-5">
//               <AiFillWarning size={44} className="text-[#F1312B]" />
//               <div>
//                 <h1 className="text-lg font-medium text-[#F1312B]">
//                   Multiple Refund Request Detected
//                 </h1>
//                 <p className="font-medium text-gray-500">
//                   3 refund requests from the same account in 24 hours
//                 </p>
//               </div>
//             </div>
//             <button className="px-10 py-3 text-white rounded-full bg-[#F1312B]">
//               Review
//             </button>
//           </div>
//         </div>
//         <div>
//           <p className="text-[#B28D28] mt-5 hover:underline cursor-pointer font-medium">
//             Load More
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Bookings;