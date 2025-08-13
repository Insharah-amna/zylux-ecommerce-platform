import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  AddCategoryResponse,
  DeleteCategoryResponse,
  EditCategoryResponse,
  GetCategoryResponse,
} from '@/interfaces/redux';
import {CategoryPayload, IdProps, ParamProps} from '@/interfaces/dashboard';
import {DASHBOARD_API_URLS, serverUrl} from '@/utils/PATHS';
import {API_METHODS} from '@/constants/generals';
import {handleApiResponse} from '@/redux/utils';
import {RootState} from '@/redux/store';
import {QUERY_TAGS} from '@/constants/invalidateTags';
import {actions} from './categoriesSlice';

export const categoriesApiSlice = createApi({
  reducerPath: 'categoriesApi',
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
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    // AddCategoryApi
    addCategory: builder.mutation<AddCategoryResponse, CategoryPayload>({
      query: ({name}) => ({
        url: DASHBOARD_API_URLS.category.addCategory,
        method: API_METHODS.POST,
        body: {name},
      }),
      invalidatesTags: ['Categories'],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
        });
      },
    }),

    //GetCategoryApi
    fetchCategories: builder.query<GetCategoryResponse, void>({
      query: () => ({
        url: DASHBOARD_API_URLS.category.getCategories,
        method: API_METHODS.GET,
      }),

      providesTags: (result) =>
        result?.body?.categories
          ? result.body.categories.map(({_id}) => ({
              type: 'Categories' as const,
              id: _id,
            }))
          : [{type: 'Categories' as const}],

      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        const {body} = await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });

        if (body) dispatch(actions.setCategories(body.categories));
      },
    }),

    //UpdateCategoryApi
    updateCategory: builder.mutation<EditCategoryResponse, CategoryPayload>({
      query: ({_id, name}) => ({
        url: DASHBOARD_API_URLS.category.updateCategory({_id}),
        method: API_METHODS.PATCH,
        body: {name},
      }),
      invalidatesTags: [{type: QUERY_TAGS.categories}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),

    // DeleteCategoryApi
    deleteCategory: builder.mutation<DeleteCategoryResponse, IdProps>({
      query: ({_id}) => ({
        url: DASHBOARD_API_URLS.category.deleteCategory({_id}),
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: [{type: QUERY_TAGS.categories}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
