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
      // invalidatesTags: ["Users", "User"],

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // update all users
          const params = {
            page: 0,
            limit: 10,
          };
          dispatch(
            apiSlice.util.updateQueryData("getUsers", params, (draft) => {
              const user = draft?.users.find((user) => user?._id === args?.id);
              Object.assign(user, data?.user);
            })
          );
          // update single user
          dispatch(
            apiSlice.util.updateQueryData("getUser", args.id, (draft) => {
              Object.assign(draft, data?.user);
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    emailVerification: builder.query({
      query: (token) => `/users/verify${token}`,
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
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useEmailVerificationQuery,
  useResendVerificationMutation,
  useDeleteUserMutation,
} = usersApi;
