import { useState } from "react";
import { FaEdit, FaEnvelope, FaFileAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import {
  useAddMassageTypeMutation,
  useGetMassageTypeQuery,
  useGetTransactionHistoryDetailsQuery,
  useGetTransactionHistoryQuery,
  useUpdateMassageTypeMutation,
} from "../../Pages/redux/features/baseAPI/baseApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MassageTypes = () => {
  const { data: massageTypesData, isLoading } = useGetMassageTypeQuery({});
  const [selectedTherapistCheck, setSelectedTherapistCheck] = useState(null);
  const [updateMassageType, { isLoading: isUpdating }] =
    useUpdateMassageTypeMutation();
  const [addMassageType] = useAddMassageTypeMutation();
 
  const [newMassage, setNewMassage] = useState({
    name: "",
    massage_fee: "",
    booking_fee: "",
    tip_fee: "",
    is_active: true,
    image: null, // optional image
  });

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newMassage.name);
    formData.append("massage_fee", newMassage.massage_fee);
    formData.append("booking_fee", newMassage.booking_fee);
    formData.append("tip_fee", newMassage.tip_fee);
    formData.append("is_active", newMassage.is_active);

    if (newMassage.image) {
      formData.append("image", newMassage.image);
    }

    try {
      const res = await addMassageType(formData).unwrap();
      console.log({ res });
      toast.success("Massage type added successfully!");

      setNewMassage({
        name: "",
        massage_fee: "",
        booking_fee: "",
        tip_fee: "",
        is_active: true,
        image: null,
      });

      document.getElementById("add_massage_modal").close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add massage type.");
    }
  };

  const massageTypes = massageTypesData || [];
  console.log({ massageTypes });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPageButtons = 5;

  // Pagination calculations
  const totalItems = massageTypes.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentItems = massageTypes.slice(startIndex, endIndex);
  //  const itemsPerPage = 5;
  // const massageTypes = massageTypesData || [];

  const totalPages = Math.ceil(massageTypes.length / itemsPerPage);
  const currentItems = massageTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons = [];
    if (totalPages === 0) return buttons;

    let startPage = 1;
    let endPage = Math.min(totalPages, maxPageButtons);
    const half = Math.floor(maxPageButtons / 2);

    if (totalPages > maxPageButtons) {
      if (currentPage <= half + 1) {
        startPage = 1;
        endPage = maxPageButtons;
      } else if (currentPage >= totalPages - half) {
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - half;
        endPage = currentPage + half;
      }
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }

    return buttons.map((page, index) =>
      page === "..." ? (
        <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`btn btn-sm mx-1 ${
            page === currentPage
              ? "bg-[#B28D28] text-white border-gray-500 hover:bg-gray-200 hover:text-black"
              : "btn-ghost text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      )
    );
  };

  if (isLoading) return <div>Loading...</div>;
  // const MassageTypesData = [
  //   {
  //     name: "Esthera Jackson",
  //     image:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  //     massageFee: "100$",
  //     bookingFee: "100$",
  //       tipsFee: "100$",

  //     specialty: "Thai Massage Therapist",
  //     phone: "+1123456789",
  //     email: "esthera@email.com",
  //   },
  //   {
  //     name: "John Doe",
  //     image:
  //       "https://images.unsplash.com/photo-1502685104226-7c8f1b2d3e4f?w=150&h=150&fit=crop",
  //     massageFee: "120$",
  //     bookingFee: "120$",
  //       tipsFee: "120$",

  //     specialty: "Swedish Massage Therapist",
  //     phone: "+1123456789",
  //     email: "arif@gmail.com",
  //   },
  //   {
  //     name: "Jane Smith",
  //     image:
  //       "https://images.unsplash.com/photo-1502685104226-7c8f1b2d3e4f?w=150&h=150&fit=crop",
  //     massageFee: "150$",
  //     bookingFee: "150$",
  //       tipsFee: "150$",

  //     specialty: "Deep Tissue Massage Therapist",
  //     phone: "+1123456789",
  //     email: " ARIF",
  //   },
  // ];

  const openTherapistCheckModal = (check) => {
    setSelectedTherapistCheck(check);
    document.getElementById("therapist_check_modal").showModal();
  };

  return (
    <section>
      {/* Massage Type */}
      <div className="bg-white rounded-[15px] shadow-md p-6 col-span-1 basis-7/12 mt-6 md:mt-12">
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
              {currentItems?.map((check, index) => (
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
                  <td className="p-4 text-gray-600">{check.massage_fee}</td>
                  <td className="p-4 text-gray-600">{check.booking_fee}</td>
                  <td className="p-4 text-gray-600">{check.tip_fee}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openTherapistCheckModal(check)}
                      className="text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium"
                    >
                      <FaEdit className="inline-block mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-12">
          {/* Pagination Controls */}
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

          {/* Add New Massage Type */}
          <div>
            <button
              className="btn btn-sm text-[#B28D28] hover:text-[#9a7b23] transition-colors font-medium btn-outline"
              onClick={() =>
                document.getElementById("add_massage_modal").showModal()
              } // If using modal
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* DaisyUI Modal for MassageTypesData  update*/}
      <dialog id="therapist_check_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Edit Massage Info</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>

          {selectedTherapistCheck && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append(
                  "massage_fee",
                  selectedTherapistCheck.massage_fee
                );
                formData.append(
                  "booking_fee",
                  selectedTherapistCheck.booking_fee
                );
                formData.append("tips_fee", selectedTherapistCheck.tips_fee);

                if (selectedTherapistCheck.image instanceof File) {
                  formData.append("image", selectedTherapistCheck.image);
                }

                try {
                  await updateMassageType({
                    id: selectedTherapistCheck.id, // make sure `id` exists
                    formData,
                  }).unwrap();

                  toast.success("Massage type updated successfully!");
                  document.getElementById("therapist_check_modal").close();
                } catch (err) {
                  console.error("Update failed:", err);
                  toast.error("Failed to update massage type.");
                }
              }}
              className="space-y-4"
            >
              {/* Fees Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Massage Fee</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={selectedTherapistCheck.massage_fee || ""}
                    onChange={(e) =>
                      setSelectedTherapistCheck({
                        ...selectedTherapistCheck,
                        massage_fee: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Booking Fee</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={selectedTherapistCheck.booking_fee || ""}
                    onChange={(e) =>
                      setSelectedTherapistCheck({
                        ...selectedTherapistCheck,
                        booking_fee: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Tips Fee</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={selectedTherapistCheck.tip_fee || ""}
                    onChange={(e) =>
                      setSelectedTherapistCheck({
                        ...selectedTherapistCheck,
                        tip_fee: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Image</label>
                  <input
                    type="file"
                    className="w-full border px-3 py-2 rounded"
                    onChange={(e) =>
                      setSelectedTherapistCheck({
                        ...selectedTherapistCheck,
                        image: e.target.files[0], // Use File object
                      })
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
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

      {/* add message using modal */}

      <dialog id="add_massage_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Add Massage Type</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmitData} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={newMassage.name}
                  onChange={(e) =>
                    setNewMassage({ ...newMassage, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Massage Fee</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={newMassage.massage_fee}
                  onChange={(e) =>
                    setNewMassage({
                      ...newMassage,
                      massage_fee: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Booking Fee</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={newMassage.booking_fee}
                  onChange={(e) =>
                    setNewMassage({
                      ...newMassage,
                      booking_fee: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Tip Fee</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={newMassage.tip_fee}
                  onChange={(e) =>
                    setNewMassage({ ...newMassage, tip_fee: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border px-3 py-2 rounded"
                  onChange={(e) =>
                    setNewMassage({ ...newMassage, image: e.target.files[0] })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() =>
                  document.getElementById("add_massage_modal").close()
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#9a7b23] transition-colors"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </dialog>

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
