
import React from 'react';
import { FaCalendarCheck, FaDollarSign, FaStar } from 'react-icons/fa';
import { TbPhysotherapist } from 'react-icons/tb';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Data for Revenue Overview (Line Chart)
  const revenueData = [
    { month: 'Jan', revenue: 10 },
    { month: 'Feb', revenue: 8 },
    { month: 'Mar', revenue: 12 },
    { month: 'Apr', revenue: 15 },
    { month: 'May', revenue: 18 },
    { month: 'Jun', revenue: 14 },
    { month: 'Jul', revenue: 10 },
    { month: 'Aug', revenue: 16 },
    { month: 'Sep', revenue: 20 },
    { month: 'Oct', revenue: 18 },
    { month: 'Nov', revenue: 15 },
    { month: 'Dec', revenue: 22 },
  ];

  // Data for Top Services (Pie Chart)
  const servicesData = [
    { name: 'Thai Massage', value: 62.1 },
    { name: 'Stone Massage', value: 22.8 },
    { name: 'Swedish Massage', value: 13.9 },
  ];

  const COLORS = ['#8B5A2B', '#D2B48C', '#F5DEB3'];

  // Data for Top Performing Therapists
  const therapists = [
    { name: 'Esthera Jackson', completionRate: '98%', rating: 4.8, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
    { name: 'Esthera Jackson', completionRate: '95%', rating: 4.6, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop' },
    { name: 'Esthera Jackson', completionRate: '94%', rating: 4.5, image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' },
  ];

  // Data for Customer Insights
  const customerInsights = {
    newCustomers: 245,
    repeatBookings: '68%',
    avgBookedValue: '$120',
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
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
              $34672 <span className="text-sm font-semibold text-green-500">+5%</span>
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaDollarSign className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Bookings</h1>
            <h1 className="font-bold text-2xl text-black">13</h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <FaCalendarCheck className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Active Therapists</h1>
            <h1 className="font-bold text-xl text-black">56</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <TbPhysotherapist className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Customer's Avg Rating</h1>
            <h1 className="font-bold text-xl text-black">4.8/5.0</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaStar className="text-white font-bold" size={24} />
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-[15px] shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
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
              <Line type="monotone" dataKey="revenue" stroke="#B28D28" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Therapists and Top Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performing Therapists */}
        <div className="bg-white rounded-[15px] shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Therapists</h2>
          <div className="space-y-4">
            {therapists.map((therapist, index) => (
              <div key={index} className="flex items-center justify-between p-5 bg-[#f1f3f3] rounded-[15px]">
                <div className="flex items-center gap-3">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{therapist.name}</p>
                    <p className="text-sm text-gray-500">Completion rate <span className='text-gray-900'>{therapist.completionRate}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar size={16} />
                  <span className="text-gray-800 font-medium">{therapist.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-[15px] shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Services</h2>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={servicesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {servicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    padding: '8px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="bg-white rounded-[15px] shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  ">
          <div className="bg-[#FFF5E6] rounded-[15px] p-4 ">
           <div className='border-2 border-[#ce7739] rounded-[15px] p-5'>
           <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">New Customers</p>
            <p className="text-2xl font-bold text-gray-800">{customerInsights.newCustomers}</p>
            <p className="text-sm text-gray-500 font-semibold">Last 30 days</p>
           </div>
          </div>

          <div className="bg-[#f0dcba]  rounded-[15px] p-4 ">
           <div className='border-2 border-[#8F5E0A]  rounded-[15px] p-5'>
           <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">Repeat Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{customerInsights.repeatBookings}</p>
            <p className="text-sm text-gray-500 font-semibold">Retention rate</p>
           </div>

          </div>
          <div className="bg-yellow-100 rounded-[15px] p-4 ">
           <div className='border-2 border-[#8F5E0A]  rounded-[15px] p-5'>
           <p className="text-[#6B6D6D] mb-2 font-semibold text-xl">New Customers</p>
            <p className="text-2xl font-bold text-gray-800">{customerInsights.avgBookedValue}</p>
            <p className="text-sm text-gray-500 font-semibold">Per Session</p>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;