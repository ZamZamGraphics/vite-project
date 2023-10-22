import { apiSlice } from "../api/apiSlice";
import { coursesApi } from "../courses/coursesApi";
import { studentsApi } from "../students/studentsApi";
import { admissionApi } from "../admission/admissionApi";

export const batchesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: (search) => `/batches?search=${search}`,
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

          const course = await dispatch(
            coursesApi.endpoints.getCourse.initiate(args.course)
          ).unwrap();

          // silent entry to admission
          if (data.batch) {
            const {
              student,
              _id,
              batchNo,
              startDate,
              endDate,
              classDays,
              classTime,
            } = data.batch;

            const studentIds = args.student.split(",");

            studentIds.forEach((stdId) => {
              dispatch(
                admissionApi.endpoints.addAdmission.initiate({
                  student: stdId,
                  course: args.course,
                  batch: batchNo,
                  discount: 0,
                  payment: 0,
                  timeSchedule: classTime,
                  paymentType: "New",
                })
              );
            });

            dispatch(admissionApi.util.invalidateTags(["Admissions"]));
            dispatch(studentsApi.util.invalidateTags(["Students"]));

            // update all batches
            const search = "";
            dispatch(
              apiSlice.util.updateQueryData("getBatches", search, (draft) => {
                draft.batches.unshift({
                  _id,
                  batchNo,
                  course: {
                    name: course.name,
                    courseType: course.courseType,
                  },
                  student,
                  startDate,
                  endDate,
                  classDays,
                  classTime,
                });
                draft.total++;
              })
            );
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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            batchesApi.util.invalidateTags([{ type: "Batch", _id: args.id }])
          );
          dispatch(admissionApi.util.invalidateTags(["Admissions"]));
          dispatch(studentsApi.util.invalidateTags(["Students"]));

          const course = await dispatch(
            coursesApi.endpoints.getCourse.initiate(data.batch.course)
          ).unwrap();

          const updateBatch = {
            ...data.batch,
            course: {
              _id: course._id,
              name: course.name,
              courseType: course.courseType,
            },
          };

          // update all batches
          const search = "";
          dispatch(
            apiSlice.util.updateQueryData("getBatches", search, (draft) => {
              const batch = draft.batches.find(
                (batch) => batch._id === args.id
              );
              Object.assign(batch, updateBatch);
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    deleteBatch: builder.mutation({
      query: (id) => ({
        url: `/batches/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(admissionApi.util.invalidateTags(["Admissions"]));
          dispatch(studentsApi.util.invalidateTags(["Students"]));
          // update all batches
          const search = "";
          dispatch(
            apiSlice.util.updateQueryData("getBatches", search, (draft) => {
              const data = draft?.batches.filter(
                (batch) => batch?._id !== args
              );
              const total = draft.total - 1;
              return { batches: data, total };
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
  useGetBatchesQuery,
  useGetBatchQuery,
  useAddBatchMutation,
  useEditBatchMutation,
  useDeleteBatchMutation,
} = batchesApi;
