// import React, { useState } from "react";
// import { CalendarClock, X } from "lucide-react";
// import { AiFillWarning } from "react-icons/ai";
// import { FaDollarSign } from "react-icons/fa";
// import { FaCalendarCheck } from "react-icons/fa6";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { LuTrash2 } from "react-icons/lu";
// import { useGetAllBookingsQuery, useGetBookingDetailsQuery } from "../redux/features/baseAPI/baseApi";

// const Bookings = () => {
//   const [selectedBookingId, setSelectedBookingId] = useState(null);

//   const bookingData = useGetAllBookingsQuery();
  

//   const {data:bookingDetails} = useGetBookingDetailsQuery(selectedBookingId);
//   console.log(bookingDetails);
  
//   const baseURL = "http://192.168.10.139:3333/";


//   const bookingsInfo = bookingData?.data

//   const transactionsData = [
//     {
//       therapist: {
//         name: "Dr. Sarah Wilson",
//         email: "sarah.wilson@therapy.com",
//         image:
//           "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
//       },
//       type: "Session Payment",
//       payment: "$230.00",
//       commission: "$30.00",
//       date: "14-MARCH-2025",
//       status: "Paid",
//       method: "Paypal",
//     },
//     {
//       therapist: {
//         name: "Dr. Michael Brown",
//         email: "michael.brown@therapy.com",
//         image:
//           "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
//       },
//       type: "Bonus Payment",
//       payment: "$50.00",
//       commission: "--",
//       date: "14-MARCH-2025",
//       status: "Pending",
//       method: "Bank",
//     },
//   ];

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
//             <h1 className="font-bold text-2xl text-black">13</h1>
//           </div>
//           <div className="bg-[#B28D28] p-3 rounded-xl">
//             <FaCalendarCheck className="text-white" size={24} />
//           </div>
//         </div>

//         <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
//           <div className="space-y-2">
//             <h1 className="text-gray-800 font-medium">Total Revenue</h1>
//             <h1 className="font-bold text-2xl text-black">
//               $34,672{" "}
//               <span className="text-sm font-semibold text-green-500">+5%</span>
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
//               placeholder="Search bookings..."
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
//             />
//             <button className="bg-[#B28D28] text-white px-6 py-2 rounded-lg hover:bg-[#9a7b23] transition-colors">
//               Search
//             </button>
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
//               {bookingsInfo?.map((booking, index) => (
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
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit',
//                           hour12: true,
//                         })}

//                     </h1>
//                     {/* <h1 className="text-gray-600 text-sm">{booking.time}</h1> */}
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
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-6 px-4">
//           <p className="text-gray-600">Showing 1-10 of 100 entries</p>
//           <div className="flex items-center gap-2">
//             <button className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
//               <MdChevronLeft size={20} />
//             </button>
//             {[1, 2, 3, 4, 5].map((page) => (
//               <button
//                 key={page}
//                 className={`px-4 py-2 rounded-lg ${
//                   page === 1
//                     ? "bg-[#B28D28] text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button className="p-2 text-gray-500 hover:text-gray-700">
//               <MdChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* DaisyUI Modal */}
//     {/* // Replace the existing modal code with this: */}
// {/* DaisyUI Modal */}
// <dialog id="bookingId" className="modal">
//   <div className="modal-box bg-white rounded-xl p-6 w-full max-w-3xl">
//     <div className="flex justify-between items-center mb-6">
//       <h3 className="font-bold text-xl">Booking Details</h3>
//       <form method="dialog">
//         <button className="text-gray-500 flex items-center justify-center  text-2xl p-1 rounded-full hover:text-white hover:bg-red-500 bg-gray-300">
//           <X size={18}/>
//         </button>
//       </form>
//     </div>
//     {bookingDetails && (
//       <div className="space-y-4">
//         {/* Therapist Name and Booking Date/Time */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Therapist Name</p>
//             <p className="font-medium">{bookingDetails?.therapist_name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Booking Date/Time</p>
//             <p className="font-medium">
//               {new Date(bookingDetails?.booking_date_time).toLocaleString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true,
//               })}
//             </p>
//           </div>
//         </div>

//         {/* Customer and Status */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Customer</p>
//             <p className="font-medium">{bookingDetails?.customer_name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Service</p>
//             <p className="font-medium">{bookingDetails?.service_name}</p>
//           </div>
//         </div>

