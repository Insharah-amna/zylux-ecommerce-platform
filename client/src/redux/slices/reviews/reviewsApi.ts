import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_METHODS} from '@/constants/generals';
import {
  AddReviewResponse,
  DeleteReviewPayload,
  DeleteReviewResponse,
  FetchReviewByIdPayload,
  GetReviewItemsResponse,
  GetReviewsResponse,
  GetReviewsResponseFromApi,
} from '@/interfaces/redux';
import {handleApiResponse} from '@/redux/utils';
import {serverUrl, REVIEW_API_URLS} from '@/utils/PATHS';
import {RootState} from '@/redux/rootReducer';
import {QUERY_TAGS} from '@/constants/invalidateTags';
import {ReviewPayload} from '@/interfaces/reviews';

export const reviewsApiSlice = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
    prepareHeaders: (headers, {getState}) => {
      const state = getState() as RootState;
      const user = state.users?.currentUser;

      if (user.loginToken)
        headers.set('Authorization', `Bearer ${user.loginToken}`);

      return headers;
    },
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    // Add review api
    addReview: builder.mutation<AddReviewResponse, ReviewPayload>({
      query: ({payload, _id}) => ({
        url: REVIEW_API_URLS.addReview({_id}),
        method: API_METHODS.POST,
        body: payload,
      }),

      invalidatesTags: [{type: QUERY_TAGS.reviews}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),

    //  Get Reviews Api
    fetchReviews: builder.query<GetReviewsResponse, void>({
      query: () => ({
        url: REVIEW_API_URLS.fetchReviews,
        method: API_METHODS.GET,
      }),

      providesTags: (result) =>
        result
          ? result.map(({_id}) => ({
              type: 'Reviews' as const,
              id: _id,
            }))
          : [{type: 'Reviews' as const}],

      transformResponse: (response: GetReviewsResponseFromApi) => {
        return response.body.reviews;
      },

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    // Get Reviews by product id Api
    fetchReviewsByProductId: builder.query<
      GetReviewItemsResponse[],
      FetchReviewByIdPayload
    >({
      query: ({productId}) => ({
        url: REVIEW_API_URLS.fetchReviewsByProductId({_id: productId}),
        method: API_METHODS.GET,
      }),

      transformResponse: (response: GetReviewsResponseFromApi) => {
        return response.body.reviews;
      },

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    // Delete Review
    deleteReview: builder.mutation<DeleteReviewResponse, DeleteReviewPayload>({
      query: ({_id}) => ({
        url: REVIEW_API_URLS.deleteReview({_id}),
        method: API_METHODS.DELETE,
      }),

      invalidatesTags: [{type: QUERY_TAGS.reviews}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),
  }),
});

export const {
  useAddReviewMutation,
  useFetchReviewsQuery,
  useFetchReviewsByProductIdQuery,
  useDeleteReviewMutation,
} = reviewsApiSlice;
