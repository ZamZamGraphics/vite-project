import { apiSlice } from "../api/apiSlice";

export const batchesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: (search) => `/batches?search=${search}`,
    }),
    getBatch: builder.query({
      query: (id) => `/batches/${id}`,
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
          // update all batches
          const search = "";
          dispatch(
            apiSlice.util.updateQueryData("getBatches", search, (draft) => {
              draft.batches.unshift(data.batch);
              draft.total++;
            })
          );
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
          // update all batches
          const search = "";
          dispatch(
            apiSlice.util.updateQueryData("getBatches", search, (draft) => {
              const batch = draft.batches.find(
                (batch) => batch._id === args.id
              );
              Object.assign(batch, data?.batch);
            })
          );

          // update single batch
          dispatch(
            apiSlice.util.updateQueryData("getBatch", search, (draft) => {
              Object.assign(draft, data?.batch);
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
