import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ORDER_API_URLS, PUBLIC_API_URLS, serverUrl} from '@/utils/PATHS';
import {API_METHODS} from '@/constants/generals';
import {handleApiResponse} from '@/redux/utils';
import {
  CreateOrderResponse,
  GetOrdersResponse,
  OrderPayload,
} from '@/interfaces/redux';
import {RootState} from '@/redux/store';
import {ParamProps} from '@/interfaces/dashboard';

export const ordersApiSlice = createApi({
  reducerPath: 'ordersApi',
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
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    // Create order api
    createOrder: builder.mutation<CreateOrderResponse, OrderPayload>({
      query: (payload) => ({
        url: ORDER_API_URLS.createOrder,
        method: API_METHODS.POST,
        body: payload,
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
        });
      },
    }),

    // Get Orders Api
    fetchOrders: builder.query<GetOrdersResponse, ParamProps>({
      query: (params) => ({
        url: ORDER_API_URLS.getOrders,
        method: API_METHODS.GET,
        params,
      }),

      providesTags: (result) =>
        result?.body?.orders
          ? result.body.orders.map(({_id}) => ({
              type: 'Orders' as const,
              id: _id,
            }))
          : [{type: 'Orders' as const}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    // Get Orders by Id Api
    fetchOrdersByUserId: builder.query<GetOrdersResponse, ParamProps>({
      query: (params) => ({
        url: ORDER_API_URLS.getOrdersByUserId,
        method: API_METHODS.GET,
        params,
      }),

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
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchOrdersByUserIdQuery,
} = ordersApiSlice;
