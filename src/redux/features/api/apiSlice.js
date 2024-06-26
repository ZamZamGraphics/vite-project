import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteCookie, setCookie } from "../../../utils/cookie";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/v1`,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", token);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.removeItem("loggedIn");
      setCookie("loggedIn", "false", 1);
      deleteCookie("accessToken");
    }
    return result;
  },
  tagTypes: [
    "Students",
    "Student",
    "Admissions",
    "Admission",
    "Courses",
    "Course",
    "Batches",
    "Batch",
    "Balance",
    "Users",
    "User",
  ],
  endpoints: (builder) => ({}),
});
