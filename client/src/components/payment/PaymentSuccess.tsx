'use client';
import Link from 'next/link';
import {useEffect} from 'react';
import {FiCheck} from 'react-icons/fi';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {SHOP_ROOT} from '@/utils/PATHS';
import {dispatch} from '@/redux/store';
import {actions} from '@/redux/slices/users/usersSlice';

const PaymentSuccess = () => {
  useEffect(() => {
    dispatch(actions.resetCartItems());
  }, []);

  return (
    <div className='flex-center w-full min-h-screen'>
      <div className='flex-center flex-col gap-10'>
        <div className='p-2 sm:p-4 bg-green-500 rounded-full'>
          <FiCheck color='white' size={30} />
        </div>

        <h1 className='text-xl sm:text-2xl text-primary'>Payment Successful</h1>

        <Link href={SHOP_ROOT}>
          <PrimaryButton
            buttonText='Continue Shopping'
            className='rounded-full h-[40px] sm:h-[50px] w-[150px] sm:w-[200px] text-sm sm:text-lg'
          />
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
