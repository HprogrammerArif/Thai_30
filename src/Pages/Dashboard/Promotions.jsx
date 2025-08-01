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
  useDeletePromotionMutation,
  useGetAnalyticsDataQuery,
  useGetLoyaltyActionsQuery,
  useGetLoyaltyProgramQuery,
  useGetPromotionsDataQuery,
  useGetReferralProgramManageQuery,
  useGetReferralSummaryQuery,
  useUpdatePromotionMutation,
  useUpdateReferralProgramManageMutation,
} from "../redux/features/baseAPI/baseApi";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { format } from "date-fns";
import ReferralProgramModal from "./ReferralProgramModal";
import LoyaltyProgramModal from "./LoyaltyProgramModal";
import DiscountModal from "./DiscountModal";
import LoyaltyActionModal from "./LoyaltyActionModal";

const Promotions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isDsicountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [editPromo, setEditPromo] = useState(null);

  const { data: promotionsData, isLoading } = useGetPromotionsDataQuery();
  const [addPromotion, { isLoading: isLoadingAddPromotion }] =
    useAddPromotionMutation();

  const { data: promotionInfoData } = useGetAnalyticsDataQuery();
  console.log({ promotionInfoData });

  console.log({ promotionsData });

  const { data: referralSummaryData, isLoading: isLoadingReferralSummary } =
    useGetReferralSummaryQuery();

  const { data: referralProgramManage, isLoading: isLoadingReferralProgram } =
    useGetReferralProgramManageQuery();

  const { data: loyaltyProgramData, isLoading: loyaltyProgramLoading } =
    useGetLoyaltyProgramQuery();

  const { data: loyaltyActionData, isLoading: loyaltyActionLoading } =
    useGetLoyaltyActionsQuery();

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
      code: title.trim(), // remove spaces
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

  console.log({ loyaltyActionData });

  // RTK Query hooks
  const [deletePromotion] = useDeletePromotionMutation(); // <-- replace with your actual hook
  const [updatePromotion] = useUpdatePromotionMutation(); // optional if you're editing in modal

  // const handleDeletePromo = async (id) => {
  //   try {
  //     await deletePromotion(id).unwrap();
  //     toast.success("Discount code deleted.");
  //   } catch (err) {
  //     toast.error("Failed to delete code.");
  //   }
  // };

  const confirmDeletePromo = (id) => {
    toast.custom((t) => (
      <div className="bg-white border shadow-md rounded-lg px-6 py-4 flex flex-col items-start space-y-4 w-[300px]">
        <p className="text-sm text-gray-800">
          Are you sure you want to delete this discount code?
        </p>

        <div className="flex gap-3 self-end">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // close toast
              try {
                await deletePromotion(id).unwrap();
                toast.success("Discount code deleted.");
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete code.");
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

  if (
    isLoadingReferralSummary |
    isLoadingReferralProgram |
    loyaltyProgramLoading |
    loyaltyActionLoading
  ) {
    return "Loading....";
  }

  return (
    <section>
      <Toaster />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Total Revenue</h1>
            <h1 className="font-bold text-xl text-black">
              $ {promotionInfoData?.stats?.total_revenue}
              <span className="text-sm font-semibold text-green-500">+5%</span>
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaDollarSign className="text-white font-bold" size={24} />
          </div>
        </div>

        {/* <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Active Promotions</h1>
            <h1 className="font-bold text-2xl text-black">15</h1>
          </div>
          <div className="bg-[#B28D28] p-3 rounded-xl">
            <BadgePercent className="text-white" size={24} />
          </div>
        </div> */}

        {/* <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Redemption Rate</h1>
            <h1 className="font-bold text-xl text-black">45</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <TbReceiptDollar className="text-white font-bold" size={24} />
          </div>
        </div> */}

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <h1 className="text-gray-800 font-medium">Avg Order Value</h1>
            <h1 className="font-bold text-xl text-black">
              $ {promotionInfoData?.customer_insights?.avg_booked_value}{" "}
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaStar className="text-white font-bold" size={24} />
          </div>
        </div>
      </div>

      {/* Promotional Tools Section */}
      <div className="rounded-[15px]">
        {/* <div className="flex justify-between items-center mb-6 bg-white shadow-md p-6 rounded-[15px]">
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
        </div> */}

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
              {promotionsData?.map((code) => (
                <div
                  key={code.id}
                  className="bg-gray-100 rounded-[10px] p-4 gap-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium text-gray-900">{code.code}</p>
                    <p className="font-medium text-green-500">
                      {code.discount_percentage} % OFF
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{code.valid_until}</p>
                    <div className="flex gap-4">
                      <Edit
                        size={18}
                        className="cursor-pointer text-blue-500"
                        onClick={() => {
                          setEditPromo(code);
                          setIsDiscountModalOpen(true);
                        }}
                      />
                      <Trash
                        size={18}
                        className="cursor-pointer text-red-500"
                        onClick={() => confirmDeletePromo(code.id)}
                      />
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
                  {referralSummaryData?.total_referrals}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Active Rewards</p>
                <p className="font-medium text-gray-900">
                  {referralSummaryData?.active_rewards}
                </p>
              </div>
              <div className="bg-[#B28D28]/20 rounded-[10px] p-4">
                <p className="text-[#B28D28] font-semibold">Current Reward</p>
                <p className="font-medium text-gray-900">
                  Referee: {referralProgramManage?.referee_reward} $
                </p>
                <p className="font-medium text-gray-900">
                  Referrer: {referralProgramManage?.referrer_reward} $
                </p>
              </div>
            </div>
            <button
              className="text-[#B28D28] hover:text-[#9a7b23] transition-colors mt-4"
              onClick={() => setIsOpen(true)}
            >
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
              <div className="bg-[#FAE08C]/20 rounded-[10px] p-4">
                <p className="text-[#FFA71A] font-semibold">Current Reward</p>

                <p className="font-medium text-gray-900">
                  1 point = ${loyaltyProgramData?.spent_per_point} spent
                </p>
                <p className="font-medium text-gray-900">
                  100 Points = ${loyaltyProgramData?.discount_per_100_points}{" "}
                  discount
                </p>
                <button
                  type="button"
                  onClick={() => setIsLoyaltyModalOpen(true)} // Make sure this sets modal open state
                  className="mt-4 px-4 py-2 bg-[#B28D28] text-white rounded-md hover:bg-[#e89d16] transition-colors shadow"
                >
                  Manage Program
                </button>
              </div>

              <div className="bg-[#FAE08C]/20 rounded-[10px] p-4">
                <p className="text-[#FFA71A] font-semibold">Current Actions</p>

                {loyaltyActionData?.map((actionData) => (
                  <div key={actionData.id} className="mb-4">
                    <p className="font-medium text-gray-900">
                      Title: {actionData?.title}
                    </p>
                    <p className="font-medium text-gray-900">
                      Status: {actionData?.action_type}
                    </p>
                    <p className="font-medium text-gray-900">
                      Points: {actionData?.points}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedAction(actionData);
                        setIsLoyaltyOpen(true);
                      }}
                      className="text-[#FFA719] hover:text-[#9a7b23] transition-colors mt-2"
                    >
                      Manage program
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoyaltyActionModal
        isOpen={isLoyaltyOpen}
        setIsOpen={setIsLoyaltyOpen}
        selectedAction={selectedAction}
      />

      {isDsicountModalOpen && (
        <DiscountModal
          isOpen={isDsicountModalOpen}
          setIsOpen={setIsDiscountModalOpen}
          editPromo={editPromo}
        />
      )}

      {isLoyaltyModalOpen && (
        <LoyaltyProgramModal
          isOpen={isLoyaltyModalOpen}
          setIsOpen={setIsLoyaltyModalOpen}
          loyaltyProgramData={loyaltyProgramData}
        />
      )}

      {/* Modal for reffrall */}

      <ReferralProgramModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        referralProgramManage={referralProgramManage}
      />

      {/* DaisyUI Modal for New Promotion */}
      <dialog id="new_promotion_modal" className="modal ">
        <div className="modal-box p-6 rounded-lg shadow-lg max-w-3xl py-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">New Promotion</h3>
            <form method="dialog">
              <button className="text-gray-500 dark:text-gray-50 hover:text-gray-700 text-2xl">
                ×
              </button>
            </form>
          </div>

          {/* Form start */}
          <form
            onSubmit={handleSubmit(onSubmitPromotion)}
            className="space-y-4"
          >
            {/* Promotion Title */}
            <div>
              <label className="block text-gray-600 mb-1 dark:text-gray-50">
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
              <label className="block text-gray-600 mb-1 dark:text-gray-50">
                Promotion Type
              </label>
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
              <label className="block  text-gray-600 mb-1 dark:text-gray-50">
                Validity
              </label>
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
              <label className="block  text-gray-600 mb-1 dark:text-gray-50">
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
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 dark:text-gray-50 hover:bg-gray-100 transition-colors"
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
