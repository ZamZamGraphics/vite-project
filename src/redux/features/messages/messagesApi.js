import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => "/messages/sms/balance",
      providesTags: ["Balance"],
    }),
    sendSMS: builder.mutation({
      query: (data) => ({
        url: "/messages/sms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Balance"],
    }),
  }),
});

export const { useGetBalanceQuery, useSendSMSMutation } = messagesApi;
