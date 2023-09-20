import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/new",
        method: "POST",
        body: data,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
