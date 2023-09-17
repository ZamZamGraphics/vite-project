import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import jwt_decode from "jwt-decode";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("loggedIn", "true");
          const user = jwt_decode(result.data.token);

          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
