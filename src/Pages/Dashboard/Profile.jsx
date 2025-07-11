"use client";

import { Camera, LockKeyhole, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAdminQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../redux/features/baseAPI/baseApi";
import { toast } from "sonner";

const Profile = () => {
  const baseURL = "http://10.10.13.75:3333/";
  const [user, setUser] = useState({
    full_name: "",
    phone_number: "",
    image: "",
  });

  const { data: loggedInUser } = useGetAdminQuery();
  // const { data: loggedInUser, isLoading } = useGetUserProfileQuery();
  const [updateProfileChange, { data, isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const [profileImage, setProfileImage] = useState(null); // file to upload
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editableUser, setEditableUser] = useState({
    full_name: "",
    phone_number: "",
    image: "",
    email: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
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

      // Set file to upload later
      setProfileImage(file);

      // Generate preview using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // set base64 preview string
      };
      reader.readAsDataURL(file); // read as base64
    }
  };

  const handleEditProfile = async () => {
    try {
      if (isEditingProfile) {
        const formData = new FormData();

        formData.append("full_name", editableUser.full_name);
        formData.append("phone_number", editableUser.phone_number);

        if (profileImage instanceof File) {
          formData.append("image", profileImage); // only append if file uploaded
        }

        const res = await updateProfileChange({ data: formData });

        console.log({ loggedInUser, res });

        if (res?.data) {
          toast.success("Profile updated successfully!");
          setIsEditingProfile(false);
        } else {
          toast.error("Failed to update profile.");
        }
      } else {
        // Enter edit mode
        setEditableUser({
          full_name: loggedInUser?.full_name || "",
          phone_number: loggedInUser?.phone_number || "",
        });
        setIsEditingProfile(true);
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Something went wrong!");
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleSavePassword = (data) => {
    console.log("Form Data:", data);
    setShowChangePassword(false);
    reset();
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
      {/* Profile Card */}
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
                    className="font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#B28D28] cursor-pointer"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {editableUser.full_name || "N/A"}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-500">Email</p>
                {isEditingProfile ? (
                  <input
                    type="email"
                    disabled
                    value={editableUser.email || "N/A"}
                    className="font-medium text-gray-500 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#B28D28]"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {editableUser.email || "N/A"}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-beanatween">
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
                    className="font-medium text-gray-500 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#B28D28]"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {loggedInUser?.phone_number}
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
                {isEditingProfile ? "Save Changes" : "Edit Profile"}
              </button>
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
                    previewUrl ||
                    `${baseURL}api${loggedInUser?.image}` ||
                    "/placeholder.svg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

                {/* src={`${baseURL}api${adminData?.image}`} */}

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

      {/* Separate Div for Change Password Form */}
      {showChangePassword && (
        <div className="mt-12 bg-white rounded-xl p-6 w-full shadow-md">
          <h3 className="text-xl border-b-2 pb-5 border-[#F0F0F0] font-bold text-gray-800 mb-6">
            Change Password
          </h3>
          <form
            onSubmit={handleSubmit(handleSavePassword)}
            className="flex items-start gap-6"
          >
            {/* Form Inputs */}
            <div className="space-y-4 flex-1 basis-4/12">
              <div>
                <label className="block text-gray-600 mb-1">
                  Current password
                </label>
                <input
                  type="password"
                  className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] ${
                    errors.currentPassword ? "border-red-500" : ""
                  }`}
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">New password</label>
                <input
                  type="password"
                  className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
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
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B28D28] ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Requirements */}
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
          </form>

          {/* Save and Cancel Buttons */}
          <div className=" flex gap-3">
            <button
              onClick={handleCancelPassword}
              type="submit"
              form="hook-form"
              className="px-4 py-2 bg-[#B28D28] text-white rounded-lg hover:bg-[#a07b22]"
            >
              Save
            </button>
            <button className="px-4 py-2 border-2 border-[#B28D28] text-[#B28D28] rounded-lg hover:bg-[#B28D28] hover:text-white">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
