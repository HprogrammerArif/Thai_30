import { useState } from "react";
import { FaEdit, FaEnvelope, FaFileAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import {
  useAddMassageTypeMutation,
  useGetAddOneDataQuery,
  useGetMassageTypeQuery,
  useGetTransactionHistoryDetailsQuery,
  useGetTransactionHistoryQuery,
  usePostAddOneDataMutation,
  useUpdateAddOneDataMutation,
  useUpdateMassageTypeMutation,
} from "../../Pages/redux/features/baseAPI/baseApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddOns = () => {
  const { data: addOneData, isLoading } = useGetAddOneDataQuery({});
  const [selectedAddOnes, setSelectedAddOnes] = useState(null);
    console.log({selectedAddOnes})
  const [updateAddOneData, { isLoading: isUpdating }] =
    useUpdateAddOneDataMutation();
//   const [updateMassageType, { isLoading: isUpdating }] =
//     useUpdateAddOneDataMutation();

  const [postAddOneData] = usePostAddOneDataMutation();
//   const [addMassageType] = useAddMassageTypeMutation();

  const [newMassage, setNewMassage] = useState({
    name: "",
    duration: "",
    fee: "",
  });

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newMassage.name);
    formData.append("duration", newMassage.duration);
    formData.append("fee", newMassage.fee);

    console.log({formData})
    


    try {
      const res = await postAddOneData(formData).unwrap();
      console.log({ res });
      toast.success("Add Ons added successfully!");

      setNewMassage({
        name: "",
        duration: "",
        fee: "",
        
      });

      // document.getElementById("add_ons_modal").close()
    } catch (err) {
      console.error(err);
      toast.error("Failed to add Ons Data.");
    }
  };

  const addOnesData = addOneData || [];
//   const massageTypes = addOneData || [];
  console.log({ addOnesData });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPageButtons = 5;

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(addOnesData.length / itemsPerPage);
  const currentItems = addOnesData.slice(
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
  if (isUpdating) return <div>Updating...</div>;

  const openAddOnesModal = (check) => {
    setSelectedAddOnes(check);
    document.getElementById("add_ones_modal").showModal();
  };


  const handleUpdate = async (e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append(
                  "fee",
                  selectedAddOnes.fee
                );
                formData.append(
                  "duration",
                  selectedAddOnes.duration
                );
                

                try {
                  await updateAddOneData({
                    id: selectedAddOnes.id, // make sure `id` exists
                    formData,
                  }).unwrap();

                  toast.success("Add Ons updated successfully!");
                  // document.getElementById("add_ones_modal").close();
                } catch (err) {
                  console.error("Update failed:", err);
                  toast.error("Failed to update Add Ons.");
                }
              }

  return (
    <section>
      {/* Add Ons */}
      <div className="bg-white rounded-[15px] shadow-md p-6 col-span-1 basis-7/12 mt-6 md:mt-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add Ons
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="p-4">Name</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Fee</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((check, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                 
                  <td className="p-4 text-gray-600">{check.name}</td>
                  <td className="p-4 text-gray-600">{check.duration}</td>
                  <td className="p-4 text-gray-600">{check.fee}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openAddOnesModal(check)}
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
                document.getElementById("add_ons_modal").showModal()
              } // If using modal
            >
              Add New
            </button>
          </div>
        </div>
      </div>




      {/* DaisyUI Modal for MassageTypesData  update*/}
      <dialog id="add_ones_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Edit Add Ons Info</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>

          {selectedAddOnes && (
            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >
              {/* Fees Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Fee</label>
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded"
                    value={selectedAddOnes.fee || ""}
                    onChange={(e) =>
                      setSelectedAddOnes({
                        ...selectedAddOnes,
                        fee: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Duration</label>
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded"
                    value={selectedAddOnes.duration || ""}
                    onChange={(e) =>
                      setSelectedAddOnes({
                        ...selectedAddOnes,
                        duration: e.target.value,
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
                    document.getElementById("add_ones_modal").close()
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
      <dialog id="add_ons_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Add Ons</h3>
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
                <label className="text-sm text-gray-600">Duration</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={newMassage.duration}
                  onChange={(e) =>
                    setNewMassage({
                      ...newMassage,
                     duration: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Fee</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={newMassage.fee}
                  onChange={(e) =>
                    setNewMassage({
                      ...newMassage,
                      fee: e.target.value,
                    })
                  }
                  required
                />
              </div>

            
            
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() =>
                  document.getElementById("add_ons_modal").close()
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

export default AddOns;
