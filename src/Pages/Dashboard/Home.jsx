



import React, { useState } from 'react';
import { User } from 'lucide-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LiaUserClockSolid } from 'react-icons/lia';

const recentBookings = [
  {
    therapist: "Esthera Jackson",
    duration: "60 min",
    status: "Completed",
    type: "Swedish Massage",
    customer: "Mical Marinez",
    bookingDate: "14 March, 2025",
    service: "Thai Massage",
    location: "4761 Hamil Ave, San Diego",
    paymentMethod: "Debit Card",
    massageCharges: 240.00,
    bookingFee: 50.00,
    tip: 50.00,
    commission: 29.50,
    total: 1010.00,
  },
  {
    therapist: "Tony Adams",
    duration: "45 min",
    status: "Scheduled",
    type: "Swedish Massage",
    customer: "John Doe",
    bookingDate: "15 March, 2025",
    service: "Swedish Massage",
    location: "1234 Pine St, Los Angeles",
    paymentMethod: "Credit Card",
    massageCharges: 200.00,
    bookingFee: 40.00,
    tip: 30.00,
    commission: 25.00,
    total: 900.00,
  },
  {
    therapist: "Forran Torres",
    duration: "45 min",
    status: "Scheduled",
    type: "Deep Tissue Massage",
    customer: "Jane Smith",
    bookingDate: "16 March, 2025",
    service: "Deep Tissue Massage",
    location: "7890 Oak Rd, San Francisco",
    paymentMethod: "PayPal",
    massageCharges: 220.00,
    bookingFee: 45.00,
    tip: 40.00,
    commission: 27.50,
    total: 950.00,
  },
  {
    therapist: "Rodrygo Del",
    duration: "30 min",
    status: "Scheduled",
    type: "Massage Therapy",
    customer: "Emily Brown",
    bookingDate: "17 March, 2025",
    service: "Massage Therapy",
    location: "321 Elm St, Seattle",
    paymentMethod: "Cash",
    massageCharges: 180.00,
    bookingFee: 30.00,
    tip: 20.00,
    commission: 22.50,
    total: 800.00,
  },
];

const earningsData = [
  { day: "Mon", amount: 100 },
  { day: "Tue", amount: 200 },
  { day: "Wed", amount: 150 },
  { day: "Thu", amount: 300 },
  { day: "Fri", amount: 560 },
  { day: "Sat", amount: 250 },
  { day: "Sun", amount: 180 },
];

const pendingApprovals = [
  {
    propertyName: "Esthera Jackson",
    specialization: "Massage Therapist",
    experience: "4 Years",
    documents: "Verified",
    phone: "+11234567889",
    email: "esthera@email.com",
    location: "San Diego",
    documentList: [
      { name: "certificate.jpg", type: "JPG", size: "18 kb" },
      { name: "ID_document.pdf", type: "PDF", size: "18 kb" },
      { name: "license.png", type: "PNG", size: "18 kb" },
    ],
  },
  {
    propertyName: "Esthera Jackson",
    specialization: "Massage Therapist",
    experience: "4 Years",
    documents: "Verified",
    phone: "+11234567889",
    email: "esthera@email.com",
    location: "San Diego",
    documentList: [
      { name: "certificate.jpg", type: "JPG", size: "18 kb" },
      { name: "ID_document.pdf", type: "PDF", size: "18 kb" },
      { name: "license.png", type: "PNG", size: "18 kb" },
    ],
  },
  {
    propertyName: "Esthera Jackson",
    specialization: "Massage Therapist",
    experience: "4 Years",
    documents: "View",
    phone: "+11234567889",
    email: "esthera@email.com",
    location: "San Diego",
    documentList: [
      { name: "certificate.jpg", type: "JPG", size: "18 kb" },
      { name: "ID_document.pdf", type: "PDF", size: "18 kb" },
      { name: "license.png", type: "PNG", size: "18 kb" },
    ],
  },
  {
    propertyName: "Esthera Jackson",
    specialization: "Massage Therapist",
    experience: "4 Years",
    documents: "View",
    phone: "+11234567889",
    email: "esthera@email.com",
    location: "San Diego",
    documentList: [
      { name: "certificate.jpg", type: "JPG", size: "18 kb" },
      { name: "ID_document.pdf", type: "PDF", size: "18 kb" },
      { name: "license.png", type: "PNG", size: "18 kb" },
    ],
  },
];


const BookingModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen) return null;

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
              <p className="font-medium text-gray-800">{booking.therapist}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Booking Date/Time</p>
              <p className="font-medium text-gray-800">{booking.bookingDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium text-gray-800">{booking.customer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium text-gray-800">{booking.service}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium text-gray-800">{booking.paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-800">{booking.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Massage Charges</p>
              <p className="font-medium text-gray-800">${booking.massageCharges.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Booking Fee</p>
              <p className="font-medium text-gray-800">${booking.bookingFee.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tip</p>
              <p className="font-medium text-gray-800">${booking.tip.toFixed(2)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Commission (10% will be deducted)</p>
              <p className="font-medium text-gray-800">${booking.commission.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-medium text-gray-800">${booking.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

// New Modal for Pending Therapist Approvals
const TherapistModal = ({ isOpen, onClose, therapist }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
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
          {/* Name and Specialty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-800">{therapist.propertyName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Specialty</p>
              <p className="font-medium text-gray-800">{therapist.specialization}</p>
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{therapist.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{therapist.email}</p>
            </div>
          </div>

          {/* Experience and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium text-gray-800">{therapist.experience}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-800">{therapist.location}</p>
            </div>
          </div>

          {/* Documents */}
          <div className='pt-8'>
            <p className="text-sm text-gray-500 mb-2">Documents</p>
            <div className="space-y-3">
              {therapist.documentList.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center w-3/6 gap-3 p-3 border border-[#B28D2833]/20 bg-[#FAE08C1A]/10 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-500">{doc.type}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Approve/Reject Buttons */}
        <div className="flex items-center justify-end  gap-3 mt-10">
          <button
            className="px-4 py-2 bg-[#4AB228] text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
          >
            <FaCheck size={12} /> Approve
          </button>
          <button
            className=" px-4 py-2 bg-[#F1312B] text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-1"
          >
            <FaTimes size={12} /> Reject
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminHome = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedBooking(null);
  };

  const handleTherapistClick = (therapist) => {
    setSelectedTherapist(therapist);
    setIsTherapistModalOpen(true);
  };

  const closeTherapistModal = () => {
    setIsTherapistModalOpen(false);
    setSelectedTherapist(null);
  };

  return (
    <section className="bg-gray-50 min-h-screen">
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
            <p className="text-5xl font-bold mt-2">109</p>
            <h2 className="text-lg font-semibold mt-8">Total Revenue</h2>
            <p className="text-5xl font-bold mt-2">$24,500</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="flex flex-col gap-6">
          {/* Active Therapists Card */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-8 w-8 text-black" />
              <h3 className="text-xl font-bold text-gray-800">Active Therapists</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900">56</p>
            <div className="relative w-full bg-gray-200 h-3 rounded-full mt-4">
              <div className="absolute left-0 h-3 bg-blue-500 rounded-full" style={{ width: "68%" }}></div>
            </div>
            <p className="text-right text-sm mt-2 text-gray-600">68% of capacity</p>
          </div>

          {/* Pending Approvals Card */}
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">
                <LiaUserClockSolid className="h-8 w-8 text-black"/>
              </span>
              <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900">13</p>
            <div className="relative w-full bg-gray-200 h-3 rounded-full mt-4">
              <div className="absolute left-0 h-3 bg-yellow-500 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <p className="text-right text-sm mt-2 text-gray-600">75% processed</p>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
            <button className="px-4 py-1 font-medium text-[14px] rounded-lg text-sm border-2 border-[#B28D28] transition-colors text-[#B28D28]">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => handleBookingClick(booking)}
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{booking.therapist}</p>
                  <p className="text-xs text-gray-500">{booking.duration} - {booking.type}</p>
                </div>
                <span
                  className={`px-3 py-2 text-xs rounded-full ${
                    booking.status === "Completed"
                      ? "bg-[#CBF299] text-[#33993A] font-semibold"
                      : "bg-[#B28D28]/20 text-[#B28D28] font-semibold"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Earnings Summary</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">This Week</span>
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          <div className="h-64">
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
                  onMouseOver={(data) => console.log(data)}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-6">
            <span className="text-3xl font-bold text-gray-800">$560</span>
          </div>
        </div>

        {/* Pending Therapist Approvals */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2 mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Pending Therapist Approvals</h3>
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700 mb-4">
            <div className="text-base">Property Name</div>
            <div className="text-base">Specialization</div>
            <div className="text-base">Experience</div>
            <div className="text-base">Documents</div>
            <div className="text-base">Action</div>
          </div>
          {pendingApprovals.map((approval, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleTherapistClick(approval)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <span className="text-base font-bold text-gray-700">{approval.propertyName}</span>
              </div>
              <div className="text-base font-bold text-gray-600">{approval.specialization}</div>
              <div className="text-base font-bold text-gray-600">{approval.experience}</div>
              <div
                className={`text-base font-bold ${
                  approval.documents === "Verified" ? "text-green-600" : "text-[#B28D28] cursor-pointer"
                }`}
              >
                {approval.documents}
              </div>
              <div className="flex gap-3">
                <button className="px-3 py-1 bg-green-700 text-white rounded-lg hover:bg-green-700 flex items-center gap-1">
                  <FaCheck size={12} /> Approve
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1">
                  <FaTimes size={12} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
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
    </section>
  );
};

export default AdminHome;