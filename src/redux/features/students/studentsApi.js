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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          
          // update all students
          const queryString = "?limit=20";
          dispatch(
            apiSlice.util.updateQueryData(
              "getStudents",
              queryString,
              (draft) => {
                const student = draft?.students.find(
                  (student) => student?._id === args?.id
                );
                Object.assign(student, data.student);
              }
            )
          );

          // update single student
          dispatch(
            apiSlice.util.updateQueryData("getStudent", args.id, (draft) => {
              Object.assign(draft, data?.student);
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
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
  useAddStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
