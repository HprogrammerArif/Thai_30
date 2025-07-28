// import { useGetPendingPayoutQuery, usePendingPayoutApprovalMutation } from "../redux/features/baseAPI/baseApi";

// const PayoutLayout = () => {
//   const { data: getPendingPayout } = useGetPendingPayoutQuery();
// const [pendingPayoutApproval] = usePendingPayoutApprovalMutation()
//   const baseURL = "https://backend.thaimassagesnearmeapp.com/";

//   const handlePayoutApprove = (id) =>{
//     console.log("Approve Id", id)

//      const body = {
//         status: "approved"
//   };

//     try {
//         const response = pendingPayoutApproval({id:id, body}).unwrap();
//         console.log("payout", response)
//     } catch (error) {
//         console.log(error)
//     }
//   }

//   return (
//     <div className="overflow-x-auto">
//         <h1 className="text-xl font-bold text-gray-800 mb-6">Pay-Out Approval</h1>
//       <table className="table table-zebra w-full">
//         <thead>
//           <tr className="text-gray-700">
//             <th  className="text-base">Name</th>
//             <th  className="text-base">Specialization</th>
//             <th  className="text-base">Date</th>
//             <th  className="text-base">Method</th>
//             <th  className="text-base">Amount</th>
//             <th  className="text-base">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {getPendingPayout && getPendingPayout.length > 0 ? (
//             getPendingPayout.map((payout, id) => (
//               <tr key={id} className="hover:bg-gray-50 cursor-pointer">
//                 {/* Name Cell */}
//                 <td>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="w-12 h-12 rounded-full">
//                         <img
//                           src={`${baseURL}api${payout?.therapist_image}`}
//                           alt={payout?.therapist_name}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                         <p className="text-black text-[16px]">{payout?.therapist_name}</p>
//                     <p className="text-gray-500">{payout?.therapist_email}</p>
//                     </div>
//                   </div>
//                 </td>

//                 <td  className="text-base">{payout?.specialization}</td>
//                 <td className="text-base">{payout?.date || "N/A"}</td>
//                 <td className="capitalize text-base">{payout?.method || "N/A"}</td>
//                 <td  className="text-base">{payout?.amount}</td>
//                 <td className="text-base">
//                      {payout?.status === "pending" ? (
//                  <div className="flex gap-2">
//                     <button
//                         onClick={()=>handlePayoutApprove(payout?.id)}
//                         className="btn btn-xs btn-success text-[13px]">Approve</button>
//                         <button className="btn btn-xs btn-error  text-[13px]">Reject</button>
//                     </div>
//                         ) : (
//                  <span className={`text-[13px] capitalize badge ${payout?.status === "pending" ? "badge-warning" : "badge-success"}`}>
//                   {payout?.status}
//                  </span>
//                      )}
//                 </td>

//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center py-4 text-gray-500">
//                 No bookings found for the selected status.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PayoutLayout;

import { useState } from "react";
import {
  useGetPendingPayoutQuery,
  usePendingPayoutApprovalMutation,
} from "../redux/features/baseAPI/baseApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PayoutLayout = () => {
  const { data: getPendingPayout = [] } = useGetPendingPayoutQuery(); // Default to an empty array if no data is fetched
  const [pendingPayoutApproval] = usePendingPayoutApprovalMutation();
  const baseURL = "https://backend.thaimassagesnearmeapp.com/";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the index of the first and last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Ensure there is data to paginate
  const currentPayouts = getPendingPayout.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePayoutApprove = (id) => {
    console.log("Approve Id", id);

    const body = {
      status: "approved",
    };

    try {
      const response = pendingPayoutApproval({ id: id, body }).unwrap();
      console.log("payout", response);
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div className="overflow-x-auto bg-white text-gray-900">
      <h1 className="text-xl font-bold text-gray-800 mb-6 dark:text-gray-900">
        Pay-Out Approval
      </h1>
      <table className="table w-full">
        <thead>
          <tr className="text-gray-700">
            <th className="text-base">Name</th>
            <th className="text-base">Specialization</th>
            <th className="text-base">Date</th>
            <th className="text-base">Method</th>
            <th className="text-base">Amount</th>
            <th className="text-base">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentPayouts.length > 0 ? (
            currentPayouts.map((payout, id) => (
              <tr key={id} className="hover:bg-gray-100 cursor-pointer">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={`${baseURL}api${payout?.therapist_image}`}
                          alt={payout?.therapist_name}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[16px] text-gray-900">
                        {payout?.therapist_name}
                      </p>
                      <p className="text-gray-500">{payout?.therapist_email}</p>
                    </div>
                  </div>
                </td>
                <td className="text-base">{payout?.specialization}</td>
                <td className="text-base">{payout?.date || "N/A"}</td>
                <td className="capitalize text-base">
                  {payout?.method || "N/A"}
                </td>
                <td className="text-base">{payout?.amount}</td>
                <td className="text-base">
                  {payout?.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePayoutApprove(payout?.id)}
                        className="btn btn-xs btn-success text-[13px]"
                      >
                        Approve
                      </button>
                      <button className="btn btn-xs btn-error text-[13px]">
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-[13px] capitalize badge ${
                        payout?.status === "pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {payout?.status}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No bookings found for the selected status.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          <ChevronLeft
            size={16}
            className="font-bold text-gray-700 dark:text-gray-900"
          />
        </button>
        <div className="flex gap-2">
          {[...Array(Math.ceil(getPendingPayout.length / itemsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-7 h-7 flex items-center justify-center text-white rounded-full ${
                  currentPage === index + 1
                    ? "bg-[#B28D28]"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(getPendingPayout.length / itemsPerPage)
          }
          className="cursor-pointer"
        >
          <ChevronRight
            size={16}
            className="font-bold text-gray-700 dark:text-gray-900"
          />
        </button>
      </div>
    </div>
  );
};

export default PayoutLayout;
