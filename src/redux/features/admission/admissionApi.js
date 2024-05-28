import { apiSlice } from "../api/apiSlice";

export const admissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissions: builder.query({
      query: (queryString) => `/admission${queryString}`,
      providesTags: ["Admissions"],
    }),
    getAdmission: builder.query({
      query: (id) => `/admission/${id}`,
      providesTags: ["Admission"],
    }),
    getStdAdmission: builder.query({
      query: (searchString) => `/admission/${searchString}`,
    }),
    addAdmission: builder.mutation({
      query: (data) => ({
        url: "/admission/new",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admissions", "Students", "Balance", "Batches"],
    }),
    addPayment: builder.mutation({
      query: (data) => ({
        url: "/admission/payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admissions", "Students"],
    }),
    deleteAdmission: builder.mutation({
      query: (id) => ({
        url: `/admission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admissions", "Students", "Batches"],
    }),
  }),
});

export const {
  useGetAdmissionsQuery,
  useGetAdmissionQuery,
  useGetStdAdmissionQuery,
  useAddAdmissionMutation,
  useAddPaymentMutation,
  useDeleteAdmissionMutation,
} = admissionApi;
