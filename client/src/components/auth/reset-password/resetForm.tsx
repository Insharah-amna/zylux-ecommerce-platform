import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {AUTH_ROUTES} from '@/utils/PATHS';
import AuthFormContainer from '@/components/shared/containers/AuthFormContainer';
import TextInput from '@/components/shared/inputs/TextInput';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import {TokenProps, ResetPasswordPayload} from '@/interfaces/auth';
import {resetPasswordUserSchema} from '@/schemas/auth';
import {useResetPasswordMutation} from '@/redux/slices/users/usersApi';

const ResetForm = ({token}: TokenProps) => {
  const {control, handleSubmit} = useForm<ResetPasswordPayload>({
    defaultValues: {password: '', confirmPassword: ''},
    resolver: yupResolver(resetPasswordUserSchema),
  });

  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  const onSubmit = async (data: ResetPasswordPayload) => {
    resetPassword({
      password: data.password,
      token: token as string,
    });
  };

  return (
    <AuthFormContainer
      heading='Reset your password'
      handleSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        type='password'
        name='password'
        label='Password'
        control={control}
      />
      <TextInput
        type='password'
        name='confirmPassword'
        label='Confirm Password'
        control={control}
      />

      <div className='w-full flex flex-col justify-center items-center gap-5'>
        <SubmitButton buttonText={'Submit'} isLoading={isLoading} />

        <Link href={AUTH_ROUTES.login} className='text-gray-700 underline'>
          Cancel
        </Link>
      </div>
    </AuthFormContainer>
  );
};

export default ResetForm;
