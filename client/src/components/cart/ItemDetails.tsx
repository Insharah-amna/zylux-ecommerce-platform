import Image from 'next/image';
import {useSelector} from 'react-redux';
import {CartItemDetailProps} from '@/interfaces/cart';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {getCurrency} from '@/redux/slices/users/usersSlice';
import {getCurrencyConversion} from '@/utils/currencyUtils';
import {getDiscountedPrice} from '@/utils/discountedPrice';

const ItemDetails = ({product, handleRemove}: CartItemDetailProps) => {
  const currency = useSelector(getCurrency);

  return (
    <div className='flex gap-4 sm:gap-10'>
      <div className='w-[120px] h-[120px] flex-center'>
        <Image
          src={product.imageUrls[0]}
          alt='image'
          height={200}
          width={200}
          className='bg-cover cursor-pointer min-w-[70px] max-h-[120px]'
        />
      </div>

      <div className='flex flex-col gap-3 sm:gap-2'>
        <h3 className='text-lg capitalize'>{product.name}</h3>
        <div className='flex gap-2 h-[20px] items-center'>
          <h4 className='text-gray-600 text-sm sm:text-md'>Price:</h4>
          <h4 className='text-gray-600 text-sm sm:text-md'>{`${currency.symbol}${getCurrencyConversion(
            {
              price: getDiscountedPrice({
                unitPrice: product.price,
                discount: product.discount,
                currency: currency.label,
              }),
              currency: currency.label,
            }
          )}`}</h4>
        </div>

        <PrimaryButton
          buttonText={'Remove'}
          variant={'link'}
          className='w-[60px] h-[30px] text-md underline'
          handleClick={() => {
            handleRemove({_id: product._id});
          }}
        />
      </div>
    </div>
  );
};

export default ItemDetails;
