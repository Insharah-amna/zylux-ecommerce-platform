'use client';

import {TokenProps} from '@/interfaces/auth';
import VerifyEmailForm from './verifyEmailPage';
import {verifyToken} from '@/utils/tokenVerification';

const VerifyEmail = ({token}: TokenProps) => {
  const isTokenValid = verifyToken({token});

  if (!token && !isTokenValid)
    return (
      <p className='text-primary '>
        Verification failed. Token is invalid or expired.
      </p>
    );

  return <VerifyEmailForm token={token} />;
};

export default VerifyEmail;
