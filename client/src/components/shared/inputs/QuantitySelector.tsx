import {FiMinus, FiPlus} from 'react-icons/fi';
import {QuantitySelectorProps} from '@/interfaces/input';

const QuantitySelector = ({
  product,
  handleIncrement,
  handleDecrement,
}: QuantitySelectorProps) => {
  return (
    <div className='flex border-1 border-gray-300 rounded-3xl w-[80px] sm:w-[100px] py-1'>
      <button
        name='minus'
        className='p-1 sm:p-2 w-1/3 cursor-pointer'
        onClick={handleDecrement}
      >
        <FiMinus size={14} />
      </button>
      <input
        type='text'
        id='quantity'
        min={1}
        value={product.quantity}
        readOnly
        className='w-1/3 text-center text-xs sm:text-sm'
      />
      <button
        name='plus'
        className='p-1 sm:p-2 w-1/3 cursor-pointer'
        onClick={handleIncrement}
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
