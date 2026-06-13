'use client';

import {TokenProps} from '@/interfaces/auth';
import ResetForm from './resetForm';
import {verifyToken} from '@/utils/tokenVerification';

const ResetPassword = ({token}: TokenProps) => {
  const isTokenValid = verifyToken({token});
  if (!token && !isTokenValid) return <p>Token is expired</p>;

  return <ResetForm token={token} />;
};

export default ResetPassword;
