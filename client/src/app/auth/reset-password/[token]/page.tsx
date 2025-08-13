import ResetPassword from '@/components/auth/reset-password';
import {ResetPageProps} from '@/interfaces/auth';

export default async function page({params}: ResetPageProps) {
  const {token} = await params;

  return (
    <div className='w-full min-h-screen flex-center'>
      <ResetPassword token={token} />;
    </div>
  );
}
