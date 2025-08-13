import {useSelector} from 'react-redux';
import {getCurrency} from '@/redux/slices/users/usersSlice';
import {CheckoutProps} from '@/interfaces/cart';
import SubmitButton from '@/components/shared/buttons/SubmitButton';

const Checkout = ({subtotal = 0}: CheckoutProps) => {
  const currency = useSelector(getCurrency);

  return (
    <div className='w-full flex items-center sm:items-end justify-center flex-col gap-5 mt-10'>
      <div className='flex gap-2'>
        <h4 className='text-lg font-semibold'>Subtotal</h4>
        <h5 className='text-xl text-gray-600'>{`${currency.value} ${subtotal.toFixed(2)}`}</h5>
      </div>
      <p className='text-gray-600'>Taxes and shipping calculated at checkout</p>
      <SubmitButton
        buttonText='Check out'
        className='w-[50%] sm:w-[30%] h-[50px] text-lg mt-2'
      />
    </div>
  );
};

export default Checkout;
