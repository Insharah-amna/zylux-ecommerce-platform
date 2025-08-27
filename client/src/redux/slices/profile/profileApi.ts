import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_METHODS} from '@/constants/generals';
import {handleApiResponse} from '@/redux/utils';
import {AUTH_API_URLS, serverUrl} from '@/utils/PATHS';
import {RootState} from '@/redux/rootReducer';
import {actions} from '@/redux/slices/users/usersSlice';
import {UpdateProfileResponse} from '@/interfaces/redux';

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
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
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    // Update User Profile
    updateUserProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: AUTH_API_URLS.updateUserProfile,
        method: API_METHODS.PATCH,
        body: formData,
      }),

      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        const {body} = await handleApiResponse({queryFulfilled});

        if (body)
          dispatch(
            actions.updateUserProfile({profileImage: body.profileImage})
          );
      },
    }),
  }),
});

export const {useUpdateUserProfileMutation} = profileApiSlice;
