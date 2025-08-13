'use client';

import {useForm} from 'react-hook-form';
import Link from 'next/link';
import {ForgotPasswordPayload} from '@/interfaces/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import AuthFormContainer from '@/components/shared/containers/AuthFormContainer';
import TextInput from '@/components/shared/inputs/TextInput';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import {AUTH_ROUTES} from '@/utils/PATHS';
import {forgotPasswordUserSchema} from '@/schemas/auth';
import {useForgotPasswordMutation} from '@/redux/slices/users/usersApi';

const ForgotPassword = () => {
  const {control, handleSubmit} = useForm<ForgotPasswordPayload>({
    defaultValues: {email: ''},
    resolver: yupResolver(forgotPasswordUserSchema),
  });

  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const onSubmit = (data: ForgotPasswordPayload) => {
    forgotPassword({email: data.email});
  };
  return (
    <div className='w-full min-h-screen flex-center'>
      <AuthFormContainer
        heading='Reset your password'
        handleSubmit={handleSubmit(onSubmit)}
      >
        <p className='text-primary '>
          We will send you an email to reset your password
        </p>

        <TextInput type='email' name='email' label='Email' control={control} />

        <div className='w-full flex flex-col justify-center items-center gap-5'>
          <SubmitButton buttonText={'Submit'} isLoading={isLoading} />

          <Link href={AUTH_ROUTES.login} className='text-gray-700 underline'>
            Cancel
          </Link>
        </div>
      </AuthFormContainer>
    </div>
  );
};

export default ForgotPassword;
