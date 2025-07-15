import React, { useState } from "react";
import { FaEnvelope, FaPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import {
  useCreateDisputeSettingMutation,
  useDeleteDisputeSettingMutation,
  useGetDisputeDataQuery,
  useGetDisputeDetailsQuery,
  useGetDisputeSettingsQuery,
  useGetDisputesHomeDataQuery,
  useGetSupportTicketQuery,
  useRefundPaymentMutation,
  useSuggestCompensationMutation,
} from "../redux/features/baseAPI/baseApi";
import { toast, Toaster } from "sonner";
import { TicketDetailsModal } from "../Dashboard/TicketDetailsModal";

const disputeTypeMap = {
  "no-show": "Therapist Not Show",
  "service-quality": "Service Quality",
  payment: "Payment Issue",
};

const resolutionMap = {
  "auto-refunded": "Auto Refund",
  "suggest-compensation": "Suggest Compensation",
};

const FinanceDispute = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const [refundPayment, { isLoading }] = useRefundPaymentMutation();

  const handleAutoRefund = async (id) => {
    try {
      const res = await refundPayment(id).unwrap();
      console.log({ res });
      toast.success("Auto refund successful");
    } catch (error) {
      console.error(error);
      toast.error("Auto refund failed");
    }
  };

  // State for selected dispute and modals
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [compensationAmount, setCompensationAmount] = useState("");

  const [createDisputeSettingData] = useCreateDisputeSettingMutation();
  const { data: supportTickets, isLoading: isSupportTicketLoading } =
    useGetSupportTicketQuery([]);
  const { data: disputeSettings, isLoading: disputeLoading } =
    useGetDisputeSettingsQuery({});
  console.log({ disputeSettings });
  const [deleteDisputeSetting] = useDeleteDisputeSettingMutation();

  const { data: disputeData, isLoading: isDisputeLoading } =
    useGetDisputesHomeDataQuery(statusFilter);
  // const { data: disputeData, isLoading } = useGetDisputesHomeDataQuery(statusFilter);

  console.log({ disputeData });

  const [disputeType, setDisputeType] = useState("");
  const [resolution, setResolution] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!disputeType || !resolution) {
      toast.error("Please select both dispute type and resolution.");
      return;
    }

    try {
      const payload = {
        dispute_type: disputeTypeMap[disputeType],
        resolution_type: resolutionMap[resolution],
      };

      const res = await createDisputeSettingData(payload).unwrap();
      console.log("Saved dispute setting data:", res);
      toast.success("Dispute setting dat6a saved successfully!.");

      // Close modal and optionally reset form
      document.getElementById("dispute_settings_modal").close();
      setDisputeType("");
      setResolution("");
    } catch (error) {
      console.error("Error creating dispute setting:", error);
      toast.error("Something went wrong.", error);
    }
  };

  const [disputeId, setDisputeId] = useState(null);
  const { data: selectedDisputeDetails, isLoading: isDisputeDetailLoading } =
    useGetDisputeDetailsQuery(disputeId, {
      skip: !disputeId,
    });

  const [suggestCompensation] = useSuggestCompensationMutation();

  const openDisputeModal = (dispute) => {
    setDisputeId(dispute.id); // triggers the query
    document.getElementById("dispute_details_modal").showModal();
  };

  const closeDisputeModal = () => {
    setDisputeId(null); // stops the query
    document.getElementById("dispute_details_modal").close();
  };

  // const openCompensationModal = (dispute) => {
  //   console.log({ dispute });
  //   setSelectedDispute(dispute);
  //   document.getElementById("suggest_compensation_modal").showModal();
  // };

  const openCompensationModal = (dispute) => {
    setDisputeId(dispute.id); // Triggers fetch
    document.getElementById("suggest_compensation_modal").showModal();
  };

  const handleCompensationSubmit = async (e) => {
    e.preventDefault();

    console.log({ disputeId });

    if (!disputeId) {
      toast.error("Dispute details not loaded.");
      return;
    }

    try {
      const res = await suggestCompensation({
        disputeId: disputeId,
        data: { amount: parseFloat(compensationAmount) },
      }).unwrap();
      console.log({ res });

      toast.success("Compensation suggested.");
      document.getElementById("suggest_compensation_modal").close();
      setCompensationAmount("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to suggest compensation.");
    }
  };

  const openSettingsModal = () => {
    document.getElementById("dispute_settings_modal").showModal();
  };

  const deleteDisputeSettingData = (item) => {
    console.log({ item });
    toast.custom((t) => (
      <div className="bg-white border shadow-md rounded-lg px-6 py-4 flex flex-col items-start space-y-4 w-[300px]">
        <p className="text-sm text-gray-800">
          Are you sure you want to delete this dispute setting?
        </p>

        <div className="flex gap-3 self-end">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // close toast
              try {
                await deleteDisputeSetting(item.id).unwrap();
                toast.success("Dispute setting deleted successfully.");
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete.");
              }
            }}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="relative">
      <Toaster />

      <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Open Disputes</h2>

          <div className="flex gap-2">
            {["", "pending", "resolved"].map((status) => {
              const label =
                status === ""
                  ? "All"
                  : status.charAt(0).toUpperCase() + status.slice(1);
              const isActive = statusFilter === status;

              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-[#B28D28] text-white hover:bg-[#9a7b23]"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            <button
              onClick={openSettingsModal}
              className="px-3 py-2 bg-[#B28D28] text-white rounded-full hover:bg-[#9a7b23] transition-colors flex items-center gap-2"
            >
              <IoSettings size={20} />
              Dispute Settings
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {disputeData?.map((dispute, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">
                    {dispute.dispute_type}
                  </p>
                  <p className="text-sm text-gray-500">
                    Client {dispute.client_id} • Appointment Date:{" "}
                    {dispute.appointment_date}
                  </p>
                </div>
                <div className="flex gap-2">
                  {dispute.status === "resolved" ? (
                    <button
                      onClick={() => handleAutoRefund(dispute.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Auto Refund"}
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
                Status:{" "}
                <span
                  className={
                    dispute.status === "resolved"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {dispute.status}
                </span>
              </p>
            </div>
          ))}
        </div>
        <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4">
          Load more
        </button>
      </div>

      {/* New Dispute setting */}
      <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          New Dispute Setting
        </h2>
        <div className="space-y-4">
          {disputeSettings?.map((item) => (
            <div
              key={item.id}
              className="border-b pb-4 last:border-b-0 flex justify-between items-center hover:bg-gray-50 cursor-pointer p-4 rounded-lg transition"
            >
              <div className="space-y-1">
                <span className="bg-[#FFEAAF]/60 text-[#B28D28] px-4 py-1 text-xs rounded-full border border-[#B28D28]/30 inline-block">
                  {item.resolution_type}
                </span>
                <p className="font-medium text-gray-900 text-sm mt-1">
                  {item.dispute_type}
                </p>
              </div>

              <button
                onClick={() => deleteDisputeSettingData(item)}
                className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4 hover:underline">
          Load previous
        </button> */}
      </div>

      <TicketDetailsModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        ticket={selectedTicket}
      />

      {/* DaisyUI Modal for Dispute Details */}
      <dialog id="dispute_details_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl bg-white dark:bg-gray-900">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Dispute Detail
            </h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">
                ×
              </button>
            </form>
          </div>

          {isDisputeDetailLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          ) : selectedDisputeDetails ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Therapist Name
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.therapist_name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Booking Date/Time
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.booking_date_time || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customer
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.customer || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Service
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.service || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Payment Method
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.payment_method || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Location
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.location || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complaint
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {selectedDisputeDetails.complain || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {selectedDisputeDetails.total !== null
                    ? `$${Number(selectedDisputeDetails.total).toFixed(2)}`
                    : "N/A"}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <form method="dialog">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <p className="text-red-500 dark:text-red-400">No details found.</p>
          )}
        </div>
      </dialog>

      <dialog id="suggest_compensation_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl bg-white dark:bg-gray-900">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Suggest Compensation
            </h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">
                ×
              </button>
            </form>
          </div>

          {isDisputeDetailLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          ) : selectedDisputeDetails ? (
            <form onSubmit={handleCompensationSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Therapist Name
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.therapist_name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Booking Date/Time
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.booking_date_time || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customer
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.customer || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Service
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDisputeDetails.service || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Payment Method
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {selectedDisputeDetails.payment_method || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {selectedDisputeDetails.total !== null
                    ? `$${Number(selectedDisputeDetails.total).toFixed(2)}`
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compensation Amount
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder="Enter compensation amount"
                  value={compensationAmount}
                  onChange={(e) => setCompensationAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <form method="dialog">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
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
          ) : (
            <p className="text-red-500 dark:text-red-400">
              No dispute details found.
            </p>
          )}
        </div>
      </dialog>

      {/* DaisyUI Modal for Dispute Settings */}
      <dialog id="dispute_settings_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl ">Dispute Setting</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl dark:text-gray-200">
                ×
              </button>
            </form>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Dispute Type
              </p>
              <select
                value={disputeType}
                onChange={(e) => setDisputeType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
              >
                <option value="" disabled>
                  Select dispute type
                </option>
                <option value="no-show">Therapist No-Show</option>
                <option value="service-quality">Service Quality</option>
                <option value="payment">Payment Issue</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Resolution
              </p>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
              >
                <option value="" disabled>
                  Select resolution
                </option>
                <option value="auto-refunded">Auto Refunded</option>
                <option value="suggest-compensation">
                  Suggest Compensation
                </option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("dispute_settings_modal")?.close()
                }
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-200"
              >
                Cancel
              </button>
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

export default FinanceDispute;
