import {useSelector} from 'react-redux';
import {getCurrencyConversion} from '@/utils/currencyUtils';
import {ProductColorProps} from '@/interfaces/shop';
import {getCurrency} from '@/redux/slices/users/usersSlice';

const ProductColor = ({
  product,
  selectedColor,
  setSelectedColor,
}: ProductColorProps) => {
  const currency = useSelector(getCurrency);

  return (
    <>
      <h1 className='text-4xl text-primary font-semibold capitalize'>
        {product.name}
      </h1>

      <p className='text-2xl my-3'>{`${currency.symbol} ${getCurrencyConversion(
        {
          price: product.price,
          currency: currency.label,
        }
      ).toFixed(2)}`}</p>

      <h4 className='text-gray-700 text-lg font-semibold'>Color:</h4>
      <div className='flex gap-2'>
        {product.colorVariants.map((color) => (
          <button
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
