import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PUBLIC_API_URLS, serverUrl} from '@/utils/PATHS';
import {API_METHODS} from '@/constants/generals';
import {handleApiResponse} from '@/redux/utils';
import {CreateOrderResponse, OrderPayload} from '@/interfaces/redux';
import {RootState} from '@/redux/store';

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
        url: PUBLIC_API_URLS.createOrder,
        method: API_METHODS.POST,
        body: payload,
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
        });
      },
    }),
  }),
});

export const {useCreateOrderMutation} = ordersApiSlice;
