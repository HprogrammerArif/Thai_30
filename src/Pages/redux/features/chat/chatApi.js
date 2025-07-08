import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.16:3333/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.userData?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (roomId) => `api/chat/messages/${roomId}/`,
      providesTags: (result, error, roomId) => [{ type: "Messages", id: roomId }],
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
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = baseApi;
