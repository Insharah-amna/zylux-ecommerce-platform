import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_METHODS} from '@/constants/generals';
import {
  AddToWishlistResponse,
  GetWishlistResponse,
  RemoveFromWishlistResponse,
} from '@/interfaces/redux';
import {handleApiResponse} from '@/redux/utils';
import {serverUrl, WISHLIST_API_URLS} from '@/utils/PATHS';
import {IdProps} from '@/interfaces/dashboard';
import {RootState} from '@/redux/rootReducer';
import {actions} from './users/usersSlice';
import {extractProduct} from '@/utils/general';

export const wishlistApiSlice = createApi({
  reducerPath: 'wishlistApi',
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
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    // Create wishlist api
    addToWishlist: builder.mutation<AddToWishlistResponse, IdProps>({
      query: ({_id}) => ({
        url: WISHLIST_API_URLS.addToWishlist({_id: _id as string}),
        method: API_METHODS.POST,
        body: {},
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    // Get Wishlist by Id Api
    fetchWishlistByUserId: builder.query<GetWishlistResponse, void>({
      query: () => ({
        url: WISHLIST_API_URLS.getWishlistbyUserId,
        method: API_METHODS.GET,
      }),

      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        const {body} = await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });

        if (body) dispatch(actions.setWishlist(body.wishlist));
      },
    }),

    // Remove from Wishlist
    removeFromWishlist: builder.mutation<RemoveFromWishlistResponse, IdProps>({
      query: ({_id}) => ({
        url: WISHLIST_API_URLS.removeFromWishlist({_id}),
        method: API_METHODS.DELETE,
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
  useAddToWishlistMutation,
  useFetchWishlistByUserIdQuery,
  useRemoveFromWishlistMutation,
} = wishlistApiSlice;
