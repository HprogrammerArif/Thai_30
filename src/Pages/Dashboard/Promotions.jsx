import { BadgePercent, Calendar, Delete, Edit, Trash } from "lucide-react";
import React, { useState } from "react";

import {
  FaDollarSign,
  FaStar,
  FaUsers,
  FaCrown,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import { TbReceiptDollar } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import {
  useAddPromotionMutation,
  useGetPromotionsDataQuery,
  useGetReferralSummaryQuery,
} from "../redux/features/baseAPI/baseApi";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { format } from "date-fns";

const Promotions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const { data: promotionsData, isLoading } = useGetPromotionsDataQuery();
  const [addPromotion, { isLoading: isLoadingAddPromotion }] =
    useAddPromotionMutation();

    const { data: referralSummaryData, isLoading: isLoadingReferralSummary } = useGetReferralSummaryQuery();

  // const discountCodes = [
  //   { code: 'SUMMER25', discount: '25% OFF', expiry: 'Apr 30, 2025' },
  //   { code: 'WELCOME10', discount: '10% OFF', expiry: 'Never expires' },
  // ];
  const openModal = () => {
    setIsModalOpen(true);
    document.getElementById("new_promotion_modal").showModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

const onSubmitPromotion = async (data) => {
  const { title, discountValue, validity } = data;

  const payload = {
  code: title.trim(),  // remove spaces
  discount_percentage: Number(discountValue),
  valid_until: validity,
};

  try {
    const res = await addPromotion(payload).unwrap(); // ✅ directly call the mutation
    console.log("Promotion added:", res);
    toast.success("Promotion saved successfully!");
    reset();
    closeModal();
  } catch (error) {
    console.error("Error adding promotion:", error);
    toast.error("Something went wrong!");
  }
};


  const referralProgram = {
    totalReferrals: 1234,
    activeRewards: 456,
    currentReward: "$20 referral, $10 referee",
  };

  console.log({referralSummaryData})



  const loyaltyProgram = {
    activeMembers: 3456,
    currentReward: "100 points = $5 discount",
  };



  return (
    <section>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Revenue</h1>
            <h1 className="font-bold text-xl text-black">
              $34672{" "}
              <span className="text-sm font-semibold text-green-500">+5%</span>
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaDollarSign className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Active Promotions</h1>
            <h1 className="font-bold text-2xl text-black">15</h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <BadgePercent className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Redemption Rate</h1>
            <h1 className="font-bold text-xl text-black">45</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <TbReceiptDollar className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Avg Order Value</h1>
            <h1 className="font-bold text-xl text-black">$89</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaStar className="text-white font-bold" size={24} />
          </div>
        </div>
      </div>

      {/* Promotional Tools Section */}
      <div className="rounded-[15px]">
        <div className="flex justify-between items-center mb-6 bg-white shadow-md p-6 rounded-[15px]">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Promotional Tools
            </h2>
            <p className="text-gray-500">
              Create and manage marketing incentives
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-[#B28D28] text-white px-4 py-2 rounded-full hover:bg-[#9a7b23] transition-colors flex items-center gap-2"
          >
            <span className="text-lg">
              <FaPlus size={14} />
            </span>{" "}
            New Promotion
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Discount Codes */}
          <div className="bg-white rounded-[15px] shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdDiscount size={24} className="text-[#B28D28]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Discount Codes
              </h3>
            </div>
            <div className="space-y-4">
              {promotionsData?.map((code, index) => (
                <div key={index} className="bg-gray-100 rounded-[10px] p-4 gap-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium text-gray-900">{code.code}</p>
                    <p className="font-medium text-green-500">
                      {code.discount_percentage} % OFF
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{code.valid_until}</p>
                  <div className="flex gap-4">
                    <p className="text-sm text-gray-500 cursor-pointer"><Edit size={18} /></p>
                    <p className="text-sm text-gray-500 cursor-pointer"><Trash size={18} /></p>
                  </div>
                  </div>
                </div>
              ))} 
            </div>
            <button
              onClick={openModal}
              className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4"
            >
              {/* <span className="text-lg"><FaPlus size={14} /></span> */}
              Manage
            </button>
          </div>

          {/* Referral Program */}
          <div className="bg-white rounded-[15px] shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUsers size={24} className="text-[#B0652E]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Referral Program
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Total Referrals</p>
                <p className="font-medium text-gray-900">
                  {referralProgram.totalReferrals}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Active Rewards</p>
                <p className="font-medium text-gray-900">
                  {referralProgram.activeRewards}
                </p>
              </div>
              <div className="bg-[#B28D28]/20 rounded-[10px] p-4">
                <p className="text-[#B28D28] font-semibold">Current Reward</p>
                <p className="font-medium text-gray-900">
                  {referralProgram.currentReward}
                </p>
              </div>
            </div>
            <button className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4">
              Configure rules
            </button>
          </div>

          {/* Loyalty Program */}
          <div className="bg-white rounded-[15px] shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaCrown size={24} className="text-[#EFCA31]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Loyalty Program
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Active Members</p>
                <p className="font-medium text-gray-900">
                  {loyaltyProgram.activeMembers}
                </p>
              </div>
              <div className="bg-[#FAE08C]/20 rounded-[10px] p-4">
                <p className="text-[#FFA71A] font-semibold">Current Reward</p>
                <p className="font-medium text-gray-900">
                  {loyaltyProgram.currentReward}
                </p>
              </div>
            </div>
            <button className="text-[#FFA719] hover:text-[#9a7b23] transition-colors mt-4">
              Manage program
            </button>
          </div>
        </div>
      </div>

      

      {/* DaisyUI Modal for New Promotion */}
      <dialog id="new_promotion_modal" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl py-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">New Promotion</h3>
            <form method="dialog">
              <button className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>

          {/* Form start */}
          <form onSubmit={handleSubmit(onSubmitPromotion)} className="space-y-4">
            {/* Promotion Title */}
            <div>
              <label className="block text-gray-600 mb-1">
                Promotion Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Enter promotion title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                required
              />
            </div>

            {/* Promotion Type */}
            <div>
              <label className="block text-gray-600 mb-1">Promotion Type</label>
              <select
                {...register("type", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                required
              >
                <option value="" disabled>
                  Select promotion type
                </option>
                <option value="discount">Discount</option>
              </select>
            </div>

            {/* Validity */}
            <div>
              <label className="block  text-gray-600 mb-1">Validity</label>
              <div className="relative">
                <input
                  type="date"
                  {...register("validity", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                  required
                />
                {/* <Calendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B28D28]"
                  size={20}
                /> */}
              </div>
            </div>

            {/* Discount Value */}
            <div>
              <label className="block  text-gray-600 mb-1">
                Discount Value
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  {...register("discountValue", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Enter discount value"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                  required
                />
                <select
                  {...register("discountType", { required: true })}
                  className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] focus:border-transparent"
                >
                  <option value="percent">Percent</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-8">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("new_promotion_modal")?.close();
                  reset();
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
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

export default Promotions;
