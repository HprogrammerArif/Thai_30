import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useUpdatePromotionMutation } from "../redux/features/baseAPI/baseApi";

const DiscountModal = ({ isOpen, setIsOpen, editPromo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      code: "",
      discount_percentage: "",
      valid_until: "",
    },
  });

  const [updateDiscount] = useUpdatePromotionMutation();

  useEffect(() => {
    if (isOpen && editPromo) {
      reset({
        code: editPromo.code || "",
        discount_percentage: editPromo.discount_percentage || "",
        valid_until: editPromo.valid_until || "",
      });
    } else {
      reset();
    }
  }, [isOpen, editPromo, reset]);

  const onSubmit = async (data) => {
    try {
      if (editPromo) {
        await updateDiscount({ id: editPromo.id, data }).unwrap();
        toast.success("Discount updated successfully.");
      } else {
        await createDiscount(data).unwrap();
        toast.success("Discount created successfully.");
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg relative w-[500px]"
      >
        <h2 className="text-xl font-bold mb-4">
          {editPromo ? "Edit Discount" : "Create Discount"}
        </h2>

        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <div className="space-y-4">
          <input
            type="text"
            {...register("code", { required: true })}
            placeholder="Discount Code"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="number"
            {...register("discount_percentage", { required: true })}
            placeholder="Discount Percentage"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="date"
            {...register("valid_until", { required: true })}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isSubmitting ? "Saving..." : editPromo ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiscountModal;
