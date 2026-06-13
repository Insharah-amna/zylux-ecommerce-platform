import {useSelector} from 'react-redux';
import {getCurrencyConversion} from '@/utils/currencyUtils';
import {ProductColorProps} from '@/interfaces/shop';
import {getCurrency} from '@/redux/slices/users/usersSlice';
import {getDiscountedPrice} from '@/utils/discountedPrice';
import RatingStar from '@/components/shared/rating';

const ProductColor = ({
  product,
  selectedColor,
  setSelectedColor,
}: ProductColorProps) => {
  const currency = useSelector(getCurrency);

  return (
    <>
      <div className='flex gap-6'>
        <h1 className='text-4xl text-primary font-semibold capitalize mb-2'>
          {product.name}
        </h1>

        <RatingStar
          rating={product.averageRating}
          readOnly={true}
          width={150}
        />
      </div>

      {product.discount > 0 ? (
        <>
          <p className='text-2xl'>
            {`${currency.symbol} `}

            <span className='line-through text-gray-600 text-xl'>
              {Number(
                getCurrencyConversion({
                  price: product.price,
                  currency: currency.label,
                })
              ).toLocaleString('en-IN')}
            </span>

            <span>
              {` ${Number(
                getDiscountedPrice({
                  unitPrice: product.price,
                  discount: product.discount,
                  currency: currency.label,
                })
              ).toLocaleString('en-IN')}`}
            </span>
          </p>

          <div className='flex items-center'>
            <p className='px-2 py-1 bg-accent rounded-sm text-white font-semibold'>{`${product.discount}% OFF`}</p>
          </div>
        </>
      ) : (
        <p className='text-2xl'>{`${currency.symbol} ${Number(
          getCurrencyConversion({
            price: product.price,
            currency: currency.label,
          })
        ).toLocaleString('en-IN')}`}</p>
      )}

      <h6 className='text-gray-700 text-lg font-semibold'>Available Colors:</h6>
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
