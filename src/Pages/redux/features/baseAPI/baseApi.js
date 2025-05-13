import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://192.168.10.139:3333/' 
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
   })

   //getuser
 


  }),
})

export const { 

//authentication
 useCreateUserMutation,

 //login user
 useLoginUserMutation,
 

} = baseApi