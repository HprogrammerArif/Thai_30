export const TicketDetailsModal = ({ isOpen, setIsOpen, ticket }) => {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-[500px] p-6 rounded-lg relative shadow-lg text-gray-700 dark:text-gray-100">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-xl text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-lg font-bold mb-4">Ticket Details</h2>

        {/* Ticket Info */}
        <div className="space-y-3 text-sm">
          <p>
            <strong>User:</strong> {ticket.user}
          </p>
          <p>
            <strong>Role:</strong> {ticket.user_role}
          </p>
          <p>
            <strong>Issue Type:</strong> {ticket.issue_type}
          </p>
          <p>
            <strong>Description:</strong> {ticket.description}
          </p>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {ticket.created_at
              ? new Date(ticket.created_at).toLocaleString()
              : "N/A"}
          </p>
          <p>
            <strong>Updated:</strong>{" "}
            {ticket.updated_at
              ? new Date(ticket.updated_at).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#B28D28] text-white px-4 py-2 rounded hover:bg-[#9a7b23] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
