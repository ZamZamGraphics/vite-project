import { apiSlice } from "../api/apiSlice";

export const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/settings",
    }),
    editSettings: builder.mutation({
      query: ({ id, data }) => ({
        url: `/settings/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    emailVerification: builder.query({
      query: (token) => `/settings/emailverify${token}`,
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useEditSettingsMutation,
  useEmailVerificationQuery,
} = settingsApi;
