import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useUpdateLoyaltyActionMutation } from "../redux/features/baseAPI/baseApi";

const LoyaltyActionModal = ({ isOpen, setIsOpen, selectedAction }) => {
  console.log({ selectedAction });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      points: "",
      action_type: "",
      valid_until: "",
    },
  });

  const [updateLoyaltyAction] = useUpdateLoyaltyActionMutation();

  useEffect(() => {
    if (isOpen && selectedAction) {
      reset({
        title: selectedAction.title || "",
        points: selectedAction.points || "",
        action_type: selectedAction.action_type || "",
        valid_until: selectedAction.valid_until || "",
      });
    }
  }, [isOpen, selectedAction, reset]);

  const onSubmit = async (data) => {
    try {
      await updateLoyaltyAction({
        id: selectedAction.id,
        ...data,
        points: parseInt(data.points),
      }).unwrap();
      toast.success("Loyalty action updated.");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update loyalty action.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg relative w-[600px]"
      >
        <h2 className="text-xl font-bold mb-4 dark:text-gray-900">
          Manage Loyalty Action
        </h2>

        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium dark:text-gray-900">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium dark:text-gray-900">
              Points
            </label>
            <input
              type="number"
              {...register("points", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium dark:text-gray-900">
              Action Type
            </label>
            <input
              type="text"
              {...register("action_type", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium dark:text-gray-900">
              Valid Until
            </label>
            <input
              type="date"
              {...register("valid_until", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
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
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoyaltyActionModal;
