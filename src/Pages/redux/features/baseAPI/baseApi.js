import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://192.168.10.139:3333/' ,
     prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
}),

tagTypes: ["User", "Therapist", "PendingTherapists"],
  endpoints: (builder) => ({


   //authentication
   createUser: builder.mutation({
    query: (payload)=>({
        url: "auth/normal_signup/",
        method: "POST",
        body: payload
    })
   }),

   //login user

   loginUser: builder.mutation({
    query: (userData) =>({
      url: "auth/login/",
      method: "POST",
      body: userData,
      providesTags: ["User"]
    })
   }),

   //getadmin
   getAdmin: builder.query({
    query: ()=>"api/admin/profile/"
   }),

   //admin_home
 adminInfo: builder.query({
    query: ()=>"/api/admin/dashboard/summary/"
 }), 


 //recent bookings
 recentBookings: builder.query({
  query: ()=>"api/recent-booking/"
 }),

  getEarningSummary: builder.query({
      query: (timePeriod) => `api/earning-summary/?time_period=${timePeriod}`,
    }),

    //pending therapist
    pendingTherapist: builder.query({
      query: ()=>"api/pending-therapist-approvals/",
    }),

    approveTherapist: builder.mutation({
      query: (profileId) => ({
        url: `therapist-approval/${profileId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingTherapists'],
    }),


    rejectTherapist: builder.mutation({
      query: (profileId) => ({
        url: `therapist-approval/${profileId}/reject`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingTherapists'],
    }),

    //get Therapist details
    getTherapistDetails: builder.query({
    query: (query) => `api/admin/therapists/?query=${encodeURIComponent(query)}`,
    providesTags: ['Therapist'],
  }),


    getCustomersDetails: builder.query({
    query: (query) => `api/admin/customers/?query=${encodeURIComponent(query)}`,
    providesTags: ['Customer'],
  }),

  //gettherapist details
  getTherapistDetailsInfo: builder.query({
    query: (id)=>`api/admin/therapists/${id}`
  })

















  }),
})

export const { 

//authentication
 useCreateUserMutation,

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
  
 
 

} = baseApi