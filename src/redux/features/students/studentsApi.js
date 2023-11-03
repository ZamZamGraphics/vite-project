import { apiSlice } from "../api/apiSlice";

export const studentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (queryString) => `/students${queryString}`,
      providesTags: ["Students"],
    }),
    getStudent: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ["Student"],
    }),
    getStudentById: builder.query({
      query: (id) => `/students/verify/${id}`,
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/students/register",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Students"],
    }),
    editStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Students", "Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
