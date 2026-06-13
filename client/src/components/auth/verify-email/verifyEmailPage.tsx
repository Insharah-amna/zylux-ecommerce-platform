'use client';

import {useEffect} from 'react';
import {
  useEmailVerificationMutation,
  useLazyResendVerificationEmailQuery,
} from '@/redux/slices/users/usersApi';
import {TokenProps} from '@/interfaces/auth';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {getDecodedInfo} from '@/utils/tokenVerification';
import GlobalLoader from '@/components/shared/loaders/GlobalLoader';

const VerifyEmailForm = ({token}: TokenProps) => {
  const [verifyEmail, {isLoading, isError, isSuccess}] =
    useEmailVerificationMutation();

  const [trigger, {isLoading: resendEmailLoading}] =
    useLazyResendVerificationEmailQuery();

  useEffect(() => {
    verifyEmail({token});
  }, []);

  const decodedInfo = getDecodedInfo({token});

  const handleResendVerification = async () => {
    await trigger({email: decodedInfo?.email});
  };

  return (
    <div className='w-full min-h-screen flex-center '>
      {!isError && !isSuccess && <GlobalLoader />}
      {isError && (
        <div className='border-2 border-gray-700 rounded-2xl p-8] p-16'>
          <div className='w-full flex flex-col justify-center items-center gap-5'>
            <h2 className='text-[40px]'>Email Verification</h2>
            <p className='text-primary '>
              Verification failed. Token is invalid or expired.
            </p>
            <PrimaryButton
              className='h-[60px]'
              buttonText={'Resend Email'}
              isLoading={resendEmailLoading}
              handleClick={handleResendVerification}
            />
          </div>
        </div>
      )}
      {isSuccess && (
        <div className='border-2 border-gray-700 rounded-2xl p-8] p-16'>
          <div className='w-full flex flex-col justify-center items-center gap-5'>
            <h2 className='text-[40px]'>Email Verification</h2>
            <p className='text-primary '>Your email has been verified!</p>
            <a
              href='/auth/login'
              className='border-0 rounded-[40px] bg-primary text-white w-[125px] py-3 md:py-3 cursor-pointer flex-center'
            >
              Back to Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailForm;
