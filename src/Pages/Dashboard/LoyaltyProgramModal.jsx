import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import {
  useDeleteLoyaltyProgramMutation,
  useUpdateLoyaltyProgramMutation,
} from "../redux/features/baseAPI/baseApi";

const LoyaltyProgramModal = ({ isOpen, setIsOpen, loyaltyProgramData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      spent_per_point: "",
      discount_per_100_points: "",
    },
  });

  console.log({ loyaltyProgramData });

  const [updateLoyaltyProgram] = useUpdateLoyaltyProgramMutation();

  useEffect(() => {
    if (isOpen && loyaltyProgramData) {
      reset({
        spent_per_point: loyaltyProgramData.spent_per_point || "",
        discount_per_100_points:
          loyaltyProgramData.discount_per_100_points || "",
      });
    }
  }, [isOpen, loyaltyProgramData, reset]);

  const onSubmit = async (data) => {
    try {
      await updateLoyaltyProgram({
        id: loyaltyProgramData.id, // ✅ pass the id here
        data: {
          spent_per_point: parseFloat(data.spent_per_point),
          discount_per_100_points: parseFloat(data.discount_per_100_points),
          is_active: true,
        },
      }).unwrap();

      toast.success("Loyalty program updated.");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLoyaltyProgram().unwrap(); // Assuming no ID needed
      toast.success("Loyalty program deleted.");
      setIsOpen(false);
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:text-gray-900">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg relative w-[600px]"
      >
        <h2 className="text-xl font-bold mb-4">Manage Loyalty Program</h2>

        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium">Spent per Point ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("spent_per_point", { required: true })}
              className="border border-gray-300 dark:text-gray-100 p-2 rounded w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium">
              Discount per 100 Points ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("discount_per_100_points", { required: true })}
              className="border border-gray-300 dark:text-gray-100 p-2 rounded w-full"
            />
          </div>
        </div>

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
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoyaltyProgramModal;
