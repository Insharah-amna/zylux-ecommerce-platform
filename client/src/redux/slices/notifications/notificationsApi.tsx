import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/redux/rootReducer';
import {API_METHODS} from '@/constants/generals';
import {serverUrl, NOTIFICATION_API_URLS} from '@/utils/PATHS';
import {
  GetNotificationResponse,
  SendNotificationResponse,
} from '@/interfaces/redux';
import {handleApiResponse} from '@/redux/utils';
import {NotificationPayload} from '@/interfaces/notifications';

export const notificationsApiSlice = createApi({
  reducerPath: 'notificationsApi',
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
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    // Send notification api
    sendNotifications: builder.mutation<
      SendNotificationResponse,
      NotificationPayload
    >({
      query: ({userId, message, relatedId, typeRef}) => ({
        url: NOTIFICATION_API_URLS.sendMessage,
        method: API_METHODS.POST,
        body: {userId, message, relatedId, typeRef},
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    //  Get Notifications Api
    getNotifications: builder.query<GetNotificationResponse, void>({
      query: () => ({
        url: NOTIFICATION_API_URLS.getNotifications,
        method: API_METHODS.GET,
      }),

      providesTags: (result) =>
        result?.body?.notifications?.length
          ? [
              ...result.body.notifications.map(({_id}) => ({
                type: 'Notifications' as const,
                id: _id,
              })),
              {type: 'Notifications', id: 'LIST'},
            ]
          : [{type: 'Notifications', id: 'LIST'}],

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    //  Update Notifications Api
    updateNotifications: builder.mutation<GetNotificationResponse, void>({
      query: () => ({
        url: NOTIFICATION_API_URLS.updateNotifications,
        method: API_METHODS.PATCH,
        body: {},
      }),

      invalidatesTags: [{type: 'Notifications', id: 'LIST'}],

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
  useSendNotificationsMutation,
  useGetNotificationsQuery,
  useUpdateNotificationsMutation,
} = notificationsApiSlice;
