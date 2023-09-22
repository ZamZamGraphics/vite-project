import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (search) => `/courses?search=${search}`,
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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // update all courses
          const search = "";
          dispatch(
            apiSlice.util.updateQueryData("getCourses", search, (draft) => {
              draft.courses.unshift(data.course);
              draft.total++;
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // update all courses
          const search = "";
          dispatch(
            apiSlice.util.updateQueryData("getCourses", search, (draft) => {
              const course = draft.courses.find(
                (course) => course._id === args.id
              );
              Object.assign(course, data?.course);
            })
          );

          // update single course
          dispatch(
            apiSlice.util.updateQueryData("getCourse", search, (draft) => {
              Object.assign(draft, data?.course);
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          // update all courses
          const search = "";
          dispatch(
            apiSlice.util.updateQueryData("getCourses", search, (draft) => {
              const data = draft?.courses.filter(
                (course) => course?._id !== args
              );
              const total = draft.total - 1;
              return { courses: data, total };
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
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
