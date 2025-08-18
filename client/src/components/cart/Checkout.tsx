'use client';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import {
  getCartItems,
  getCurrency,
  getTotalPrice,
} from '@/redux/slices/users/usersSlice';
import {useCreateOrderMutation} from '@/redux/slices/orders/ordersApi';
import {prepareOrderData} from '@/utils/orderUtils';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import Address from './Address';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const router = useRouter();

  const subtotal = useSelector(getTotalPrice);

  const cartItems = useSelector(getCartItems);

  const currency = useSelector(getCurrency);

  const [createOrder, {isLoading, data}] = useCreateOrderMutation();

  const checkoutUrl = data?.body?.checkoutUrl;

  useEffect(() => {
    if (checkoutUrl) {
      router.push(checkoutUrl);
    }
  }, [data]);

  const handleCheckout = () => {
    const products = prepareOrderData({cartItems, currency});

    createOrder({
      details: products,
      currency: currency.value,
      totalPrice: subtotal,
      address,
      city,
      country,
    });
  };

  return (
    <div className='w-full flex flex-col sm:flex-row justify-between mt-10'>
      <div className='w-full sm:w-1/2 mb-10'>
        <Address
          setAddress={setAddress}
          setCity={setCity}
          setCountry={setCountry}
        />
      </div>
      <div className='w-full sm:w-1/2 flex items-end justify-center flex-col gap-5'>
        <div className='flex gap-2'>
          <h4 className='text-lg font-semibold'>Subtotal</h4>
          <h5 className='text-xl text-gray-600'>{`${currency.symbol} ${subtotal.toFixed(2)}`}</h5>
        </div>

        <p className='text-gray-600 text-right'>
          Taxes and shipping calculated at checkout
        </p>

        <PrimaryButton
          buttonText='Check out'
          className='w-[50%] h-[50px] text-lg mt-2 rounded-full'
          isLoading={isLoading}
          handleClick={() => handleCheckout()}
        />
      </div>
    </div>
  );
};

export default Checkout;
