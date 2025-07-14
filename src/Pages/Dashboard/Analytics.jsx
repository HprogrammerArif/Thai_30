import { FaCalendarCheck, FaDollarSign, FaStar } from "react-icons/fa";
import { TbMassage } from "react-icons/tb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useGetAnalyticsDataQuery } from "../redux/features/baseAPI/baseApi";

const Analytics = () => {
  const { data: infoData } = useGetAnalyticsDataQuery();
  console.log({ infoData });
  const paseURL = "http://10.10.13.75:3333/";

  // Dynamic revenue data from infoData
  const revenueData = infoData?.revenue_overview || [];

  // Dynamic top services data from infoData
  const servicesData = infoData?.top_services || [];

  // Colors for PieChart
  const COLORS = ["#8B5A2B", "#D2B48C", "#F5DEB3", "#A67B5B"];

  // Dynamic top therapists data from infoData
  const therapists = infoData?.top_therapists || [];
  console.log({ revenueData, therapists, servicesData });

  // Dynamic customer insights from infoData
  const customerInsights = {
    newCustomers: infoData?.customer_insights?.new_customers || 0,
    repeatBookings: infoData?.customer_insights?.repeat_rate || "0%",
    avgBookedValue: infoData?.customer_insights?.avg_booked_value || "$0",
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="14"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Revenue</h1>
            <h1 className="font-bold text-xl text-black">
              ${infoData?.stats?.total_revenue || 0}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaDollarSign className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Bookings</h1>
            <h1 className="font-bold text-2xl text-black">
              {infoData?.stats?.total_bookings || 0}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <FaCalendarCheck className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Active Therapists</h1>
            <h1 className="font-bold text-2xl text-black">
              {infoData?.stats?.active_therapists || 0}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <TbMassage className="text-white" size={26} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Customer's Avg Rating</h1>
            <h1 className="font-bold text-xl text-black">
              {infoData?.stats?.average_rating || 0}/5.0
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaStar className="text-white font-bold" size={24} />
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Revenue Overview
          </h2>
          <select className="border rounded-lg p-2 text-sm text-gray-600">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value}K`} />
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
      </div>

      {/* Top Performing Therapists and Top Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performing Therapists */}
        <div className="bg-white rounded-[15px] shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Performing Therapists
          </h2>
          <div className="space-y-4">
            {therapists.length > 0 ? (
              therapists.map((therapist, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5 bg-[#f1f3f3] rounded-[15px]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`${paseURL}api${therapist.image}`}
                      // src={therapist.image}
                      alt={therapist.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {therapist.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Completion rate{" "}
                        <span className="text-gray-900">
                          {therapist.completion_rate}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar size={16} />
                    <span className="text-gray-800 font-medium">
                      {therapist.rating}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No top therapists available</p>
            )}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-[15px] shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Services
          </h2>
          <div className="flex flex-col items-center ">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={servicesData}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {servicesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    padding: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm font-medium">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="bg-white rounded-[15px] shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF5E6] rounded-[15px] p-4">
            <div className="border-2 border-[#ce7739] rounded-[15px] p-5">
              <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">
                New Customers
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {customerInsights.newCustomers}
              </p>
              <p className="text-sm text-gray-500 font-semibold">
                Last 30 days
              </p>
            </div>
          </div>

          <div className="bg-[#f0dcba] rounded-[15px] p-4">
            <div className="border-2 border-[#8F5E0A] rounded-[15px] p-5">
              <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">
                Repeat Bookings
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {customerInsights.repeatBookings}
              </p>
              <p className="text-sm text-gray-500 font-semibold">
                Retention rate
              </p>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-[15px] p-4">
            <div className="border-2 border-[#8F5E0A] rounded-[15px] p-5">
              <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">
                Booked Value
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {customerInsights.avgBookedValue}
              </p>
              <p className="text-sm text-gray-500 font-semibold">Per Session</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
