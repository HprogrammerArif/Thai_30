import { useState } from "react";
import { FaEdit, FaEnvelope, FaFileAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useGetTransactionHistoryDetailsQuery, useGetTransactionHistoryQuery } from "../../Pages/redux/features/baseAPI/baseApi";
import { ChevronLeft, ChevronRight } from "lucide-react";


const MassageTypes = () => {
     const [selectedTherapistCheck, setSelectedTherapistCheck] = useState(null);
      const { data: transactionsResult, isLoading, error } = useGetTransactionHistoryQuery();
       console.log("Transaction History Data:", transactionsResult);
     
       const [selectedTransactionId, setSelectedTransactionId] = useState(null);
       const [currentPage, setCurrentPage] = useState(1);
       const itemsPerPage = 5; // Number of transactions per page
       const maxPageButtons = 5; // Maximum number of page buttons to show
     
       const { data: transactionDetails, isLoading: detailsLoading, error: detailsError } = useGetTransactionHistoryDetailsQuery(selectedTransactionId, {
         skip: !selectedTransactionId, // Skip query if selectedTransactionId is falsy
       });
       console.log("Transaction Details:", transactionDetails, "Loading:", detailsLoading, "Error:", detailsError);
     
       const baseURL = "http://192.168.10.16:3333/api";
       const transactions = transactionsResult?.results || [];
     
       // Pagination logic
       const totalItems = transactions?.length || 0;
       const totalPages = Math.ceil(totalItems / itemsPerPage);
       const startIndex = (currentPage - 1) * itemsPerPage;
       const endIndex = startIndex + itemsPerPage;
       const currentTransactions = transactions?.slice(startIndex, endIndex);
     
       // Handle page change
       const handlePageChange = (page) => {
         if (page >= 1 && page <= totalPages) {
           setCurrentPage(page);
         }
       };
     
       // Generate pagination buttons
       const getPaginationButtons = () => {
         const buttons = [];
     
         if (totalPages === 0) {
           // No pages to display
           return buttons;
         }
     
         let startPage = 1;
         let endPage = Math.min(totalPages, maxPageButtons);
     
         if (totalPages > maxPageButtons) {
           const halfMax = Math.floor(maxPageButtons / 2);
           if (currentPage <= halfMax + 1) {
             // Show first maxPageButtons pages and an ellipsis
             startPage = 1;
             endPage = maxPageButtons;
           } else if (currentPage >= totalPages - halfMax) {
             // Show last maxPageButtons pages with an ellipsis at the start
             startPage = totalPages - maxPageButtons + 1;
             endPage = totalPages;
           } else {
             // Show pages around currentPage with ellipses on both sides
             startPage = currentPage - halfMax;
             endPage = currentPage + halfMax;
           }
         }
     
         // Add first page and ellipsis if needed
         if (startPage > 1) {
           buttons.push(1);
           if (startPage > 2) {
             buttons.push("...");
           }
         }
     
         // Add page numbers
         for (let i = startPage; i <= endPage; i++) {
           buttons.push(i);
         }
     
         // Add last page and ellipsis if needed
         if (endPage < totalPages) {
           if (endPage < totalPages - 1) {
             buttons.push("...");
           }
           buttons.push(totalPages);
         }
     
         return buttons.map((page, index) =>
           page === "..." ? (
             <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-600">
               ...
             </span>
           ) : (
             <button
               key={page}
               className={`btn btn-sm ${
                 page === currentPage
                   ? "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                   : "btn-ghost text-gray-600 hover:bg-gray-100"
               }`}
               onClick={() => handlePageChange(page)}
             >
               {page}
             </button>
           )
         );
       };
     

    
  const MassageTypesData = [
    {
      name: "Esthera Jackson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      massageFee: "100$",
      bookingFee: "100$",
        tipsFee: "100$",
      
      specialty: "Thai Massage Therapist",
      phone: "+1123456789",
      email: "esthera@email.com",
    },
    {
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1502685104226-7c8f1b2d3e4f?w=150&h=150&fit=crop",
      massageFee: "120$",
      bookingFee: "120$",
        tipsFee: "120$",
      
      specialty: "Swedish Massage Therapist",
      phone: "+1123456789",
      email: "arif@gmail.com",
    },
    {
      name: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1502685104226-7c8f1b2d3e4f?w=150&h=150&fit=crop",
      massageFee: "150$",
      bookingFee: "150$",
        tipsFee: "150$",
      
      specialty: "Deep Tissue Massage Therapist",
      phone: "+1123456789",
      email: " ARIF",
    },
  ];


    
  const openTherapistCheckModal = (check) => {
    setSelectedTherapistCheck(check);
    document.getElementById("therapist_check_modal").showModal();
  };


    return (
       <section>

        
        {/* Massage Type */}
        <div className="bg-white rounded-[15px] shadow-md p-6 col-span-1 basis-7/12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Massage Type
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="p-4">Massage Name</th>
                  <th className="p-4">Massage Fee</th>
                  <th className="p-4">Booking Fee</th>
                  <th className="p-4">Tips Fee</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {MassageTypesData?.map((check, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={check.image}
                          alt={check.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {check.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{check.massageFee}</td>
                    <td className="p-4 text-gray-600">{check.bookingFee}</td>
                    <td className="p-4 text-gray-600">{check.tipsFee}</td>
                    <td className="p-4">
                      <button
                        onClick={() => openTherapistCheckModal(check)}
                        className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium"
                      >
                        <FaEdit className="inline-block mr-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



          {/* DaisyUI Modal for MassageTypesData */}
            <dialog id="therapist_check_modal" className="modal">
  <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-xl">Update Massage Info</h3>
      <form method="dialog">
        <button className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
      </form>
    </div>

    {selectedTherapistCheck && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: Add update logic here (e.g., backend call or state update)
          console.log("Updated Therapist Data:", selectedTherapistCheck);
          document.getElementById("therapist_check_modal").close();
        }}
        className="space-y-4"
      >
        {/* Name and Specialty */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={selectedTherapistCheck.name}
              onChange={(e) =>
                setSelectedTherapistCheck({
                  ...selectedTherapistCheck,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Specialty</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={selectedTherapistCheck.specialty}
              onChange={(e) =>
                setSelectedTherapistCheck({
                  ...selectedTherapistCheck,
                  specialty: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Fees */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-600">Massage Fee</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={selectedTherapistCheck.massageFee}
              onChange={(e) =>
                setSelectedTherapistCheck({
                  ...selectedTherapistCheck,
                  massageFee: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Booking Fee</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={selectedTherapistCheck.bookingFee}
              onChange={(e) =>
                setSelectedTherapistCheck({
                  ...selectedTherapistCheck,
                  bookingFee: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Tips Fee</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={selectedTherapistCheck.tipsFee}
              onChange={(e) =>
                setSelectedTherapistCheck({
                  ...selectedTherapistCheck,
                  tipsFee: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={selectedTherapistCheck.phone}
              onChange={(e) =>
                setSelectedTherapistCheck({
                  ...selectedTherapistCheck,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={selectedTherapistCheck.email}
              onChange={(e) =>
                setSelectedTherapistCheck({
                  ...selectedTherapistCheck,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() =>
              document.getElementById("therapist_check_modal").close()
            }
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    )}
  </div>
</dialog>


 {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
       
        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {getPaginationButtons()}
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {/* here will be add a new message by clicking this button using */}
         <div className="text-sm text-gray-500">
          <button>Add new</button>
        </div>
      </div>


        
              {/* Toast container for showing notifications */}
              <ToastContainer
                position="top-right" // ← changed from "top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
       </section>
    );
};

export default MassageTypes;













// import { useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { ToastContainer } from "react-toastify";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const MassageTypes = () => {
//   const [selectedMassage, setSelectedMassage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 5;
//   const maxPageButtons = 5;

//   const [massageTypesData, setMassageTypesData] = useState([
//     {
//       name: "Esthera Jackson",
//       image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
//       massageFee: "100$",
//       bookingFee: "100$",
//       tipsFee: "100$",
//       specialty: "Thai Massage Therapist",
//       phone: "+1123456789",
//       email: "esthera@email.com",
//     },
//     {
//       name: "John Doe",
//       image: "https://images.unsplash.com/photo-1502685104226-7c8f1b2d3e4f?w=150&h=150&fit=crop",
//       massageFee: "120$",
//       bookingFee: "120$",
//       tipsFee: "120$",
//       specialty: "Swedish Massage Therapist",
//       phone: "+1123456789",
//       email: "arif@gmail.com",
//     },
//     {
//       name: "Jane Smith",
//       image: "https://images.unsplash.com/photo-1502685104226-7c8f1b2d3e4f?w=150&h=150&fit=crop",
//       massageFee: "150$",
//       bookingFee: "150$",
//       tipsFee: "150$",
//       specialty: "Deep Tissue Massage Therapist",
//       phone: "+1123456789",
//       email: "ARIF",
//     },
//   ]);

//   const totalItems = massageTypesData.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentMassageList = massageTypesData.slice(startIndex, endIndex);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   const getPaginationButtons = () => {
//     const buttons = [];
//     let startPage = 1;
//     let endPage = Math.min(totalPages, maxPageButtons);

//     if (totalPages > maxPageButtons) {
//       const halfMax = Math.floor(maxPageButtons / 2);
//       if (currentPage <= halfMax + 1) {
//         startPage = 1;
//         endPage = maxPageButtons;
//       } else if (currentPage >= totalPages - halfMax) {
//         startPage = totalPages - maxPageButtons + 1;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - halfMax;
//         endPage = currentPage + halfMax;
//       }
//     }

//     if (startPage > 1) {
//       buttons.push(1);
//       if (startPage > 2) buttons.push("...");
//     }

//     for (let i = startPage; i <= endPage; i++) buttons.push(i);

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) buttons.push("...");
//       buttons.push(totalPages);
//     }

//     return buttons.map((page, index) =>
//       page === "..." ? (
//         <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-600">
//           ...
//         </span>
//       ) : (
//         <button
//           key={page}
//           className={`btn btn-sm ${
//             page === currentPage
//               ? "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
//               : "btn-ghost text-gray-600 hover:bg-gray-100"
//           }`}
//           onClick={() => handlePageChange(page)}
//         >
//           {page}
//         </button>
//       )
//     );
//   };

//   const openEditModal = (massage) => {
//     setIsEditing(true);
//     setSelectedMassage(massage);
//     document.getElementById("massage_modal").showModal();
//   };

//   const openAddModal = () => {
//     setIsEditing(false);
//     setSelectedMassage({
//       name: "",
//       image: "",
//       massageFee: "",
//       bookingFee: "",
//       tipsFee: "",
//       specialty: "",
//       phone: "",
//       email: "",
//     });
//     document.getElementById("massage_modal").showModal();
//   };

//   const handleModalSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       setMassageTypesData((prev) =>
//         prev.map((m) =>
//           m.email === selectedMassage.email ? selectedMassage : m
//         )
//       );
//     } else {
//       setMassageTypesData((prev) => [...prev, selectedMassage]);
//     }

//     document.getElementById("massage_modal").close();
//   };

//   return (
//     <section>
//       {/* Table */}
//       <div className="bg-white rounded-[15px] shadow-md p-6 col-span-1 basis-7/12">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Massage Type
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-600 border-b">
//                 <th className="p-4">Massage Name</th>
//                 <th className="p-4">Massage Fee</th>
//                 <th className="p-4">Booking Fee</th>
//                 <th className="p-4">Tips Fee</th>
//                 <th className="p-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentMassageList.map((massage, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={massage.image}
//                         alt={massage.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <span className="font-medium text-gray-900">
//                         {massage.name}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-4 text-gray-600">{massage.massageFee}</td>
//                   <td className="p-4 text-gray-600">{massage.bookingFee}</td>
//                   <td className="p-4 text-gray-600">{massage.tipsFee}</td>
//                   <td className="p-4">
//                     <button
//                       onClick={() => openEditModal(massage)}
//                       className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium"
//                     >
//                       <FaEdit className="inline-block mr-1" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//           {/* Pagination and Add Button */}
//       <div className="flex justify-between items-center mt-6">
//         <div className="flex items-center gap-2">
//           <button
//             className="btn btn-ghost btn-sm"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1 || totalPages === 0}
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           {getPaginationButtons()}
//           <button
//             className="btn btn-ghost btn-sm"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages || totalPages === 0}
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//         <div>
//           <button
//             onClick={openAddModal}
//             className="btn btn-sm bg-[#B28D28] text-white hover:bg-[#9a7b23]"
//           >
//             Add New
//           </button>
//         </div>
//       </div>
//       </div>

//       {/* Modal */}
//       <dialog id="massage_modal" className="modal">
//         <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-xl">
//               {isEditing ? "Update Massage Info" : "Add New Massage"}
//             </h3>
//             <form method="dialog">
//               <button className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
//             </form>
//           </div>

//           {selectedMassage && (
//             <form onSubmit={handleModalSubmit} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm text-gray-600">Name</label>
//                   <input
//                     type="text"
//                     className="w-full border px-3 py-2 rounded"
//                     value={selectedMassage.name}
//                     onChange={(e) =>
//                       setSelectedMassage({ ...selectedMassage, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Specialty</label>
//                   <input
//                     type="text"
//                     className="w-full border px-3 py-2 rounded"
//                     value={selectedMassage.specialty}
//                     onChange={(e) =>
//                       setSelectedMassage({ ...selectedMassage, specialty: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <inputField label="Massage Fee" field="massageFee" value={selectedMassage} setValue={setSelectedMassage} />
//                 <inputField label="Booking Fee" field="bookingFee" value={selectedMassage} setValue={setSelectedMassage} />
//                 <inputField label="Tips Fee" field="tipsFee" value={selectedMassage} setValue={setSelectedMassage} />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <inputField label="Phone" field="phone" value={selectedMassage} setValue={setSelectedMassage} />
//                 <inputField label="Email" field="email" type="email" value={selectedMassage} setValue={setSelectedMassage} />
//               </div>

//               <div className="flex justify-end gap-3 mt-6">
//                 <button
//                   type="button"
//                   className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
//                   onClick={() => document.getElementById("massage_modal").close()}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23]"
//                 >
//                   {isEditing ? "Save Changes" : "Add Massage"}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </dialog>

    

//       <ToastContainer position="top-right" autoClose={3000} />
//     </section>
//   );
// };

// const inputField = ({ label, field, value, setValue, type = "text" }) => (
//   <div>
//     <label className="text-sm text-gray-600">{label}</label>
//     <input
//       type={type}
//       className="w-full border px-3 py-2 rounded"
//       value={value[field]}
//       onChange={(e) => setValue({ ...value, [field]: e.target.value })}
//     />
//   </div>
// );

// export default MassageTypes;
