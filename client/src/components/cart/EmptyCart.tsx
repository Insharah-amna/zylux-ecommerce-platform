import Link from 'next/link';
import PrimaryButton from '../shared/buttons/PrimaryButton';
import {NAVBAR_URLS} from '@/utils/PATHS';

const EmptyCart = () => {
  return (
    <div className='w-full flex-center flex-col gap-8 md:gap-12 min-h-[50vh]'>
      <h1 className='text-2xl md:text-4xl'>
        Your cart is <span className='text-accent'>Empty!</span>
      </h1>

      <Link href={NAVBAR_URLS.shop}>
        <PrimaryButton
          buttonText='Return to Shop'
          className='bg-accent text-md md:text-lg px-20 md:px-28 py-5 md:py-6 rounded-full'
        />
      </Link>
    </div>
  );
};

export default EmptyCart;
