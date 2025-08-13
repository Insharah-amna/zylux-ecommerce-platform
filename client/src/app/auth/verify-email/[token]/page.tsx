import VerifyEmail from '@/components/auth/verify-email';
import {ResetPageProps} from '@/interfaces/auth';

export default async function page({params}: ResetPageProps) {
  const {token} = await params;

  return (
    <div className='w-full min-h-screen flex-center'>
      <VerifyEmail token={token} />;
    </div>
  );
}
