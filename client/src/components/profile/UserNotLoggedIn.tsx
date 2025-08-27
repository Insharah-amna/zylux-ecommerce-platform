import Link from 'next/link';
import Image from 'next/image';
import {AUTH_ROUTES} from '@/utils/PATHS';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';

const UserNotLoggedIn = () => {
  return (
    <div className='flex flex-col items-center justify-start gap-2 min-h-[70vh]'>
      <Image
        src='/images/profile_placeholder.webp'
        alt='Guest'
        width={100}
        height={100}
      />
      <p className='mt-4 text-gray-500'>You are not logged in</p>
      <Link href={AUTH_ROUTES.login}>
        <PrimaryButton buttonText='Login' className='mt-1' />
      </Link>
    </div>
  );
};

export default UserNotLoggedIn;
