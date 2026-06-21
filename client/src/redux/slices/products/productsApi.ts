import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/redux/store';
import {
  AddProductResponses,
  DeleteProductResponses,
  GetProductResponses,
  GetProductsResponses,
  UpdateProductResponses,
} from '@/interfaces/redux';
import {DASHBOARD_API_URLS, serverUrl} from '@/utils/PATHS';
import {API_METHODS} from '@/constants/generals';
import {handleApiResponse} from '@/redux/utils';
import {QUERY_TAGS} from '@/constants/invalidateTags';
import {IdProps, ParamProps} from '@/interfaces/dashboard';

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
    prepareHeaders: (headers, {getState}) => {
      const state = getState() as RootState;
      const user = state.users?.currentUser;

      if (user?.loginToken)
        headers.set('Authorization', `Bearer ${user.loginToken}`);

      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // Add Product Api
    addProduct: builder.mutation<AddProductResponses, FormData>({
      query: (formData) => ({
        url: DASHBOARD_API_URLS.product.addProduct,
        method: API_METHODS.POST,
        body: formData,
      }),
      invalidatesTags: [{type: QUERY_TAGS.products}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
        });
      },
    }),

    // Get Products Api
    fetchProducts: builder.query<GetProductsResponses, ParamProps>({
      query: (params) => ({
        url: DASHBOARD_API_URLS.product.getProducts,
        method: API_METHODS.GET,
        params,
      }),

      providesTags: (result) =>
        result?.body?.products
          ? result.body.products.map(({_id}) => ({
              type: 'Products' as const,
              id: _id,
            }))
          : [{type: 'Products' as const}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    // Get single Product api
    getSingleProduct: builder.query<GetProductResponses, IdProps>({
      query: ({_id}) => ({
        url: DASHBOARD_API_URLS.product.getSingleProduct({_id}),
        method: API_METHODS.GET,
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    // Update Products Api
    updateProduct: builder.mutation<
      UpdateProductResponses,
      {_id: string | undefined; formData: FormData}
    >({
      query: ({formData, _id}) => ({
        url: DASHBOARD_API_URLS.product.updateProducts({_id}),
        method: API_METHODS.PATCH,
        body: formData,
      }),
      invalidatesTags: [{type: QUERY_TAGS.products}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
        });
      },
    }),

    // Delete Products Api
    deleteProduct: builder.mutation<DeleteProductResponses, IdProps>({
      query: ({_id}) => ({
        url: DASHBOARD_API_URLS.product.deleteProducts({_id}),
        method: API_METHODS.DELETE,
        body: {},
      }),
      invalidatesTags: [{type: QUERY_TAGS.products}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
        });
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useFetchProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
