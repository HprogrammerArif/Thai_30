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

tagTypes: ["User"],
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

 
 

} = baseApi