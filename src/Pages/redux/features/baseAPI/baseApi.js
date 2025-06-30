import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.16:3333/",

    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("access_token");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

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
  ],
  endpoints: (builder) => ({
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

    //getadmin
    getAdmin: builder.query({
      query: () => "api/admin/profile/",
    }),

    //admin_home
    adminInfo: builder.query({
      query: () => "/api/admin/dashboard/summary/",
    }),

    //recent bookings
    recentBookings: builder.query({
      query: () => "api/recent-booking/",
    }),

    getEarningSummary: builder.query({
      query: (timePeriod) => `api/earning-summary/?time_period=${timePeriod}`,
    }),

    //pending therapist
    pendingTherapist: builder.query({
      query: () => "/api/pending-therapist-approvals/",
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
        url: `api/massage-types/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["get-massage-types"],
    }),

    //ADD MESSAGE
    addMassageType: builder.mutation({
      query: (formData) => ({
        url: "api/massage-types/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["get-massage-types"],
    }),

    rejectTherapist: builder.mutation({
      query: (profileId) => ({
        url: `api/admin/therapist/documents/${profileId}/reject/`,
        method: "PATCH",
      }),
      invalidatesTags: ["PendingTherapists"],
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

    deleteTherapist: builder.mutation({
      query: (therapistId) => ({
        url: `api/admin/therapists/${therapistId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Therapist"],
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
    // // UPDATE REQUEST ADMIN ROLE
    // updateToAdminRequest: builder.mutation({
    //   query: ({ id, role, approved }) => ({
    //     url: `api/admin-requests/`,
    //     method: "POST",
    //     body: { role, approved },
    //   }),
    //   invalidatesTags: ["admin-request"],
    // }),

    //Therapist Background Check

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
        url: `api/massage-add-ons/${id}`,
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


  }),
});

export const {
  //authentication
  useCreateUserMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,

  //PROFILE


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

  //THERAPIST
  useGetTherapistDataQuery,

  //ADD ONE
  useGetAddOneDataQuery,
  useUpdateAddOneDataMutation,
  usePostAddOneDataMutation
} = baseApi;
