import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateReferralProgramManageMutation } from "../redux/features/baseAPI/baseApi";
import { toast, Toaster } from "sonner";

const ReferralProgramModal = ({ isOpen, setIsOpen, referralProgramManage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      referrer_reward: "",
      referee_reward: "",
      valid_till: "",
    },
  });

  const [updateReferralProgram] = useUpdateReferralProgramManageMutation();

  // Reset form with default values when modal opens
  useEffect(() => {
    if (isOpen && referralProgramManage) {
      reset({
        referrer_reward: referralProgramManage.referrer_reward || "",
        referee_reward: referralProgramManage.referee_reward || "",
        valid_till: referralProgramManage.valid_till || "",
      });
    }
  }, [isOpen, referralProgramManage, reset]);

  const onSubmit = async (data) => {
    try {
      await updateReferralProgram({
        referrer_reward: parseFloat(data.referrer_reward),
        referee_reward: parseFloat(data.referee_reward),
        is_active: true,
        // valid_till: data.valid_till,
      }).unwrap();
      toast.success("Referral program updated successfully.");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update referral program.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:text-gray-400">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg relative w-[600px]"
      >
        <h2 className="text-xl font-bold mb-4 dark:text-gray-900">
          Referral Program
        </h2>

        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <div className="space-y-4">
          {/* Referrer & Referee */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="w-1/3 font-medium dark:text-gray-900">
                Referrer Value ($)
              </label>
              <input
                type="number"
                {...register("referrer_reward", { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-1/3 font-medium dark:text-gray-900">
                Referee Value ($)
              </label>
              <input
                type="number"
                {...register("referee_reward", { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Valid Date */}
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium dark:text-gray-900">
              Valid Date
            </label>
            <input
              type="date"
              {...register("valid_till", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-[#B28D28] text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferralProgramModal;
