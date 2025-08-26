import Link from 'next/link';
import {ROOT_ROUTE} from '@/utils/PATHS';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';

const notFound = () => {
  return (
    <div className='flex-center min-h-screen w-full flex-col gap-12'>
      <h2 className='text-8xl text-accent/80'>404</h2>
      <div className='flex-center flex-col gap-3'>
        <h4 className='font-bold text-xl'>Page not found</h4>
        <p className='font-semibold text-sm'>
          Oops! The page you are looking for does not exist.
        </p>
      </div>
      <Link href={ROOT_ROUTE}>
        <PrimaryButton
          buttonText='Back To Home'
          className='rounded-none w-[135px]'
        />
      </Link>
    </div>
  );
};

export default notFound;
