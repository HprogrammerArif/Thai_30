

import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGetTransactionHistoryQuery, useGetTransactionHistoryDetailsQuery } from "../redux/features/baseAPI/baseApi";
import { useState } from "react";

export default function TransactionHistory() {
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
            ) : currentTransactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No transactions available
                </td>
              </tr>
            ) : (
              currentTransactions.map((transaction) => (
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
                  <td className="font-medium text-gray-600">${transaction?.payment}</td>
                  <td className="text-gray-600 font-medium">${transaction?.commission}</td>
                  <td className="text-blue-600">{transaction?.date}</td>
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
        <div className="text-sm text-gray-500">
          Showing {totalItems > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>
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
      </div>
    </div>
  );
}