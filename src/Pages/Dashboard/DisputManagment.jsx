// import React, { useState } from 'react';
// import { FaEnvelope, FaPlus } from 'react-icons/fa';
// import { IoSettings } from 'react-icons/io5';

// const DisputeManagement = () => {
//   // State for selected dispute to view details in modal
//   const [selectedDispute, setSelectedDispute] = useState(null);

//   // Data for Open Disputes
//   const disputes = [
//     {
//       title: 'Therapist No-Show Dispute',
//       clientId: 'ID #12345',
//       date: 'Jan 15, 2025',
//       status: 'Resolved',
//     },
//     {
//       title: 'Service Quality Dispute',
//       clientId: 'ID #12345',
//       date: 'Jan 15, 2025',
//       status: 'Pending',
//     },
//   ];

//   // Data for New Support Tickets
//   const supportTickets = [
//     { title: 'Payment Issue', time: '2 hours ago', person: "Client" },
//     { title: 'Appointment Issue', time: '4 hours ago', person: "Customer" },
//   ];

//   // Function to open the dispute details modal
//   const openDisputeModal = (dispute) => {
//     setSelectedDispute(dispute);
//     document.getElementById('dispute_details_modal').showModal();
//   };

//   return (
//     <section className="p-5">
//       {/* Open Disputes */}
//       <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Open Disputes</h2>
//           <div className="flex gap-2">
//             <button className="px-5 py-2 bg-gray-200 text-gray-600 rounded-full  hover:bg-gray-300 transition-colors">
//               All
//             </button>
//             <button className="px-3 py-2 bg-gray-200 text-gray-600 rounded-full  hover:bg-gray-300 transition-colors">
//               Pending
//             </button>
//             <button className="px-3 py-2 bg-gray-200 text-gray-600 rounded-full  hover:bg-gray-300 transition-colors">
//               Resolved
//             </button>
//             <button className="px-3 py-2 bg-[#B28D28] text-white rounded-full  hover:bg-[#9a7b23] transition-colors">
//             <IoSettings/>
//               Dispute Settings
//             </button>
//           </div>
//         </div>
//         <div className="space-y-4">
//           {disputes.map((dispute, index) => (
//             <div key={index} className="border-b pb-4 last:border-b-0">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium text-gray-900">{dispute.title}</p>
//                   <p className="text-sm text-gray-500">
//                     Client {dispute.clientId} • Appointment Date: {dispute.date}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   {dispute.status === 'Resolved' ? (
//                     <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors">
//                       Auto Refund
//                     </button>
//                   ) : (
//                     <button className="px-4 py-2 bg-[#B28D28] text-white rounded-full text-sm hover:bg-[#9a7b23] transition-colors">
//                       Suggest Compensation
//                     </button>
//                   )}
//                   <button
//                     onClick={() => openDisputeModal(dispute)}
//                     className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 text-sm hover:bg-gray-100 transition-colors"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 Status: <span className={dispute.status === 'Resolved' ? 'text-green-500' : 'text-yellow-500'}>{dispute.status}</span>
//               </p>
//             </div>
//           ))}
//         </div>
//         <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4">Load more</button>
//       </div>

//       {/* New Support Ticket */}
//       <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">New Support Ticket</h2>
//         <div className="space-y-4">
//           {supportTickets.map((ticket, index) => (
//             <div key={index} className="border-b pb-4 last:border-b-0 flex justify-between items-center hover:bg-gray-100 cursor-pointer p-4">
//               <div className='space-y-2'>
//                 <button className='bg-[#FFEAAF]/60 px-5 py-1 rounded-full border border-[#B28D28]/30'>{ticket.person}</button>
//                 <div>
//                 <p className="font-medium text-gray-900">{ticket.title}</p>
//                 <p className="text-sm text-gray-500">Opened {ticket.time}</p>
//                 </div>
//               </div>
//               <button className="px-4 py-2 bg-[#B28D28] text-white rounded-full text-sm hover:bg-[#9a7b23] transition-colors">
//                 Review
//               </button>
//             </div>
//           ))}
//         </div>
//         <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4">Load previous</button>
//       </div>

