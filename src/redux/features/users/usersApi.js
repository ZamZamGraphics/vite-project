import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: () => `/users/profile`,
      providesTags: ["Profile"],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Users"],
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Users", "User", "Profile"],
    }),
    emailVerification: builder.query({
      query: (token) => `/users/verify?token=${token}`,
    }),
    resendVerification: builder.mutation({
      query: (email) => ({
        url: "/users/resend",
        method: "POST",
        body: { email },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users", "User", "Profile"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserProfileQuery,
  useAddUserMutation,
  useEditUserMutation,
  useEmailVerificationQuery,
  useResendVerificationMutation,
  useDeleteUserMutation,
} = usersApi;
