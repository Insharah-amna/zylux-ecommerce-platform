import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AddressPayload} from '@/interfaces/cart';
import {addressSchema} from '@/schemas/dashboard';
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
  const router = useRouter();

  const subtotal = Number(useSelector(getTotalPrice));

  const cartItems = useSelector(getCartItems);

  const currency = useSelector(getCurrency);

  const [createOrder, {isLoading}] = useCreateOrderMutation();

  const {control, handleSubmit, getValues, setValue} = useForm<AddressPayload>({
    defaultValues: {address: '', city: '', country: ''},
    resolver: yupResolver(addressSchema),
  });

  const onSubmit = (data: AddressPayload) => {
    setValue('address', data.address);
    setValue('city', data.city);
    setValue('country', data.country);
  };

  const handleCheckout = async () => {
    const products = prepareOrderData({cartItems, currency});

    const addressDetails = getValues();

    const response = await createOrder({
      details: products,
      currency: currency.value,
      totalPrice: subtotal,
      ...addressDetails,
    });

    const checkoutUrl = response.data?.body.checkoutUrl;
    if (checkoutUrl) router.push(checkoutUrl);
  };

  return (
    <div className='w-full flex flex-col gap-8 sm:gap-4 sm:flex-row justify-between my-8'>
      <div className='w-full sm:w-1/2'>
        <Address
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>

      <div className='w-full sm:w-1/2 flex items-end justify-end flex-col gap-5'>
        <div className='flex gap-2'>
          <h4 className='text-lg font-semibold'>Subtotal</h4>
          <h5 className='text-xl text-gray-600'>{`${currency.symbol} ${Number(subtotal).toLocaleString('en-IN')}`}</h5>
        </div>

        <p className='text-gray-600 text-right'>
          Taxes and shipping calculated at checkout
        </p>

        <PrimaryButton
          buttonText='Check out'
          className='w-[50%] h-[45px] text-lg mt-2 rounded-full'
          isLoading={isLoading}
          handleClick={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Checkout;
