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
      query: ({ password, confirmPassword, queryURL }) => ({
        url: `/users/reset${queryURL}`,
        method: "POST",
        body: { password, confirmPassword },
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } =
  forgotPasswordApi;
