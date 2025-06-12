import { useGetPendingPayoutQuery } from "../redux/features/baseAPI/baseApi";

const PayoutLayout = () => {
  const { data: getPendingPayout } = useGetPendingPayoutQuery();
  console.log("ddss", getPendingPayout)
  const baseURL = "http://192.168.10.139:3333/";

  return (
    <div className="overflow-x-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Pay-Out Approval</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-gray-700">
            <th  className="text-base">Name</th>
            <th  className="text-base">Specialization</th>
            <th  className="text-base">Date</th>
            <th  className="text-base">Method</th>
            <th  className="text-base">Amount</th>
            <th  className="text-base">Status</th>
          </tr>
        </thead>
        <tbody>
          {getPendingPayout && getPendingPayout.length > 0 ? (
            getPendingPayout.map((payout, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                {/* Name Cell */}
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
                    
                  </div>
                </td>

                <td  className="text-base">{payout?.specialization}</td>
                <td className="text-base">{payout?.date || "N/A"}</td>
                <td className="capitalize text-base">{payout?.method || "N/A"}</td>
                <td  className="text-base">{payout?.amount}</td>
                <td  className="text-base">
                  <span className={`capitalize badge ${payout?.status === "pending" ? "badge-warning" : "badge-success"}`}>
                    {payout?.status || "N/A"}
                  </span>
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
    </div>
  );
};

export default PayoutLayout;
