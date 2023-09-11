import { apiSlice } from "../api/apiSlice";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../../utils/cookie";

const token = getCookie("accessToken");
const loggedUser = jwt_decode(token);
const { userid } = loggedUser;

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getUserProfile: builder.query({
      query: () => `/users/profile`,
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
        formData: true,
      }),
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
              draft?.users.unshift(data?.user);
              draft.total += 1;
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
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
          // check logged user matched if matched update profile
          if (JSON.stringify(args.id) == JSON.stringify(userid)) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getUserProfile",
                undefined,
                (draft) => {
                  Object.assign(draft, data?.user);
                }
              )
            );
          }
        } catch (err) {
          // console.log(err);
        }
      },
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
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          // update all users
          const params = {
            page: 0,
            limit: 10,
          };
          dispatch(
            apiSlice.util.updateQueryData("getUsers", params, (draft) => {
              console.log(draft.total);
              const users = draft?.users.filter((user) => user._id !== id);
              return { users, total: draft.total - 1 };
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
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