//          <div className="grid grid-cols-2 gap-4">
          
//           <div>
//             <p className="text-sm text-gray-500">Location</p>
//             <p className="font-medium">{bookingDetails?.location || 'N/A'}</p>
//           </div>
        
//         </div>

     

//         {/* Summary */}
//         <div className="border-t pt-4 space-y-5">
//           <p className="text-sm text-gray-500 font-medium mb-2">Payment Summary</p>
//           <div className="grid grid-cols-3 gap-4">
          
//             <div>
//               <p className="text-sm text-gray-500">Message Charges</p>
//               <p className="font-medium">${bookingDetails?.summary?.massage_charges || 'Pending'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Payment Method</p>
//               <p className="font-medium">{bookingDetails?.payment_method || 'N/A'}</p>
//             </div>
//           </div>

//            <div className="grid grid-cols-3 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Commission</p>
//               <p className="font-medium">${bookingDetails?.summary?.
//               commission}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Booking Fee</p>
//               <p className="font-medium">${bookingDetails?.summary?.booking_fee || 'Pending'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Tips</p>
//               <p className="font-medium">${bookingDetails?.summary?.tip || 'N/A'}</p>
//             </div>
//           </div>


//         </div>

//         {/* Total */}
//         <div className="border-t pt-4 flex justify-end">
//           <div className="text-right">
//             <p className="text-sm text-gray-500">Total Amount</p>
//             <p className="font-bold text-lg">${bookingDetails?.summary?.total}</p>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// </dialog>

//       {/* Transaction History Table */}
//       <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Transaction History
//           </h2>
//           <input
//             type="search"
//             placeholder="Search transactions..."
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
//           />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-600 border-b">
//                 <th className="p-4">Therapist</th>
//                 <th className="p-4">Type</th>
//                 <th className="p-4">Payment</th>
//                 <th className="p-4">Commission</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Method</th>
//                 <th className="p-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactionsData.map((transaction, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={transaction.therapist.image}
//                         alt={transaction.therapist.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {transaction.therapist.name}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {transaction.therapist.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4 text-gray-600">{transaction.type}</td>
//                   <td className="p-4 font-medium">{transaction.payment}</td>
//                   <td className="p-4 font-medium">{transaction.commission}</td>
//                   <td className="p-4 text-gray-600">{transaction.date}</td>
//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         transaction.status === "Paid"
//                           ? "bg-green-100 text-green-700"
//                           : transaction.status === "Pending"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {transaction.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-gray-600">{transaction.method}</td>
//                   <td className="p-4">
//                     <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-6 px-4">
//           <p className="text-gray-600">Showing 1-10 of 50 entries</p>
//           <div className="flex items-center gap-2">
//             <button className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
//               <MdChevronLeft size={20} />
//             </button>
//             {[1, 2, 3, 4, 5].map((page) => (
//               <button
//                 key={page}
//                 className={`px-4 py-2 rounded-lg ${
//                   page === 1
//                     ? "bg-[#B28D28] text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button className="p-2 text-gray-500 hover:text-gray-700">
//               <MdChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

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

  const { data: bookingsInfo } = useGetAllBookingsQuery();
  const { data: bookingDetails } = useGetBookingDetailsQuery(selectedBookingId);
  console.log(bookingDetails);

  const baseURL = "http://192.168.10.139:3333/";

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
            <h1 className="font-bold text-2xl text-black">13</h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <FaCalendarCheck className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Revenue</h1>
            <h1 className="font-bold text-2xl text-black">
              $34,672{" "}
              <span className="text-sm font-semibold text-green-500">+5%</span>
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
              placeholder="Search bookings..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
            />
            <button className="bg-[#B28D28] text-white px-6 py-2 rounded-lg hover:bg-[#9a7b23] transition-colors">
              Search
            </button>
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
              {bookingsInfo?.map((booking, index) => (
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
                        booking.booking_status === "Confirmed"
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
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 px-4">
          <p className="text-gray-600">Showing 1-10 of 100 entries</p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
              <MdChevronLeft size={20} />
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg ${
                  page === 1
                    ? "bg-[#B28D28] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 text-gray-500 hover:text-gray-700">
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