//       {/* Messages Button */}
//       <div className="fixed bottom-5 right-5">
//         <button className="bg-[#B28D28] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#9a7b23] transition-colors">
//           <FaEnvelope size={16} />
//           Messages
//           <span className="bg-white text-[#B28D28] rounded-full px-2 py-1 text-xs">10</span>
//         </button>
//       </div>

//       {/* DaisyUI Modal for Dispute Details */}
//       <dialog id="dispute_details_modal" className="modal">
//         <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-xl">Dispute Details</h3>
//             <form method="dialog">
//               <button className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
//             </form>
//           </div>
//           {selectedDispute && (
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-600">Title</p>
//                 <p className="font-medium text-gray-900">{selectedDispute.title}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Client ID</p>
//                 <p className="font-medium text-gray-900">{selectedDispute.clientId}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Appointment Date</p>
//                 <p className="font-medium text-gray-900">{selectedDispute.date}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Status</p>
//                 <p className={selectedDispute.status === 'Resolved' ? 'text-green-500 font-medium' : 'text-yellow-500 font-medium'}>
//                   {selectedDispute.status}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </dialog>
//     </section>
//   );
// };

// export default DisputeManagement;
import React, { useState } from 'react';
import { FaEnvelope, FaPlus } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

const DisputeManagement = () => {
  // State for selected dispute and modals
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [compensationAmount, setCompensationAmount] = useState('');

  // Data for Open Disputes
  const disputes = [
    {
      title: 'Therapist No-Show Dispute',
      clientId: 'ID #12345',
      date: 'Jan 15, 2025',
      status: 'Resolved',
      therapistName: 'Esthera Jackson',
      customer: 'Mical Marinez',
      paymentMethod: 'Debit Card',
      location: '4761 Hamil AVE, San Diego',
      total: 240.00,
      complaint: 'Therapist was late first of all. He was so un-professional, I need a compensation for my bad experience.'
    },
    {
      title: 'Service Quality Dispute',
      clientId: 'ID #12345',
      date: '14 March 2025',
      status: 'Pending',
      therapistName: 'Esthera Jackson',
      customer: 'Mical Marinez',
      paymentMethod: 'Debit Card',
      service: 'Thai Massage',
      total: 240.00,
    },
  ];

  // Data for New Support Tickets
  const supportTickets = [
    { title: 'Payment Issue', time: '2 hours ago', person: 'Client' },
    { title: 'Appointment Issue', time: '4 hours ago', person: 'Customer' },
  ];

  // Functions to open modals
  const openDisputeModal = (dispute) => {
    setSelectedDispute(dispute);
    document.getElementById('dispute_details_modal').showModal();
  };

  const openCompensationModal = (dispute) => {
    setSelectedDispute(dispute);
    document.getElementById('suggest_compensation_modal').showModal();
  };

  const openSettingsModal = () => {
    document.getElementById('dispute_settings_modal').showModal();
  };

  // Handle compensation form submission
  const handleCompensationSubmit = (e) => {
    e.preventDefault();
    console.log('Compensation Amount:', compensationAmount);
    // Add logic to save compensation amount
    document.getElementById('suggest_compensation_modal').close();
  };

  return (
    <section>
      {/* Open Disputes */}
      <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Open Disputes</h2>
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">
              All
            </button>
            <button className="px-3 py-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">
              Pending
            </button>
            <button className="px-3 py-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">
              Resolved
            </button>
            <button
              onClick={openSettingsModal}
              className="px-3 py-2 bg-[#B28D28] text-white rounded-full hover:bg-[#9a7b23] transition-colors flex items-center gap-2"
            >
              <IoSettings size={20}/>
              Dispute Settings
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {disputes.map((dispute, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{dispute.title}</p>
                  <p className="text-sm text-gray-500">
                    Client {dispute.clientId} • Appointment Date: {dispute.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  {dispute.status === 'Resolved' ? (
                    <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors">
                      Auto Refund
                    </button>
                  ) : (
                    <button
                      onClick={() => openCompensationModal(dispute)}
                      className="px-4 py-2 bg-[#B28D28] text-white rounded-full text-sm hover:bg-[#9a7b23] transition-colors"
                    >
                      Suggest Compensation
                    </button>
                  )}
                  <button
                    onClick={() => openDisputeModal(dispute)}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 text-sm hover:bg-gray-100 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Status: <span className={dispute.status === 'Resolved' ? 'text-green-500' : 'text-yellow-500'}>{dispute.status}</span>
              </p>
            </div>
          ))}
        </div>
        <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4">Load more</button>
      </div>

      {/* New Support Ticket */}
      <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">New Support Ticket</h2>
        <div className="space-y-4">
          {supportTickets.map((ticket, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 flex justify-between items-center hover:bg-gray-100 cursor-pointer p-4">
              <div className="space-y-2">
                <button className="bg-[#FFEAAF]/60 px-5 py-1 rounded-full border border-[#B28D28]/30">{ticket.person}</button>
                <div>
                  <p className="font-medium text-gray-900">{ticket.title}</p>
                  <p className="text-sm text-gray-500">Opened {ticket.time}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#B28D28] text-white rounded-full text-sm hover:bg-[#9a7b23] transition-colors">
                Review
              </button>
            </div>
          ))}
        </div>
        <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4">Load previous</button>
      </div>

      {/* Messages Button */}
      <div className="fixed bottom-5 right-5">
        <button className="bg-[#B28D28] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#9a7b23] transition-colors shadow-md shadow-gray-400">
          <FaEnvelope size={16} />
          Messages
          <span className="bg-white text-[#B28D28] rounded-full px-2 py-1 text-xs">10</span>
        </button>
      </div>

      {/* DaisyUI Modal for Dispute Details */}
      <dialog id="dispute_details_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Dispute Detail</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </form>
          </div>
          {selectedDispute && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Therapist Name</p>
                  <p className="font-medium text-gray-900">{selectedDispute.therapistName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Date/Time</p>
                  <p className="font-medium text-gray-900">{selectedDispute.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-medium text-gray-900">{selectedDispute.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-medium text-gray-900">{selectedDispute.service || 'N/A'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-900">{selectedDispute.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">{selectedDispute.location || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Complaint</p>
                <p className="font-medium text-gray-900">{selectedDispute.complaint || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-medium text-gray-900">${selectedDispute.total.toFixed(2)}</p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <form method="dialog">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                    Cancel
                  </button>
                </form>
                {selectedDispute.status === 'Pending' && (
                  <button
                    onClick={() => openCompensationModal(selectedDispute)}
                    className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors"
                  >
                    Compensate
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </dialog>

      {/* DaisyUI Modal for Suggest Compensation */}
      <dialog id="suggest_compensation_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Suggest Compensation</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </form>
          </div>
          {selectedDispute && (
            <form onSubmit={handleCompensationSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Therapist Name</p>
                  <p className="font-medium text-gray-900">{selectedDispute.therapistName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Date/Time</p>
                  <p className="font-medium text-gray-900">{selectedDispute.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-medium text-gray-900">{selectedDispute.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-medium text-gray-900">{selectedDispute.service}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium text-gray-900">{selectedDispute.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-medium text-gray-900">${selectedDispute.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Compensation Amount</p>
                <input
                  type="number"
                  placeholder="Enter compensation amount"
                  value={compensationAmount}
                  onChange={(e) => setCompensationAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <form method="dialog">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                    Cancel
                  </button>
                </form>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* DaisyUI Modal for Dispute Settings */}
      <dialog id="dispute_settings_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Dispute Setting</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </form>
          </div>
          <form className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Dispute Type</p>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
              >
                <option value="" disabled selected>Select dispute type</option>
                <option value="no-show">Therapist No-Show</option>
                <option value="service-quality">Service Quality</option>
                <option value="payment">Payment Issue</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolution</p>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
              >
                <option value="" disabled selected>Select resolution</option>
                <option value="auto-refunded">Auto Refunded</option>
                <option value="suggest-compensation">Suggest Compensation</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dispute Type</p>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
              >
                <option value="" disabled selected>Select dispute type</option>
                <option value="no-show">Therapist No-Show</option>
                <option value="service-quality">Service Quality</option>
                <option value="payment">Payment Issue</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolution</p>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
              >
                <option value="" disabled selected>Select resolution</option>
                <option value="auto-refunded">Auto Refunded</option>
                <option value="suggest-compensation">Suggest Compensation</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <form method="dialog">
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
              </form>
              <button
                type="submit"
                className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default DisputeManagement;