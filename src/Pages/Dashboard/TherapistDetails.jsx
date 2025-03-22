
import React from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaPhone, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { TiInfo } from 'react-icons/ti';
import { TbMassage } from 'react-icons/tb';

const TherapistDetails = () => {
  const { id } = useParams();
  const userImage = 'https://i.ibb.co.com/8Ld9cfwp/Frame-1686551036-1.png';

  // Therapist data
  const therapist = {
    id: id,
    name: 'Mical Mindez',
    email: 'mike@email.com',
    phone: '+1 555 123 4567',
    specialization: 'Thai Massage Therapist',
    joined: 'Joined July 2023',
    rating: 4.2,
    totalBookings: 102,
    totalEarnings: 4280,
    pendingPayout: 850,
    licenses: [
      { name: 'License 1', expiry: 'March 15, 2025', status: 'Verified' },
      { name: 'License 2', expiry: '20 March, 2025', status: 'Verified' },
    ],
    performanceMetrics: {
      noShowRate: 2,
      cancellationRate: 2,
      onTimeRate: 96,
    },
    workSchedule: [
      { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Friday', hours: 'OFF' },
      { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Sunday', hours: '9:00 AM - 5:00 PM' },
    ],
    reviews: [
      { 
        name: 'Sarah M.',
        rating: 5,
        comment: 'Excellent session! Very professional and helpful.',
        time: '2h ago',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
      },
      {
        name: 'John D.',
        rating: 5,
        comment: 'Great therapist, would definitely recommend!',
        time: '1d ago',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop'
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          {/* <div className="bg-[#B28D28] rounded-[20px] p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
                alt={therapist.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-white text-xl font-semibold">{therapist.name}</h1>
                <p className="text-white/80 text-sm">{therapist.joined}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-4 h-4 ${i < Math.floor(therapist.rating) ? 'text-white' : 'text-white/30'}`} />
                  ))}
                  <span className="text-white ml-2">{therapist.rating} Rating</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-white font-medium">{therapist.specialization}</p>
              <div className="flex items-center gap-2 text-white">
                <FaPhone className="w-4 h-4" />
                <span>{therapist.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <FaEnvelope className="w-4 h-4" />
                <span>{therapist.email}</span>
              </div>
            </div>
          </div> */}

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
                            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" 
                            alt={`${therapist.name}'s profile`} 
                            className="h-[150px] w-[150px] rounded-full object-cover border-2 shadow-md shadow-gray-800"
                          />
                          <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">{therapist.name}</h2>
                            <p> {therapist.joined}</p>
                            <p className='flex items-center gap-1 text-[#FFBE0C]'><FaStar/><FaStar/><FaStar/><FaStar/><span className='ms-2 text-gray-300 font-semibold'>{therapist.rating}</span><span className='text-gray-300 font-medium'>Rating</span></p>
                           
                          </div>
                        </div>
                        <div className="space-y-3 py-10 ms-1">
                          
                          <p className="flex items-center gap-3">
                          <TbMassage size={28} className="scale-x-[-1] scale-y-[1.2]" /> 
                          <p className='text-sm sm:text-base font-medium'>{therapist.specialization}</p>
                          </p>

                          <p className="flex items-center gap-3">
                            <FaPhoneAlt size={18} className="text-white" />
                            <span className="text-sm sm:text-base font-medium ms-3">{therapist.phone}</span>
                          </p>
                          <p className="flex items-center gap-3">
                            <FaEnvelope size={18} className="text-white" />
                            <span className="text-sm sm:text-base font-medium ms-3">{therapist.email}</span>
                          </p>
                        
                        </div>
                      </div>
                    </div>
          
                 
          
                  </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-[20px] p-6">
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
                  strokeDasharray={`${2 * Math.PI * 40 * 0.02} ${2 * Math.PI * 40 * 0.98}`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#B28D28"
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.96} ${2 * Math.PI * 40 * 0.04}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#B28D28]"></div>
                <span className="text-sm text-gray-600">No-Show Rate: {therapist.performanceMetrics.noShowRate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFEAAF]"></div>
                <span className="text-sm text-gray-600">Cancellation Rate: {therapist.performanceMetrics.cancellationRate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFF5D6]"></div>
                <span className="text-sm text-gray-600">On-Time Rate: {therapist.performanceMetrics.onTimeRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-[20px] p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Bookings</p>
                <p className="text-2xl font-semibold">{therapist.totalBookings}</p>
              </div>
              <div className="w-10 h-10 bg-[#B28D28] rounded-full flex items-center justify-center">
                <FaPhone className="text-white" />
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Earnings</p>
                <p className="text-2xl font-semibold">${therapist.totalEarnings}</p>
              </div>
              <div className="w-10 h-10 bg-[#B28D28] rounded-full flex items-center justify-center">
                <FaStar className="text-white" />
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pending Payout</p>
                <p className="text-2xl font-semibold">${therapist.pendingPayout}</p>
              </div>
              <div className="w-10 h-10 bg-[#B28D28] rounded-full flex items-center justify-center">
                <FaEnvelope className="text-white" />
              </div>
            </div>
          </div>

          {/* Licenses & Documents */}
          <div className="bg-white rounded-[20px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Licenses & Documents</h2>
              <button className="bg-[#B28D28] text-white px-4 py-2 rounded-full text-sm">
                + New Document
              </button>
            </div>
            <div className="space-y-4">
              {therapist.licenses.map((license, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{license.name}</p>
                    <p className="text-sm text-gray-500">Expires: {license.expiry}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    {license.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="text-[#B28D28] mt-4 text-sm">View All</button>
          </div>

          {/* Work Schedule */}
          <div className="bg-white rounded-[20px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Work Schedule</h2>
              <button className="bg-[#B28D28] text-white px-4 py-2 rounded-full text-sm">
                Edit Schedule
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {therapist.workSchedule.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{schedule.day}</span>
                  <span className={schedule.hours === 'OFF' ? 'text-red-500' : ''}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-[20px] p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Reviews</h2>
            <div className="space-y-6">
              {therapist.reviews.map((review, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
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
                      <span className="text-sm text-gray-500">{review.time}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-[#B28D28] mt-6 text-sm">Load previous</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDetails;

// import React from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { FaStar, FaPhone, FaEnvelope, FaUsers, FaDollarSign, FaFileAlt, FaPlus, FaEdit } from 'react-icons/fa';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const TherapistDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Therapist data
//   const therapist = {
//     id: id,
//     name: 'Mical Mindez',
//     email: 'mike@email.com',
//     phone: '+1 555 123 4567',
//     specialization: 'Thai Massage Therapist',
//     joined: 'Jan 2025',
//     rating: 4.2,
//     totalBookings: 102,
//     totalEarnings: 4280,
//     pendingPayout: 850,
//     licenses: [
//       { name: 'License 1', expiry: '15 March 2025', status: 'Verified' },
//       { name: 'License 2', expiry: '20 March 2025', status: 'Verified' },
//     ],
//     performanceMetrics: {
//       noShowRate: 2,
//       cancellationRate: 2,
//       onTimeRate: 96,
//     },
//     workSchedule: [
//       { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
//       { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
//       { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
//       { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
//       { day: 'Friday', hours: 'OFF' },
//       { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
//       { day: 'Sunday', hours: '9:00 AM - 5:00 PM' },
//     ],
//     reviews: [
//       { name: 'Sarah M.', rating: 5, comment: 'Excellent session! Very professional and helpful.', time: '2h ago' },
//       { name: 'John D.', rating: 5, comment: 'Great therapist, would definitely recommend!', time: '1d ago' },
//     ],
//   };

//   // Data for the donut chart
//   const chartData = {
//     labels: ['No-Show Rate', 'Cancellation Rate', 'On-Time Rate'],
//     datasets: [
//       {
//         data: [
//           therapist.performanceMetrics.noShowRate,
//           therapist.performanceMetrics.cancellationRate,
//           therapist.performanceMetrics.onTimeRate,
//         ],
//         backgroundColor: ['#B28D28', '#FFEAAF', '#FFF5D6'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const chartOptions = {
//     cutout: '70%',
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div className="p-5">
//       <Link
//         onClick={() => navigate(-1)}
//         className="mb-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-full"
//       >
//         Back
//       </Link>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Therapist Profile */}
//         <div className="bg-[#B28D28] rounded-[15px] shadow-md p-6 text-white">
//           <div className="flex items-center mb-4">
//             <img
//               src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
//               alt={therapist.name}
//               className="w-16 h-16 rounded-full object-cover mr-4"
//             />
//             <div>
//               <h1 className="text-xl font-bold">{therapist.name}</h1>
//               <p className="text-sm">Joined {therapist.joined}</p>
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar key={i} className={i < Math.floor(therapist.rating) ? 'text-white' : 'text-gray-300'} size={16} />
//                 ))}
//                 <span className="ml-1">{therapist.rating}</span>
//               </div>
//             </div>
//           </div>
//           <p className="mb-2">{therapist.specialization}</p>
//           <p className="flex items-center gap-2 mb-2">
//             <FaPhone size={16} /> {therapist.phone}
//           </p>
//           <p className="flex items-center gap-2">
//             <FaEnvelope size={16} /> {therapist.email}
//           </p>
//         </div>

//         {/* Stats and Licenses */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Stats */}
//           <div className="bg-white rounded-[15px] shadow-md p-6">
//             <div className="grid grid-cols-3 gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#B28D28] p-2 rounded-full">
//                   <FaUsers className="text-white" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Bookings</p>
//                   <p className="font-medium text-gray-900">{therapist.totalBookings}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#B28D28] p-2 rounded-full">
//                   <FaDollarSign className="text-white" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Earnings</p>
//                   <p className="font-medium text-gray-900">${therapist.totalEarnings.toLocaleString()}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#B28D28] p-2 rounded-full">
//                   <FaDollarSign className="text-white" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Pending Payout</p>
//                   <p className="font-medium text-gray-900">${therapist.pendingPayout}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Licenses & Documents */}
//           <div className="bg-white rounded-[15px] shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Licenses & Documents</h2>
//               <button className="bg-[#B28D28] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#9a7b23] transition-colors">
//                 <FaPlus size={14} /> New Document
//               </button>
//             </div>
//             <div className="space-y-4">
//               {therapist.licenses.map((license, index) => (
//                 <div key={index} className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium text-gray-900">{license.name}</p>
//                     <p className="text-sm text-gray-500">Expires: {license.expiry}</p>
//                   </div>
//                   <button className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//                     {license.status}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Performance Metrics */}
//         <div className="bg-white rounded-[15px] shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h2>
//           <div className="flex items-center gap-4">
//             <div className="w-32 h-32">
//               <Doughnut data={chartData} options={chartOptions} />
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 <span className="w-4 h-4 bg-[#B28D28] rounded-full"></span>
//                 <p className="text-sm text-gray-600">No-Show Rate: {therapist.performanceMetrics.noShowRate}%</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="w-4 h-4 bg-[#FFEAAF] rounded-full"></span>
//                 <p className="text-sm text-gray-600">Cancellation Rate: {therapist.performanceMetrics.cancellationRate}%</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="w-4 h-4 bg-[#FFF5D6] rounded-full"></span>
//                 <p className="text-sm text-gray-600">On-Time Rate: {therapist.performanceMetrics.onTimeRate}%</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Work Schedule */}
//         <div className="bg-white rounded-[15px] shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-gray-800">Work Schedule</h2>
//             <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors flex items-center gap-2">
//               <FaEdit size={16} /> Edit Schedule
//             </button>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             {therapist.workSchedule.map((schedule, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <p className="text-gray-600">{schedule.day}</p>
//                 <p className={schedule.hours === 'OFF' ? 'text-red-500' : 'text-gray-900'}>{schedule.hours}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Reviews */}
//         <div className="bg-white rounded-[15px] shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Reviews</h2>
//           <div className="space-y-4">
//             {therapist.reviews.map((review, index) => (
//               <div key={index} className="flex items-start gap-3">
//                 <img
//                   src={`https://images.unsplash.com/photo-${index === 0 ? '1494790108377-be9c29b29330' : '1599566150163-29194dcaad36'}?w=150&h=150&fit=crop`}
//                   alt={review.name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <p className="font-medium text-gray-900">{review.name}</p>
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar key={i} className={i < review.rating ? 'text-[#B28D28]' : 'text-gray-300'} size={14} />
//                       ))}
//                     </div>
//                     <p className="text-sm text-gray-500">{review.time}</p>
//                   </div>
//                   <p className="text-sm text-gray-600">{review.comment}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4">Load previous</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TherapistDetails;