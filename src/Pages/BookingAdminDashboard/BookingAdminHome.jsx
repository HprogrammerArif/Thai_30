import { useState } from "react";
import { CalendarClock, X } from "lucide-react";
import { AiFillWarning } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { useAdminInfoQuery, useDeleteBookingMutation, useGetAllBookingsQuery, useGetAnalyticsDataQuery, useGetBookingDetailsQuery } from "../redux/features/baseAPI/baseApi";
import TransactionHistory from "../Dashboard/TransactionHistory";
import MassageTypes from "../../Layout/components/MassageTypes";
import AddOns from "../../Layout/components/AddOns";


const BookingAdminHome = () => {
  const { data: infoData } = useGetAnalyticsDataQuery();
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const maxPageButtons = 5; 

   const { data: adminData } = useAdminInfoQuery();
   console.log("adminData", adminData)
  const { data: bookingsInfo } = useGetAllBookingsQuery();
  const { data: bookingDetails } = useGetBookingDetailsQuery(selectedBookingId);
  console.log("bookingDetails", bookingDetails)
  const [deleteBooking, {isLoading}] = useDeleteBookingMutation()

  const baseURL = "http://10.10.13.75:3333/";

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

  const bookingDelete = (id)=>{
    console.log(id, "deleted id");

    try {
      const response = deleteBooking(id).unwrap();
      console.log("Booking deleted successfully:", response);
    } catch (error) {
      console.error("Error deleting booking:", error);
      
    }
  }



  // Dynamic customer insights from infoData
  const customerInsights = {
    newCustomers: infoData?.customer_insights?.new_customers || 0,
    repeatBookings: infoData?.customer_insights?.repeat_rate || '0%',
    avgBookedValue: infoData?.customer_insights?.avg_booked_value || '$0',
  };

//   // Reusable Stat Card Component
// const StatCard = ({ label, value }) => (
//   <div className="flex-1 min-w-[200px] bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
//     <div className="space-y-2">
//       <h1 className="text-gray-800 font-medium">{label}</h1>
//       <h1 className="font-bold text-2xl text-black">{value}</h1>
//     </div>
//     <div className="bg-[#B28D28] p-3 rounded-xl">
//       <FaCalendarCheck className="text-white" size={24} />
//     </div>
//   </div>
// );

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
            <h1 className="text-gray-800 font-medium">Compleat Order</h1>
            <h1 className="font-bold text-2xl text-black">
             1000
            </h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <FaDollarSign className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Pending Order</h1>
            <h1 className="font-bold text-2xl text-black flex items-center gap-3">
              100
             
            </h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <CalendarClock className="text-white" size={24} />
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
                  // onClick={() => openModal(booking?.booking_id)}
                >
                  <td className="p-4 font-medium">{booking?.booking_id}</td>
                  <td 
                   onClick={() => openModal(booking?.booking_id)}
                  className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${baseURL}api${booking?.client_image}`}
                        alt={booking?.client_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking?.client_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking?.client_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td 
                   onClick={() => openModal(booking?.booking_id)}
                  className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${baseURL}api${booking?.therapist_image}`}
                        alt={booking.therapist_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking?.therapist_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking?.therapist_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <h1 className="text-gray-900 font-semibold">
                      {new Date(booking?.booking_date_time).toLocaleString('en-US', {
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
                      className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                        booking?.booking_status === "complete"
                          ? "bg-[#41D377] text-white"
                          : "bg-[#B28D284D]/30 text-[#B28D28]"
                      }`}
                    >
                      {booking?.booking_status}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{booking?.amount}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                      onClick={()=>bookingDelete(booking?.booking_id)}
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
           <div>
             <div className="space-y-4">
              <div className="bg-[#E8DDBF] text-[#B28D28] w-1/6 py-[6px] rounded-r-full ps-3">
                {bookingDetails?.booking_status}
              </div>
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
           </div>
          )}
        </div>
      </dialog>

      {/* MassageTypes Component */}
      <MassageTypes />

      {/* ADD ONS */}
      <AddOns/>

      {/* Safety Alerts */}
       {/* Customer Insights */}
      <div className="bg-white rounded-[15px] shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF5E6] rounded-[15px] p-4">
            <div className="border-2 border-[#ce7739] rounded-[15px] p-5">
              <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">New Customers</p>
              <p className="text-2xl font-bold text-gray-800">{customerInsights.newCustomers}</p>
              <p className="text-sm text-gray-500 font-semibold">Last 30 days</p>
            </div>
          </div>

          <div className="bg-[#f0dcba] rounded-[15px] p-4">
            <div className="border-2 border-[#8F5E0A] rounded-[15px] p-5">
              <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">Repeat Bookings</p>
              <p className="text-2xl font-bold text-gray-800">{customerInsights.repeatBookings}</p>
              <p className="text-sm text-gray-500 font-semibold">Retention rate</p>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-[15px] p-4">
            <div className="border-2 border-[#8F5E0A] rounded-[15px] p-5">
              <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">Booked Value</p>
              <p className="text-2xl font-bold text-gray-800">{customerInsights.avgBookedValue}</p>
              <p className="text-sm text-gray-500 font-semibold">Per Session</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default BookingAdminHome;

