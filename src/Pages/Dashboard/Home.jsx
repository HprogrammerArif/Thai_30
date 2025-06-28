
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { FaCheck, FaTimes, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LiaUserClockSolid } from 'react-icons/lia';
import {
  useAdminInfoQuery,
  useGetEarningSummaryQuery,
  usePendingTherapistQuery,
  useRecentBookingsQuery,
  useApproveTherapistMutation,
  useRejectTherapistMutation,
} from '../redux/features/baseAPI/baseApi';
import ApproveTherapist from './ApproveTherapist';
import PayoutLayout from './PayoutLayout';
import MassageTypes from '../../Layout/components/MassageTypes';

const AdminHome = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 4;
  const [timePeriod, setTimePeriod] = useState('last_week');

  const paseURL = "http://192.168.10.16:3333/";

  const { data: adminData, isLoading: adminLoading, error: adminError } = useAdminInfoQuery();
  const { data: recentBookings, isLoading: bookingsLoading, error: bookingsError } = useRecentBookingsQuery();
  const { data: earningsDataRaw, isLoading: earningsLoading, error: earningsError } = useGetEarningSummaryQuery(timePeriod);
  const { data: pendingTherapist, isLoading: isPendingLoading, error: pendingError } = usePendingTherapistQuery();
  console.log({pendingTherapist})
  const [approveTherapist, { isLoading: isApproving }] = useApproveTherapistMutation();
  const [rejectTherapist, { isLoading: isRejecting }] = useRejectTherapistMutation();

  // Transform earnings data for BarChart
  const earningsData = earningsDataRaw?.earnings_by_day
    ? Object.entries(earningsDataRaw.earnings_by_day).map(([day, amount]) => ({
        day,
        amount,
      }))
    : [];

  // Transform pendingTherapist data to match UI structure
  const transformedPendingApprovals = pendingTherapist?.map((therapist) => ({
    id: therapist.user_id,
    propertyName: therapist.full_name,
    specialization: "Massage Therapist", 
    experience: "Unknown", 
    documents: therapist.documents[0]?.is_approved ? "Verified" : "View",
    phone: therapist.phone_number || "N/A",
    email: therapist.email || "N/A",
    location: "Unknown", 
    documentList: [
      therapist.documents[0]?.id_document && {
        name: "ID Document",
        type: "PDF",
        size: "Unknown",
        url: `${paseURL}api${therapist.documents[0].id_document}`,
      },
      therapist.documents[0]?.ssn_or_ittn && {
        name: "SSN/ITTN",
        type: "PDF",
        size: "Unknown",
        url: `${paseURL}api${therapist.documents[0].ssn_or_ittn}`,
      },
      therapist.documents[0]?.drivers_license && {
        name: "Driver's License",
        type: "PDF",
        size: "Unknown",
        url: `${paseURL}api${therapist.documents[0].drivers_license}`,
      },
      therapist.documents[0]?.liability_insurance && {
        name: "Liability Insurance",
        type: "PDF",
        size: "Unknown",
        url: `${paseURL}api${therapist.documents[0].liability_insurance}`,
      },
      therapist.documents[0]?.certifications && {
        name: "Certifications",
        type: "PDF",
        size: "Unknown",
        url: `${paseURL}api${therapist.documents[0].certifications}`,
      },
    ].filter(Boolean),
  })) || [];

  console.log('transformedPendingApprovals',transformedPendingApprovals)
  console.log("pendingTherapist length:", pendingTherapist?.length);


  // Pagination calculations
  const totalBookings = recentBookings?.length || 0;
  const totalPages = Math.ceil(totalBookings / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const endIndex = startIndex + bookingsPerPage;
  const displayedBookings = recentBookings?.slice(startIndex, endIndex) || [];

  // Find selected booking and therapist
  const selectedBooking = recentBookings?.find((booking) => booking.booking_id === selectedBookingId);
  const selectedTherapist = transformedPendingApprovals?.find((therapist) => therapist.id === selectedTherapistId);

  const handleBookingClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedBookingId(null);
  };

  const handleTherapistClick = (therapistId) => {
    setSelectedTherapistId(therapistId);
    setIsTherapistModalOpen(true);
  };

  const closeTherapistModal = () => {
    setIsTherapistModalOpen(false);
    setSelectedTherapistId(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  const handleReject = async (profileId) => {
    try {
      await rejectTherapist(profileId).unwrap();
      closeTherapistModal();
    } catch (error) {
      console.error('Error rejecting therapist:', error);
    }
  };

  // Booking Modal Component
  const BookingModal = ({ isOpen, onClose, booking }) => {
    if (!isOpen || !booking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl h-[50vh] backdrop-blur-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-10">Booking Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Therapist Name</p>
                <p className="font-medium text-gray-800">{booking.therapist_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Booking Date/Time</p>
                <p className="font-medium text-gray-800">
                  {new Date(booking.booking_date_time).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium text-gray-800">{booking.client_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium text-gray-800">{booking.service_name}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-800">{booking.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-gray-800">{booking.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium text-gray-800">${parseFloat(booking.amount).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Booking Status</p>
                <p className="font-medium text-gray-800">{booking.booking_status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Therapist Modal Component
  const TherapistModal = ({ isOpen, onClose, therapist }) => {
    if (!isOpen || !therapist) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Therapist Request</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-800">{therapist?.propertyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{therapist?.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{therapist?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            </div>
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-2">Documents</p>
              <div className=" grid grid-cols-3 gap-3 ">
                {therapist?.documentList?.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border border-[#B28D2833]/20 bg-[#FAE08C1A]/10 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-500">{doc?.type}</span>
                    <div className="flex-1">
                      <a
                        href={doc?.url} // Use the full URL from documentList
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-800 hover:underline"
                      >
                        {doc?.name}
                      </a>
                      <p className="text-xs text-gray-500">{doc?.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-10">
          
            <ApproveTherapist 
            therapistId={therapist.id}
            isApproving={isApproving}
            />
            <button
              className="px-4 py-2 bg-[#F1312B] text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-1"
              onClick={() => handleReject(therapist.id)}
              disabled={isRejecting}
            >
              {isRejecting ? 'Rejecting...' : <><FaTimes size={12} /> Reject</>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle loading and error states
  if (adminLoading || bookingsLoading || earningsLoading || isPendingLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (adminError || bookingsError || earningsError || pendingError) {
    return (
      <div className="text-red-500">
        Error loading data: {adminError?.message || bookingsError?.message || earningsError?.message || pendingError?.message}
      </div>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="col-span-2 relative p-8 rounded-2xl text-white h-full flex flex-col justify-center shadow-lg"
          style={{
            backgroundImage: "url('https://i.ibb.co.com/xKGHpsCc/Frame-1171276345-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-5xl font-bold mt-2">{adminData?.total_bookings || 0}</p>
            <h2 className="text-lg font-semibold mt-8">Total Revenue</h2>
            <p className="text-5xl font-bold mt-2">$ {adminData?.total_revenue || 0}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-8 w-8 text-black" />
              <h3 className="text-xl font-bold text-gray-800">Active Therapists</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900">{adminData?.active_therapists || 0}</p>
            <div className="relative w-full bg-gray-200 h-3 rounded-full mt-4">
              <div className="absolute left-0 h-3 bg-blue-500 rounded-full" style={{ width: "68%" }}></div>
            </div>
            <p className="text-right text-sm mt-2 text-gray-600">68% of capacity</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">
                <LiaUserClockSolid className="h-8 w-8 text-black" />
              </span>
              <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900">{transformedPendingApprovals.length || 0}</p>
            <div className="relative w-full bg-gray-200 h-3 rounded-full mt-4">
              <div className="absolute left-0 h-3 bg-yellow-500 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <p className="text-right text-sm mt-2 text-gray-600">75% processed</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
          </div>
          <div className="space-y-4">
            {displayedBookings?.length > 0 ? (
              displayedBookings.map((booking) => (
                <div
                  key={booking.booking_id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => handleBookingClick(booking.booking_id)}
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full">
                    {booking.therapist_image && (
                      <img
                        src={`${paseURL}api${booking.therapist_image}`}
                        alt={booking.therapist_name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{booking.therapist_name}</p>
                    <p className="text-xs text-gray-500">{booking.duration} - {booking.service_name}</p>
                  </div>
                  <span
                    className={`px-3 py-2 text-xs rounded-full ${
                      booking.status === 'Completed'
                        ? 'bg-[#CBF299] text-[#33993A] font-semibold'
                        : 'bg-[#B28D28]/20 text-[#B28D28] font-semibold'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No bookings available</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
              >
                <FaAngleLeft />
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentPage === page
                        ? 'bg-[#B28D28] text-white'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Earnings Summary</h3>
            <div className="flex items-center gap-2">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="text-sm text-gray-500 border border-gray-300 rounded-lg p-1"
              >
                <option value="this_week">This Week</option>
                <option value="last_week">Last Week</option>
                <option value="two_week_ago">Previous Week</option>
              </select>
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          <div className="h-64">
            {earningsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={earningsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '4px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => `$${value}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    fill="rgba(255, 206, 86, 0.6)"
                    stroke="rgba(255, 206, 86, 1)"
                    strokeWidth={1}
                    radius={[5, 5, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center">No earnings data available</p>
            )}
          </div>
          <div className="text-center mt-6">
            <span className="text-3xl font-bold text-gray-800">
              ${earningsData?.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2 mt-5">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Pending Therapist Approvals</h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700 mb-4">
            <div className="text-base">Therapist Name</div>
            <div className="text-base">Documents</div>
          </div>
          {transformedPendingApprovals.length > 0 ? (
            transformedPendingApprovals.map((approval) => (
              <div
                key={approval.id}
                className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleTherapistClick(approval.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={approval?.therapist} />
                  </div>
                </div>  
                  <span className="text-base font-bold text-gray-700">{approval.propertyName}</span>
                </div>
                <div
                  className={`text-base font-bold ${
                    approval.documents === 'Verified' ? 'text-green-600' : 'text-[#B28D28] cursor-pointer'
                  }`}
                >
                  {approval.documents}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No pending approvals</p>
          )}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        booking={selectedBooking}
      />
      <TherapistModal
        isOpen={isTherapistModalOpen}
        onClose={closeTherapistModal}
        therapist={selectedTherapist}
      />
      <div className='bg-white rounded-2xl shadow-lg p-6 col-span-2 mt-10'>
        <PayoutLayout/>
      </div>

      <MassageTypes/>
    </section>
  );
};

export default AdminHome;