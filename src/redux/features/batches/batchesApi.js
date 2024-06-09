import { admissionApi } from "../admission/admissionApi";
import { apiSlice } from "../api/apiSlice";
import { coursesApi } from "../courses/coursesApi";
import { studentsApi } from "../students/studentsApi";

export const batchesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: (queryString) => `/batches${queryString}`,
      providesTags: ["Batches"],
    }),
    getBatch: builder.query({
      query: (id) => `/batches/${id}`,
      providesTags: ["Batch"],
    }),
    addBatch: builder.mutation({
      query: (data) => ({
        url: "/batches/new",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          // silent entry to admission
          if (data.batch) {
            const { batchNo, classTime } = data.batch;

            const studentIds = args.student.split(",");
            const result = await dispatch(coursesApi.endpoints.getCourse.initiate(args.course))
          
            if(result.status === "fulfilled") {
              studentIds.forEach( async (stdId) => {
              await  dispatch(
                    admissionApi.endpoints.addAdmission.initiate({
                      student: stdId,
                      course: args.course,
                      batch: batchNo,
                      discount: 0,
                      payment: result.data?.courseFee,
                      paymentType: "New",
                      timeSchedule: classTime,
                      admitedAt: args.startDate,
                    }));
              });
  
              dispatch(admissionApi.util.invalidateTags(["Admissions"]));
              dispatch(studentsApi.util.invalidateTags(["Students"]));
            }
            // update all batches
            dispatch(apiSlice.util.invalidateTags(["Batches"]));
          }
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    editBatch: builder.mutation({
      query: ({ id, data }) => ({
        url: `/batches/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Batches", "Batch"],
    }),
    deleteBatch: builder.mutation({
      query: (id) => ({
        url: `/batches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Batches", "Admissions", "Students"],
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useGetBatchQuery,
  useAddBatchMutation,
  useEditBatchMutation,
  useDeleteBatchMutation,
} = batchesApi;
