"use client";

import { Camera, Eye, EyeOff, LockKeyhole, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useChangePasswordMutation,
  useGetAdminQuery,
  useUpdateUserProfileMutation,
} from "../redux/features/baseAPI/baseApi";
import { toast } from "sonner";

const Profile = () => {
  const baseURL = "http://10.10.13.75:3333/";
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [editableUser, setEditableUser] = useState({
    full_name: "",
    phone_number: "",
    image: "",
    email: "",
  });

  const { data: loggedInUser } = useGetAdminQuery();
  const [updateProfileChange, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, or GIF).");
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const handleEditProfile = async () => {
  //   if (isEditingProfile) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("full_name", editableUser.full_name);
  //       formData.append("phone_number", editableUser.phone_number);
  //       if (profileImage instanceof File) {
  //         formData.append("image", profileImage);
  //       }

  //       const res = await updateProfileChange({ data: formData });
  //       if (res?.data) {
  //         toast.success("Profile updated successfully!");
  //         setIsEditingProfile(false);
  //       } else {
  //         toast.error("Failed to update profile.");
  //       }
  //     } catch (error) {
  //       console.error("Update failed", error);
  //       toast.error("Something went wrong!");
  //     }
  //   } else {
  //     setEditableUser({
  //       full_name: loggedInUser?.full_name || "",
  //       phone_number: loggedInUser?.phone_number || "",
  //       image: loggedInUser?.image || "",
  //       email: loggedInUser?.email || "NA",
  //     });
  //     setIsEditingProfile(true);
  //   }
  // };

  const handleEditProfile = async () => {
    if (isEditingProfile) {
      try {
        const formData = new FormData();
        formData.append("full_name", editableUser.full_name);
        formData.append("phone_number", editableUser.phone_number);

        // Only append if new image file selected
        if (profileImage instanceof File) {
          formData.append("image", profileImage);
        }

        const res = await updateProfileChange({ data: formData });

        if (res?.data) {
          toast.success("Profile updated successfully!");
          // Update local state with latest returned image path and data
          setEditableUser({
            ...editableUser,
            image: res.data.image || editableUser.image,
          });
          setPreviewUrl(null); // reset preview after successful upload
          setProfileImage(null);
          setIsEditingProfile(false);
        } else {
          toast.error("Failed to update profile.");
        }
      } catch (error) {
        console.error("Update failed", error);
        toast.error("Something went wrong!");
      }
    } else {
      setEditableUser({
        full_name: loggedInUser?.full_name || "",
        phone_number: loggedInUser?.phone_number || "",
        image: loggedInUser?.image || "",
        email: loggedInUser?.email || "NA",
      });
      setIsEditingProfile(true);
    }
  };
  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
    setPreviewUrl(null);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleSavePassword = async (data) => {
    try {
      const res = await changePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      }).unwrap();

      console.log({ res });

      toast.success("Password changed successfully!");
      setShowChangePassword(false);
      reset();
    } catch (error) {
      console.error("Password change failed", error);
      toast.error(
        error?.data?.detail || "Failed to change password. Please try again."
      );
    }
  };

  const handleCancelPassword = () => {
    setShowChangePassword(false);
    reset();
  };

  useEffect(() => {
    if (loggedInUser) {
      setEditableUser({
        full_name: loggedInUser.full_name || "",
        phone_number: loggedInUser.phone_number || "",
        image: loggedInUser.image || "",
        email: loggedInUser.email || "NA",
      });
    }
  }, [loggedInUser]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl p-6 w-full shadow-md">
        <h2 className="text-xl border-b-2 pb-5 border-[#F0F0F0] font-bold text-gray-800 mb-6">
          Profile
        </h2>

        <div className="flex justify-between items-center">
          <div className="space-y-4 basis-6/12">
            <div className="space-y-5 py-10">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-500">Name</p>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={editableUser.full_name}
                    onChange={(e) =>
                      setEditableUser({
                        ...editableUser,
                        full_name: e.target.value,
                      })
                    }
                    className="font-medium text-gray-800 border dark:text-gray-300 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#B28D28]"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {editableUser.full_name || "N/A"}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-500">Email</p>
                <input
                  type="email"
                  disabled
                  value={editableUser.email || "N/A"}
                  className="font-medium text-gray-500 bg-gray-100 cursor-not-allowed border border-gray-300 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-500">Contact number</p>
                {isEditingProfile ? (
                  <input
                    type="tel"
                    value={editableUser.phone_number}
                    onChange={(e) =>
                      setEditableUser({
                        ...editableUser,
                        phone_number: e.target.value,
                      })
                    }
                    className="font-medium text-gray-500 dark:text-gray-300 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#B28D28]"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {loggedInUser?.phone_number || "N/A"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#a07b22] flex items-center gap-1"
              >
                <UserCog size={20} className="mb-1" />
                {isEditingProfile
                  ? isUpdating
                    ? "Saving..."
                    : "Save Changes"
                  : "Edit Profile"}
              </button>
              {isEditingProfile && (
                <button
                  onClick={handleCancelProfileEdit}
                  className="px-4 py-2 border-2 border-[#B28D28] text-[#B28D28] rounded-lg hover:bg-[#B28D28] hover:text-white"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 border-2 border-[#B28D28] text-[#B28D28] rounded-lg hover:bg-[#B28D28] hover:text-white flex items-center gap-1"
              >
                <LockKeyhole size={20} className="mb-1" />
                Change Password
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full flex items-center justify-center overflow-hidden relative mb-10">
                <img
                  src={
                    previewUrl
                      ? previewUrl
                      : editableUser.image
                      ? `${baseURL}api${editableUser.image}`
                      : "/placeholder.svg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <Camera className="text-white mx-auto" />
                    <h1 className="text-white text-sm font-medium">
                      Upload Image
                    </h1>
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {showChangePassword && (
        <div className="mt-12 bg-white rounded-xl p-6 w-full shadow-md">
          <h3 className="text-xl border-b-2 pb-5 border-[#F0F0F0] font-bold text-gray-800 mb-6">
            Change Password
          </h3>
          <form onSubmit={handleSubmit(handleSavePassword)}>
            <div className="flex items-start gap-6">
              <div className="space-y-4 flex-1 basis-4/12">
                <div className="w-1/2">
                  <label className="block text-gray-600 mb-1">
                    Current password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      className={`w-full p-2 pr-10 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#B28D28] ${
                        errors.currentPassword ? "border-red-500" : ""
                      }`}
                      {...register("currentPassword", {
                        required: "Current password is required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                      className="absolute right-2 top-2 text-gray-600 dark:text-gray-300"
                    >
                      {showCurrentPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="w-1/2">
                  <label className="block text-gray-600 mb-1">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className={`w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] ${
                        errors.newPassword ? "border-red-500" : ""
                      }`}
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value:
                            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                          message:
                            "Password must contain at least 1 number and 1 special character",
                        },
                        validate: (value) =>
                          value !== watch("currentPassword") ||
                          "New password cannot be the same as the current password",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-2 top-2 text-gray-600 dark:text-gray-300"
                    >
                      {showNewPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="w-1/2">
                  <label className="block text-gray-600 mb-1">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("newPassword") ||
                          "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-2 top-2 text-gray-600 dark:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-[#B28D28]/30 p-10 rounded-[40px] w-1/3">
                <p className="text-xl mb-3 font-semibold text-gray-800">
                  Password
                </p>
                <p className="text-base text-gray-600">
                  To create new password, you have to meet all the following
                  requirements.
                </p>
                <ul className="list-disc list-inside text-base text-gray-600 mt-2">
                  <li>Minimum 8 characters</li>
                  <li>At least 1 special character</li>
                  <li>At least 1 number</li>
                  <li>Can't be the same as previous</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#a07b22]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelPassword}
                className="px-4 py-2 border-2 border-[#B28D28] text-[#B28D28] rounded-lg hover:bg-[#B28D28] hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
          {/* <div className="flex gap-3 mt-6">
            <button
              type="submit"
              form="hook-form"
              className="px-4 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#a07b22]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelPassword}
              className="px-4 py-2 border-2 border-[#B28D28] text-[#B28D28] rounded-lg hover:bg-[#B28D28] hover:text-white"
            >
              Cancel
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
