import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrlFixt = "https://backend.thaimassagesnearmeapp.com/";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.thaimassagesnearmeapp.com/",

    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("access_token");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userData?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    "User",
    "Therapist",
    "PendingTherapists",
    "Booking",
    "Customer",
    "PendingPayout",
    "Transaction",
    "get-massage-types",
    "massage-add-ons",
    "admin-request",
    "dispute-settings",
    "profile",
    "admin",
    "referrals",
    "discount-program",
    "promotions",
    "transaction-history",
    ,
    "massage-add-ons",
    ,
    "massage-types",
    "customers",
    "therapists",
    "bookings",
    "pending-payout",
    "pending-therapists",
    "Messages",
    "referrals-manage",
    "therapists-background",
    "loyalty-program",
    "therapists-background-checks",
    "dispute-settings-delete",
    "support-ticket",
    "loyalty-actions",
    "dispute-settings-data",
    "dispute-settings-delete",
  ],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (roomId) => `api/chat/messages/${roomId}/`,
      providesTags: (result, error, roomId) => [
        { type: "Messages", id: roomId },
      ],
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: `api/chat/send/`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: (result, error, message) => [
        { type: "Messages", id: message.roomId },
      ],
    }),

    //authentication
    createUser: builder.mutation({
      query: (payload) => ({
        url: "auth/normal_signup/",
        method: "POST",
        body: payload,
      }),
    }),

    //login user

    loginUser: builder.mutation({
      query: (userData) => ({
        url: "auth/login/",
        method: "POST",
        body: userData,
        providesTags: ["User"],
      }),
    }),

    //Forget password
    requestPasswordReset: builder.mutation({
      query: (body) => ({
        url: "auth/forgot-password/",
        method: "POST",
        body,
      }),
    }),

    //Verify OTP
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "auth/verify-otp/",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "auth/reset-password/",
        method: "POST",
        body,
      }),
    }),

    // change password
    changePassword: builder.mutation({
      query: (body) => ({
        url: "auth/change-password/",
        method: "POST",
        body,
      }),
    }),

    //getadmin
    getAdmin: builder.query({
      query: () => "api/admin/profile/",
      providesTags: ["admin"],
    }),

    //admin_home
    adminInfo: builder.query({
      query: () => "/api/admin/dashboard/summary/",
      invalidatesTags: ["admin"],
    }),

    //recent bookings
    recentBookings: builder.query({
      query: () => "api/recent-booking/",
      invalidatesTags: ["admin"],
    }),

    getEarningSummary: builder.query({
      query: (timePeriod) => `api/earning-summary/?time_period=${timePeriod}`,
    }),

    //pending therapist
    pendingTherapist: builder.query({
      query: () => "/api/pending-therapist-approvals/",
      providesTags: ["PendingTherapists"],
    }),

    // approveTherapist: builder.mutation({
    //   query: (profileId) => ({
    //     url: `api/admin/therapist/documents/${profileId}/`,
    //     method: "PATCH",

    //   }),
    //   invalidatesTags: ["PendingTherapists"],
    // }),

    approveTherapist: builder.mutation({
      query: ({ profileId, body }) => ({
        url: `api/admin/therapist/documents/${profileId}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PendingTherapists"],
    }),

    //reject therapist
    rejectTherapist: builder.mutation({
      query: (profileId) => ({
        url: `api/admin/therapist/documents/${profileId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["PendingTherapists"],
    }),

    deleteTherapist: builder.mutation({
      query: (therapistId) => ({
        url: `api/admin/therapists/${therapistId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Therapist"],
    }),

    //pending payout section
    getPendingPayout: builder.query({
      query: () => "api/withdrawal/all/",
      providesTags: ["PendingPayout"],
    }),

    //pending payout approval
    pendingPayoutApproval: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/withdrawal/update/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PendingPayout"],
    }),

    //getMassageType
    getMassageType: builder.query({
      query: () => "api/massage-types/",
      providesTags: ["get-massage-types"],
    }),

    // UPDATE MESSAGE TYPE
    updateMassageType: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/massage-types/${id}/`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["get-massage-types"],
    }),
    // api/massage-add-ons/<int:id>/</int:id>
    //ADD MESSAGE
    addMassageType: builder.mutation({
      query: (formData) => ({
        url: "api/massage-types/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["get-massage-types"],
    }),

    //get Therapist details
    getTherapistDetails: builder.query({
      query: (query) =>
        `api/admin/therapists/?query=${encodeURIComponent(query)}`,
      providesTags: ["Therapist"],
    }),

    getCustomersDetails: builder.query({
      query: (query) =>
        `api/admin/customers/?query=${encodeURIComponent(query)}`,
      providesTags: ["Customer"],
    }),

    //gettherapist details
    getTherapistDetailsInfo: builder.query({
      query: (id) => `api/admin/therapists/${id}/`,
    }),

    getCustomerDetailsInfo: builder.query({
      query: (id) => `api/admin/customers/${id}/`,
    }),

    //bookings
    getAllBookings: builder.query({
      query: () => "api/all_bookings/",
      providesTags: ["Booking"],
    }),

    // booking schedual
    updateBookingSchedule: builder.mutation({
      query: ({ bookingId, data }) => ({
        url: `api/manage_bookings/${bookingId}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),

    //get details of booking
    getBookingDetails: builder.query({
      query: (bookingId) => `api/admin/booking-detail/${bookingId}/`,
      providesTags: ["Booking"],
    }),

    //delete booking
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `api/manage_bookings/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),

    //transaction history
    getTransactionHistory: builder.query({
      query: () => "api/admin/transactions/",
      providesTags: ["Transaction"],
    }),

    //transaction history details
    getTransactionHistoryDetails: builder.query({
      query: (selectedTransactionId) =>
        `api/admin/transactions/${selectedTransactionId}/`,
      providesTags: ["Transaction"],
    }),

    //delete customer and therapist
    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: `api/admin/customers/${customerId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),

    //analytics data
    getAnalyticsData: builder.query({
      query: () => "api/admin_dashboard_analytics_view/",
    }),

    // ROLES AND PERMISSION

    //new admin request
    getNewAdminRequest: builder.query({
      query: () => "api/admin-requests/",
      providesTags: ["admin-request"],
    }),

    // ASSIGN ROLE
    assignRoleInAdminRequest: builder.mutation({
      query: ({ body, id }) => ({
        url: `api/admin-requests/${id}/approve/`,
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["admin-request"],
    }),

    //reject ADMIN REQUEST
    rejectAdminRequest: builder.mutation({
      query: (id) => ({
        url: `api/admin-requests/${id}/reject/`,
        method: "POST",
      }),
      invalidatesTags: ["admin-request"],
    }),

    //Get Therapist Background

    getTherapistData: builder.query({
      query: () => "api/admin/therapists-background/",
      providesTags: ["therapists-background"],
    }),

    //ADD ONE
    //ADD ONE request
    getAddOneData: builder.query({
      query: () => "api/massage-add-ons/",
      providesTags: ["massage-add-ons"],
    }),
    // UPDATE add one request
    updateAddOneData: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/massage-add-ons/${id}/`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["massage-add-ons"],
    }),

    //post ADD one data
    postAddOneData: builder.mutation({
      query: (formData) => ({
        url: "api/massage-add-ons/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["massage-add-ons"],
    }),

    //PROFILE UPDATE
    // UPDATE PROFILE
    // updateUserProfile: builder.mutation({
    //   query: ({ id, formData }) => ({
    //     url: `api/massage-add-ons/${id}`,
    //     method: "PATCH",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["massage-add-ons"],
    // }),

    //DISPUTE
    //ADD ONE request
    getDisputeData: builder.query({
      query: () => "dispute/dispute-settings/",
      providesTags: ["dispute-settings"],
    }),

    //post ADD one data

    //PROFILE

    //GET PROFILE
    getUserProfile: builder.query({
      query: () => "auth/get_user_profile/",
      providesTags: ["profile"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ data }) => ({
        url: "auth/update_user_profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile", "admin"],
    }),

    // PROMOTIONS
    getPromotionsData: builder.query({
      query: () => "api/discount-program/summary/",
      providesTags: ["discount-program"],
    }),

    //ADD promotion
    addPromotion: builder.mutation({
      query: (payload) => ({
        url: `api/discount-program/manage/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["discount-program"],
    }),

    // referrals/summary/

    getReferralSummary: builder.query({
      query: () => "api/referrals/summary/",
      providesTags: ["referrals"],
    }),
    getReferralProgramManage: builder.query({
      query: () => "api/referral-program/manage/",
      providesTags: ["referrals-manage"],
    }),
    updateReferralProgramManage: builder.mutation({
      query: (data) => ({
        url: "api/referral-program/manage/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["referrals-manage"],
    }),

    //loyality program

    getLoyaltyProgram: builder.query({
      query: () => "api/loyalty/program/",
      providesTags: ["loyalty-program"],
    }),

    getLoyaltyActions: builder.query({
      query: () => "api/loyalty/action/",
      providesTags: ["loyalty-actions"],
    }),

    updateLoyaltyProgram: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/loyalty/program/`, // <-- use backticks
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["loyalty-program"],
    }),

    deleteLoyaltyProgram: builder.mutation({
      query: () => ({
        url: "api/loyalty-program/manage/",
        method: "DELETE",
      }),
      invalidatesTags: ["loyalty-program"],
    }),

    updateLoyaltyAction: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `api/loyalty/action/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["loyalty-actions", "loyalty-program"],
    }),

    // PATCH - update discount
    updatePromotion: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/discount-code/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["discount-program"],
    }),

    // DELETE - delete discount
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `api/discount-code/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["discount-program"],
    }),

    //therapist
    getTherapistBackgroundData: builder.query({
      query: () => "api/therapists/background-checks/",
      providesTags: ["therapists-background-checks"],
    }),

    //reject ADMIN REQUEST
    getSingleTherapistBackgroundData: builder.query({
      query: (id) => `api/admin/therapists/${id}/`,
    }),

    // in your baseAPI or api slice
    deactivateTherapist: builder.mutation({
      query: (therapistId) => ({
        url: `api/admin/deactivate_therapist/${therapistId}/`,
        method: "PATCH", // or PATCH/PUT depending on your backend
      }),
      invalidatesTags: ["therapists-background-checks"],
    }),

    //support ticket
    getSupportTicket: builder.query({
      query: () => `dispute/support-tickets/`,
      providesTags: ["support-ticket"],
    }),

    //support ticket details
    getSupportTicketDetails: builder.query({
      query: (ticketId) => `dispute/support-tickets/${ticketId}/`,
      providesTags: ["support-ticket"],
    }),

    // getDisputeSettings
    getDisputeSettings: builder.query({
      query: () => "dispute/dispute-settings/",
      providesTags: ["dispute-settings-data"],
    }),

    // deleteDisputeSetting
    deleteDisputeSetting: builder.mutation({
      query: (id) => ({
        url: `dispute/dispute-settings/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "dispute-settings-delete",
        "dispute-settings-data",
        "dispute-settings",
      ],
    }),

    createDisputeSetting: builder.mutation({
      query: (formData) => ({
        url: "dispute/dispute-settings/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["dispute-settings", "dispute-settings-data"],
    }),

    // get dispute settings
    // getDisputes: builder.query({
    //   query: (status = "pending") => `dispute/admin/disputes/?status=${status}`,
    //   providesTags: ["Disputes"],
    // }),

    getDisputesHomeData: builder.query({
      query: (status = "") =>
        status
          ? `dispute/admin/disputes/?status=${status}`
          : "dispute/admin/disputes/",
      providesTags: ["Disputes"],
    }),

    getDisputeDetails: builder.query({
      query: (id) => `dispute/admin/disputes/${id}/`,
      providesTags: (result, error, id) => [{ type: "Disputes", id }],
    }),

    suggestCompensation: builder.mutation({
      query: ({ disputeId, data }) => ({
        url: `dispute/disputes/${disputeId}/suggest-compensation/`,
        // dispute/disputes/7/suggest-compensation/

        method: "POST",
        body: data,
      }),
    }),

    refundPayment: builder.mutation({
      query: (disputeId) => ({
        url: `dispute/disputes/${disputeId}/refund-payment/`,
        method: "POST",
      }),
    }),

    // //ADD promotion
    //    addPromotion: builder.mutation({
    //   query: (payload) => ({
    //     url: `api/discount-program/manage/`,
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["discount-program"],
    // }),
  }),
});

export const {
  useChangePasswordMutation,
  useUpdateBookingScheduleMutation,
  //dispute
  useRefundPaymentMutation,
  // useRefundPaymentMutation,
  useGetDisputesHomeDataQuery,
  useGetDisputeDetailsQuery,
  useSuggestCompensationMutation,
  //thereapist background checks
  useGetTherapistBackgroundDataQuery,
  useGetSingleTherapistBackgroundDataQuery,
  useDeactivateTherapistMutation,
  //Loyalty Program
  useGetLoyaltyProgramQuery,
  useGetLoyaltyActionsQuery,
  useUpdateLoyaltyProgramMutation,
  useDeleteLoyaltyProgramMutation,
  useUpdateLoyaltyActionMutation,
  //MESSAGES
  useGetMessagesQuery,
  useSendMessageMutation,

  // PROMOTIONS
  useGetPromotionsDataQuery,
  useAddPromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,

  //referrals
  useGetReferralSummaryQuery,
  useGetReferralProgramManageQuery,
  useUpdateReferralProgramManageMutation,

  //authentication
  useCreateUserMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,

  //PROFILE
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,

  //login user
  useLoginUserMutation,
  useAdminInfoQuery,
  useRecentBookingsQuery,

  useGetEarningSummaryQuery,
  useGetAdminQuery,

  usePendingTherapistQuery,

  useApproveTherapistMutation,
  useRejectTherapistMutation,

  //users and therapist
  useGetTherapistDetailsQuery,
  useGetCustomersDetailsQuery,

  useGetTherapistDetailsInfoQuery,
  useGetCustomerDetailsInfoQuery,

  //bookings
  useGetAllBookingsQuery,

  //booking details
  useGetBookingDetailsQuery,

  //delete booking
  useDeleteBookingMutation,

  //transaction history
  useGetTransactionHistoryQuery,
  useGetTransactionHistoryDetailsQuery,

  //delete customer and therapist
  useDeleteCustomerMutation,
  useDeleteTherapistMutation,

  //panding payout
  useGetPendingPayoutQuery,
  usePendingPayoutApprovalMutation,

  //getMassageType

  useGetMassageTypeQuery,
  useUpdateMassageTypeMutation,
  useAddMassageTypeMutation,

  //analytics data
  useGetAnalyticsDataQuery,

  // ROLES AND PERMISSION
  useGetNewAdminRequestQuery,
  useAssignRoleInAdminRequestMutation,
  useRejectAdminRequestMutation,

  //THERAPIST
  useGetTherapistDataQuery,

  //ADD ONE
  useGetAddOneDataQuery,
  useUpdateAddOneDataMutation,
  usePostAddOneDataMutation,

  //DISPUTE
  useGetDisputeDataQuery,
  useCreateDisputeSettingMutation,
  useGetSupportTicketQuery,
  useGetSupportTicketDetailsQuery,
  useGetDisputeSettingsQuery,
  useDeleteDisputeSettingMutation,
} = baseApi;
