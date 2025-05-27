


// import { Search, ChevronLeft, ChevronRight, X } from "lucide-react"
// import { useGetTransactionHistoryDetailsQuery, useGetTransactionHistoryQuery } from "../redux/features/baseAPI/baseApi";
// import { useState } from "react";

// export default function TransactionHistory() {


//     const {data:transactionsResult, isLoading, error} = useGetTransactionHistoryQuery();
//     console.log(transactionsResult, "Transaction History Data");
//       const [selectedTransactionId, setSelectedTransactionId] = useState(null);

//       const {data:transactionDetails} = useGetTransactionHistoryDetailsQuery(selectedTransactionId)
    

//     const baseURL = "http://192.168.10.139:3333/api";
//     const transactions = transactionsResult?.results || [];


//      const openModal = (transactionId) => {
//     setSelectedTransactionId(transactionId);
//     document.getElementById("transactionId").showModal();
//   };

// //   const transactions = [
// //     {
// //       id: 1,
// //       therapist: {
// //         name: "Dr. Sarah Wilson",
// //         email: "sarah.wilson@therapy.com",
// //         avatar: "/placeholder.svg?height=40&width=40",
// //       },
// //       type: "Session Payment",
// //       payment: "$230.00",
// //       commission: "$30.00",
// //       date: "14-MARCH-2025",
// //       status: "Paid",
// //       method: "Paypal",
// //     },
// //     {
// //       id: 2,
// //       therapist: {
// //         name: "Dr. Michael Brown",
// //         email: "michael.brown@therapy.com",
// //         avatar: "/placeholder.svg?height=40&width=40",
// //       },
// //       type: "Bonus Payment",
// //       payment: "$50.00",
// //       commission: "--",
// //       date: "14-MARCH-2025",
// //       status: "Pending",
// //       method: "Bank",
// //     },
// //   ]

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl font-semibold text-gray-900">Transaction History</h1>
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search transactions..."
//             className="input input-bordered pl-10 w-80 bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr className="border-gray-200">
//               <th className="text-left font-medium text-gray-600 bg-transparent">Therapist</th>
//               <th className="text-left font-medium text-gray-600 bg-transparent">Type</th>
//               <th className="text-left font-medium text-gray-600 bg-transparent">Payment</th>
//               <th className="text-left font-medium text-gray-600 bg-transparent">Commission</th>
//               <th className="text-left font-medium text-gray-600 bg-transparent">Date</th>
//               <th className="text-left font-medium text-gray-600 bg-transparent">Status</th>
//               <th className="text-left font-medium text-gray-600 bg-transparent">Method</th>
//               <th className="text-left font-medium text-gray-600 bg-transparent">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions?.map((transaction) => (
//               <tr key={transaction.payment_id} className="border-gray-100 hover:bg-gray-50">
//                 <td className="py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="w-10 h-10 rounded-full">
//                         <img
//                            src={`${baseURL}${transaction?.therapist?.image}`}
//                           alt={transaction.therapist.name}
//                           className="w-full h-full object-cover rounded-full"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-medium text-gray-900">{transaction?.therapist?.name}</div>
//                       <div className="text-sm text-gray-500">{transaction?.therapist?.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="text-gray-600">{transaction?.type}</td>
//                 <td className="font-medium text-gray-900">{transaction?.payment}</td>
//                 <td className="text-gray-600">{transaction?.commission}</td>
//                 <td className="text-blue-600 font-medium">{transaction?.date}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       transaction.status === "Paid" ? "badge-success text-white" : "badge-warning text-gray-800"
//                     }`}
//                   >
//                     {transaction.status}
//                   </span>
//                 </td>
//                 <td className="text-gray-600">{transaction.method}</td>
//                 <td>
//                   <button 
//                   onClick={() => openModal(transaction?.payment_id)}
//                   className="text-orange-500 hover:text-orange-600 font-medium">View Details</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//        <dialog id="transactionId" className="modal">
//   <div className="modal-box bg-white rounded-xl p-6 w-full max-w-3xl">
//     <div className="flex justify-between items-center mb-6">
//       <h3 className="font-bold text-xl">Transaction Details</h3>
//       <form method="dialog">
//         <button className="text-gray-500 flex items-center justify-center text-2xl p-1 rounded-full hover:text-white hover:bg-red-500 bg-gray-300">
//           <X size={18} />
//         </button>
//       </form>
//     </div>
//     {transactionDetails ? (
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Therapist Name</p>
//             <p className="font-medium">{transactionDetails.therapist_name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Booking Date/Time</p>
//             <p className="font-medium">
//               {new Date(transactionDetails.booking_date).toLocaleString('en-US', {
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
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Customer</p>
//             <p className="font-medium">{transactionDetails.customer_name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Service</p>
//             <p className="font-medium">{transactionDetails.service}</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Location</p>
//             <p className="font-medium">{transactionDetails.location || 'N/A'}</p>
//           </div>
//         </div>
//         <div className="border-t pt-4 space-y-5">
//           <p className="text-sm text-gray-500 font-medium mb-2">Payment Summary</p>
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Massage Charges</p>
//               <p className="font-medium">${transactionDetails.summary.massage_charges.toFixed(2)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Payment Method</p>
//               <p className="font-medium">{transactionDetails.payment_method || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Commission</p>
//               <p className="font-medium">${transactionDetails.summary.commission.toFixed(2)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Booking Fee</p>
//               <p className="font-medium">${transactionDetails.summary.booking_fee.toFixed(2)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Tips</p>
//               <p className="font-medium">${transactionDetails.summary.tip.toFixed(2)}</p>
//             </div>
//           </div>
//         </div>
//         <div className="border-t pt-4 flex justify-end">
//           <div className="text-right">
//             <p className="text-sm text-gray-500">Total Amount</p>
//             <p className="font-bold text-lg">${transactionDetails.summary.total.toFixed(2)}</p>
//           </div>
//         </div>
//       </div>
//     ) : (
//       <p className="text-gray-500">Loading transaction details...</p>
//     )}
//   </div>
// </dialog>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-6">
//         <div className="text-sm text-gray-500">Showing 1-10 of 50 entries</div>
//         <div className="flex items-center gap-2">
//           <button className="btn btn-ghost btn-sm">
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <button className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600 border-orange-500">1</button>
//           <button className="btn btn-ghost btn-sm">2</button>
//           <button className="btn btn-ghost btn-sm">3</button>
//           <button className="btn btn-ghost btn-sm">4</button>
//           <button className="btn btn-ghost btn-sm">5</button>
//           <button className="btn btn-ghost btn-sm">
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGetTransactionHistoryDetailsQuery, useGetTransactionHistoryQuery } from "../redux/features/baseAPI/baseApi";
import { useState } from "react";

