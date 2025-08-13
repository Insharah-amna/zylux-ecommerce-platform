'use client';

import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginPayload} from '@/interfaces/auth';
import TextInput from '@/components/shared/inputs/TextInput';
import {AUTH_ROUTES} from '@/utils/PATHS';
import AuthFormContainer from '@/components/shared/containers/AuthFormContainer';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import {loginUserSchema} from '@/schemas/auth';
import {useLogInUserMutation} from '@/redux/slices/users/usersApi';

const Login = () => {
  const {control, handleSubmit} = useForm<LoginPayload>({
    defaultValues: {email: '', password: ''},
    resolver: yupResolver(loginUserSchema),
  });

  const [loginUser, {isLoading}] = useLogInUserMutation();

  const onSubmit = (data: LoginPayload) => {
    loginUser({email: data.email, password: data.password});
  };

  return (
    <div className='w-full min-h-screen flex-center'>
      <AuthFormContainer heading='Log in' handleSubmit={handleSubmit(onSubmit)}>
        <TextInput type='text' name='email' label='Email' control={control} />
        <TextInput
          type='password'
          name='password'
          label='Password'
          control={control}
        />

        <div className='w-full text-left'>
          <Link
            href={AUTH_ROUTES.forgotPassword}
            className='text-gray-700 underline'
          >
            Forgot your password?
          </Link>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-5'>
          <SubmitButton buttonText='Log in' isLoading={isLoading} />

          <Link href={AUTH_ROUTES.signup} className='text-gray-700 underline'>
            New customer? Sign up for an account
          </Link>
        </div>
      </AuthFormContainer>
    </div>
  );
};

export default Login;
