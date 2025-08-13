import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_METHODS} from '@/constants/generals';
import {
  ForgotPasswordPayload,
  LoginPayload,
  TokenProps,
  ResetTokenParam,
  SignUpPayload,
} from '@/interfaces/auth';
import {
  ForgotPasswordResponse,
  LoginUserResponse,
  ResendEmailResponse,
  ResetPasswordResponse,
  SignupUserResponse,
  VerifyEmailResponse,
} from '@/interfaces/redux';
import {handleApiResponse} from '@/redux/utils';
import {AUTH_API_URLS, serverUrl} from '@/utils/PATHS';
import {actions} from './usersSlice';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    // login User api
    logInUser: builder.mutation<LoginUserResponse, LoginPayload>({
      query: ({email, password}) => ({
        url: AUTH_API_URLS.login,
        method: API_METHODS.POST,
        body: {email, password},
      }),

      async onQueryStarted({email}, {dispatch, queryFulfilled}) {
        const {body, error} = await handleApiResponse({
          queryFulfilled,
        });

        if (error?.type === 'USER_NOT_VERIFIED') {
          await dispatch(
            usersApiSlice.endpoints.resendVerificationEmail.initiate({email})
          );
        }

        if (body) {
          dispatch(actions.setCurrentUser(body.user));
        }
      },
    }),

    // Signup user api
    signUpUser: builder.mutation<SignupUserResponse, SignUpPayload>({
      query: ({firstName, lastName, email, password}) => ({
        url: AUTH_API_URLS.signup,
        method: API_METHODS.POST,
        body: {firstName, lastName, email, password},
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),

    // Forgot-password user api
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordPayload
    >({
      query: ({email}) => ({
        url: AUTH_API_URLS.forgotPassword,
        method: API_METHODS.POST,
        body: {email},
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),

    // Reset-password user api
    resetPassword: builder.mutation<ResetPasswordResponse, ResetTokenParam>({
      query: ({password, token}) => ({
        url: AUTH_API_URLS.resetPassword({token: token as string}),
        method: API_METHODS.PATCH,
        body: {password},
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),

    // Email-verification user api
    emailVerification: builder.mutation<VerifyEmailResponse, TokenProps>({
      query: ({token}) => ({
        url: AUTH_API_URLS.verifyEmail({token: token as string}),
        method: API_METHODS.PATCH,
        body: {},
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),

    // Resend verification-email user api
    resendVerificationEmail: builder.query<ResendEmailResponse, TokenProps>({
      query: ({email}) => ({
        url: AUTH_API_URLS.resendVerificationEmail({email}),
        method: API_METHODS.GET,
      }),

      async onQueryStarted(_, {queryFulfilled}) {
        await handleApiResponse({queryFulfilled});
      },
    }),
  }),
});

export const {
  useLogInUserMutation,
  useSignUpUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useEmailVerificationMutation,
  useLazyResendVerificationEmailQuery,
} = usersApiSlice;
