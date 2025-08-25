import {useSelector} from 'react-redux';
import {getCurrencyConversion} from '@/utils/currencyUtils';
import {ProductColorProps} from '@/interfaces/shop';
import {getCurrency} from '@/redux/slices/users/usersSlice';
import {getDiscountedPrice} from '@/utils/discountedPrice';

const ProductColor = ({
  product,
  selectedColor,
  setSelectedColor,
}: ProductColorProps) => {
  const currency = useSelector(getCurrency);

  return (
    <>
      <h1 className='text-4xl text-primary font-semibold capitalize mb-2'>
        {product.name}
      </h1>

      {product.discount > 0 ? (
        <>
          <p className='text-2xl'>
            {`${currency.symbol} `}

            <span className='line-through'>
              {getCurrencyConversion({
                price: product.price,
                currency: currency.label,
              })}
            </span>

            <span>
              {` ${getDiscountedPrice({
                unitPrice: product.price,
                discount: product.discount,
                currency: currency.label,
              })}`}
            </span>
          </p>

          <div className='flex gap-3 items-center text-gray-600'>
            <p className='text-lg'>Discount:</p>
            <p>{`${product.discount}%`}</p>
          </div>
        </>
      ) : (
        <p className='text-2xl'>{`${currency.symbol} ${getCurrencyConversion({
          price: product.price,
          currency: currency.label,
        })}`}</p>
      )}

      <h6 className='text-gray-700 text-lg font-semibold'>Color:</h6>
      <div className='flex gap-2'>
        {product.colorVariants.map((color) => (
          <button
            key={color}
            value={color}
            id={color}
            className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-100 ${selectedColor === color ? 'border-2 border-gray-700' : ''}`}
            style={{backgroundColor: color}}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductColor;
