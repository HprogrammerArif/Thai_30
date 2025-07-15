import { FaCalendarCheck } from "react-icons/fa6";
import { useGetAnalyticsDataQuery } from "../redux/features/baseAPI/baseApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TransactionHistory from "../Dashboard/TransactionHistory";
import PayoutLayout from "../Dashboard/PayoutLayout";

// Reusable Stat Card Component
const StatCard = ({ label, value }) => (
  <div className="flex-1 min-w-[200px] bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="space-y-2">
      <h1 className="text-gray-800 font-medium">{label}</h1>
      <h1 className="font-bold text-2xl text-black">{value}</h1>
    </div>
    <div className="bg-[#B28D28] p-3 rounded-xl">
      <FaCalendarCheck className="text-white" size={24} />
    </div>
  </div>
);

// Utility function to format numbers
const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const Finance_admin_home = () => {
  const { data: infoData, isLoading, isError } = useGetAnalyticsDataQuery();
  const revenueData = infoData?.revenue_overview || [];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  const avgOrderValue =
    revenueData.length > 0 ? totalRevenue / revenueData.length : 0;
  console.log({ revenueData });

  return (
    <div className="space-y-8">
      {/* Top Stat Cards */}
      <div className="flex flex-wrap gap-4">
        <StatCard
          label="Avg Order Value"
          value={`$${formatNumber(avgOrderValue.toFixed(2))}`}
        />
        <StatCard
          label="Total Revenue"
          value={`$${formatNumber(totalRevenue)}`}
        />
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-[15px] shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Revenue Overview
          </h2>
          <select className="border rounded-lg p-2 text-sm text-gray-600 dark:text-gray-300">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading chart...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">
            Failed to load revenue data.
          </p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  stroke="#6b7280"
                  tickFormatter={(value) => `$${value}K`}
                />
                <Tooltip formatter={(value) => `$${value}K`} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#B28D28"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <TransactionHistory />

      <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2 mt-10">
        <PayoutLayout />
      </div>
    </div>
  );
};

export default Finance_admin_home;
