import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import { setCookie } from "../../../utils/cookie";
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

          // set cookies
          setCookie("loggedIn", "true", 1);
          setCookie("accessToken", result.data.token, 1);

          dispatch(
            userLoggedIn({
              accessToken: `Bearer ${result.data.token}`,
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