export default function TransactionHistory() {
  const { data: transactionsResult, isLoading, error } = useGetTransactionHistoryQuery();
  console.log("Transaction History Data:", transactionsResult);

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const { data: transactionDetails, isLoading: detailsLoading, error: detailsError } = useGetTransactionHistoryDetailsQuery(selectedTransactionId, {
    skip: !selectedTransactionId, // Skip query if selectedTransactionId is falsy
  });
  console.log("Transaction Details:", transactionDetails, "Loading:", detailsLoading, "Error:", detailsError);

  const baseURL = "http://192.168.10.139:3333/api";
  const transactions = transactionsResult?.results || [];

  const openModal = (transactionId) => {
    console.log("Opening modal with transactionId:", transactionId); // Debug
    setSelectedTransactionId(transactionId);
    document.getElementById("transactionId").showModal();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Transaction History</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="input input-bordered pl-10 w-80 bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-gray-200">
              <th className="text-left font-medium text-gray-600 bg-transparent">Therapist</th>
              <th className="text-left font-medium text-gray-600 bg-transparent">Type</th>
              <th className="text-left font-medium text-gray-600 bg-transparent">Payment</th>
              <th className="text-left font-medium text-gray-600 bg-transparent">Commission</th>
              <th className="text-left font-medium text-gray-600 bg-transparent">Date</th>
              <th className="text-left font-medium text-gray-600 bg-transparent">Status</th>
              <th className="text-left font-medium text-gray-600 bg-transparent">Method</th>
              <th className="text-left font-medium text-gray-600 bg-transparent">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Loading transactions...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-red-500">
                  Error loading transactions: {error.message || "Unknown error"}
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No transactions available
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.payment_id} className="border-gray-100 hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                          <img
                            src={`${baseURL}${transaction?.therapist?.image}`}
                            alt={transaction?.therapist?.name || "Therapist"}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transaction?.therapist?.name}</div>
                        <div className="text-sm text-gray-500">{transaction?.therapist?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-600">{transaction?.type}</td>
                  <td className="font-medium text-gray-900">{transaction?.payment}</td>
                  <td className="text-gray-600">{transaction?.commission}</td>
                  <td className="text-blue-600 font-medium">{transaction?.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        transaction.status === "Paid" ? "badge-success text-white" : "badge-warning text-gray-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="text-gray-600">{transaction.method}</td>
                  <td>
                    <button
                      onClick={() => openModal(transaction?.payment_id)}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="transactionId" className="modal">
        <div className="modal-box bg-white rounded-xl p-6 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Transaction Details</h3>
            <form method="dialog">
              <button className="text-gray-500 flex items-center justify-center text-2xl p-1 rounded-full hover:text-white hover:bg-red-500 bg-gray-300">
                <X size={18} />
              </button>
            </form>
          </div>
          {detailsError ? (
            <p className="text-red-500">Error loading transaction details: {detailsError.message || "Unknown error"}</p>
          ) : detailsLoading ? (
            <p className="text-gray-500">Loading transaction details...</p>
          ) : transactionDetails ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Therapist Name</p>
                  <p className="font-medium">{transactionDetails.therapist_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Date/Time</p>
                  <p className="font-medium">
                    {new Date(transactionDetails.booking_date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{transactionDetails.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{transactionDetails.service}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{transactionDetails.location || "N/A"}</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-5">
                <p className="text-sm text-gray-500 font-medium mb-2">Payment Summary</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Massage Charges</p>
                    <p className="font-medium">${transactionDetails.summary.massage_charges.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{transactionDetails.payment_method || "N/A"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Commission</p>
                    <p className="font-medium">${transactionDetails.summary.commission.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking Fee</p>
                    <p className="font-medium">${transactionDetails.summary.booking_fee.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tips</p>
                    <p className="font-medium">${transactionDetails.summary.tip.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-lg">${transactionDetails.summary.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No transaction details available</p>
          )}
        </div>
      </dialog>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">Showing 1-10 of 50 entries</div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600 border-orange-500">1</button>
          <button className="btn btn-ghost btn-sm">2</button>
          <button className="btn btn-ghost btn-sm">3</button>
          <button className="btn btn-ghost btn-sm">4</button>
          <button className="btn btn-ghost btn-sm">5</button>
          <button className="btn btn-ghost btn-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}