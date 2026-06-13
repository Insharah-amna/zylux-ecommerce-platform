'use client';

import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/dist/client/components/navigation';
import {SignUpPayload} from '@/interfaces/auth';
import TextInput from '@/components/shared/inputs/TextInput';
import {AUTH_ROUTES} from '@/utils/PATHS';
import AuthFormContainer from '@/components/shared/containers/AuthFormContainer';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import {signUpUserSchema} from '@/schemas/auth';
import {useSignUpUserMutation} from '@/redux/slices/users/usersApi';
import {asyncTryCatch} from '@/utils/tryCatchUtils';

const SignUp = () => {
  const router = useRouter();

  const {control, handleSubmit} = useForm<SignUpPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpUserSchema),
  });

  const [signUpUser, {isLoading}] = useSignUpUserMutation();

  const onSubmit = async (data: SignUpPayload) => {
    const {success} = await asyncTryCatch(() =>
      signUpUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }).unwrap()
    );

    if (success) {
      router.push('/auth/login');
    }
  };

  return (
    <div className='w-full min-h-screen flex-center'>
      <AuthFormContainer
        heading='Create Account'
        handleSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          type='text'
          name='firstName'
          label='First Name'
          control={control}
        />
        <TextInput
          type='text'
          name='lastName'
          label='Last Name'
          control={control}
        />
        <TextInput type='email' name='email' label='Email' control={control} />
        <TextInput
          type='password'
          name='password'
          label='Password'
          control={control}
        />

        <div className='w-full flex flex-col justify-center items-center gap-5'>
          <SubmitButton buttonText='Sign Up' isLoading={isLoading} />

          <Link href={AUTH_ROUTES.login} className='text-gray-700 underline'>
            Already have an account? Log in!
          </Link>
        </div>
      </AuthFormContainer>
    </div>
  );
};

export default SignUp;
