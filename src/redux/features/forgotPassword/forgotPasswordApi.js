import { apiSlice } from "../api/apiSlice";

export const forgotPasswordApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, queryURL }) => ({
        url: `/users/reset?${queryURL}`,
        method: "POST",
        body: password,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          console.log(result);
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } =
  forgotPasswordApi;
