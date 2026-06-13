import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/redux/rootReducer';
import {API_METHODS} from '@/constants/generals';
import {serverUrl, MESSAGE_API_URLS} from '@/utils/PATHS';
import {GetUserMessagesResponse, SendMessageResponse} from '@/interfaces/redux';
import {GetMessagesResponse, MessagePayload} from '@/interfaces/messages';
import {IdProps} from '@/interfaces/dashboard';
import {handleApiResponse} from '@/redux/utils';

export const messagesApiSlice = createApi({
  reducerPath: 'messagesApi',
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
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    // Send message api
    sendMessage: builder.mutation<SendMessageResponse, MessagePayload>({
      query: ({senderId, receiverId, message}) => ({
        url: MESSAGE_API_URLS.sendMessage,
        method: API_METHODS.POST,
        body: {senderId, receiverId, message},
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    //  Get Messages Api
    getMessages: builder.query<GetMessagesResponse, IdProps>({
      query: ({_id}) => ({
        url: MESSAGE_API_URLS.getMessageByUserId({_id}),
        method: API_METHODS.GET,
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({
          queryFulfilled,
          toastMessage: {success: {show: false}, error: {show: false}},
        });
      },
    }),

    // Get distinct users
    getUsersMessages: builder.query<GetUserMessagesResponse, void>({
      query: () => ({
        url: MESSAGE_API_URLS.getUsers,
        method: API_METHODS.GET,
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
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetUsersMessagesQuery,
} = messagesApiSlice;
