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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          // update settings
          dispatch(
            apiSlice.util.updateQueryData("getSettings", undefined, (draft) => {
              Object.assign(draft[0], data?.updatedData);
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    verifyAdminEmail: builder.query({
      query: (token) => `/settings/emailverify${token}`,
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useEditSettingsMutation,
  useVerifyAdminEmailQuery,
} = settingsApi;
